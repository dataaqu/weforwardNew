import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEO } from '../lib/seo';
import { useTheme } from '../components/theme-provider';
import { useTranslation } from '../components/translation-provider';
import { blogService } from '../services/blogService';
import type { BlogPost } from '../types/blog';

export function BlogPostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { theme } = useTheme();
  const { language } = useTranslation();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const blogPost = await blogService.getBlogPostBySlug(slug);
        
        if (blogPost) {
          setPost(blogPost);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <main className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-stone-950' : 'bg-neutral-50'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#309f69] mx-auto mb-4"></div>
          <p className={`text-lg ${theme === 'dark' ? 'text-stone-300' : 'text-gray-600'}`}>
            Loading blog post...
          </p>
        </div>
      </main>
    );
  }

  if (notFound || !post) {
    return <Navigate to="/blog" replace />;
  }

  const title = language === 'en' ? post.title : post.titleKa;
  const content = language === 'en' ? post.content : post.contentKa;

  return (
    <>
      <SEO 
        title={`${title} - WeForward Blog`}
        description={language === 'en' ? post.excerpt : post.excerptKa}
        keywords={`${(language === 'en' ? post.tags : post.tagsKa).join(', ')}, WeForward, blog`}
        canonicalUrl={`https://weforward.ge/blog/${post.slug}`}
      />
      
      <main className={`min-h-screen ${
        theme === 'dark' ? 'bg-stone-950' : 'bg-gray-50'
      }`}>
        {/* Full-Width Featured Image with Title Overlay */}
        {post.featuredImage && (
          <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
            <img
              src={post.featuredImage}
              alt={title}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40"></div>
            
            {/* Title overlay */}
            <div className="absolute inset-0 flex items-end">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl leading-tight"
                >
                  {title}
                </motion.h1>
              </div>
            </div>
          </div>
        )}

        {/* Article Content Container */}
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`-mt-8 relative ${
              theme === 'dark' ? 'bg-stone-900' : 'bg-white'
            } rounded-t-2xl shadow-2xl`}
          >
            <div className="p-8 md:p-12">
              {/* Title for posts without featured image */}
              {!post.featuredImage && (
                <h1 className={`text-4xl md:text-5xl font-bold mb-8 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {title}
                </h1>
              )}

              {/* Meta Information */}
              <div className={`flex items-center gap-6 pb-8 mb-8 border-b ${
                theme === 'dark' ? 'border-stone-700' : 'border-gray-200'
              }`}>
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-stone-400' : 'text-gray-600'
                }`}>
                  {post.publishedAt?.toLocaleDateString(
                    language === 'en' ? 'en-US' : 'ka-GE',
                    { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }
                  )}
                </div>
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-stone-400' : 'text-gray-600'
                }`}>
                  {language === 'en' ? 'By WEFORWARD' : 'ავტორი: WEFORWARD'}
                </div>
              </div>

              {/* Article Content */}
              <div 
                className={`prose prose-lg max-w-none ${
                  theme === 'dark' 
                    ? 'prose-invert prose-stone prose-headings:text-white prose-p:text-stone-200 prose-strong:text-white prose-em:text-stone-300' 
                    : 'prose-gray prose-headings:text-gray-900 prose-p:text-gray-800 prose-strong:text-gray-900'
                } prose-headings:font-bold prose-p:leading-relaxed prose-a:text-[#309f69] prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-[#309f69] prose-blockquote:border-l-4 prose-blockquote:pl-6 prose-blockquote:italic prose-li:text-current`}
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* Tags Section */}
              {(language === 'en' ? post.tags : post.tagsKa).length > 0 && (
                <div className={`mt-12 pt-8 border-t ${
                  theme === 'dark' ? 'border-stone-700' : 'border-gray-200'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {language === 'en' ? 'Tagged in' : 'ტეგები'}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {(language === 'en' ? post.tags : post.tagsKa).map((tag, index) => (
                      <span
                        key={index}
                        className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                          theme === 'dark' 
                            ? 'bg-stone-800 text-stone-300 hover:bg-stone-700' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.article>

          {/* Author & Date Footer */}
          <div className={`mt-8 mb-16 p-6 rounded-xl ${
            theme === 'dark' ? 'bg-stone-900/50' : 'bg-white/50'
          } backdrop-blur-sm border ${
            theme === 'dark' ? 'border-stone-800' : 'border-gray-200'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className={`font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {language === 'en' ? 'Written by WEFORWARD' : 'ავტორი: WEFORWARD'}
                </p>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-stone-400' : 'text-gray-600'
                }`}>
                  {language === 'en' ? 'Published on' : 'გამოქვეყნდა'} {post.publishedAt?.toLocaleDateString(
                    language === 'en' ? 'en-US' : 'ka-GE',
                    { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }
                  )}
                </p>
              </div>
              
              {/* Simple Back Button */}
              <motion.a
                href="/blog"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'text-stone-400 hover:text-white hover:bg-stone-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {language === 'en' ? 'Back to Blog' : 'ბლოგზე დაბრუნება'}
              </motion.a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
