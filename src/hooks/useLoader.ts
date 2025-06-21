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
  const [loadingProgress, setLoadingProgress] = useState(0)

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
      let loadedCount = 0
      const totalImages = criticalImages.length

      const imagePromises = criticalImages.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new Image()
          img.onload = () => {
            loadedCount++
            setLoadingProgress((loadedCount / totalImages) * 70) // 70% for images
            resolve()
          }
          img.onerror = () => {
            loadedCount++
            setLoadingProgress((loadedCount / totalImages) * 70)
            console.warn(`Failed to load image: ${src}`)
            resolve() // Continue even if image fails
          }
          img.src = src
        })
      })

      return Promise.all(imagePromises)
    }

    const loadApp = async () => {
      try {
        // Start image preloading
        const imagePromise = preloadImages()
        
        // Simulate additional loading steps
        const additionalSteps = new Promise<void>((resolve) => {
          setTimeout(() => {
            setLoadingProgress(80) // Additional processing
            setTimeout(() => {
              setLoadingProgress(90) // Final steps
              setTimeout(() => {
                setLoadingProgress(100) // Complete
                resolve()
              }, 300)
            }, 300)
          }, 1000)
        })
        
        // Wait for both minimum time and all assets
        await Promise.all([
          new Promise(resolve => setTimeout(resolve, minLoadTime)),
          imagePromise,
          additionalSteps
        ])
        
        setImagesLoaded(true)
        setIsLoading(false)
      } catch (error) {
        console.warn('Some assets failed to load, continuing anyway:', error)
        // Continue even if some assets fail to load
        setTimeout(() => {
          setLoadingProgress(100)
          setImagesLoaded(true)
          setIsLoading(false)
        }, minLoadTime)
      }
    }

    loadApp()
  }, [minLoadTime])

  return { isLoading, imagesLoaded, loadingProgress }
}
