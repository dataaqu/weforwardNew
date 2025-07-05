import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Home, ArrowLeft, Search } from 'lucide-react'
import { useTheme } from '../components/theme-provider'
import { useTranslation } from '../components/translation-provider'

export function NotFoundPage() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const { t } = useTranslation()

  const handleGoHome = () => {
    navigate('/')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${
      theme === 'dark' ? 'bg-stone-950' : 'bg-neutral-50'
    }`}>
      <div className="text-center max-w-2xl mx-auto py-6">
        {/* Animated 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className={`text-8xl md:text-9xl font-black mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3]">
              4
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ff9c3] to-[#309f69]">
              0
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3]">
              4
            </span>
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          <h2 className={`text-2xl md:text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            {t.errors?.pageNotFound?.title || 'Page Not Found'}
          </h2>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {t.errors?.pageNotFound?.message || 
            'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'}
          </p>
        </motion.div>

        {/* Floating Animation Effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
              theme === 'dark' ? 'bg-stone-900' : 'bg-white'
            } shadow-lg`}
          >
            <Search className={`w-8 h-8 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`} />
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Go Home Button */}
          <motion.button
            onClick={handleGoHome}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#309f69] to-[#2ff9c3] text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            {t.errors?.pageNotFound?.goHome || 'Go Home'}
          </motion.button>

          {/* Go Back Button */}
          <motion.button
            onClick={handleGoBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold border-2 transition-all duration-300 ${
              theme === 'dark' 
                ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white' 
                : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:text-black'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            {t.errors?.pageNotFound?.goBack || 'Go Back'}
          </motion.button>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
        >
          <p className={`text-sm mb-4 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {t.errors?.pageNotFound?.helpfulLinks || 'You might be looking for:'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/')}
              className={`text-sm hover:underline transition-colors ${
                theme === 'dark' ? 'text-[#2ff9c3] hover:text-[#309f69]' : 'text-[#309f69] hover:text-[#2ff9c3]'
              }`}
            >
              Homepage
            </button>
            <button
              onClick={() => navigate('/blog')}
              className={`text-sm hover:underline transition-colors ${
                theme === 'dark' ? 'text-[#2ff9c3] hover:text-[#309f69]' : 'text-[#309f69] hover:text-[#2ff9c3]'
              }`}
            >
              Blog
            </button>
            <button
              onClick={() => navigate('/#services')}
              className={`text-sm hover:underline transition-colors ${
                theme === 'dark' ? 'text-[#2ff9c3] hover:text-[#309f69]' : 'text-[#309f69] hover:text-[#2ff9c3]'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => navigate('/#contact')}
              className={`text-sm hover:underline transition-colors ${
                theme === 'dark' ? 'text-[#2ff9c3] hover:text-[#309f69]' : 'text-[#309f69] hover:text-[#2ff9c3]'
              }`}
            >
              Contact
            </button>
          </div>
        </motion.div>
      </div>

      {/* Background Animation */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(48, 159, 105, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(47, 249, 195, 0.08) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 20%, rgba(48, 159, 105, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, rgba(47, 249, 195, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(48, 159, 105, 0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 pointer-events-none -z-10"
      />
    </div>
  )
}
