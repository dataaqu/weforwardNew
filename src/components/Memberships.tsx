import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { useTheme } from './theme-provider'
import { useTranslation } from './translation-provider'
import GlowingCard from './ui/glowing-card'

// Import membership logos
import logo1 from '../assets/memberships/1.png'
import logo2 from '../assets/memberships/2.png'
import logo3 from '../assets/memberships/3.png'
import logo4 from '../assets/memberships/4.png'

export function Memberships() {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const [currentSlide, setCurrentSlide] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const memberships = [
    {
      id: 1,
      key: 'fiata' as const,
      logo: logo1,
      fromColor: '#309f69',
      viaColor: '#2ff9c3',
      toColor: '#4fd1c5',
    },
      {
      id: 3,
      key: 'tct' as const,
      logo: logo3,
      fromColor: '#309f69',
      viaColor: '#2ff9c3',
      toColor: '#4fd1c5',
    },
    {
      id: 2,
      key: 'wca' as const,
      logo: logo2,
      fromColor: '#309f69',
      viaColor: '#2ff9c3',
      toColor: '#4fd1c5',
    },
  
    {
      id: 4,
      key: 'iata' as const,
      logo: logo4,
      fromColor: '#309f69',
      viaColor: '#2ff9c3',
      toColor: '#4fd1c5',
    },
  ]

  // Handle scroll event to update pagination
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const cardWidth = container.offsetWidth
      const index = Math.round(scrollLeft / cardWidth)
      setCurrentSlide(index)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      id="memberships"
      className={`py-20 overflow-hidden ${theme === 'dark' ? 'bg-stone-950' : 'bg-stone-100'}`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            {t.memberships.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3]">
              {t.memberships.subtitle}
            </span>
          </h2>
        </motion.div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
          {memberships.map((membership, index) => (
            <motion.div
              key={membership.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]"
            >
              <GlowingCard
                fromColor={membership.fromColor}
                viaColor={membership.viaColor}
                toColor={membership.toColor}
                imageUrl={membership.logo}
                theme={theme as 'light' | 'dark'}
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile: Scrollable Cards with Pagination */}
        <div className="md:hidden py-8">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {memberships.map((membership) => (
              <div
                key={membership.id}
                className="flex-shrink-0 w-[280px] snap-center"
              >
                <GlowingCard
                  fromColor={membership.fromColor}
                  viaColor={membership.viaColor}
                  toColor={membership.toColor}
                  imageUrl={membership.logo}
                  theme={theme as 'light' | 'dark'}
                  isMobile={true}
                />
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {memberships.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const container = scrollContainerRef.current
                  if (container) {
                    container.scrollTo({
                      left: index * container.offsetWidth,
                      behavior: 'smooth',
                    })
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'bg-[#309f69] w-6'
                    : theme === 'dark'
                    ? 'bg-stone-600'
                    : 'bg-stone-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      </div>
    </section>
  )
}
