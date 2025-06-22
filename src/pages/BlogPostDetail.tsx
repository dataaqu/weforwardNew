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
      
      <main className={`min-h-screen py-20 ${
        theme === 'dark' ? 'bg-stone-950' : 'bg-neutral-50'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`rounded-xl overflow-hidden shadow-lg ${
              theme === 'dark' ? 'bg-stone-900' : 'bg-white'
            }`}
          >
            {/* Featured Image */}
            {post.featuredImage && (
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={post.featuredImage}
                  alt={title}
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6 sm:p-8">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className={`text-sm ${theme === 'dark' ? 'text-stone-400' : 'text-gray-500'}`}>
                  {post.publishedAt?.toLocaleDateString(
                    language === 'en' ? 'en-US' : 'ka-GE'
                  )}
                </span>
              </div>

              {/* Title */}
              <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                {title}
              </h1>

              {/* Author */}
              <p className={`text-lg mb-8 ${
                theme === 'dark' ? 'text-stone-300' : 'text-gray-600'
              }`}>
                {language === 'en' ? 'By WEFORWARD' : 'ავტორი: WEFORWARD'}
              </p>

              {/* Content */}
              <div 
                className={`prose max-w-none ${
                  theme === 'dark' ? 'prose-invert' : ''
                } prose-lg prose-[#309f69]`}
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* Tags */}
              {(language === 'en' ? post.tags : post.tagsKa).length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className={`text-lg font-semibold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}>
                    {language === 'en' ? 'Tags' : 'ტეგები'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(language === 'en' ? post.tags : post.tagsKa).map((tag, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 text-sm rounded-full ${
                          theme === 'dark' 
                            ? 'bg-stone-700 text-stone-300' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Back to Blog */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <motion.a
                  href="/blog"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#309f69] to-[#2ff9c3] text-white font-medium rounded-lg hover:shadow-lg transition-shadow duration-200"
                >
                  ← {language === 'en' ? 'Back to Blog' : 'ბლოგზე დაბრუნება'}
                </motion.a>
              </div>
            </div>
          </motion.article>
        </div>
      </main>
    </>
  );
}
