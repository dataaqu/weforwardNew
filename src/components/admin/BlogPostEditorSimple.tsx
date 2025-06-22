import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { BlogPost, CreateBlogPostData } from '../../types/blog';
import { blogService } from '../../services/blogService';

interface BlogPostEditorProps {
  post?: BlogPost;
  onSave: (postData: CreateBlogPostData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const BlogPostEditorSimple: React.FC<BlogPostEditorProps> = ({
  post,
  onSave,
  onCancel,
  loading = false
}) => {
  const [formData, setFormData] = useState<CreateBlogPostData>({
    title: '',
    titleKa: '',
    content: '',
    contentKa: '',
    excerpt: '',
    excerptKa: '',
    author: 'WEFORWARD',
    authorKa: 'WEFORWARD',
    category: '',
    categoryKa: '',
    tags: [],
    tagsKa: [],
    published: true,
    featured: false,
    slug: '',
    metaDescription: '',
    metaDescriptionKa: '',
    featuredImage: '',
    readTime: 0
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        titleKa: post.titleKa,
        content: post.content,
        contentKa: post.contentKa,
        excerpt: post.excerpt,
        excerptKa: post.excerptKa,
        author: post.author,
        authorKa: post.authorKa,
        category: post.category,
        categoryKa: post.categoryKa,
        tags: post.tags,
        tagsKa: post.tagsKa,
        published: post.published,
        featured: post.featured,
        slug: post.slug,
        metaDescription: post.metaDescription,
        metaDescriptionKa: post.metaDescriptionKa,
        featuredImage: post.featuredImage,
        readTime: post.readTime
      });
      setImagePreview(post.featuredImage);
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🚀 Starting blog post submission...');
    console.log('📝 Form data:', formData);

    try {
      // Validate required fields
      if (!formData.title.trim()) {
        alert('English title is required');
        return;
      }
      if (!formData.titleKa.trim()) {
        alert('Georgian title is required');
        return;
      }
      if (!formData.content.trim()) {
        alert('English content is required');
        return;
      }
      if (!formData.contentKa.trim()) {
        alert('Georgian content is required');
        return;
      }

      let featuredImageUrl = formData.featuredImage;

      // Upload new image if selected
      if (imageFile) {
        console.log('📸 Uploading image...');
        setUploadingImage(true);
        try {
          featuredImageUrl = await blogService.uploadImage(
            imageFile, 
            `featured/${Date.now()}-${imageFile.name}`
          );
          console.log('✅ Image uploaded successfully:', featuredImageUrl);
        } catch (imageError) {
          console.error('❌ Image upload failed:', imageError);
          alert('Failed to upload image. Please try again.');
          return;
        }
      }

      const postData: CreateBlogPostData = {
        ...formData,
        featuredImage: featuredImageUrl,
        readTime: blogService.calculateReadTime(formData.content),
        slug: formData.slug || blogService.generateSlug(formData.title)
      };

      console.log('💾 Saving post data:', postData);
      await onSave(postData);
      console.log('✅ Post saved successfully!');
      
    } catch (error) {
      console.error('❌ Error saving post:', error);
      
      // More detailed error handling
      if (error instanceof Error) {
        alert(`Failed to save post: ${error.message}`);
      } else {
        alert('Failed to save post. Please check the console for details.');
      }
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* English Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title (English) *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => {
                const title = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  title,
                  slug: blogService.generateSlug(title)
                }));
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200"
              placeholder="Enter post title in English"
              required
            />
          </div>

          {/* Georgian Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title (Georgian) *
            </label>
            <input
              type="text"
              value={formData.titleKa}
              onChange={(e) => setFormData(prev => ({ ...prev, titleKa: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200"
              placeholder="შეიყვანეთ პოსტის სათაური ქართულად"
              required
            />
          </div>
        </div>
      </div>

      {/* Content Section - Simple Textareas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Content</h2>
        
        {/* English Content */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content (English) *
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200 resize-vertical"
            placeholder="Write your blog post content in English..."
            required
          />
        </div>

        {/* Georgian Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content (Georgian) *
          </label>
          <textarea
            value={formData.contentKa}
            onChange={(e) => setFormData(prev => ({ ...prev, contentKa: e.target.value }))}
            className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200 resize-vertical"
            placeholder="დაწერეთ თქვენი ბლოგ პოსტის შინაარსი ქართულად..."
            required
          />
        </div>
      </div>

      {/* Image Upload */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Featured Image</h2>
        
        <div className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#309f69] file:text-white hover:file:bg-[#267553]"
          />
          
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-xs h-auto rounded-lg border border-gray-300"
              />
            </div>
          )}
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <motion.button
          type="submit"
          disabled={loading || uploadingImage}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 sm:flex-none px-8 py-3 bg-gradient-to-r from-[#309f69] to-[#2ff9c3] text-white rounded-lg font-medium hover:shadow-lg transition-shadow duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading || uploadingImage ? 'Saving...' : (post ? 'Update Post' : 'Create Post')}
        </motion.button>
        
        <motion.button
          type="button"
          onClick={onCancel}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 sm:flex-none px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
        >
          Cancel
        </motion.button>
      </div>
    </form>
  );

};
