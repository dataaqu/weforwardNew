import { motion } from 'framer-motion';
import { useState } from 'react';
import type { CreateBlogPostData } from '../../types/blog';

interface BlogPreviewProps {
  isVisible: boolean;
  onClose: () => void;
  blogData: CreateBlogPostData;
  seoTags: string;
  seoTagsKa: string;
  selectedH1En: string;
  selectedH1Ka: string;
  featuredImageUrl: string;
  isGeorgian?: boolean;
}

export function BlogPreview({ 
  isVisible, 
  onClose, 
  blogData, 
  seoTags, 
  seoTagsKa, 
  selectedH1En, 
  selectedH1Ka, 
  featuredImageUrl,
  isGeorgian: initialIsGeorgian = false 
}: BlogPreviewProps) {
  const [isGeorgian, setIsGeorgian] = useState(initialIsGeorgian);
  if (!isVisible) return null;

  const currentData = {
    title: isGeorgian ? blogData.titleKa : blogData.title,
    content: isGeorgian ? blogData.contentKa : blogData.content,
    excerpt: isGeorgian ? blogData.excerptKa : blogData.excerpt,
    category: isGeorgian ? blogData.categoryKa : blogData.category,
    h1: isGeorgian ? selectedH1Ka : selectedH1En,
    tags: isGeorgian ? seoTagsKa : seoTags
  };

  // Process content to replace image tags with placeholders
  const processContent = (content: string) => {
    let processed = content;
    
    // Replace image tags with placeholder
    for (let i = 1; i <= 4; i++) {
      const fullImageTag = `<image${i}>`;
      const halfImageTagOpen = `<image${i}-half>`;
      const halfImageTagClose = `</image${i}-half>`;
      
      const fullImageHtml = `<div class="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center my-4 border-2 border-dashed border-gray-400">
        <span class="text-gray-500">📷 Image ${i} (Full Width)</span>
      </div>`;
      
      const halfImageOpenHtml = `<div class="flex gap-6 my-6 items-start">
        <div class="w-1/2 flex-shrink-0">
          <div class="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-400">
            <span class="text-gray-500 text-sm">📷 Image ${i}</span>
          </div>
        </div>
        <div class="w-1/2 flex-grow">
          <div class="text-base leading-relaxed pl-4">`;
      
      const halfImageCloseHtml = `</div></div></div>`;
      
      processed = processed.replace(new RegExp(fullImageTag, 'g'), fullImageHtml);
      processed = processed.replace(new RegExp(halfImageTagOpen, 'g'), halfImageOpenHtml);
      processed = processed.replace(new RegExp(halfImageTagClose, 'g'), halfImageCloseHtml);
    }
    
    return processed;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-900">📖 Blog Preview</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setIsGeorgian(false)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  !isGeorgian ? 'bg-[#309f69] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setIsGeorgian(true)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  isGeorgian ? 'bg-[#309f69] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                ქართული
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Blog Content Preview */}
        <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
          <article className="max-w-3xl mx-auto p-6">
            {/* Featured Image */}
            {featuredImageUrl && (
              <div className="mb-8">
                <img
                  src={featuredImageUrl}
                  alt="Featured image"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}
            
            {!featuredImageUrl && (
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-8 border-2 border-dashed border-gray-400">
                <div className="text-center text-gray-500">
                  <span className="text-4xl block mb-2">📷</span>
                  <span>Featured Image</span>
                </div>
              </div>
            )}

            {/* Category */}
            {currentData.category && (
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-[#309f69] text-white text-sm font-medium rounded-full">
                  {currentData.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {currentData.title || (isGeorgian ? 'ბლოგის სათაური' : 'Blog Title')}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
              <span>📅 {new Date().toLocaleDateString(isGeorgian ? 'ka-GE' : 'en-US')}</span>
              <span>👤 {blogData.author}</span>
              <span>🕒 {blogData.readTime || 5} {isGeorgian ? 'წუთი' : 'min read'}</span>
            </div>

            {/* Excerpt */}
            {currentData.excerpt && (
              <div className="mb-8 p-4 bg-gray-50 rounded-lg border-l-4 border-[#309f69]">
                <p className="text-lg text-gray-700 italic">
                  {currentData.excerpt}
                </p>
              </div>
            )}

            {/* H1 from SEO section */}
            {currentData.h1 && (
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: '1.5rem 0',
                lineHeight: '1.2'
              }}>
                {currentData.h1}
              </h1>
            )}

            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                dangerouslySetInnerHTML={{
                  __html: processContent(currentData.content || (isGeorgian ? 'ბლოგის შინაარსი აქ გამოჩნდება...' : 'Blog content will appear here...'))
                }}
                style={{
                  lineHeight: '1.7',
                  fontSize: '1.1rem'
                }}
              />
            </div>

            {/* Tags */}
            {currentData.tags && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  {isGeorgian ? '🏷️ ტეგები:' : '🏷️ Tags:'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentData.tags.split(',').map((tag, index) => (
                    tag.trim() && (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {tag.trim()}
                      </span>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Footer Info */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">WEFORWARD</h4>
                  <p className="text-sm text-gray-600">
                    {isGeorgian ? 'ლოგისტიკური მომსახურების კომპანია' : 'Logistics Services Company'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {isGeorgian ? 'გამოქვეყნებულია:' : 'Published:'} {new Date().toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-400">
                    {isGeorgian ? 'კატეგორია:' : 'Category:'} {currentData.category || (isGeorgian ? 'ზოგადი' : 'General')}
                  </p>
                </div>
              </div>
            </div>

            {/* Preview Notice */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>📝 {isGeorgian ? 'შენიშვნა:' : 'Note:'}</strong> {' '}
                {isGeorgian 
                  ? 'ეს არის ბლოგის გადახედვა. სურათები და საბოლოო ფორმატირება შეიძლება განსხვავდებოდეს საბოლოო ვერსიისგან.'
                  : 'This is a blog preview. Images and final formatting may differ from the published version.'
                }
              </p>
            </div>
          </article>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {isGeorgian ? 'ბლოგის გადახედვა' : 'Blog Preview'} • {' '}
            {currentData.content?.length || 0} {isGeorgian ? 'სიმბოლო' : 'characters'}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#309f69] text-white rounded-lg hover:bg-[#2a8660] transition-colors"
          >
            {isGeorgian ? 'დახურვა' : 'Close Preview'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
