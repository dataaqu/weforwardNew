import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTheme } from './theme-provider'
import { useTranslation } from './translation-provider'
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
} from '../components/core/carousel'
import planeImg from '../assets/air freight.webp'
import roadImg from '../assets/road freight.webp'
import seaImg from '../assets/sea freight.webp'
import railImg from '../assets/rail freight.webp'

// Rotating Words Component
const RotateWords = ({
  text = "WE Deliver",
  words = ["Air", "Road", "Sea", "Rail"],
  language = 'en'
}: {
  text: string
  words: string[]
  language?: 'en' | 'ka'
}) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, 3000) // Changed to 3 seconds for better pacing
    
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <div className="flex items-baseline gap-2">
      <span>{text}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className={`text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3] ${
            language === 'ka' ? 'text-2xl sm:text-3xl lg:text-4xl leading-tight' : ''
          }`}
          style={language === 'ka' ? { lineHeight: '1.2' } : {}}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

// Counter animation hook
const useCounter = (end: number, duration: number = 2000, delay: number = 0) => {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!hasStarted) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutExpo = 1 - Math.pow(2, -10 * progress)
      setCount(Math.floor(easeOutExpo * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, hasStarted])

  return count
}

export function HeroSection() {
  const { theme } = useTheme()
  const { language, t } = useTranslation()
  
  // Counter values
  const shipmentsCount = useCounter(35000, 2500, 1000) // 35K shipments, 2.5s duration, 1s delay
  const partnersCount = useCounter(1000, 2500, 1100) // 1K partners, 2.5s duration, 1.1s delay
  const customersCount = useCounter(5000, 2500, 1200) // 5K customers, 2.5s duration, 1.2s delay




  return (
    <section id="home" className={`relative min-h-screen overflow-hidden pt-12 ${
      theme === 'dark' ? 'bg-stone-950' : 'bg-neutral-50'
    }`}>
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
          {/* Left Content - 1/2 width */}
          <div className="space-y-6">
        

            {/* Main Heading with Rotating Words */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              <span className="block mb-2">You Deal</span>
              <RotateWords 
                text="We Deliver " 
                words={language === 'en' ? ["Air", "Road", "Sea", "Rail"] : ["საჰაერო", "სახმელეთო", "საზღვაო", "სარკინიგზო"]}
                language={language}
              />
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
              className={`text-lg sm:text-xl leading-relaxed ${
                theme === 'dark' ? 'text-stone-300' : 'text-gray-700'
              }`}
            >
              {language === 'en' ? (
                <>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3] font-bold">
                    WEFORWARD
                  </span>{" "}
                  founded in 2009, we take pride in our exceptional journey, rooted in experience, loyalty, and teamwork. Our seasoned team brings decades of industry expertise, ensuring your cargo is in capable hands. Our unwavering commitment to loyalty ensures we prioritize your interests above all else, while our seamless teamwork guarantees efficient and reliable shipping solutions. Trust us to navigate your logistics needs with precision and dedication, making your cargo's journey our top priority.
                </>
              ) : (
                <>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3] font-bold">
                    WEFORWARD
                  </span>{" "}
                  {t.hero.description.replace('weforward ', '')}
                </>
              )}
            </motion.p>

            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-4 py-10"
            >
              {/* Shipments Counter */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.0
                }}
                className="text-start"
              >
                <div className={`text-xl sm:text-2xl font-bold mb-1 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  {shipmentsCount.toLocaleString()}
                  <motion.span 
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 3.5, // 1s delay + 2.5s counter duration
                      ease: "easeOut"
                    }}
                    className="text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3] ml-1"
                  >
                    +
                  </motion.span>
                </div>
                <div className={`text-xs font-medium ${
                  theme === 'dark' ? 'text-stone-400' : 'text-gray-600'
                }`}>
                  {t.hero.stats.cargoShipped}
                </div>
              </motion.div>

              {/* Trusted Partners Counter */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.1
                }}
                className="text-center"
              >
                <div className={`text-xl sm:text-2xl font-bold mb-1 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  {partnersCount}
                  <motion.span 
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 3.6, // 1.1s delay + 2.5s counter duration
                      ease: "easeOut"
                    }}
                    className="text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3] ml-1"
                  >
                    +
                  </motion.span>
                </div>
                <div className={`text-xs font-medium ${
                  theme === 'dark' ? 'text-stone-400' : 'text-gray-600'
                }`}>
                  {t.hero.stats.trustedPartners}
                </div>
              </motion.div>

              {/* Happy Customers Counter */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.2
                }}
                className="text-end"
              >
                <div className={`text-xl sm:text-2xl font-bold mb-1 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  {customersCount.toLocaleString()}
                  <motion.span 
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 3.7, // 1.2s delay + 2.5s counter duration
                      ease: "easeOut"
                    }}
                    className="text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3] ml-1"
                  >
                    +
                  </motion.span>
                </div>
                <div className={`text-xs font-medium ${
                  theme === 'dark' ? 'text-stone-400' : 'text-gray-600'
                }`}>
                  {t.hero.stats.happyCustomers}
                </div>
              </motion.div>
            </motion.div>

        

           
          </div>

          {/* Right Slider Section - 1/2 width */}
          <div className="relative h-full">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
              className="relative h-full"
            >
              {/* Logistics Carousel */}
              <div className="relative h-full min-h-[500px] lg:min-h-[600px] w-full group">
                <Carousel autoPlay={true} autoPlayInterval={5000} className="h-full">
                  <CarouselContent className="h-full">
                    {/* Air Transport Slide */}
                    <CarouselItem className="h-full">
                      <div className="relative h-full bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-2xl overflow-hidden shadow-2xl">
                        <div 
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${planeImg})` }}
                        />
                        <div className="absolute inset-0 bg-black/40" />
                      </div>
                    </CarouselItem>

                    {/* Road Transport Slide */}
                    <CarouselItem className="h-full">
                      <div className="relative h-full bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-2xl overflow-hidden shadow-2xl">
                        <div 
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${roadImg})` }}
                        />
                        <div className="absolute inset-0 bg-black/40" />
                      </div>
                    </CarouselItem>

                    {/* Sea Transport Slide */}
                    <CarouselItem className="h-full">
                      <div className="relative h-full bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-2xl overflow-hidden shadow-2xl">
                        <div 
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${seaImg})` }}
                        />
                        <div className="absolute inset-0 bg-black/40" />
                      </div>
                    </CarouselItem>

                    {/* Rail Transport Slide */}
                    <CarouselItem className="h-full">
                      <div className="relative h-full bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-2xl overflow-hidden shadow-2xl">
                        <div 
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${railImg})` }}
                        />
                        <div className="absolute inset-0 bg-black/40" />
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselIndicator />
                </Carousel>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
