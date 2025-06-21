import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Facebook, Linkedin } from 'lucide-react'
import { useTheme } from './theme-provider'
import logo from '../assets/logo.png'
import whiteText from '../assets/white-text.png'
import blackIcon from '../assets/black-icon.png'
import blackText from '../assets/black-text.png'

export function Footer() {
  const { theme } = useTheme()
  const currentYear = new Date().getFullYear()

  const navigationLinks = [
    { name: 'Home', href: '/', sectionId: 'home' },
    { name: 'Services', href: '/#services', sectionId: 'services' },
    { name: 'Contact', href: '/#contact', sectionId: 'contact' },
    { name: 'Blog', href: '/blog', sectionId: null },
  ]

  const handleNavClick = (sectionId: string | null) => {
    if (sectionId) {
      const element = document.getElementById(sectionId)
      if (element) {
        const headerOffset = 100
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <footer className={`py-10 border-t ${
      theme === 'dark' 
        ? 'bg-stone-950 text-white border-stone-800' 
        : 'bg-neutral-50 text-black border-gray-200 shadow-xl'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex justify-center md:justify-start"
          >
            <div className="flex items-center space-x-2">
              {/* Logo Icon */}
              <img 
                src={theme === 'dark' ? logo : blackIcon} 
                alt="WeForward Logo Icon" 
                className="w-12 h-12 object-contain"
              />
              {/* Logo Text */}
              <img 
                src={theme === 'dark' ? whiteText : blackText} 
                alt="WeForward" 
                className="h-16 w-auto object-contain"
              />
            </div>
          </motion.div>
          
          {/* Navigation Links */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-2 text-center"
          >
            <ul className={`flex flex-wrap justify-center space-x-8 ${
              theme === 'dark' ? 'text-stone-300' : 'text-gray-600'
            }`}>
              {navigationLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {link.sectionId ? (
                    <button
                      onClick={() => handleNavClick(link.sectionId)}
                      className="hover:text-[#309f69] transition-colors duration-200"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link 
                      to={link.href}
                      className="hover:text-[#309f69] transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Media Links */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex justify-center md:justify-end"
          >
            <div className="flex space-x-4">
              <motion.a
                href="https://www.facebook.com/weforwardllc"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#309f69] transition-colors duration-200 ${
                  theme === 'dark' ? 'bg-stone-800' : 'bg-white border border-gray-200'
                }`}
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/weforward/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                viewport={{ once: true }}
                className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#309f69] transition-colors duration-200 ${
                  theme === 'dark' ? 'bg-stone-800' : 'bg-white border border-gray-200'
                }`}
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </motion.div>
        </div>
        
        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className={`text-center mb-20 mt-2 md:mt-0 ${
            theme === 'dark' ? 'text-stone-400' : 'text-gray-600'
          }`}
        >
          <p>&copy; {currentYear} WEFORWARD LLC. All rights reserved. </p>
        </motion.div>
      </div>
    </footer>
  )
}
