import { motion } from 'framer-motion'
import { useTheme } from './theme-provider'
import { useTranslation } from './translation-provider'

// Import partner logos
import maerskLogo from '../assets/partners/Maersk-Logo.png'
import turkishAirlinesLogo from '../assets/partners/Turkish_Airlines_logo.png'
import qatarAirwaysLogo from '../assets/partners/Qatar-Airways-Logo.png'
import evergreenLogo from '../assets/partners/Evergreen-Marine-Corp-Logo.png'
import flydubaiLogo from '../assets/partners/FlyDubai-Logo.png'
import hapagLloydLogo from '../assets/partners/Hapag-Lloyd-Logo.png'
import lufthansaLogo from '../assets/partners/Logo-Lufthansa.png'
import airFranceLogo from '../assets/partners/Air-France-Logo.png'
import coscoLogo from '../assets/partners/COSCO-Shipping-Group-Logo.png'
import cmaCgmLogo from '../assets/partners/CMA-CGM-Logo.png'
import mscLogo from '../assets/partners/Mediterranean-Shipping-Co-Logo.png'

export function Partners() {
  const { theme } = useTheme()
  const { t } = useTranslation()

  const partners = [
    { id: 1, name: 'Maersk', logo: maerskLogo },
    { id: 2, name: 'Turkish Airlines', logo: turkishAirlinesLogo },
    { id: 3, name: 'Qatar Airways', logo: qatarAirwaysLogo },
    { id: 4, name: 'Evergreen Marine', logo: evergreenLogo },
    { id: 5, name: 'FlyDubai', logo: flydubaiLogo },
    { id: 6, name: 'Hapag-Lloyd', logo: hapagLloydLogo },
    { id: 7, name: 'Lufthansa', logo: lufthansaLogo },
    { id: 8, name: 'Air France', logo: airFranceLogo },
    { id: 9, name: 'COSCO Shipping', logo: coscoLogo },
    { id: 10, name: 'CMA CGM', logo: cmaCgmLogo },
    { id: 11, name: 'MSC', logo: mscLogo },
  ]

  return (
    <section id="partners" className={`py-20 overflow-hidden ${
      theme === 'dark' ? 'bg-stone-950' : 'bg-stone-100'
    }`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            {t.partners.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3]">{t.partners.subtitle}</span>
          </h2>
        </motion.div>

        {/* Infinite Scroll Carousel */}
        <div className={`relative w-full overflow-hidden rounded-2xl ${
          theme === 'dark' ? 'bg-white/90' : 'bg-transparent'
        }`}>
          <style>{`
            @keyframes infiniteScroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(calc(-200px * ${partners.length}));
              }
            }
            .partners-scroll {
              animation: infiniteScroll 60s linear infinite;
              width: calc(400px * ${partners.length});
            }
            .partners-scroll:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="flex partners-scroll">
            {/* First set of logos */}
            {partners.map((partner) => (
              <div
                key={`first-${partner.id}`}
                className="flex-shrink-0 flex items-center justify-center"
                style={{ width: '200px', height: '150px' }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-[160px] max-h-[100px] object-contain hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {partners.map((partner) => (
              <div
                key={`second-${partner.id}`}
                className="flex-shrink-0 flex items-center justify-center"
                style={{ width: '200px', height: '150px' }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-[160px] max-h-[100px] object-contain hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
            {/* Third set to ensure smooth transition */}
            {partners.map((partner) => (
              <div
                key={`third-${partner.id}`}
                className="flex-shrink-0 flex items-center justify-center"
                style={{ width: '200px', height: '150px' }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-[160px] max-h-[100px] object-contain hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
