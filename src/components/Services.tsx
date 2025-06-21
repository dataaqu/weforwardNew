import { motion } from 'framer-motion'
import { useTheme } from './theme-provider'
import { FocusCardsDemo } from './focus-cards-demo'

export function Services() {
  const { theme } = useTheme()
  
  return (
    <section id="services" className={`py-20 ${
      theme === 'dark' ? 'bg-stone-950' : 'bg-neutral-50'
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
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3]">Services</span>
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-stone-300' : 'text-gray-700'
          }`}>
            How We Move Your Business Forward
          </p>
        </motion.div>

        {/* Focus Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <FocusCardsDemo />
        </motion.div>
      </div>
    </section>
  )
}
