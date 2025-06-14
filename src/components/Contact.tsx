import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export function Contact() {
  const { ref, controls } = useScrollAnimation()

  return (
    <section id="contact" className="py-20 bg-white dark:bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          animate={controls}
          initial={{ opacity: 0 }}
          className="text-center"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl font-bold text-stone-900 dark:text-white mb-4"
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-stone-600 dark:text-stone-300 mb-12 max-w-3xl mx-auto"
          >
            Ready to start your next project? Let's discuss how we can help you achieve your goals.
          </motion.p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={controls}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8"
            >
              <div className="text-left">
                <h3 className="text-2xl font-semibold text-stone-900 dark:text-white mb-6">
                  Let's Build Something Amazing Together
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#309f69]/10 dark:bg-[#309f69]/20 rounded-full flex items-center justify-center">
                      <span className="text-[#309f69]">📧</span>
                    </div>
                    <div>
                      <p className="text-stone-600 dark:text-stone-300">hello@weforward.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#309f69]/10 dark:bg-[#309f69]/20 rounded-full flex items-center justify-center">
                      <span className="text-[#309f69]">📱</span>
                    </div>
                    <div>
                      <p className="text-stone-600 dark:text-stone-300">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#309f69]/10 dark:bg-[#309f69]/20 rounded-full flex items-center justify-center">
                      <span className="text-[#309f69]">📍</span>
                    </div>
                    <div>
                      <p className="text-stone-600 dark:text-stone-300">San Francisco, CA</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={controls}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-stone-50 dark:bg-stone-800 p-8 rounded-lg border border-stone-200 dark:border-stone-700"
            >
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent transition-all duration-200 bg-white dark:bg-stone-900 text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent transition-all duration-200 bg-white dark:bg-stone-900 text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400"
                  />
                </div>
                <div>
                  <textarea
                    rows={4}
                    placeholder="Your Message"
                    className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent transition-all duration-200 resize-none bg-white dark:bg-stone-900 text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400"
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#309f69] to-[#2ff9c3] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
