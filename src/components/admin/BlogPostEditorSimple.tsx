import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { BlogPost, CreateBlogPostData } from '../../types/blog';
import { blogService } from '../../services/blogService';
import { SEOAuditService, type SEOAuditResult } from '../../services/seoAuditService';
import { SEOAuditPanel } from './SEOAuditPanel';

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

  const [selectedH1En, setSelectedH1En] = useState<string>('');
  const [selectedH1Ka, setSelectedH1Ka] = useState<string>('');

  const [seoTags, setSeoTags] = useState<string>('');
  const [seoTagsKa, setSeoTagsKa] = useState<string>('');
  const [seoAuditResult, setSeoAuditResult] = useState<SEOAuditResult | null>(null);
  const [showSeoAudit, setShowSeoAudit] = useState(false);

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

  const runSEOAudit = () => {
    const auditData = {
      title: formData.title,
      titleKa: formData.titleKa,
      content: formData.content,
      contentKa: formData.contentKa,
      excerpt: formData.excerpt,
      excerptKa: formData.excerptKa,
      metaDescription: formData.metaDescription,
      metaDescriptionKa: formData.metaDescriptionKa,
      seoTags,
      seoTagsKa,
      featuredImageUrl: formData.featuredImage || (images.find(img => img.isMain)?.url || ''),
      images: images.filter(img => img.file).map(img => img.file!).filter(Boolean),
      selectedH1En,
      selectedH1Ka
    };

    const result = SEOAuditService.auditBlogPost(auditData);
    setSeoAuditResult(result);
    setShowSeoAudit(true);
    return result;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Run SEO audit first
    const auditResult = runSEOAudit();
    
    // If the SEO score is poor and it's being published, show audit panel and block
    if (formData.published && auditResult.score < 50) {
      return; // SEO audit panel will be shown, user must fix issues
    }
    
    // If score is between 50-75, show audit but allow publishing
    if (formData.published && auditResult.score < 75) {
      // Audit panel will show with option to proceed
      return;
    }
    
    // Good score (75+) or draft - proceed directly
    await processSave();
  };

  const processSave = async () => {
    setShowSeoAudit(false);
    
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
          const h1Text = isGeorgian ? selectedH1Ka : selectedH1En;
          tag = `<h1 style="font-size: 2.5rem; font-weight: bold; color: #1f2937; margin: 1.5rem 0; line-height: 1.2;">${h1Text || 'Main Heading'}</h1>`;
          cursorOffset = tag.indexOf('>') + 1;
          break;
        case 'h2':
          tag = '<h2 style="font-size: 2rem; font-weight: bold; color: #374151; margin: 1.25rem 0; line-height: 1.3;">Section Heading</h2>';
          cursorOffset = tag.indexOf('>') + 1;
          break;
        case 'h3':
          tag = '<h3 style="font-size: 1.5rem; font-weight: semibold; color: #4b5563; margin: 1rem 0; line-height: 1.4;">Subsection Heading</h3>';
          cursorOffset = tag.indexOf('>') + 1;
          break;
        case 'h4':
          tag = '<h4 style="font-size: 1.25rem; font-weight: medium; color: #6b7280; margin: 0.75rem 0; line-height: 1.5;">Subsection Heading</h4>';
          cursorOffset = tag.indexOf('>') + 1;
          break;
        case 'a':
          tag = '<a href="https://example.com" style="color: #309f69; text-decoration: underline;">Link Text</a>';
          cursorOffset = '<a href="'.length;
          break;
        case 'strong':
          tag = '<strong style="font-weight: bold;">Bold Text</strong>';
          cursorOffset = tag.indexOf('>') + 1;
          break;
        case 'em':
          tag = '<em style="font-style: italic;">Italic Text</em>';
          cursorOffset = tag.indexOf('>') + 1;
          break;
        case 'p':
          tag = '<p style="margin: 1rem 0; line-height: 1.6;">Paragraph text</p>';
          cursorOffset = tag.indexOf('>') + 1;
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
        } else if (['h1', 'h2', 'h3', 'h4', 'p', 'strong', 'em'].includes(tagName)) {
          // Select the content inside the tag for easy replacement
          const textStart = start + cursorOffset;
          const textEnd = start + tag.lastIndexOf('<');
          textarea.setSelectionRange(textStart, textEnd);
        } else {
          // For links and other tags
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">SEO Settings</h2>
          {seoAuditResult && (
            <div className="flex items-center gap-3">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                seoAuditResult.score >= 90 ? 'bg-green-100 text-green-800' :
                seoAuditResult.score >= 75 ? 'bg-blue-100 text-blue-800' :
                seoAuditResult.score >= 50 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                SEO Score: {seoAuditResult.score}/100
              </div>
              <span className={`text-sm ${
                seoAuditResult.score >= 90 ? 'text-green-600' :
                seoAuditResult.score >= 75 ? 'text-blue-600' :
                seoAuditResult.score >= 50 ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {seoAuditResult.status === 'excellent' ? '🏆 Excellent' :
                 seoAuditResult.status === 'good' ? '✅ Good' :
                 seoAuditResult.status === 'needs-improvement' ? '⚠️ Needs Work' :
                 '❌ Poor'}
              </span>
            </div>
          )}
        </div>
        
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

          {/* SEO Keywords/Tags - Limited to 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SEO Keywords/Tags (English) - Max 4
              </label>
              <input
                type="text"
                value={seoTags}
                onChange={(e) => {
                  const keywords = e.target.value.split(',').map(k => k.trim()).filter(k => k.length > 0);
                  if (keywords.length <= 4) {
                    setSeoTags(e.target.value);
                  }
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200"
                placeholder="keyword1, keyword2, keyword3, keyword4"
              />
              <p className="text-xs text-gray-500 mt-1">
                {seoTags.split(',').filter(k => k.trim().length > 0).length}/4 keywords. Separate with commas.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SEO Keywords/Tags (Georgian) - Max 4
              </label>
              <input
                type="text"
                value={seoTagsKa}
                onChange={(e) => {
                  const keywords = e.target.value.split(',').map(k => k.trim()).filter(k => k.length > 0);
                  if (keywords.length <= 4) {
                    setSeoTagsKa(e.target.value);
                  }
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200"
                placeholder="საკვანძო1, საკვანძო2, საკვანძო3, საკვანძო4"
              />
              <p className="text-xs text-gray-500 mt-1">
                {seoTagsKa.split(',').filter(k => k.trim().length > 0).length}/4 keywords. გამოყავით მძიმით.
              </p>
            </div>
          </div>

          {/* H1 Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                H1 Heading (English)
              </label>
              <input
                type="text"
                value={selectedH1En}
                onChange={(e) => setSelectedH1En(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200"
                placeholder="Main heading for the blog post"
              />
              <p className="text-xs text-gray-500 mt-1">
                This will be the main H1 heading in your content. Important for SEO.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                H1 Heading (Georgian)
              </label>
              <input
                type="text"
                value={selectedH1Ka}
                onChange={(e) => setSelectedH1Ka(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#309f69] focus:border-[#309f69] transition-colors duration-200"
                placeholder="ბლოგ პოსტის მთავარი სათაური"
              />
              <p className="text-xs text-gray-500 mt-1">
                ეს იქნება თქვენი კონტენტის მთავარი H1 სათაური. მნიშვნელოვანია SEO-სთვის.
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

          {/* SEO Tips and Live Status */}
          <div className="grid lg:grid-cols-2 gap-4">
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

            {/* Live SEO Status */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">📊 Quick SEO Status</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Title Length (EN):</span>
                  <span className={formData.title.length >= 30 && formData.title.length <= 60 ? 'text-green-600' : 'text-red-600'}>
                    {formData.title.length}/60
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Title Length (KA):</span>
                  <span className={formData.titleKa.length >= 20 && formData.titleKa.length <= 50 ? 'text-green-600' : 'text-red-600'}>
                    {formData.titleKa.length}/50
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Meta Desc (EN):</span>
                  <span className={formData.metaDescription.length >= 120 && formData.metaDescription.length <= 160 ? 'text-green-600' : 'text-red-600'}>
                    {formData.metaDescription.length}/160
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Meta Desc (KA):</span>
                  <span className={formData.metaDescriptionKa.length >= 100 && formData.metaDescriptionKa.length <= 140 ? 'text-green-600' : 'text-red-600'}>
                    {formData.metaDescriptionKa.length}/140
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Content Words (EN):</span>
                  <span className={formData.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(w => w.length > 0).length >= 300 ? 'text-green-600' : 'text-yellow-600'}>
                    {formData.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(w => w.length > 0).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Keywords:</span>
                  <span className={seoTags.split(',').filter(t => t.trim().length > 0).length >= 3 ? 'text-green-600' : 'text-yellow-600'}>
                    {seoTags.split(',').filter(t => t.trim().length > 0).length}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-300">
                  <button
                    type="button"
                    onClick={() => runSEOAudit()}
                    className="w-full text-xs bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 transition-colors"
                  >
                    🔍 Run Full SEO Audit
                  </button>
                </div>
              </div>
            </div>
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
          <h3 className="text-sm font-semibold text-amber-900 mb-3">🏷️ HTML Tags Support with Enhanced Styling</h3>
          <p className="text-xs text-amber-700 mb-3">
            HTML tags are automatically styled with improved typography and spacing. H1-H4 headings are large and visually distinct.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="bg-white p-2 rounded border">
              <div className="text-xs font-medium text-amber-800 mb-1">Headings (Auto-styled):</div>
              <div className="space-y-1">
                <code className="text-xs bg-red-100 px-1 py-0.5 rounded text-red-800 block font-bold">&lt;h1&gt;Main Title (2.5rem)&lt;/h1&gt;</code>
                <code className="text-xs bg-purple-100 px-1 py-0.5 rounded text-purple-800 block">&lt;h2&gt;Section (2rem)&lt;/h2&gt;</code>
                <code className="text-xs bg-purple-100 px-1 py-0.5 rounded text-purple-800 block">&lt;h3&gt;Subsection (1.5rem)&lt;/h3&gt;</code>
                <code className="text-xs bg-purple-100 px-1 py-0.5 rounded text-purple-800 block">&lt;h4&gt;Small heading (1.25rem)&lt;/h4&gt;</code>
              </div>
            </div>
            <div className="bg-white p-2 rounded border">
              <div className="text-xs font-medium text-amber-800 mb-1">Links & Breaks:</div>
              <div className="space-y-1">
                <code className="text-xs bg-teal-100 px-1 py-0.5 rounded text-teal-800 block">&lt;a href="url"&gt;Link&lt;/a&gt;</code>
                <code className="text-xs bg-orange-100 px-1 py-0.5 rounded text-orange-800 block">&lt;br&gt;</code>
                <code className="text-xs bg-orange-100 px-1 py-0.5 rounded text-orange-800 block">&lt;br/&gt;</code>
              </div>
            </div>
            <div className="bg-white p-2 rounded border">
              <div className="text-xs font-medium text-amber-800 mb-1">Text Formatting:</div>
              <div className="space-y-1">
                <code className="text-xs bg-gray-100 px-1 py-0.5 rounded text-gray-800 block">&lt;strong&gt;Bold&lt;/strong&gt;</code>
                <code className="text-xs bg-gray-100 px-1 py-0.5 rounded text-gray-800 block">&lt;em&gt;Italic&lt;/em&gt;</code>
                <code className="text-xs bg-gray-100 px-1 py-0.5 rounded text-gray-800 block">&lt;p&gt;Paragraph&lt;/p&gt;</code>
              </div>
            </div>
          </div>
          <div className="mt-3 p-2 bg-blue-50 rounded">
            <p className="text-xs text-blue-700">
              <strong>💡 Tip:</strong> H1 buttons use your selected H1 text from SEO section. Headings are automatically styled with larger fonts, proper spacing, and visual hierarchy.
            </p>
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
                  onClick={() => insertHtmlTag('h1', false)}
                  className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors font-bold"
                  title="Insert H1 main heading"
                >
                  H1
                </button>
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
                  onClick={() => insertHtmlTag('h4', false)}
                  className="text-xs bg-purple-400 text-white px-2 py-1 rounded hover:bg-purple-500 transition-colors"
                  title="Insert H4 heading"
                >
                  H4
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
                <button
                  type="button"
                  onClick={() => insertHtmlTag('strong', false)}
                  className="text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-800 transition-colors"
                  title="Insert bold text"
                >
                  BOLD
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
                  onClick={() => insertHtmlTag('h1', true)}
                  className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors font-bold"
                  title="Insert H1 main heading"
                >
                  H1
                </button>
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
                  onClick={() => insertHtmlTag('h4', true)}
                  className="text-xs bg-purple-400 text-white px-2 py-1 rounded hover:bg-purple-500 transition-colors"
                  title="Insert H4 heading"
                >
                  H4
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
                <button
                  type="button"
                  onClick={() => insertHtmlTag('strong', true)}
                  className="text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-800 transition-colors"
                  title="Insert bold text"
                >
                  BOLD
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

      {/* Featured Image Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Image</h2>
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-700 mb-2">🖼️ Featured Image:</h3>
          <ul className="text-xs text-blue-600 space-y-1">
            <li>• The featured image appears in blog listings and social media previews</li>
            <li>• Important for SEO and social sharing</li>
            <li>• Will be automatically set from the main image, or upload separately</li>
            <li>• Recommended size: 1200x630 pixels for best social media display</li>
          </ul>
        </div>
        
        {/* Featured Image Preview */}
        {(formData.featuredImage || images.find(img => img.isMain)) && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Featured Image:</label>
            <div className="relative inline-block">
              <img
                src={formData.featuredImage || images.find(img => img.isMain)?.preview || ''}
                alt="Featured image preview"
                className="w-64 h-32 object-cover rounded-lg border-2 border-[#309f69]"
              />
              <div className="absolute top-2 left-2">
                <span className="bg-[#309f69] text-white text-xs px-2 py-1 rounded-full font-medium">
                  Featured
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Manual Featured Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Separate Featured Image (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                try {
                  const url = await blogService.uploadImage(file, `featured-images/${Date.now()}-${file.name}`);
                  setFormData(prev => ({ ...prev, featuredImage: url }));
                } catch (error) {
                  console.error('Failed to upload featured image:', error);
                  alert('Failed to upload featured image. Please try again.');
                }
              }
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          />
          <p className="text-sm text-gray-500 mt-2">
            Upload a separate featured image, or the main image from content images will be used automatically.
          </p>
        </div>
      </div>

      {/* Blog Content Images (Max 4) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Content Images (Max 4)</h2>
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
        {/* SEO Audit Button */}
        <motion.button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            runSEOAudit();
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow duration-200 flex items-center justify-center gap-2"
        >
          🔍 SEO Audit
        </motion.button>

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

      {/* SEO Audit Panel */}
      <SEOAuditPanel 
        auditResult={seoAuditResult}
        isVisible={showSeoAudit}
        onClose={() => setShowSeoAudit(false)}
        onProceedToPublish={() => {
          setShowSeoAudit(false);
          processSave();
        }}
      />
    </form>
  );

};
