import { useState, useEffect } from 'react'

// Import images that need to be preloaded
import planeImg from '../assets/air freight.webp'
import roadImg from '../assets/road freight.webp'
import seaImg from '../assets/sea freight.webp'
import railImg from '../assets/rail freight.webp'
import logoImg from '../assets/logo.png'

// Import service images
import airServiceImg from '../assets/air service.webp'
import roadServiceImg from '../assets/road service.webp'
import seaServiceImg from '../assets/sea service.webp'
import railServiceImg from '../assets/rail service.webp'
import warehouseServiceImg from '../assets/warehouse service.webp'
import brokageServiceImg from '../assets/brockage service.webp'

export function useLoader(minLoadTime: number = 3000) {
  const [isLoading, setIsLoading] = useState(true)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  // Critical images that need to be preloaded
  const criticalImages = [
    planeImg, 
    roadImg, 
    seaImg, 
    railImg, 
    logoImg,
    airServiceImg,
    roadServiceImg,
    seaServiceImg,
    railServiceImg,
    warehouseServiceImg,
    brokageServiceImg
  ]

  useEffect(() => {
    const preloadImages = () => {
      const imagePromises = criticalImages.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new Image()
          img.onload = () => resolve()
          img.onerror = () => resolve() // Continue even if image fails
          img.src = src
        })
      })

      return Promise.all(imagePromises)
    }

    const loadApp = async () => {
      try {
        // Wait for both minimum time and all assets
        await Promise.all([
          new Promise(resolve => setTimeout(resolve, minLoadTime)),
          preloadImages()
        ])
        
        setImagesLoaded(true)
        setIsLoading(false)
      } catch (error) {
        // Continue even if some assets fail to load
        setTimeout(() => {
          setImagesLoaded(true)
          setIsLoading(false)
        }, minLoadTime)
      }
    }

    loadApp()
  }, [minLoadTime, criticalImages])

  return { 
    isLoading, 
    imagesLoaded
  }
}
