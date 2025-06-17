import { motion } from 'framer-motion'
import { FocusCardsDemo } from './focus-cards-demo'

export function Services() {
  return (
    <section id="services" className="py-20 bg-stone-100 dark:bg-stone-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3]">Services</span>
          </h2>
          <p className="text-lg text-stone-600 dark:text-stone-300 max-w-3xl mx-auto">
            Comprehensive logistics solutions tailored to meet your transportation and supply chain needs
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
