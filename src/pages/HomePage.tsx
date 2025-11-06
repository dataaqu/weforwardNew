import { HeroSection } from '../components/HeroSection'
import { Services } from '../components/Services'
import { Calculator } from '../components/Calculator'
import { Partners } from '../components/Partners'
import { Memberships } from '../components/Memberships'
import { Contact } from '../components/Contact'
import { AnimatedTabs } from '../components/AnimatedTabs'
import { SEO } from '../lib/seo'

export function HomePage() {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEO
        title="WEFORWARD - Global Logistics Solutions"
        description="WeForward - Global logistics solutions provider offering air, sea, rail, and road freight services. Expert customs brokerage and warehousing services worldwide."
        keywords="logistics, freight, shipping, air freight, sea freight, rail freight, road freight, customs brokerage, warehousing, Georgia, global logistics"
        canonicalUrl="https://weforward.ge"
      />

      <main className="relative">
        <HeroSection />
        <Services />
        <Calculator />
        <Partners />
        <Memberships />
        <Contact />

        {/* Animated Navigation Tabs */}
        <AnimatedTabs />
      </main>
    </>
  )
}
