import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from './translation-provider'
import { useTheme } from './theme-provider'

interface CalculatorResult {
  totalVolume: number
  loadingMeters: number
  chargeableWeight: number
}

export function Calculator() {
  const { t, language } = useTranslation()
  const { theme } = useTheme()
  
  const [formData, setFormData] = useState({
    packingType: 'choose',
    quantity: 1,
    length: '',
    width: '',
    height: '',
    weight: ''
  })
  
  const [results, setResults] = useState<CalculatorResult | null>(null)

  const handleInputChange = (field: string, value: string | number) => {
    if (field === 'packingType') {
      // Auto-fill dimensions based on packing type
      if (value === 'miniPallet') {
        setFormData(prev => ({
          ...prev,
          packingType: value as string,
          length: '80',
          width: '60'
        }))
        return
      } else if (value === 'euroPallet') {
        setFormData(prev => ({
          ...prev,
          packingType: value as string,
          length: '120',
          width: '80'
        }))
        return
      } else if (value === 'blockPallet') {
        setFormData(prev => ({
          ...prev,
          packingType: value as string,
          length: '120',
          width: '100'
        }))
        return
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: field === 'quantity' 
        ? Number(value) || 1
        : value
    }))
  }

  const calculateResults = () => {
    const { quantity, length, width, height, weight } = formData
    
    const lengthNum = Number(length) || 0
    const widthNum = Number(width) || 0
    const heightNum = Number(height) || 0
    const weightNum = Number(weight) || 0
    
    if (quantity <= 0 || lengthNum <= 0 || widthNum <= 0 || heightNum <= 0 || weightNum <= 0) {
      return
    }

    // Calculate volume using the formula: m³ = (L_cm × W_cm × H_cm) / 1,000,000
    const volumePerUnit = (lengthNum * widthNum * heightNum) / 1000000
    const totalVolume = volumePerUnit * quantity
    
    // Convert cm to meters for loading meter calculations
    const lengthM = lengthNum / 100
    const widthM = widthNum / 100
    
    // Calculate loading meters using the formula: LDM = (L × W) / 2.44
    const loadingMeters = (lengthM * widthM) / 2.44
    
    // Calculate chargeable weight using the formula: (L × W × H) / 6000
    const chargeableWeight = (lengthNum * widthNum * heightNum) / 6000
    
    setResults({
      totalVolume: Number(totalVolume.toFixed(3)),
      loadingMeters: Number(loadingMeters.toFixed(2)),
      chargeableWeight: Number(chargeableWeight.toFixed(2))
    })
  }

  const resetForm = () => {
    setFormData({
      packingType: 'choose',
      quantity: 1,
      length: '',
      width: '',
      height: '',
      weight: ''
    })
    setResults(null)
  }

  return (
    <section id="calculator" className={`py-20 ${theme === 'dark' ? 'bg-stone-950' : 'bg-stone-100'}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 lang={language} className={`text-4xl md:text-5xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            {t.calculator.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3]">{t.calculator.subtitle}</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className={`p-8 rounded-xl border shadow-lg ${
              theme === 'dark' ? 'bg-stone-900 border-stone-800' : 'bg-white border-gray-200'
            }`}
          >
            <div className="grid grid-cols-2 gap-6">
              {/* Packing Type */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {t.calculator.packingType}
                </label>
                <select
                  value={formData.packingType}
                  onChange={(e) => handleInputChange('packingType', e.target.value)}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23309f69' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                  className={`w-full px-4 py-3 border rounded-lg appearance-none focus:ring-2 focus:ring-[#309f69] focus:border-transparent transition-all duration-200 ${
                    theme === 'dark' 
                      ? 'border-stone-600 bg-stone-800 text-white [&>option:checked]:bg-[#309f69] [&>option:checked]:text-white' 
                      : 'border-gray-300 bg-gray-50 text-black [&>option:checked]:bg-[#309f69] [&>option:checked]:text-white'
                  }`}
                >
                  <option value="choose" disabled hidden>{t.calculator.packingTypes.choose}</option>
                  <option value="miniPallet">{t.calculator.packingTypes.miniPallet}</option>
                  <option value="euroPallet">{t.calculator.packingTypes.euroPallet}</option>
                  <option value="blockPallet">{t.calculator.packingTypes.blockPallet}</option>
                  <option value="custom">{t.calculator.packingTypes.custom}</option>
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {t.calculator.quantity}
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent transition-all duration-200 ${
                    theme === 'dark' 
                      ? 'border-stone-600 bg-stone-800 text-white' 
                      : 'border-gray-300 bg-gray-50 text-black'
                  } [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                />
              </div>

              {/* Length */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {t.calculator.length} ({t.calculator.units.cm})
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.length}
                  onChange={(e) => handleInputChange('length', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent transition-all duration-200 ${
                    theme === 'dark' 
                      ? 'border-stone-600 bg-stone-800 text-white' 
                      : 'border-gray-300 bg-gray-50 text-black'
                  } [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                />
              </div>

              {/* Width */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {t.calculator.width} ({t.calculator.units.cm})
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.width}
                  onChange={(e) => handleInputChange('width', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent transition-all duration-200 ${
                    theme === 'dark' 
                      ? 'border-stone-600 bg-stone-800 text-white' 
                      : 'border-gray-300 bg-gray-50 text-black'
                  } [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                />
              </div>

              {/* Height */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {t.calculator.height} ({t.calculator.units.cm})
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent transition-all duration-200 ${
                    theme === 'dark' 
                      ? 'border-stone-600 bg-stone-800 text-white' 
                      : 'border-gray-300 bg-gray-50 text-black'
                  } [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                />
              </div>

              {/* Weight */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {t.calculator.weight} ({t.calculator.units.kg})
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent transition-all duration-200 ${
                    theme === 'dark' 
                      ? 'border-stone-600 bg-stone-800 text-white' 
                      : 'border-gray-300 bg-gray-50 text-black'
                  } [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                />
              </div>

              {/* Buttons */}
              <div className="col-span-2 flex gap-4">
                <button
                  onClick={calculateResults}
                  className="flex-1 bg-gradient-to-r from-[#309f69] to-[#2ff9c3] text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  {t.calculator.calculate}
                </button>
                <button
                  onClick={resetForm}
                  className={`px-6 py-3 rounded-lg border font-semibold transition-colors ${
                    theme === 'dark'
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {t.calculator.reset}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className={`p-8 rounded-xl border shadow-lg ${
              theme === 'dark' ? 'bg-stone-900 border-stone-800' : 'bg-white border-gray-200'
            }`}
          >
            <h3 className={`text-2xl font-bold mb-6 text-center ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {t.calculator.results.title}
            </h3>
            
            {results ? (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-stone-800' : 'bg-gray-50'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      {t.calculator.results.totalVolume}
                    </span>
                    <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {results.totalVolume} {t.calculator.units.cbm}
                    </span>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-stone-800' : 'bg-gray-50'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      {t.calculator.results.loadingMeters}
                    </span>
                    <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {results.loadingMeters} {t.calculator.units.ldm}
                    </span>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg border-2 border-[#309f69] ${
                  theme === 'dark' ? 'bg-stone-800' : 'bg-gray-50'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                      {t.calculator.results.chargeableWeight}
                    </span>
                    <span className="font-bold text-[#309f69] text-lg">
                      {results.chargeableWeight} {t.calculator.units.kg}
                    </span>
                  </div>
                </div>
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  )
}