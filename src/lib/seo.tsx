import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  canonicalUrl?: string
  noIndex?: boolean
}

/**
 * Reusable SEO component for easy meta tag management
 * 
 * @example
 * ```tsx
 * <SEO 
 *   title="My Page Title"
 *   description="Page description for SEO"
 *   keywords="react, typescript, seo"
 *   canonicalUrl="https://mysite.com/page"
 * />
 * ```
 */
export function SEO({
  title = 'WeForward - Professional Logistics Solutions',
  description = 'WeForward delivers exceptional logistics services across Air, Road, Sea, and Rail transport. Founded in 2009, we provide reliable cargo shipping with 35K+ successful shipments.',
  keywords = 'logistics, cargo shipping, air transport, road transport, sea transport, rail transport, WeForward, shipping solutions',
  ogImage = '/favicon.png',
  canonicalUrl,
  noIndex = false
}: SEOProps) {
  const fullTitle = title.includes('WeForward') ? title : `${title} | WeForward`

  useEffect(() => {
    // Update document title
    document.title = fullTitle

    // Helper function to update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let meta = document.querySelector(selector) as HTMLMetaElement
      
      if (!meta) {
        meta = document.createElement('meta')
        if (property) {
          meta.setAttribute('property', name)
        } else {
          meta.setAttribute('name', name)
        }
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    // Update meta tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    updateMetaTag('robots', noIndex ? 'noindex, nofollow' : 'index, follow')
    updateMetaTag('author', 'WeForward Team')
    updateMetaTag('theme-color', '#309f69')

    // Open Graph tags
    updateMetaTag('og:title', fullTitle, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:image', ogImage, true)
    updateMetaTag('og:type', 'website', true)
    updateMetaTag('og:site_name', 'WeForward', true)

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', fullTitle)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', ogImage)

    // Canonical URL
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        document.head.appendChild(canonical)
      }
      canonical.setAttribute('href', canonicalUrl)
    }

    // Cleanup function
    return () => {
      // Optional: Remove dynamically added meta tags on component unmount
      // This is generally not necessary for SPAs but can be useful in some cases
    }
  }, [fullTitle, description, keywords, ogImage, canonicalUrl, noIndex])

  return null // This component doesn't render any visible content
}

/**
 * Generate structured data for different content types
 */
export const generateStructuredData = {
  website: (name: string, url: string, description: string) => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": name,
    "url": url,
    "description": description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  }),

  organization: (name: string, url: string, logo: string, description: string) => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": name,
    "url": url,
    "logo": {
      "@type": "ImageObject",
      "url": logo
    },
    "description": description,
    "foundingDate": "2009",
    "serviceArea": "Global",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Logistics Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Air Transport"
        },
        {
          "@type": "OfferCatalog", 
          "name": "Road Transport"
        },
        {
          "@type": "OfferCatalog",
          "name": "Sea Transport"
        },
        {
          "@type": "OfferCatalog",
          "name": "Rail Transport"
        }
      ]
    }
  }),

  article: (title: string, author: string, publishDate: string, url: string) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "author": {
      "@type": "Person",
      "name": author
    },
    "datePublished": publishDate,
    "dateModified": publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "publisher": {
      "@type": "Organization",
      "name": "WeForward",
      "logo": {
        "@type": "ImageObject",
        "url": "/favicon.png"
      }
    }
  })
}

/**
 * Component to inject structured data
 */
interface StructuredDataProps {
  data: object
}

export function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)

    return () => {
      // Clean up script on component unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [data])

  return null
}
