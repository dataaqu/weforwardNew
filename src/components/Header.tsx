import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { Globe, ChevronDown, Plane, Truck, Ship, Train, Warehouse, FileText, Plus } from 'lucide-react'
import { useTheme } from './theme-provider'
import { useTranslation } from './translation-provider'
import ToggleSwitch from './ToggleSwitch'
import logo from '../assets/logo.png'
import whiteText from '../assets/white-text.png'
import blackIcon from '../assets/black-icon.png'
import blackText from '../assets/black-text.png'

const navigation = [
  { name: 'home', href: 'home', isExternal: false },
  { name: 'services', href: 'services', isExternal: false, hasDropdown: true },
  { name: 'contact', href: 'contact', isExternal: false },
  { name: 'blog', href: '/blog', isExternal: true },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  // Services for dropdown
  const getServicesList = () => [
    { key: 'roadFreight', title: t.services.services.roadFreight.title, icon: Truck, link: '/services/road-freight' },
    { key: 'seaFreight', title: t.services.services.seaFreight.title, icon: Ship, link: '/services/sea-freight' },
    { key: 'airFreight', title: t.services.services.airFreight.title, icon: Plane, link: '/services/air-freight' },
    { key: 'railFreight', title: t.services.services.railFreight.title, icon: Train, link: '/services/rail-freight' },
    { key: 'warehouse', title: t.services.services.warehouse.title, icon: Warehouse, link: '/services/warehouse' },
    { key: 'brokerage', title: t.services.services.brokerage.title, icon: FileText, link: '/services/brokerage' },
  ]

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle hash navigation after route changes
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      // Remove the # from the hash and scroll to the section
      const sectionId = location.hash.slice(1)
      // Add a small delay to ensure the page has loaded
      setTimeout(() => {
        smoothScrollToSection(sectionId)
      }, 100)
    }
  }, [location.pathname, location.hash])

  // Close dropdowns when clicking outside (desktop only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      // Only close on desktop if clicking outside the dropdown
      if (isServicesOpen && !target.closest('[data-services-dropdown]') && window.innerWidth >= 768) {
        setIsServicesOpen(false)
      }
    }
    
    if (isServicesOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isServicesOpen])

  // Close services dropdown when main menu is closed (but only reset, don't interfere with manual toggles)
  useEffect(() => {
    if (!isMenuOpen) {
      // Small delay to prevent interference with manual clicks
      const timer = setTimeout(() => {
        setIsServicesOpen(false)
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [isMenuOpen])

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
    if (item.name === 'services' && item.hasDropdown) {
      // For services with dropdown, just scroll to services section
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          smoothScrollToSection(item.href)
        }, 100)
      } else {
        smoothScrollToSection(item.href)
      }
    } else if (item.isExternal) {
      // Navigate to external page using React Router
      navigate(item.href)
    } else {
      // If we're not on the home page, navigate to home first, then scroll
      if (location.pathname !== '/') {
        navigate('/')
        // Use a small delay to ensure the page has loaded before scrolling
        setTimeout(() => {
          smoothScrollToSection(item.href)
        }, 100)
      } else {
        // For internal sections on home page, use enhanced scroll
        smoothScrollToSection(item.href)
      }
    }
    setIsMenuOpen(false)
    setIsServicesOpen(false)
  }

  const handleServiceClick = (serviceLink: string) => {
    // Navigate to specific service page
    navigate(serviceLink)
    setIsServicesOpen(false)
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-xl border-b ${blurAmount} ${
        theme === 'dark' ? borderOpacity : 'border-gray-200'
      }`}
      style={{ 
        backgroundColor: theme === 'dark' 
          ? `rgba(0, 0, 0, ${headerOpacity})` 
          : `rgba(250, 250, 250, ${headerOpacity})`
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
              className="w-16 h-16 flex items-center justify-center"
            >
              <img 
                src={theme === 'dark' ? logo : blackIcon} 
                alt="WeForward Logo" 
                className="w-16 h-16 object-contain"
              />
            </motion.div>
            
            {/* Text - Slides from right */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                delay: 0.5 
              }}
              className="h-10 flex items-center justify-center"
            >
              <img 
                src={theme === 'dark' ? whiteText : blackText} 
                alt="WeForward" 
                className="h-16 w-auto object-contain"
              />
            </motion.div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    data-services-dropdown
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <motion.button
                      onClick={() => handleNavigation(item)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`text-lg font-medium transition-all duration-300 relative group flex items-center space-x-1 ${
                        theme === 'dark' 
                          ? 'text-gray-300 hover:text-white' 
                          : 'text-black hover:text-gray-700'
                      }`}
                    >
                      <span>{t.nav[item.name as keyof typeof t.nav]}</span>
                      <motion.div
                        animate={{ rotate: isServicesOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={16} />
                      </motion.div>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#309f69] to-[#2ff9c3] transition-all duration-300 group-hover:w-full"></span>
                    </motion.button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className={`absolute top-full left-0 mt-2 w-64 rounded-lg shadow-2xl border backdrop-blur-md z-50 ${
                            theme === 'dark' 
                              ? 'bg-stone-950/95 border-stone-700/50' 
                              : 'bg-white/95 border-gray-200'
                          }`}
                        >
                          <div className="py-2">
                            {getServicesList().map((service, serviceIndex) => {
                              const IconComponent = service.icon
                              return (
                                <motion.button
                                  key={service.key}
                                  onClick={() => handleServiceClick(service.link)}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: serviceIndex * 0.03 }}
                                  className={`w-full text-left px-4 py-2 text-sm transition-all duration-200 flex items-center space-x-3 ${
                                    theme === 'dark' 
                                      ? 'text-gray-300 hover:text-white hover:bg-stone-800/50' 
                                      : 'text-gray-700 hover:text-black hover:bg-gray-100/50'
                                  }`}
                                >
                                  <IconComponent 
                                    size={16} 
                                    className="text-[#309f69] flex-shrink-0" 
                                  />
                                  <span>{service.title}</span>
                                </motion.button>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.button
                    onClick={() => handleNavigation(item)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`text-lg font-medium transition-all duration-300 relative group ${
                      theme === 'dark' 
                        ? 'text-gray-300 hover:text-white' 
                        : 'text-black hover:text-gray-700'
                    }`}
                  >
                    {t.nav[item.name as keyof typeof t.nav]}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#309f69] to-[#2ff9c3] transition-all duration-300 group-hover:w-full"></span>
                  </motion.button>
                )}
              </div>
            ))}
            
            {/* Toggle Buttons */}
            <div className="flex items-center space-x-8">
              {/* Language Toggle */}
              <motion.button
                onClick={() => setLanguage(language === 'en' ? 'ka' : 'en')}
                whileHover={{ 
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut"
                }}
                className={`p-2 rounded-lg transition-all duration-200 flex items-center space-x-1 ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-black hover:text-gray-700'
                }`}
                aria-label="Toggle language"
              >
                <motion.div
                  animate={{ rotate: language === 'en' ? 0 : 180 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Globe size={16} />
                </motion.div>
                <motion.span 
                  key={language}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-medium"
                >
                  {language === 'en' ? 'ENG' : 'ქარ'}
                </motion.span>
              </motion.button>
              
              {/* Theme Toggle Switch */}
              <div className="flex items-center">
                <ToggleSwitch
                  defaultChecked={theme === 'dark'}
                  onChange={(value) => setTheme(value ? 'dark' : 'light')}
                />
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden focus:outline-none transition-colors duration-200 py-6 z-50 ${
              theme === 'dark' 
                ? 'text-white hover:text-gray-300' 
                : 'text-black hover:text-gray-600'
            }`}
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
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`md:hidden border-t backdrop-blur-md ${
                theme === 'dark' 
                  ? 'border-stone-700/50 bg-stone-950/98' 
                  : 'border-gray-200 bg-white/98'
              }`}
            >
            <div className="py-4 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div>
                      <div className="flex items-center">
                        <button
                          onClick={() => handleNavigation(item)}
                          className={`flex-1 text-left px-4 py-3 font-medium transition-all duration-200 ${
                            theme === 'dark' 
                              ? 'text-gray-300 hover:text-white hover:bg-stone-800/50' 
                              : 'text-black hover:text-gray-700 hover:bg-gray-100/50'
                          }`}
                        >
                          <span>{t.nav[item.name as keyof typeof t.nav]}</span>
                        </button>
                        <button
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                          className={`px-4 py-3 transition-all duration-200 ${
                            theme === 'dark' 
                              ? 'hover:bg-stone-800/50' 
                              : 'hover:bg-gray-100/50'
                          }`}
                        >
                          <motion.div
                            animate={{ rotate: isServicesOpen ? 45 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Plus size={20} className="text-[#309f69]" />
                          </motion.div>
                        </button>
                      </div>
                      
                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`overflow-hidden ${
                              theme === 'dark' ? 'bg-stone-900/50' : 'bg-gray-50'
                            }`}
                          >
                            {getServicesList().map((service) => {
                              const IconComponent = service.icon
                              return (
                                <button
                                  key={service.key}
                                  onClick={() => handleServiceClick(service.link)}
                                  className={`w-full text-left px-8 py-2 text-sm transition-all duration-200 flex items-center space-x-3 ${
                                    theme === 'dark' 
                                      ? 'text-gray-400 hover:text-white hover:bg-stone-800/50' 
                                      : 'text-gray-600 hover:text-black hover:bg-gray-100/50'
                                  }`}
                                >
                                  <IconComponent 
                                    size={14} 
                                    className="text-[#309f69] flex-shrink-0" 
                                  />
                                  <span>{service.title}</span>
                                </button>
                              )
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleNavigation(item)}
                      className={`block w-full text-left px-4 py-3 font-medium transition-all duration-200 ${
                        theme === 'dark' 
                          ? 'text-gray-300 hover:text-white hover:bg-stone-800/50' 
                          : 'text-black hover:text-gray-700 hover:bg-gray-100/50'
                      }`}
                    >
                      {t.nav[item.name as keyof typeof t.nav]}
                    </button>
                  )}
                </div>
              ))}
              
              {/* Mobile Toggle Buttons */}
              {/* Language Toggle */}
              <motion.button
                onClick={() => setLanguage(language === 'en' ? 'ka' : 'en')}
                whileHover={{ 
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut"
                }}
                className={`w-full text-left px-4 py-3 font-medium transition-all duration-200 flex items-center space-x-2 ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-white hover:bg-stone-800/50' 
                    : 'text-black hover:text-gray-700 hover:bg-gray-100/50'
                }`}
                aria-label="Toggle language"
              >
                <motion.div
                  animate={{ rotate: language === 'en' ? 0 : 180 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Globe size={16} />
                </motion.div>
                <motion.span 
                  key={language}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-medium"
                >
                  {language === 'en' ? 'ENG' : 'ქარ'}
                </motion.span>
              </motion.button>
              
              {/* Theme Toggle */}
              <div className={`w-full text-left px-4 py-3 font-medium transition-all duration-200 flex items-center justify-end ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:bg-stone-800/50' 
                  : 'text-black hover:bg-gray-100/50'
              }`}>
                <ToggleSwitch
                  defaultChecked={theme === 'dark'}
                  onChange={(value) => setTheme(value ? 'dark' : 'light')}
                />
              </div>
            </div>
          </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
