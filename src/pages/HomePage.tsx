import { HeroSection } from '../components/HeroSection'
import { Services } from '../components/Services'
import { Contact } from '../components/Contact'
import { AnimatedTabs } from '../components/AnimatedTabs'
import { SEO } from '../lib/seo'

export function HomePage() {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEO 
        title="WeForward - Logistic solutions"
        description="Transform your ideas into stunning web applications with cutting-edge technology, beautiful design, and seamless user experiences. Expert web development, mobile apps, and digital solutions."
        keywords="web development, mobile apps, UI/UX design, React, TypeScript, digital solutions, software development"
        canonicalUrl="https://weforward.dev"
      />
      
      <main className="relative">
        <HeroSection />
        <Services />
        <Contact />
        
        {/* Animated Navigation Tabs */}
        <AnimatedTabs />
      </main>
    </>
  )
}
