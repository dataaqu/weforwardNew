import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { SEO } from '../lib/seo'
import { useTheme } from '../components/theme-provider'

export function BlogPage() {
  const { theme } = useTheme()

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
      
      <main className="relative">
        <section id="blog" className={`relative min-h-screen overflow-hidden pt-12 ${
          theme === 'dark' ? 'bg-stone-950' : 'bg-neutral-50'
        }`}>
          <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 h-full">
            <div className="flex items-center justify-center h-full min-h-[80vh]">
              <div className="max-w-4xl mx-auto text-center">
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
                  <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}
                  >
                    Blog Under{" "}
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3]">
                      Construction
                    </span>
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 0.6,
                      ease: "easeOut"
                    }}
                    className={`text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto ${
                      theme === 'dark' ? 'text-stone-300' : 'text-gray-700'
                    }`}
                  >
                    We're working hard to bring you amazing content about{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3] font-bold">
                      logistics news
                    </span>{" "}
                    and industry insights. Stay tuned for updates!
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
