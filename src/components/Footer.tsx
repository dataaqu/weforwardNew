import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export function Footer() {
  const { ref, controls } = useScrollAnimation()

  return (
    <footer className="bg-stone-950 text-white py-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          animate={controls}
          initial={{ opacity: 0 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="col-span-1 md:col-span-2"
            >
              <h3 className="text-2xl font-bold mb-4">WeForward</h3>
              <p className="text-stone-300 mb-6 max-w-md">
                Building the future of web development with cutting-edge technology 
                and innovative design solutions.
              </p>
              <div className="flex space-x-4">
                {['GitHub', 'LinkedIn', 'Twitter'].map((social, index) => (
                  <motion.a
                    key={social}
                    href="#"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={controls}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-[#309f69] transition-colors duration-200"
                  >
                    <span className="text-sm">{social[0]}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-stone-300">
                {['Web Development', 'UI/UX Design', 'Consulting', 'SEO Optimization'].map((service, index) => (
                  <motion.li 
                    key={service}
                    initial={{ opacity: 0, x: -20 }}
                    animate={controls}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <a href="#" className="hover:text-white transition-colors duration-200">
                      {service}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-stone-300">
                {['About Us', 'Blog', 'Careers', 'Contact'].map((item, index) => (
                  <motion.li 
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={controls}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  >
                    <a href="#" className="hover:text-white transition-colors duration-200">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="border-t border-stone-700 mt-12 pt-8 text-center text-stone-400"
          >
            <p>&copy; 2025 WeForward. All rights reserved.</p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
