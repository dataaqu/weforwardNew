import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

interface CarouselContextType {
  currentIndex: number
  setCurrentIndex: (index: number) => void
  itemsCount: number
  setItemsCount: (count: number) => void
  nextSlide: () => void
  prevSlide: () => void
  realIndex: number
  isTransitioning: boolean
}

const CarouselContext = createContext<CarouselContextType | undefined>(undefined)

const useCarousel = () => {
  const context = useContext(CarouselContext)
  if (!context) {
    throw new Error('useCarousel must be used within a Carousel')
  }
  return context
}

interface CarouselProps {
  children: React.ReactNode
  autoPlay?: boolean
  autoPlayInterval?: number
  className?: string
}

export function Carousel({ children, autoPlay = false, autoPlayInterval = 3000, className }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(1) // Start at 1 for infinite scroll
  const [itemsCount, setItemsCount] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Real index for indicators (0-based)
  const realIndex = itemsCount > 0 ? ((currentIndex - 1) % itemsCount + itemsCount) % itemsCount : 0

  const nextSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev + 1)
    if (autoPlay) {
      setIsPaused(true)
      setTimeout(() => setIsPaused(false), autoPlayInterval)
    }
  }, [autoPlay, autoPlayInterval, isTransitioning])

  const prevSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev - 1)
    if (autoPlay) {
      setIsPaused(true)
      setTimeout(() => setIsPaused(false), autoPlayInterval)
    }
  }, [autoPlay, autoPlayInterval, isTransitioning])

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(index + 1) // Add 1 for infinite scroll offset
    if (autoPlay) {
      setIsPaused(true)
      setTimeout(() => setIsPaused(false), autoPlayInterval)
    }
  }, [autoPlay, autoPlayInterval, isTransitioning])

  // Handle infinite scroll reset
  useEffect(() => {
    if (itemsCount === 0) return
    
    const timer = setTimeout(() => {
      if (currentIndex >= itemsCount + 1) {
        setCurrentIndex(1)
      } else if (currentIndex <= 0) {
        setCurrentIndex(itemsCount)
      }
      setIsTransitioning(false)
    }, 600) // Match transition duration

    return () => clearTimeout(timer)
  }, [currentIndex, itemsCount])

  useEffect(() => {
    if (autoPlay && itemsCount > 1 && !isPaused) {
      const interval = setInterval(nextSlide, autoPlayInterval)
      return () => clearInterval(interval)
    }
  }, [autoPlay, autoPlayInterval, nextSlide, itemsCount, isPaused])

  const contextValue = {
    currentIndex,
    setCurrentIndex: goToSlide,
    itemsCount,
    setItemsCount,
    nextSlide,
    prevSlide,
    realIndex,
    isTransitioning,
  }

  return (
    <CarouselContext.Provider value={contextValue}>
      <div className={`relative overflow-hidden ${className || ''}`}>
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

interface CarouselContentProps {
  children: React.ReactNode
  className?: string
}

export function CarouselContent({ children, className }: CarouselContentProps) {
  const { currentIndex, setItemsCount, isTransitioning } = useCarousel()
  const items = React.Children.toArray(children)

  useEffect(() => {
    setItemsCount(items.length)
  }, [items.length, setItemsCount])

  // Create infinite scroll by cloning first and last items
  const infiniteItems = items.length > 0 ? [
    items[items.length - 1], // Clone of last item
    ...items,                // Original items
    items[0]                 // Clone of first item
  ] : items

  return (
    <div className={`relative w-full h-full overflow-hidden ${className || ''}`}>
      <motion.div
        className="flex h-full w-full"
        animate={{ 
          x: `-${currentIndex * (100 / infiniteItems.length)}%` 
        }}
        transition={{ 
          duration: isTransitioning ? 0.6 : 0, 
          ease: [0.4, 0.0, 0.2, 1]
        }}
        style={{ 
          width: `${infiniteItems.length * 100}%`,
          willChange: 'transform'
        }}
      >
        {infiniteItems.map((item, index) => (
          <div 
            key={`${index}-${items.length}`} 
            className="flex-none h-full"
            style={{ width: `${100 / infiniteItems.length}%` }}
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

interface CarouselItemProps {
  children: React.ReactNode
  className?: string
}

export function CarouselItem({ children, className }: CarouselItemProps) {
  return <div className={`w-full h-full ${className || ''}`}>{children}</div>
}

interface CarouselIndicatorProps {
  className?: string
}

export function CarouselIndicator({ className }: CarouselIndicatorProps) {
  const { realIndex, setCurrentIndex, itemsCount } = useCarousel()

  if (itemsCount <= 1) return null

  return (
    <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 ${className || ''}`}>
      {Array.from({ length: itemsCount }).map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index === realIndex
              ? 'bg-white scale-110 shadow-lg'
              : 'bg-white/50 hover:bg-white/75 scale-100'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}
