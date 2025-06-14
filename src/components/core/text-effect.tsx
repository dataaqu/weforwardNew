import { motion } from 'framer-motion'

interface TextEffectProps {
  children: string
  per?: 'word' | 'char'
  preset?: 'fade' | 'slide' | 'scale' | 'blur'
  className?: string
  delay?: number
}

export function TextEffect({ 
  children, 
  per = 'char', 
  preset = 'fade', 
  className = '',
  delay = 0 
}: TextEffectProps) {
  const text = children
  const elements = per === 'char' ? text.split('') : text.split(' ')

  const getVariants = () => {
    switch (preset) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }
      case 'slide':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 }
        }
      case 'blur':
        return {
          hidden: { opacity: 0, filter: 'blur(10px)' },
          visible: { opacity: 1, filter: 'blur(0px)' }
        }
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }
    }
  }

  const variants = getVariants()

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      transition={{
        staggerChildren: per === 'char' ? 0.05 : 0.1,
        delayChildren: delay
      }}
    >
      {elements.map((element, index) => (
        <motion.span
          key={index}
          variants={variants}
          transition={{
            duration: 0.4,
            ease: "easeOut"
          }}
          style={{ display: 'inline-block' }}
        >
          {element === ' ' ? '\u00A0' : element}
          {per === 'word' && index < elements.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.span>
  )
}
