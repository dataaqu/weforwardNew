import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { motion } from 'framer-motion';
import type { BlogPost, CreateBlogPostData } from '../../types/blog';
import { blogService } from '../../services/blogService';

interface BlogPostEditorProps {
  post?: BlogPost;
  onSave: (postData: CreateBlogPostData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const BlogPostEditor: React.FC<BlogPostEditorProps> = ({
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
    author: '',
    authorKa: '',
    category: '',
    categoryKa: '',
    tags: [],
    tagsKa: [],
    published: false,
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
        setUploadingImage(true);
        try {
          featuredImageUrl = await blogService.uploadImage(
            imageFile, 
            `featured/${Date.now()}-${imageFile.name}`
          );
        } catch (imageError) {
          console.error('Image upload failed:', imageError);
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

      await onSave(postData);
      
    } catch (error) {
      console.error('Error saving post:', error);
      
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

  const handleTagsChange = (value: string, field: 'tags' | 'tagsKa') => {
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({ ...prev, [field]: tags }));
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ],
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
              placeholder="შეიყვანეთ სტატიის სათაური ქართულად"
              required
            />
          </div>

          {/* Author English */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Author (English) *
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200"
              placeholder="Author name"
              required
            />
          </div>

          {/* Author Georgian */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Author (Georgian) *
            </label>
            <input
              type="text"
              value={formData.authorKa}
              onChange={(e) => setFormData(prev => ({ ...prev, authorKa: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200"
              placeholder="ავტორის სახელი"
              required
            />
          </div>

          {/* Category English */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category (English) *
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200"
              placeholder="e.g., Logistics, Technology"
              required
            />
          </div>

          {/* Category Georgian */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category (Georgian) *
            </label>
            <input
              type="text"
              value={formData.categoryKa}
              onChange={(e) => setFormData(prev => ({ ...prev, categoryKa: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200"
              placeholder="მაგ., ლოგისტიკა, ტექნოლოგია"
              required
            />
          </div>
        </div>

        {/* Slug */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL Slug *
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200"
            placeholder="post-url-slug"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            This will be the URL: /blog/{formData.slug}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Content</h2>
        
        {/* English Content */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content (English) *
          </label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <ReactQuill
              value={formData.content}
              onChange={(value: string) => setFormData(prev => ({ ...prev, content: value }))}
              modules={quillModules}
              placeholder="Write your blog post content in English..."
              style={{ minHeight: '300px' }}
            />
          </div>
        </div>

        {/* Georgian Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content (Georgian) *
          </label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <ReactQuill
              value={formData.contentKa}
              onChange={(value: string) => setFormData(prev => ({ ...prev, contentKa: value }))}
              modules={quillModules}
              placeholder="დაწერეთ თქვენი ბლოგ პოსტის შინაარსი ქართულად..."
              style={{ minHeight: '300px' }}
            />
          </div>
        </div>
      </div>

      {/* Excerpts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Excerpts</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt (English) *
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200"
              placeholder="Brief summary of the post..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt (Georgian) *
            </label>
            <textarea
              value={formData.excerptKa}
              onChange={(e) => setFormData(prev => ({ ...prev, excerptKa: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200"
              placeholder="სტატიის მოკლე აღწერა..."
              required
            />
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Featured Image</h2>
        
        <div className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#309f69] file:text-white hover:file:bg-[#277a57] transition-colors duration-200"
          />
          
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Featured preview"
                className="w-64 h-40 object-cover rounded-lg border border-gray-200"
              />
            </div>
          )}
        </div>
      </div>

      {/* Tags and Meta */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Tags & SEO</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (English)
            </label>
            <input
              type="text"
              value={formData.tags.join(', ')}
              onChange={(e) => handleTagsChange(e.target.value, 'tags')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200"
              placeholder="logistics, shipping, freight (comma-separated)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (Georgian)
            </label>
            <input
              type="text"
              value={formData.tagsKa.join(', ')}
              onChange={(e) => handleTagsChange(e.target.value, 'tagsKa')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200"
              placeholder="ლოგისტიკა, ტრანსპორტი (მძიმით გამოყოფილი)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Description (English)
            </label>
            <textarea
              value={formData.metaDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200"
              placeholder="SEO description for search engines..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Description (Georgian)
            </label>
            <textarea
              value={formData.metaDescriptionKa}
              onChange={(e) => setFormData(prev => ({ ...prev, metaDescriptionKa: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200"
              placeholder="SEO აღწერა საძიებო სისტემებისთვის..."
            />
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Settings</h2>
        
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
              className="w-4 h-4 text-[#309f69] bg-gray-100 border-gray-300 rounded focus:ring-[#309f69] focus:ring-2"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              Published (visible to public)
            </span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              className="w-4 h-4 text-[#309f69] bg-gray-100 border-gray-300 rounded focus:ring-[#309f69] focus:ring-2"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              Featured post
            </span>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <motion.button
          type="submit"
          disabled={loading || uploadingImage}
          whileHover={{ scale: loading || uploadingImage ? 1 : 1.02 }}
          whileTap={{ scale: loading || uploadingImage ? 1 : 0.98 }}
          className="flex-1 sm:flex-none px-8 py-3 bg-gradient-to-r from-[#309f69] to-[#2ff9c3] text-white rounded-lg font-medium hover:shadow-lg transition-shadow duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading || uploadingImage ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              {uploadingImage ? 'Uploading...' : 'Saving...'}
            </div>
          ) : (
            post ? 'Update Post' : 'Create Post'
          )}
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
