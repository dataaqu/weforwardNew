import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion'
import { SEO, StructuredData, generateStructuredData } from '../lib/seo'
import { useTheme } from '../components/theme-provider'
import { useTranslation } from '../components/translation-provider'
import { blogService } from '../services/blogService';
import type { BlogPost } from '../types/blog';

export function BlogPage() {
  const { theme } = useTheme()
  const { language, t } = useTranslation()
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // Calculate pagination
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  useEffect(() => {
    // Always scroll to top when BlogPage loads
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Fetch published blog posts
    const fetchPosts = async () => {
      try {
        const publishedPosts = await blogService.getPublishedBlogPosts();
        setPosts(publishedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [])

  // Create structured data for blog listing
  const blogStructuredData = posts.length > 0 ? generateStructuredData.blog(
    posts.slice(0, 10).map(post => ({
      title: language === 'en' ? post.title : post.titleKa,
      url: `https://weforward.ge/blog/${post.slug}`,
      publishDate: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
      author: (language === 'en' ? post.author : post.authorKa) || 'WeForward Team',
      image: post.featuredImage?.startsWith('http') 
        ? post.featuredImage 
        : 'https://weforward.ge/shareimg.png',
      description: (language === 'en' ? post.metaDescription : post.metaDescriptionKa) || 
                  (language === 'en' ? post.excerpt : post.excerptKa)
    }))
  ) : null;

  // Create dynamic meta description based on posts
  const metaDescription = posts.length > 0 
    ? `Latest blog posts from WeForward - insights on logistics, technology, and industry trends. Read articles about ${posts.slice(0, 3).map(p => language === 'en' ? p.title : p.titleKa).join(', ')}.`
    : "Our blog is coming soon! Stay tuned for articles about logistics, technology trends, and industry insights.";

  // Create Open Graph image - always use shareimg.png for consistent branding
  const ogImage = 'https://weforward.ge/shareimg.png';

  return (
    <>
      {/* React Helmet for Blog Page */}
      <Helmet>
        <title>{language === 'en' ? 'Blog' : 'ბლოგი'} | WeForward</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content="blog, logistics, freight, shipping, technology, WeForward, cargo transport, supply chain, industry insights" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={`${language === 'en' ? 'Blog' : 'ბლოგი'} - WeForward`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://weforward.ge/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="WeForward" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${language === 'en' ? 'Blog' : 'ბლოგი'} - WeForward`} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:site" content="@WeForward" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://weforward.ge/blog" />
      </Helmet>

      {/* Enhanced SEO for Blog Page */}
      <SEO 
        title={`${language === 'en' ? 'Blog' : 'ბლოგი'} - WeForward`}
        description={metaDescription}
        keywords="blog, logistics, freight, shipping, technology, WeForward, cargo transport, supply chain, industry insights"
        ogImage={ogImage}
        canonicalUrl="https://weforward.ge/blog"
        ogType="website"
      />
      
      {/* Structured Data for Blog Listing */}
      {blogStructuredData && <StructuredData data={blogStructuredData} />}
      
      <main className="relative">
        <section id="blog" className={`relative min-h-screen py-20 ${
          theme === 'dark' ? 'bg-stone-950' : 'bg-neutral-50'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                {language === 'en' ? 'OUR' : 'ჩვენი'}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3]">
                  {language === 'en' ? 'BLOG' : 'ბლოგი'}
                </span>
              </h1>
              <p className={`text-lg max-w-2xl mx-auto ${
                theme === 'dark' ? 'text-stone-300' : 'text-gray-700'
              }`}>
                {language === 'en' 
                  ? 'Stay updated with the latest insights from the logistics world'
                  : 'იყავით ინფორმირებულნი ლოგისტიკის სამყაროს უახლეს ინფორმაციაზე'
                }
              </p>
            </motion.div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#309f69] mx-auto mb-4"></div>
                <p className={`text-lg ${theme === 'dark' ? 'text-stone-300' : 'text-gray-600'}`}>
                  Loading blog posts...
                </p>
              </div>
            )}

            {/* Blog Posts Grid */}
            {!loading && posts.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentPosts.map((post, index) => (
                  <Link to={`/blog/${post.slug}`} key={post.id}>
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer h-80"
                    >
                      {/* Full Background Image */}
                      <div className="absolute inset-0">
                        <img
                          src={post.featuredImage || '/api/placeholder/400/320'}
                          alt={language === 'en' ? post.title : post.titleKa}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Dark gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        {/* Title */}
                        <h2 className="text-2xl md:text-3xl font-bold mb-2 line-clamp-2 drop-shadow-lg">
                          {language === 'en' ? post.title : post.titleKa}
                        </h2>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-sm opacity-90">
                          <span className="drop-shadow">
                            {language === 'en' ? 'By WEFORWARD' : 'ავტორი: WEFORWARD'}
                          </span>
                          <span className="drop-shadow">
                            {post.publishedAt?.toLocaleDateString(
                              language === 'en' ? 'en-US' : 'ka-GE'
                            )}
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex justify-center items-center mt-12 space-x-2"
                >
                  {/* Previous Button */}
                  <button
                    onClick={() => {
                      setCurrentPage(prev => Math.max(prev - 1, 1));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : theme === 'dark'
                        ? 'bg-stone-800 text-white hover:bg-stone-700'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                    }`}
                  >
                    {language === 'en' ? 'Previous' : 'წინა'}
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                        currentPage === pageNum
                          ? 'bg-gradient-to-r from-[#309f69] to-[#2ff9c3] text-white'
                          : theme === 'dark'
                          ? 'bg-stone-800 text-white hover:bg-stone-700'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  {/* Next Button */}
                  <button
                    onClick={() => {
                      setCurrentPage(prev => Math.min(prev + 1, totalPages));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : theme === 'dark'
                        ? 'bg-stone-800 text-white hover:bg-stone-700'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                    }`}
                  >
                    {language === 'en' ? 'Next' : 'შემდეგი'}
                  </button>
                </motion.div>
              )}
              </>
            )}

            {/* No Posts State */}
            {!loading && posts.length === 0 && (
              <div className="text-center py-20">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-8xl mb-8"
                >
                  📝
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`text-3xl font-bold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}
                >
                  {t.blog.title}
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className={`text-lg max-w-2xl mx-auto ${
                    theme === 'dark' ? 'text-stone-300' : 'text-gray-600'
                  }`}
                >
                  {t.blog.subtitle}
                </motion.p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
