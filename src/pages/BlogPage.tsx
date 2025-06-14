import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Header } from '../components/Header'
import { SEO } from '../lib/seo'

export function BlogPage() {
  useEffect(() => {
    // Always scroll to top when BlogPage loads
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <>
      {/* SEO for Blog Page */}
      <SEO 
        title="Blog - WeForward"
        description="Our blog is coming soon! Stay tuned for articles about web development, technology trends, and industry insights."
        keywords="blog, web development, technology, React, TypeScript, coming soon"
        canonicalUrl="https://weforward.dev/blog"
      />
      
      {/* Header Navigation */}
      <Header />
      
      <div className="min-h-screen bg-slate-900 dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Construction Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-8xl mb-8"
            >
              🚧
            </motion.div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Blog Under 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Construction
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-300 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
              We're working hard to bring you amazing content about logistic news
            </p>

          

          

          
          </motion.div>
        </div>
      </div>
    </>
  )
}
