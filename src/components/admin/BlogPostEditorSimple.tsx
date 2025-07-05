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

  const [seoTags, setSeoTags] = useState<string>('');
  const [seoTagsKa, setSeoTagsKa] = useState<string>('');

  const [images, setImages] = useState<Array<{
    file: File | null;
    preview: string;
    url: string;
    isMain: boolean;
  }>>([]);
  const [uploadingImages, setUploadingImages] = useState(false);

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
      // Set existing featured image
      if (post.featuredImage) {
        setImages([{
          file: null,
          preview: post.featuredImage,
          url: post.featuredImage,
          isMain: true
        }]);
      }
      // Set existing SEO tags
      setSeoTags(post.tags.join(', '));
      setSeoTagsKa(post.tagsKa.join(', '));
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

      // SEO validation warnings (non-blocking)
      if (!formData.metaDescription.trim() && formData.published) {
        const confirmWithoutMeta = window.confirm(
          'No meta description provided. This is important for SEO. Continue anyway?'
        );
        if (!confirmWithoutMeta) return;
      }

      if (formData.metaDescription.length > 160) {
        const confirmLongMeta = window.confirm(
          `Meta description is ${formData.metaDescription.length} characters (recommended: 150-160). Continue anyway?`
        );
        if (!confirmLongMeta) return;
      }

      if (!seoTags.trim() && formData.published) {
        const confirmWithoutTags = window.confirm(
          'No SEO tags provided. Tags help with content categorization and SEO. Continue anyway?'
        );
        if (!confirmWithoutTags) return;
      }

      let featuredImageUrl = formData.featuredImage;
      let processedContent = formData.content;
      let processedContentKa = formData.contentKa;

      // Upload new images if any
      if (images.some(img => img.file)) {
        console.log('📸 Uploading images...');
        setUploadingImages(true);
        
        const uploadedImages = await Promise.all(
          images.map(async (img, index) => {
            if (img.file) {
              try {
                const url = await blogService.uploadImage(
                  img.file, 
                  `blog-images/${Date.now()}-${img.file.name}`
                );
                return { ...img, url, index };
              } catch (error) {
                console.error('Failed to upload image:', error);
                throw error;
              }
            }
            return { ...img, index };
          })
        );

        // Set featured image from main image
        const mainImage = uploadedImages.find(img => img.isMain);
        if (mainImage) {
          featuredImageUrl = mainImage.url;
        }

        // Replace <image> tags with actual image URLs
        uploadedImages.forEach((img, index) => {
          const fullImageTag = `<image${index + 1}>`;
          const halfImageTagOpen = `<image${index + 1}-half>`;
          const halfImageTagClose = `</image${index + 1}-half>`;
          
          const fullImageHtml = `<img src="${img.url}" alt="Blog image ${index + 1}" class="w-full h-auto rounded-lg my-4" />`;
          
          // For half images, we need to handle the opening and closing tags
          // Replace the opening tag
          const halfImageOpenHtml = `<div class="flex gap-6 my-6 items-start"><div class="w-1/2 flex-shrink-0"><img src="${img.url}" alt="Blog image ${index + 1}" class="w-full h-auto rounded-lg" /></div><div class="w-1/2 flex-grow"><div class="text-base leading-relaxed pl-4">`;
          
          // Replace the closing tag
          const halfImageCloseHtml = `</div></div></div>`;
          
          processedContent = processedContent.replace(new RegExp(fullImageTag, 'g'), fullImageHtml);
          processedContent = processedContent.replace(new RegExp(halfImageTagOpen, 'g'), halfImageOpenHtml);
          processedContent = processedContent.replace(new RegExp(halfImageTagClose, 'g'), halfImageCloseHtml);
          
          processedContentKa = processedContentKa.replace(new RegExp(fullImageTag, 'g'), fullImageHtml);
          processedContentKa = processedContentKa.replace(new RegExp(halfImageTagOpen, 'g'), halfImageOpenHtml);
          processedContentKa = processedContentKa.replace(new RegExp(halfImageTagClose, 'g'), halfImageCloseHtml);
        });
        
        console.log('✅ Images uploaded successfully');
      }

      const postData: CreateBlogPostData = {
        ...formData,
        content: processedContent,
        contentKa: processedContentKa,
        featuredImage: featuredImageUrl,
        readTime: blogService.calculateReadTime(processedContent),
        slug: formData.slug || blogService.generateSlug(formData.title),
        tags: seoTags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        tagsKa: seoTagsKa.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
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
      setUploadingImages(false);
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length + images.length > 4) {
      alert('Maximum 4 images allowed');
      return;
    }

    const newImages = files.map((file, index) => ({
      file,
      preview: URL.createObjectURL(file),
      url: '',
      isMain: images.length === 0 && index === 0 // First image is main if no images exist
    }));

    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      const updated = prev.filter((_, i) => i !== index);
      // If we removed the main image, make the first remaining image main
      if (prev[index].isMain && updated.length > 0) {
        updated[0].isMain = true;
      }
      return updated;
    });
  };

  const setMainImage = (index: number) => {
    setImages(prev => prev.map((img, i) => ({
      ...img,
      isMain: i === index
    })));
  };

  const insertImageTag = (imageNumber: number, isGeorgian: boolean = false, width: 'full' | 'half' = 'full') => {
    const tag = width === 'full' 
      ? `<image${imageNumber}>` 
      : `<image${imageNumber}-half>\n\n[ტექსტი აქ]\n\n</image${imageNumber}-half>`;
    const currentContent = isGeorgian ? formData.contentKa : formData.content;
    
    // Find the textarea element to get cursor position
    const textarea = document.querySelector(`textarea[placeholder*="${isGeorgian ? 'ქართულად' : 'English'}"]`) as HTMLTextAreaElement;
    
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent = currentContent.slice(0, start) + tag + currentContent.slice(end);
      
      if (isGeorgian) {
        setFormData(prev => ({ ...prev, contentKa: newContent }));
      } else {
        setFormData(prev => ({ ...prev, content: newContent }));
      }
      
      // Set cursor position after the inserted tag
      const cursorPos = width === 'half' ? start + `<image${imageNumber}-half>\n\n`.length : start + tag.length;
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(cursorPos, cursorPos + (width === 'half' ? '[ტექსტი აქ]'.length : 0));
      }, 0);
    }
  };

  const insertHtmlTag = (tagName: string, isGeorgian: boolean = false) => {
    const currentContent = isGeorgian ? formData.contentKa : formData.content;
    const textarea = document.querySelector(`textarea[placeholder*="${isGeorgian ? 'ქართულად' : 'English'}"]`) as HTMLTextAreaElement;
    
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      let tag = '';
      let cursorOffset = 0;
      
      switch (tagName) {
        case 'br':
          tag = '<br>';
          cursorOffset = tag.length;
          break;
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
          tag = `<${tagName}>Heading</${tagName}>`;
          cursorOffset = `<${tagName}>`.length;
          break;
        case 'a':
          tag = '<a href="https://example.com">Link Text</a>';
          cursorOffset = '<a href="'.length;
          break;
        case 'strong':
          tag = '<strong>Bold Text</strong>';
          cursorOffset = '<strong>'.length;
          break;
        case 'em':
          tag = '<em>Italic Text</em>';
          cursorOffset = '<em>'.length;
          break;
        case 'p':
          tag = '<p>Paragraph text</p>';
          cursorOffset = '<p>'.length;
          break;
        default:
          tag = `<${tagName}></${tagName}>`;
          cursorOffset = `<${tagName}>`.length;
      }
      
      const newContent = currentContent.slice(0, start) + tag + currentContent.slice(end);
      
      if (isGeorgian) {
        setFormData(prev => ({ ...prev, contentKa: newContent }));
      } else {
        setFormData(prev => ({ ...prev, content: newContent }));
      }
      
      // Set cursor position inside the tag for editing
      setTimeout(() => {
        textarea.focus();
        if (tagName === 'br') {
          textarea.setSelectionRange(start + cursorOffset, start + cursorOffset);
        } else {
          // Select the content inside the tag for easy replacement
          const contentStart = start + cursorOffset;
          const contentEnd = start + tag.length - `</${tagName}>`.length;
          textarea.setSelectionRange(contentStart, contentEnd);
        }
      }, 0);
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

      {/* SEO Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">SEO Settings</h2>
        
        <div className="space-y-6">
          {/* Meta Descriptions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description (English)
              </label>
              <textarea
                value={formData.metaDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200 resize-vertical"
                placeholder="Brief description for search engines (150-160 characters recommended)"
                rows={3}
                maxLength={160}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.metaDescription.length}/160 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description (Georgian)
              </label>
              <textarea
                value={formData.metaDescriptionKa}
                onChange={(e) => setFormData(prev => ({ ...prev, metaDescriptionKa: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200 resize-vertical"
                placeholder="მოკლე აღწერა საძიებო სისტემებისთვის (150-160 სიმბოლო რეკომენდებულია)"
                rows={3}
                maxLength={160}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.metaDescriptionKa.length}/160 characters
              </p>
            </div>
          </div>

          {/* SEO Keywords/Tags */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SEO Keywords/Tags (English)
              </label>
              <input
                type="text"
                value={seoTags}
                onChange={(e) => setSeoTags(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200"
                placeholder="keyword1, keyword2, keyword3"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate keywords with commas. Used for SEO and content categorization.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SEO Keywords/Tags (Georgian)
              </label>
              <input
                type="text"
                value={seoTagsKa}
                onChange={(e) => setSeoTagsKa(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200"
                placeholder="საკვანძო1, საკვანძო2, საკვანძო3"
              />
              <p className="text-xs text-gray-500 mt-1">
                გამოყავით საკვანძო სიტყვები მძიმით. გამოიყენება SEO-სთვის და კონტენტის კატეგორიზაციისთვის.
              </p>
            </div>
          </div>

          {/* Excerpts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt (English)
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200 resize-vertical"
                placeholder="Short summary for blog listings and previews"
                rows={3}
                maxLength={300}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.excerpt.length}/300 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt (Georgian)
              </label>
              <textarea
                value={formData.excerptKa}
                onChange={(e) => setFormData(prev => ({ ...prev, excerptKa: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200 resize-vertical"
                placeholder="მოკლე რეზიუმე ბლოგის სიებისა და გადახედვისთვის"
                rows={3}
                maxLength={300}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.excerptKa.length}/300 characters
              </p>
            </div>
          </div>

          {/* URL Slug and Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200"
                placeholder="url-friendly-post-title"
              />
              <p className="text-xs text-gray-500 mt-1">
                Auto-generated from title. Customize for SEO-friendly URLs.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category (English)
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200"
                placeholder="Logistics, Technology, Industry News"
              />
            </div>
          </div>

          {/* Georgian Category and Publishing Options */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category (Georgian)
              </label>
              <input
                type="text"
                value={formData.categoryKa}
                onChange={(e) => setFormData(prev => ({ ...prev, categoryKa: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200"
                placeholder="ლოგისტიკა, ტექნოლოგია, ინდუსტრიული ახალი ამბები"
              />
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                  className="w-4 h-4 text-[#309f69] bg-gray-100 border-gray-300 rounded focus:ring-[#309f69] focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700">Published</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="w-4 h-4 text-[#309f69] bg-gray-100 border-gray-300 rounded focus:ring-[#309f69] focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700">Featured</span>
              </label>
            </div>
          </div>

          {/* SEO Tips */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">🎯 SEO Best Practices</h3>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Keep meta descriptions between 150-160 characters</li>
              <li>• Use relevant keywords naturally in title and content</li>
              <li>• Create descriptive, keyword-rich URL slugs</li>
              <li>• Write compelling excerpts that encourage clicks</li>
              <li>• Use heading tags (H1, H2, H3) to structure content</li>
              <li>• Include keywords in your tags for better categorization</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Content Section - Simple Textareas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Content</h2>
        
        {/* Image Tags Helper */}
        {images.length > 0 && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-sm font-semibold text-blue-900 mb-3">📸 Image Integration</h3>
            <p className="text-xs text-blue-700 mb-3">
              Use these tags in your content to insert uploaded images. They will be automatically replaced with the actual images when the post is saved.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {images.map((_, index) => (
                <div key={index} className="bg-white p-3 rounded border">
                  <div className="text-xs text-blue-600 font-medium mb-2">
                    Image {index + 1} {images[index]?.isMain && '(Main)'}
                  </div>                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-blue-100 px-2 py-1 rounded text-blue-800 flex-1">
                          &lt;image{index + 1}&gt;
                        </code>
                        <span className="text-xs text-gray-500">📏 Full width</span>
                      </div>
                      <div className="bg-green-50 p-2 rounded">
                        <div className="text-xs text-green-800 font-medium mb-1">📐 Split layout:</div>
                        <code className="text-xs bg-green-100 px-1 py-0.5 rounded text-green-800 block mb-1">
                          &lt;image{index + 1}-half&gt;
                        </code>
                        <div className="text-xs text-gray-600 italic mb-1">Your text content here...</div>
                        <code className="text-xs bg-green-100 px-1 py-0.5 rounded text-green-800 block">
                          &lt;/image{index + 1}-half&gt;
                        </code>
                      </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* HTML Tags Helper */}
        <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <h3 className="text-sm font-semibold text-amber-900 mb-3">🏷️ HTML Tags Support</h3>
          <p className="text-xs text-amber-700 mb-3">
            You can use HTML tags directly in your content. They will be rendered properly in the blog post.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="bg-white p-2 rounded border">
              <div className="text-xs font-medium text-amber-800 mb-1">Headings:</div>
              <div className="space-y-1">
                <code className="text-xs bg-amber-100 px-1 py-0.5 rounded text-amber-800 block">&lt;h1&gt;Title&lt;/h1&gt;</code>
                <code className="text-xs bg-amber-100 px-1 py-0.5 rounded text-amber-800 block">&lt;h2&gt;Subtitle&lt;/h2&gt;</code>
                <code className="text-xs bg-amber-100 px-1 py-0.5 rounded text-amber-800 block">&lt;h3&gt;Section&lt;/h3&gt;</code>
                <code className="text-xs bg-amber-100 px-1 py-0.5 rounded text-amber-800 block">&lt;h4&gt;Subsection&lt;/h4&gt;</code>
              </div>
            </div>
            <div className="bg-white p-2 rounded border">
              <div className="text-xs font-medium text-amber-800 mb-1">Links & Breaks:</div>
              <div className="space-y-1">
                <code className="text-xs bg-amber-100 px-1 py-0.5 rounded text-amber-800 block">&lt;a href="url"&gt;Link&lt;/a&gt;</code>
                <code className="text-xs bg-amber-100 px-1 py-0.5 rounded text-amber-800 block">&lt;br&gt;</code>
                <code className="text-xs bg-amber-100 px-1 py-0.5 rounded text-amber-800 block">&lt;br/&gt;</code>
              </div>
            </div>
            <div className="bg-white p-2 rounded border">
              <div className="text-xs font-medium text-amber-800 mb-1">Formatting:</div>
              <div className="space-y-1">
                <code className="text-xs bg-amber-100 px-1 py-0.5 rounded text-amber-800 block">&lt;strong&gt;Bold&lt;/strong&gt;</code>
                <code className="text-xs bg-amber-100 px-1 py-0.5 rounded text-amber-800 block">&lt;em&gt;Italic&lt;/em&gt;</code>
                <code className="text-xs bg-amber-100 px-1 py-0.5 rounded text-amber-800 block">&lt;p&gt;Paragraph&lt;/p&gt;</code>
              </div>
            </div>
          </div>
        </div>
        
        {/* English Content */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Content (English) *
            </label>
            <div className="flex gap-2 flex-wrap">
              {images.length > 0 && (
                <div className="flex gap-1 flex-wrap">
                  <span className="text-xs text-gray-500 mr-2">Images:</span>
                  {images.map((_, index) => (
                    <div key={index} className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => insertImageTag(index + 1, false, 'full')}
                        className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors flex items-center gap-1"
                        title={`Insert full-width <image${index + 1}> tag`}
                      >
                        📏 img{index + 1}
                      </button>
                      <button
                        type="button"
                        onClick={() => insertImageTag(index + 1, false, 'half')}
                        className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors flex items-center gap-1"
                        title={`Insert split layout <image${index + 1}-half> block`}
                      >
                        📐 img{index + 1}
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-1 flex-wrap">
                <span className="text-xs text-gray-500 mr-2">HTML:</span>
                <button
                  type="button"
                  onClick={() => insertHtmlTag('h2', false)}
                  className="text-xs bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600 transition-colors"
                  title="Insert H2 heading"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => insertHtmlTag('h3', false)}
                  className="text-xs bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600 transition-colors"
                  title="Insert H3 heading"
                >
                  H3
                </button>
                <button
                  type="button"
                  onClick={() => insertHtmlTag('br', false)}
                  className="text-xs bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600 transition-colors"
                  title="Insert line break"
                >
                  BR
                </button>
                <button
                  type="button"
                  onClick={() => insertHtmlTag('a', false)}
                  className="text-xs bg-teal-500 text-white px-2 py-1 rounded hover:bg-teal-600 transition-colors"
                  title="Insert link"
                >
                  LINK
                </button>
              </div>
            </div>
          </div>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200 resize-vertical"
            placeholder="Write your blog post content in English... Use HTML tags like <h2>, <br>, <a href=''>, and image tags: <image1> for full width or <image1-half>content</image1-half> for split layout."
            required
          />
        </div>

        {/* Georgian Content */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Content (Georgian) *
            </label>
            <div className="flex gap-2 flex-wrap">
              {images.length > 0 && (
                <div className="flex gap-1 flex-wrap">
                  <span className="text-xs text-gray-500 mr-2">Images:</span>
                  {images.map((_, index) => (
                    <div key={index} className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => insertImageTag(index + 1, true, 'full')}
                        className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors flex items-center gap-1"
                        title={`Insert full-width <image${index + 1}> tag`}
                      >
                        📏 img{index + 1}
                      </button>
                      <button
                        type="button"
                        onClick={() => insertImageTag(index + 1, true, 'half')}
                        className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors flex items-center gap-1"
                        title={`Insert split layout <image${index + 1}-half> block`}
                      >
                        📐 img{index + 1}
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-1 flex-wrap">
                <span className="text-xs text-gray-500 mr-2">HTML:</span>
                <button
                  type="button"
                  onClick={() => insertHtmlTag('h2', true)}
                  className="text-xs bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600 transition-colors"
                  title="Insert H2 heading"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => insertHtmlTag('h3', true)}
                  className="text-xs bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600 transition-colors"
                  title="Insert H3 heading"
                >
                  H3
                </button>
                <button
                  type="button"
                  onClick={() => insertHtmlTag('br', true)}
                  className="text-xs bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600 transition-colors"
                  title="Insert line break"
                >
                  BR
                </button>
                <button
                  type="button"
                  onClick={() => insertHtmlTag('a', true)}
                  className="text-xs bg-teal-500 text-white px-2 py-1 rounded hover:bg-teal-600 transition-colors"
                  title="Insert link"
                >
                  LINK
                </button>
              </div>
            </div>
          </div>
          <textarea
            value={formData.contentKa}
            onChange={(e) => setFormData(prev => ({ ...prev, contentKa: e.target.value }))}
            className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200 resize-vertical"
            placeholder="დაწერეთ თქვენი ბლოგ პოსტის შინაარსი ქართულად... გამოიყენეთ HTML ტეგები როგორც <h2>, <br>, <a href=''>, და სურათის ტეგები: <image1> სრული სიგანისთვის ან <image1-half>კონტენტი</image1-half> გაყოფილი ლეიაუტისთვის."
            required
          />
        </div>
      </div>

      {/* Image Upload - Multiple Images */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Blog Images (Max 4)</h2>
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">📋 How to use images:</h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Upload up to 4 images for your blog post</li>
            <li>• The <span className="font-medium text-green-600">main image</span> will be used as the featured image</li>
            <li>• Use tags like <code className="bg-gray-200 px-1 rounded">&lt;image1&gt;</code> for full width</li>
            <li>• Use <code className="bg-gray-200 px-1 rounded">&lt;image1-half&gt;text&lt;/image1-half&gt;</code> for split layout</li>
            <li>• Images will be automatically formatted and styled when published</li>
            <li>• 📏 Full width: spans the entire content area</li>
            <li>• 📐 Split layout: image left, text content right with paragraph indent</li>
          </ul>
        </div>
        
        <div className="space-y-4">
          {/* Upload Input */}
          {images.length < 4 && (
            <div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#309f69] file:text-white hover:file:bg-[#267553]"
              />
              <p className="text-sm text-gray-500 mt-2">
                Upload up to {4 - images.length} more images. The main image will be used as the featured image.
              </p>
            </div>
          )}
          
          {/* Image Grid */}
          {images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <div className={`border-2 rounded-lg overflow-hidden ${
                    image.isMain ? 'border-[#309f69]' : 'border-gray-300'
                  }`}>
                    <img
                      src={image.preview}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                    
                    {/* Main Image Badge */}
                    {image.isMain && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-[#309f69] text-white text-xs px-2 py-1 rounded-full font-medium">
                          Main
                        </span>
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="flex gap-1">
                        {!image.isMain && (
                          <button
                            type="button"
                            onClick={() => setMainImage(index)}
                            className="bg-blue-500 text-white p-1 rounded-full text-xs hover:bg-blue-600 transition-colors"
                            title="Set as main image"
                          >
                            ⭐
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="bg-red-500 text-white p-1 rounded-full text-xs hover:bg-red-600 transition-colors"
                          title="Remove image"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Image Info */}
                  <div className="mt-2 text-center">
                    <p className="text-xs text-gray-600 mb-1">
                      {image.isMain ? 'Featured Image' : `Image ${index + 1}`}
                    </p>
                    <div className="space-y-1">
                      <p className="text-xs text-blue-600 font-mono flex items-center justify-center gap-1">
                        📏 &lt;image{index + 1}&gt;
                      </p>
                      <p className="text-xs text-green-600 font-mono text-center">
                        📐 &lt;image{index + 1}-half&gt;<br/>
                        <span className="text-gray-500 text-xs">text</span><br/>
                        &lt;/image{index + 1}-half&gt;
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {images.length === 0 && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="text-gray-400 text-4xl mb-2">📸</div>
              <p className="text-gray-600">No images uploaded yet</p>
              <p className="text-sm text-gray-500">Upload up to 4 images for your blog post</p>
            </div>
          )}
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <motion.button
          type="submit"
          disabled={loading || uploadingImages}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 sm:flex-none px-8 py-3 bg-gradient-to-r from-[#309f69] to-[#2ff9c3] text-white rounded-lg font-medium hover:shadow-lg transition-shadow duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading || uploadingImages ? 'Saving...' : (post ? 'Update Post' : 'Create Post')}
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
