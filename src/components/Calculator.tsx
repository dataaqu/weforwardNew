import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2 } from 'lucide-react'
import { useTranslation } from './translation-provider'
import { useTheme } from './theme-provider'

interface CargoRow {
  id: string
  packingType: string
  quantity: number
  length: string
  width: string
  height: string
  weight: string
}

interface CalculatorResult {
  totalVolume: number
  loadingMeters: number
  chargeableWeight: number
  totalWeight: number
  totalPallets: number
}

export function Calculator() {
  const { t, language } = useTranslation()
  const { theme } = useTheme()
  
  const [cargoRows, setCargoRows] = useState<CargoRow[]>([
    {
      id: '1',
      packingType: 'choose',
      quantity: 1,
      length: '',
      width: '',
      height: '',
      weight: ''
    }
  ])
  
  const [results, setResults] = useState<CalculatorResult | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [showValidationError, setShowValidationError] = useState(false)

  const handleInputChange = (rowId: string, field: string, value: string | number) => {
    setCargoRows(prevRows => 
      prevRows.map(row => {
        if (row.id !== rowId) return row

        if (field === 'packingType') {
          // Auto-fill dimensions based on packing type
          if (value === 'miniPallet') {
            return { ...row, packingType: value as string, length: '80', width: '60' }
          } else if (value === 'euroPallet') {
            return { ...row, packingType: value as string, length: '120', width: '80' }
          } else if (value === 'blockPallet') {
            return { ...row, packingType: value as string, length: '120', width: '100' }
          }
        }
        
        return {
          ...row,
          [field]: value
        }
      })
    )
  }

  const addCargoRow = () => {
    const newRow: CargoRow = {
      id: Date.now().toString(),
      packingType: 'choose',
      quantity: 1,
      length: '',
      width: '',
      height: '',
      weight: ''
    }
    setCargoRows(prev => [...prev, newRow])
  }

  const removeCargoRow = (rowId: string) => {
    if (cargoRows.length > 1) {
      setCargoRows(prev => prev.filter(row => row.id !== rowId))
      // Hide results when a row is removed
      setResults(null)
      setShowResults(false)
    }
  }

  const calculateResults = () => {
    // Check if all rows have complete information
    const hasIncompleteRows = cargoRows.some(row => {
      const quantity = Number(row.quantity) || 0
      const length = Number(row.length) || 0
      const width = Number(row.width) || 0
      const height = Number(row.height) || 0
      const weight = Number(row.weight) || 0
      
      return row.packingType === 'choose' || quantity <= 0 || length <= 0 || width <= 0 || height <= 0 || weight <= 0
    })

    if (hasIncompleteRows) {
      setShowValidationError(true)
      setTimeout(() => setShowValidationError(false), 3000)
      return
    }

    let totalVolume = 0
    let totalLoadingMeters = 0
    let totalChargeableWeight = 0
    let totalWeight = 0
    let totalPallets = 0

    cargoRows.forEach(row => {
      const quantity = Number(row.quantity) || 0
      const lengthNum = Number(row.length) || 0
      const widthNum = Number(row.width) || 0
      const heightNum = Number(row.height) || 0
      const weightNum = Number(row.weight) || 0
      
      // Calculate volume using the formula: m³ = (L_cm × W_cm × H_cm) / 1,000,000
      const volumePerUnit = (lengthNum * widthNum * heightNum) / 1000000
      totalVolume += volumePerUnit * quantity
      
      // Convert cm to meters for loading meter calculations
      const lengthM = lengthNum / 100
      const widthM = widthNum / 100
      
      // Calculate loading meters using the formula: LDM = (L × W) / 2.4
      totalLoadingMeters += ((lengthM * widthM) / 2.4) * quantity
      
      // Calculate chargeable weight using the formula: (L × W × H) / 6000
      totalChargeableWeight += ((lengthNum * widthNum * heightNum) / 6000) * quantity
      
      // Calculate total actual weight
      totalWeight += weightNum * quantity
      
      // Calculate total pallets
      totalPallets += quantity
    })

    setResults({
      totalVolume: Number(totalVolume.toFixed(3)),
      loadingMeters: Number(totalLoadingMeters.toFixed(2)),
      chargeableWeight: Number(totalChargeableWeight.toFixed(2)),
      totalWeight: Number(totalWeight.toFixed(2)),
      totalPallets: totalPallets
    })
    setShowResults(true)
  }

  const resetForm = () => {
    setCargoRows([
      {
        id: '1',
        packingType: 'choose',
        quantity: 1,
        length: '',
        width: '',
        height: '',
        weight: ''
      }
    ])
    setResults(null)
    setShowResults(false)
    setShowValidationError(false)
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

        <div className="max-w-6xl mx-auto">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className={`p-8 rounded-xl border shadow-lg mb-8 ${
              theme === 'dark' ? 'bg-stone-900 border-stone-800' : 'bg-white border-gray-200'
            }`}
          >
            <div className="space-y-6">
              {/* Desktop Header Row - Hidden on Mobile */}
              <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-medium">
                <div className={`col-span-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.calculator.packingType}
                </div>
                <div className={`col-span-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.calculator.quantity}
                </div>
                <div className={`col-span-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.calculator.length} ({t.calculator.units.cm})
                </div>
                <div className={`col-span-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.calculator.width} ({t.calculator.units.cm})
                </div>
                <div className={`col-span-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.calculator.height} ({t.calculator.units.cm})
                </div>
                <div className={`col-span-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.calculator.weight} ({t.calculator.units.kg})
                </div>
                <div className="col-span-1"></div>
              </div>

              {/* Cargo Rows */}
              {cargoRows.map((row, index) => (
                <div key={row.id}>
                  {/* Desktop Layout */}
                  <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                    {/* Packing Type */}
                    <div className="col-span-2">
                      <select
                        value={row.packingType}
                        onChange={(e) => handleInputChange(row.id, 'packingType', e.target.value)}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23309f69' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: 'right 0.5rem center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '1.5em 1.5em',
                          paddingRight: '2.5rem'
                        }}
                        className={`w-full px-3 py-2 border rounded-lg appearance-none focus:ring-2 focus:ring-[#309f69] focus:border-transparent transition-all duration-200 ${
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
                    <div className="col-span-1">
                      <input
                        type="number"
                        min="1"
                        value={row.quantity}
                        onChange={(e) => handleInputChange(row.id, 'quantity', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent transition-all duration-200 ${
                          theme === 'dark' 
                            ? 'border-stone-600 bg-stone-800 text-white' 
                            : 'border-gray-300 bg-gray-50 text-black'
                        } [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                      />
                    </div>

                    {/* Length */}
                    <div className="col-span-2">
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={row.length}
                        onChange={(e) => handleInputChange(row.id, 'length', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent transition-all duration-200 ${
                          theme === 'dark' 
                            ? 'border-stone-600 bg-stone-800 text-white' 
                            : 'border-gray-300 bg-gray-50 text-black'
                        } [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                      />
                    </div>

                    {/* Width */}
                    <div className="col-span-2">
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={row.width}
                        onChange={(e) => handleInputChange(row.id, 'width', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent transition-all duration-200 ${
                          theme === 'dark' 
                            ? 'border-stone-600 bg-stone-800 text-white' 
                            : 'border-gray-300 bg-gray-50 text-black'
                        } [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                      />
                    </div>

                    {/* Height */}
                    <div className="col-span-2">
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={row.height}
                        onChange={(e) => handleInputChange(row.id, 'height', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent transition-all duration-200 ${
                          theme === 'dark' 
                            ? 'border-stone-600 bg-stone-800 text-white' 
                            : 'border-gray-300 bg-gray-50 text-black'
                        } [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                      />
                    </div>

                    {/* Weight */}
                    <div className="col-span-2">
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={row.weight}
                        onChange={(e) => handleInputChange(row.id, 'weight', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent transition-all duration-200 ${
                          theme === 'dark' 
                            ? 'border-stone-600 bg-stone-800 text-white' 
                            : 'border-gray-300 bg-gray-50 text-black'
                        } [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                      />
                    </div>

                    {/* Remove Button */}
                    <div className="col-span-1 flex justify-center">
                      {cargoRows.length > 1 && (
                        <button
                          onClick={() => removeCargoRow(row.id)}
                          className={`w-8 h-8 rounded-lg border transition-all duration-200 hover:scale-110 flex items-center justify-center ${
                            theme === 'dark'
                              ? 'border-red-600 text-red-400 hover:bg-red-600 hover:text-white hover:border-red-500'
                              : 'border-red-300 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-500'
                          }`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className={`md:hidden p-4 rounded-lg border ${
                    theme === 'dark' ? 'bg-stone-800 border-stone-700' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Cargo #{index + 1}
                      </h4>
                      {cargoRows.length > 1 && (
                        <button
                          onClick={() => removeCargoRow(row.id)}
                          className={`w-8 h-8 rounded-lg border transition-all duration-200 hover:scale-110 flex items-center justify-center ${
                            theme === 'dark'
                              ? 'border-red-600 text-red-400 hover:bg-red-600 hover:text-white hover:border-red-500'
                              : 'border-red-300 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-500'
                          }`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Packing Type - Full Width */}
                      <div className="col-span-2">
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {t.calculator.packingType}
                        </label>
                        <select
                          value={row.packingType}
                          onChange={(e) => handleInputChange(row.id, 'packingType', e.target.value)}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23309f69' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: 'right 0.5rem center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '1.5em 1.5em',
                            paddingRight: '2.5rem'
                          }}
                          className={`w-full px-3 py-3 border rounded-lg appearance-none focus:ring-2 focus:ring-[#309f69] focus:border-transparent transition-all duration-200 ${
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
                          value={row.quantity}
                          onChange={(e) => handleInputChange(row.id, 'quantity', e.target.value)}
                          className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent transition-all duration-200 ${
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
                          value={row.weight}
                          onChange={(e) => handleInputChange(row.id, 'weight', e.target.value)}
                          className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent transition-all duration-200 ${
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
                          value={row.length}
                          onChange={(e) => handleInputChange(row.id, 'length', e.target.value)}
                          className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent transition-all duration-200 ${
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
                          value={row.width}
                          onChange={(e) => handleInputChange(row.id, 'width', e.target.value)}
                          className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent transition-all duration-200 ${
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
                          value={row.height}
                          onChange={(e) => handleInputChange(row.id, 'height', e.target.value)}
                          className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[#309f69] focus:border-transparent transition-all duration-200 ${
                            theme === 'dark' 
                              ? 'border-stone-600 bg-stone-800 text-white' 
                              : 'border-gray-300 bg-gray-50 text-black'
                          } [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <div className="flex justify-center sm:justify-start">
                  <button
                    onClick={addCargoRow}
                    className={`w-12 h-12 rounded-full border-2 border-[#309f69] text-[#309f69] hover:bg-[#309f69] hover:text-white transition-all duration-200 hover:scale-110 flex items-center justify-center shadow-lg hover:shadow-xl ${
                      theme === 'dark' ? 'bg-stone-800 hover:bg-[#309f69]' : 'bg-white hover:bg-[#309f69]'
                    }`}
                    title="Add new cargo row"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={calculateResults}
                    className="w-full sm:w-auto bg-gradient-to-r from-[#309f69] to-[#2ff9c3] text-black py-3 px-8 rounded-lg hover:opacity-90 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl text-base sm:text-lg"
                    style={{ fontFamily: 'BankGothic' }}
                  >
                    {t.calculator.calculate}
                  </button>
                  
                  <button
                    onClick={resetForm}
                    className={`w-full sm:w-auto px-6 py-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 text-base sm:text-lg ${
                      theme === 'dark'
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                    }`}
                    style={{ fontFamily: 'BankGothic' }}
                  >
                    {t.calculator.reset}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Validation Error Popup */}
          {showValidationError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-20 left-4 right-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 sm:max-w-md z-50 p-4 rounded-lg border-l-4 border-red-500 shadow-lg ${
                theme === 'dark' ? 'bg-red-900 border-red-700 text-red-100' : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-base">
                    {language === 'ka' ? 'გთხოვთ შეავსოთ ყველა ველი გამოთვლამდე' : 'Please fill in all fields before calculating'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results */}
          {showResults && results && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`p-8 rounded-xl border shadow-lg ${
                theme === 'dark' ? 'bg-stone-900 border-stone-800' : 'bg-white border-gray-200'
              }`}
            >
              <h3 className={`text-2xl font-bold mb-6 text-center ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {t.calculator.results.title}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-stone-800' : 'bg-gray-50'
                }`}>
                  <div className="text-center">
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      Total Pallets
                    </div>
                    <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {results.totalPallets} {t.calculator.units.pieces}
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-stone-800' : 'bg-gray-50'
                }`}>
                  <div className="text-center">
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.calculator.results.totalVolume}
                    </div>
                    <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {results.totalVolume} {t.calculator.units.cbm}
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-stone-800' : 'bg-gray-50'
                }`}>
                  <div className="text-center">
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.calculator.results.loadingMeters}
                    </div>
                    <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {results.loadingMeters} {t.calculator.units.ldm}
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg border-2 border-[#309f69] ${
                  theme === 'dark' ? 'bg-stone-800' : 'bg-gray-50'
                }`}>
                  <div className="text-center">
                    <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                      {t.calculator.results.chargeableWeight}
                    </div>
                    <div className="text-2xl font-bold text-[#309f69]">
                      {results.chargeableWeight} {t.calculator.units.kg}
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-stone-800' : 'bg-gray-50'
                }`}>
                  <div className="text-center">
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      Total Weight
                    </div>
                    <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {results.totalWeight} {t.calculator.units.kg}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}