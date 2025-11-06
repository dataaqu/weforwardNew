import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Facebook, Linkedin, CheckCircle, X } from 'lucide-react'
import { useState, useRef } from 'react'
import { useTheme } from './theme-provider'
import { useTranslation } from './translation-provider'
import emailjs from '@emailjs/browser'
import { emailjsConfig } from '../config/emailjs'

export function Contact() {
  const { theme } = useTheme()
  const { t, language } = useTranslation()
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Collect tracking information
      const trackingData = {
        source_page: window.location.href,
        user_agent: navigator.userAgent,
        referrer: document.referrer || 'Direct traffic',
        timestamp: new Date().toLocaleString(),
        form_id: 'contact-form-homepage',
        browser: navigator.userAgent.includes('Chrome') ? 'Chrome' : 
                navigator.userAgent.includes('Firefox') ? 'Firefox' : 
                navigator.userAgent.includes('Safari') ? 'Safari' : 'Other',
        device: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
      }

      const result = await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          // Proper email routing
          from_email: formData.email, // Customer's email (appears as sender)
          from_name: `${formData.firstName} ${formData.lastName}`,
          to_email: 'datiobashvili1@gmail.com', // Your receiving email
          reply_to: formData.email, // When you reply, goes to customer
          
          // Customer information for email body
          customer_name: `${formData.firstName} ${formData.lastName}`,
          customer_email: formData.email,
          customer_phone: formData.phone,
          customer_service: formData.service,
          customer_message: formData.message,
          
          // Tracking information
          source_page: trackingData.source_page,
          user_agent: trackingData.user_agent,
          referrer: trackingData.referrer,
          timestamp: trackingData.timestamp,
          form_id: trackingData.form_id,
          browser: trackingData.browser,
          device: trackingData.device
        },
        emailjsConfig.publicKey
      )

      if (result.status === 200) {
        setSubmitStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        })
      }
    } catch (error) {
      console.error('Email send failed:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }
  return (
    <section id="contact" className={`py-20 ${
      theme === 'dark' ? 'bg-stone-950' : 'bg-neutral-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            {t.contact.title && `${t.contact.title} `}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3]">{t.contact.titleHighlight}</span>
          </h2>
      
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className={`text-2xl font-bold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                {t.contact.subtitle}
              </h3>
              <p className={`mb-8 font-firago font-bold ${
                theme === 'dark' ? 'text-stone-300' : 'text-gray-700'
              }`}>
                {t.contact.description}
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className={`flex items-center space-x-4 p-4 rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-stone-900 border-stone-800' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex-shrink-0">
                  <Mail className="text-[#309f69]" size={20} />
                </div>
                <div>
                  <a 
                    href="mailto:sales@weforward.ge" 
                    className={`hover:text-[#309f69] transition-colors duration-200 font-firago font-bold ${
                      theme === 'dark' ? 'text-stone-300' : 'text-gray-700'
                    }`}
                  >
                    sales@weforward.ge
                  </a>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className={`flex items-center space-x-4 p-4 rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-stone-900 border-stone-800' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex-shrink-0">
                  <Phone className="text-[#309f69]" size={20} />
                </div>
                <div className="flex space-x-3">
                  <a 
                    href="tel:+995591321292" 
                    className={`hover:text-[#309f69] transition-colors duration-200 font-firago font-bold ${
                      theme === 'dark' ? 'text-stone-300' : 'text-gray-700'
                    }`}
                  >
                    +995 591 32 12 92
                  </a>
                  <span className={theme === 'dark' ? 'text-stone-500' : 'text-gray-400'}>|</span>
                  <a 
                    href="tel:+995593188198" 
                    className={`hover:text-[#309f69] transition-colors duration-200 font-firago font-bold ${
                      theme === 'dark' ? 'text-stone-300' : 'text-gray-700'
                    }`}
                  >
                    +995 593 18 81 98
                  </a>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className={`flex items-center space-x-4 p-4 rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-stone-900 border-stone-800' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex-shrink-0">
                  <MapPin className="text-[#309f69]" size={20} />
                </div>
                <div>
                  <a 
                    href="https://maps.app.goo.gl/CgzwPiYwyA9986ta9" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`hover:text-[#309f69] transition-colors duration-200 font-firago font-bold ${
                      theme === 'dark' ? 'text-stone-300' : 'text-gray-700'
                    }`}
                  >
                    {t.contact.details.address}
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Social Media */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <h4 className={`text-lg font-semibold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>{t.contact.details.followUs}</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/weforwardllc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
                    theme === 'dark' 
                      ? 'bg-stone-900 border border-stone-800 hover:bg-stone-800' 
                      : 'bg-white border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Facebook className="text-[#309f69]" size={20} />
                </a>
                <a 
                  href="https://www.linkedin.com/company/weforward/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
                    theme === 'dark' 
                      ? 'bg-stone-900 border border-stone-800 hover:bg-stone-800' 
                      : 'bg-white border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Linkedin className="text-[#309f69]" size={20} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className={`p-8 rounded-xl border shadow-lg ${
              theme === 'dark' 
                ? 'bg-stone-900 border-stone-800' 
                : 'bg-white border-gray-200'
            }`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <h3 className={`text-xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                {t.contact.form.title}
              </h3>
            
            </motion.div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder={t.contact.form.firstName}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent transition-all duration-200 ${
                      theme === 'dark' 
                        ? 'border-stone-600 bg-stone-800 text-white placeholder-stone-400' 
                        : 'border-gray-300 bg-gray-50 text-black placeholder-gray-500'
                    }`}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder={t.contact.form.lastName}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent transition-all duration-200 ${
                      theme === 'dark' 
                        ? 'border-stone-600 bg-stone-800 text-white placeholder-stone-400' 
                        : 'border-gray-300 bg-gray-50 text-black placeholder-gray-500'
                    }`}
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t.contact.form.email}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent transition-all duration-200 ${
                    theme === 'dark' 
                      ? 'border-stone-600 bg-stone-800 text-white placeholder-stone-400' 
                      : 'border-gray-300 bg-gray-50 text-black placeholder-gray-500'
                  }`}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={t.contact.form.phone}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent transition-all duration-200 ${
                    theme === 'dark' 
                      ? 'border-stone-600 bg-stone-800 text-white placeholder-stone-400' 
                      : 'border-gray-300 bg-gray-50 text-black placeholder-gray-500'
                  }`}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
             
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                viewport={{ once: true }}
              >
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder={t.contact.form.messagePlaceholder}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent transition-all duration-200 resize-none ${
                    theme === 'dark' 
                      ? 'border-stone-600 bg-stone-800 text-white placeholder-stone-400' 
                      : 'border-gray-300 bg-gray-50 text-black placeholder-gray-500'
                  }`}
                ></textarea>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                viewport={{ once: true }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 ${
                  isSubmitting 
                    ? 'bg-stone-400 cursor-not-allowed text-stone-600' 
                    : 'bg-gradient-to-r from-[#309f69] to-[#2ff9c3] text-black'
                }`}
              >
                <Send size={20} className="text-black" />
                <span className={`font-bold ${language === 'en' ? 'font-bankgothic' : 'font-firago'}`}>{isSubmitting ? t.contact.form.sending : t.contact.form.sendButton}</span>
              </motion.button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600 dark:text-green-400 text-center p-3 bg-green-100 dark:bg-green-900/20 rounded-lg border border-green-300 dark:border-green-700 font-firago font-bold"
                >
                  ✅ {t.contact.success.title.replace('!', '')}! {t.contact.success.message.split('.')[0]}.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 dark:text-red-400 text-center p-3 bg-red-100 dark:bg-red-900/20 rounded-lg border border-red-300 dark:border-red-700 font-firago font-bold"
                >
                  ❌ {t.contact.error.message}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setSubmitStatus('idle')}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 50 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.23, 1, 0.32, 1],
                type: "spring",
                damping: 25,
                stiffness: 300
              }}
              className={`relative max-w-md mx-4 p-8 rounded-2xl shadow-2xl ${
                theme === 'dark' 
                  ? 'bg-stone-900 border border-stone-800' 
                  : 'bg-white border border-gray-200'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSubmitStatus('idle')}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'text-gray-400 hover:text-white hover:bg-stone-800'
                    : 'text-gray-500 hover:text-black hover:bg-gray-100'
                }`}
              >
                <X size={20} />
              </button>

              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3, type: "spring" }}
                className="flex justify-center mb-6"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#309f69] to-[#2ff9c3] rounded-full flex items-center justify-center">
                  <CheckCircle size={32} className="text-white" />
                </div>
              </motion.div>

              {/* Success Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-center"
              >
                <h3 className={`text-2xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  {t.contact.success.title}
                </h3>
                
                <p className={`text-lg mb-6 leading-relaxed font-firago font-bold ${
                  theme === 'dark' ? 'text-stone-300' : 'text-gray-700'
                }`}>
                  {t.contact.success.message}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSubmitStatus('idle')}
                  className="w-full bg-gradient-to-r from-[#309f69] to-[#2ff9c3] text-white  py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg font-firago font-bold"
                >
                  {t.contact.success.button}
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
