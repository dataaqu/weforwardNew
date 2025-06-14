import { motion } from 'framer-motion'
import { TextEffect } from './core/text-effect'
import logo from '../assets/logo.png'

export function Loader() {
  return (
    <div className="fixed inset-0 z-[100] bg-stone-950 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            delay: 0.2 
          }}
          className="flex justify-center mb-8"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-20 h-20 flex items-center justify-center"
          >
            <img 
              src={logo} 
              alt="WeForward Logo" 
              className="w-16 h-16 object-contain"
            />
          </motion.div>
        </motion.div>

        {/* WeForward Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.5,
            ease: "easeOut" 
          }}
          className="text-xl lg:text-2xl font-bold text-white mb-8"
        >
          WEFORWARD
        </motion.div>

        {/* Main Text Animation with TextEffect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.8,
            ease: "easeOut" 
          }}
          className="space-y-4"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            <TextEffect 
              per='char' 
              preset='fade'
              delay={1.0}
              className="text-white"
            >
              You Deal
            </TextEffect>
            <span className="ml-3">
              <TextEffect 
                per='char' 
                preset='fade'
                delay={1.5}
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3]"
              >
                We Deliver
              </TextEffect>
            </span>
          </h1>
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex justify-center space-x-2 mt-8"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-[#309f69] to-[#2ff9c3]"
            />
          ))}
        </motion.div>
      </div>

      {/* Background Gradient Animation */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(48, 159, 105, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(47, 249, 195, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 20%, rgba(48, 159, 105, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, rgba(47, 249, 195, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(48, 159, 105, 0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  )
}
