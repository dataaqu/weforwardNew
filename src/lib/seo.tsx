import { Helmet } from 'react-helmet-async'

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
  title = 'WeForward - Modern React Development',
  description = 'Build amazing web applications with React, Vite, Tailwind CSS, and modern development tools.',
  keywords = 'React, TypeScript, Vite, Tailwind CSS, Web Development',
  ogImage = 'https://weforward.dev/og-image.jpg',
  canonicalUrl,
  noIndex = false
}: SEOProps) {
  const fullTitle = title.includes('WeForward') ? title : `${title} | WeForward`

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="WeForward" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Additional SEO tags */}
      <meta name="author" content="WeForward Team" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="theme-color" content="#1e40af" />
    </Helmet>
  )
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
        "url": "https://weforward.dev/logo.png"
      }
    }
  }),

  product: (name: string, description: string, price: string, currency: string = 'USD') => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "brand": {
      "@type": "Brand",
      "name": "WeForward"
    },
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": currency,
      "availability": "https://schema.org/InStock"
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
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  )
}
