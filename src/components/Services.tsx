import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export function Services() {
  const { ref, controls } = useScrollAnimation()

  return (
    <section id="services" className="py-20 bg-stone-100 dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          animate={controls}
          initial={{ opacity: 0 }}
          className="text-center"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl font-bold text-stone-900 dark:text-white mb-4"
          >
            Our Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-stone-600 dark:text-stone-300 mb-12 max-w-3xl mx-auto"
          >
            We deliver cutting-edge web solutions tailored to your business needs
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={controls}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          >
            {[
              {
                title: "Web Development",
                description: "Modern, responsive websites built with the latest technologies",
                icon: "🚀"
              },
              {
                title: "UI/UX Design",
                description: "Beautiful, intuitive designs that engage your users",
                icon: "🎨"
              },
              {
                title: "Consulting",
                description: "Strategic guidance to optimize your digital presence",
                icon: "💡"
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="bg-white dark:bg-stone-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-stone-200 dark:border-stone-700"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-stone-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-stone-600 dark:text-stone-300">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
