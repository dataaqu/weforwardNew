import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'

const navigation = [
  { name: 'Home', href: 'home', isExternal: false },
  { name: 'Services', href: 'services', isExternal: false },
  { name: 'Contact', href: 'contact', isExternal: false },
  { name: 'Blog', href: '/blog', isExternal: true },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Dynamic header styles based on scroll
  const headerOpacity = scrollY > 100 ? 0.85 : 0.95
  const blurAmount = scrollY > 100 ? 'backdrop-blur-lg' : 'backdrop-blur-md'
  const borderOpacity = scrollY > 100 ? 'border-stone-700/30' : 'border-stone-700/50'

  const smoothScrollToSection = (targetId: string) => {
    // Remove hash if present and ensure we have the correct selector
    const cleanId = targetId.startsWith('#') ? targetId.slice(1) : targetId
    const element = document.getElementById(cleanId)
    if (element) {
      // Calculate offset to account for fixed header
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      // Enhanced smooth scroll with custom easing
      const startPosition = window.pageYOffset
      const distance = offsetPosition - startPosition
      const duration = Math.min(Math.max(Math.abs(distance) / 3, 500), 1500)
      let start: number | null = null

      function animation(currentTime: number) {
        if (start === null) start = currentTime
        const timeElapsed = currentTime - start
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration)
        window.scrollTo(0, run)
        if (timeElapsed < duration) requestAnimationFrame(animation)
      }

      // Easing function for smoother animation
      function easeInOutCubic(t: number, b: number, c: number, d: number) {
        t /= d / 2
        if (t < 1) return (c / 2) * t * t * t + b
        t -= 2
        return (c / 2) * (t * t * t + 2) + b
      }

      requestAnimationFrame(animation)
    }
  }

  const handleNavigation = (item: typeof navigation[0]) => {
    if (item.isExternal) {
      // Navigate to external page using React Router
      navigate(item.href)
    } else {
      // If we're not on the home page, navigate to home first
      if (location.pathname !== '/') {
        navigate('/')
      } else {
        // For internal sections on home page, use enhanced scroll
        smoothScrollToSection(item.href)
      }
    }
    setIsMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.25, 0.25, 0.25, 1],
        delay: 0.2 
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-xl border-b ${blurAmount} ${borderOpacity}`}
      style={{ 
        backgroundColor: `rgba(0, 0, 0, ${headerOpacity})` // black with dynamic opacity
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => {
              if (location.pathname !== '/') {
                navigate('/')
              } else {
                smoothScrollToSection('home')
              }
            }}
          >
            {/* Logo Image - Slides from left */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                delay: 0.3 
              }}
              className="w-8 h-8 flex items-center justify-center"
            >
              <img 
                src={logo} 
                alt="WeForward Logo" 
                className="w-8 h-8 object-contain"
              />
            </motion.div>
            
            {/* Text - Slides from right */}
            <motion.span 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                delay: 0.5 
              }}
              className="text-lg font-bold text-white"
            >
              WEFORWARD
            </motion.span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavigation(item)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-gray-300 text-lg hover:text-white font-medium transition-all duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#309f69] to-[#2ff9c3] transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-gray-300 focus:outline-none transition-colors duration-200 p-6 px-10 z-50"
            aria-label="Toggle menu"
            type="button"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-stone-700/50 bg-stone-950/98 backdrop-blur-md"
          >
            <div className="py-4 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item)}
                  className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-stone-800/50 transition-all duration-200 font-medium"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}
