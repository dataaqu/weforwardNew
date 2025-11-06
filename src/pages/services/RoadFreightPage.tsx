import { useTranslation } from '../../components/translation-provider'
import { useTheme } from '../../components/theme-provider'
import { ServiceTextEffect } from '../../components/ServiceTextEffect'
import Earth from '../../components/ui/globe'
import { Warehouse } from 'lucide-react'
import europeFlag from '../../assets/flags/europe.webp'
import turkeyFlag from '../../assets/flags/turkey.webp'
import chinaFlag from '../../assets/flags/china.webp'
import azerbaijanFlag from '../../assets/flags/azerbaijan.webp'
import armeniaFlag from '../../assets/flags/armenia.webp'
import belarusFlag from '../../assets/flags/belarus.webp'
import ukraineFlag from '../../assets/flags/ukraine.webp'
import russiaFlag from '../../assets/flags/russia.webp'
import kazakhstanFlag from '../../assets/flags/kazagstan.webp'
import uzbekistanFlag from '../../assets/flags/uzbekistan.webp'
import tajikistanFlag from '../../assets/flags/tajikistan.webp'
import kyrgyzstanFlag from '../../assets/flags/kirgiztan.webp'

export function RoadFreightPage() {
  const { t, language } = useTranslation()
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-stone-100'}`}>
      {/* Header */}
      <div className={`pt-20 pb-8 text-center ${
        theme === 'dark' ? 'bg-black' : 'bg-stone-100'
      }`}>
        <div style={{ marginTop: '30px' }}>
          <ServiceTextEffect serviceKey="roadFreight" />
        </div>
      </div>

      {/* Two Column Layout: Content Cards + Globe */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content Cards */}
          <div className="space-y-8 flex flex-col justify-center">
            {/* First Card - Full Trailer */}
            <div className={`p-4 md:p-8 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <h3 lang={language} className="text-2xl md:text-3xl font-bold mb-6">
                {(() => {
                  if (language === 'ka') {
                    // Georgian: "სრული ტრაილერებით ტრანსპორტირება"
                    return (
                      <>
                        <span className="text-white">სრული</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3]"> ტრაილერებით ტრანსპორტირება</span>
                      </>
                    )
                  } else {
                    // English: "FULL TRUCK TRANSPORTATION (FTL)"
                    return (
                      <>
                        <span className="text-white">FULL TRUCK</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3]"> TRANSPORTATION (FTL)</span>
                      </>
                    )
                  }
                })()}
              </h3>
              <div className="space-y-3 text-left">
                <div className={`text-base md:text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} grid grid-cols-1 sm:grid-cols-2 gap-3`}>
                  {t.roadFreight.fullTrailer.description.split('\n').map((line, index) => {
                    const getFlag = (countryLine: string) => {
                      if (countryLine === 'Europe' || countryLine === 'ევროპა') return europeFlag
                      if (countryLine === 'Turkey' || countryLine === 'თურქეთი') return turkeyFlag
                      if (countryLine === 'China' || countryLine === 'ჩინეთი') return chinaFlag
                      if (countryLine === 'Azerbaijan' || countryLine === 'აზერბაიჯანი') return azerbaijanFlag
                      if (countryLine === 'Armenia' || countryLine === 'სომხეთი') return armeniaFlag
                      if (countryLine === 'Belarus' || countryLine === 'ბელარუსი') return belarusFlag
                      if (countryLine === 'Ukraine' || countryLine === 'უკრაინა') return ukraineFlag
                      if (countryLine === 'Russia' || countryLine === 'რუსეთი') return russiaFlag
                      return null
                    }

                    const isCentralAsian = line === 'Central Asian Countries' || line === 'შუა აზიის ქვეყნები'
                    const flagSrc = getFlag(line)

                    if (isCentralAsian) {
                      return (
                        <div key={index} className="col-span-2 flex items-center gap-2">
                          <p>{line}</p>
                          <div className="grid grid-cols-2 gap-1 sm:gap-2">
                            <img src={kazakhstanFlag} alt="Kazakhstan flag" className="w-5 h-3 sm:w-6 sm:h-4 object-cover" />
                            <img src={uzbekistanFlag} alt="Uzbekistan flag" className="w-5 h-3 sm:w-6 sm:h-4 object-cover" />
                            <img src={tajikistanFlag} alt="Tajikistan flag" className="w-5 h-3 sm:w-6 sm:h-4 object-cover" />
                            <img src={kyrgyzstanFlag} alt="Kyrgyzstan flag" className="w-5 h-3 sm:w-6 sm:h-4 object-cover" />
                          </div>
                        </div>
                      )
                    }

                    return (
                      <p key={index} className="flex items-center gap-2">
                        {line}
                        {flagSrc && (
                          <img src={flagSrc} alt={`${line} flag`} className="w-6 h-4 sm:w-8 sm:h-5 object-cover" />
                        )}
                      </p>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Second Card - Groupage Cargo */}
            <div className={`p-4 md:p-8 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <h3 lang={language} className="text-2xl md:text-3xl font-bold mb-6">
                {(() => {
                  if (language === 'ka') {
                    // Georgian: "ნაკრები ტვირთების ტრანსპორტირება"
                    return (
                      <>
                        <span className="text-white">ნაკრები</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3]"> ტვირთების ტრანსპორტირება</span>
                      </>
                    )
                  } else {
                    // English: "GROUPAGE CARGO TRANSPORTATION (LTL)"
                    return (
                      <>
                        <span className="text-white">GROUPAGE</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3]"> CARGO TRANSPORTATION (LTL)</span>
                      </>
                    )
                  }
                })()}
              </h3>
              <div className="space-y-4 text-left">
                {(() => {
                  const lines = t.roadFreight.groupage.description.split('\n')
                  const warehouseHeaderText = lines.find(line => 
                    line.includes('Shared warehouses located in') || line.includes('გაზიარებული საწყობები მდებარეობს')
                  )
                  const countryLines = lines.filter(line => 
                    !line.includes('Shared warehouses located in') && 
                    !line.includes('გაზიარებული საწყობები მდებარეობს') &&
                    line.trim() !== ''
                  )

                  return (
                    <>
                      {/* Warehouse Header */}
                      {warehouseHeaderText && (
                        <div className="flex items-center gap-2 mb-4">
                          <Warehouse className="w-5 h-5 text-[#309f69]" />
                          <h4 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {warehouseHeaderText.replace(':', '')}
                          </h4>
                        </div>
                      )}

                      {/* Countries Grid */}
                      <div className={`text-base md:text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} grid grid-cols-1 sm:grid-cols-2 gap-3`}>
                        {countryLines.map((line, index) => {
                          const cleanLine = line.startsWith('•') ? line.substring(1).trim() : line
                          
                          const getGroupageFlag = (countryLine: string) => {
                            if (countryLine === 'Europe' || countryLine === 'ევროპა') return europeFlag
                            if (countryLine === 'China' || countryLine === 'ჩინეთი') return chinaFlag
                            if (countryLine === 'Turkey' || countryLine === 'თურქეთი') return turkeyFlag
                            if (countryLine === 'Ukraine' || countryLine === 'უკრაინა') return ukraineFlag
                            if (countryLine === 'Russia' || countryLine === 'რუსეთი') return russiaFlag
                            return null
                          }

                          const flagSrc = getGroupageFlag(cleanLine)

                          return (
                            <p key={index} className="flex items-center gap-2 mb-2">
                              {cleanLine}
                              {flagSrc && (
                                <img src={flagSrc} alt={`${cleanLine} flag`} className="w-6 h-4 sm:w-8 sm:h-5 object-cover" />
                              )}
                            </p>
                          )
                        })}
                      </div>
                    </>
                  )
                })()}
              </div>
            </div>
          </div>

          {/* Right Side - Globe */}
          <div className="flex justify-center lg:sticky lg:top-24">
            <div className="w-full max-w-[500px]">
              <Earth
                className="w-full"
                baseColor={[0.188, 0.463, 0.329]}
                markerColor={[0, 0, 0]}
                glowColor={[0, 0, 0]}
                dark={theme === 'dark' ? 1 : 0}
                mapBrightness={theme === 'dark' ? 6 : 2}
                diffuse={theme === 'dark' ? 1.2 : 0.8}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
