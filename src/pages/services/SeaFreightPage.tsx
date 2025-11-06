import { useTranslation } from '../../components/translation-provider'
import { useTheme } from '../../components/theme-provider'
import { ServiceTextEffect } from '../../components/ServiceTextEffect'
import Earth from '../../components/ui/globe'
import { Globe, FileText, Ship } from 'lucide-react'
import chinaFlag from '../../assets/flags/china.webp'
import indiaFlag from '../../assets/flags/india.webp'
import koreaFlag from '../../assets/flags/korea.webp'

export function SeaFreightPage() {
  const { t, language } = useTranslation()
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-stone-100'}`}>
      {/* Header */}
      <div className={`pt-20 pb-8 text-center ${
        theme === 'dark' ? 'bg-black' : 'bg-stone-100'
      }`}>
        <div style={{ marginTop: '30px' }}>
          <ServiceTextEffect serviceKey="seaFreight" />
        </div>
      </div>

      {/* Two Column Layout: Content Cards + Globe */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content Cards */}
          <div className="space-y-8 flex flex-col justify-center">
            {/* First Card - Full Container */}
            <div className={`p-4 md:p-8 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <h3 lang={language} className="text-2xl md:text-3xl font-bold mb-6">
                {(() => {
                  if (language === 'ka') {
                    // Georgian: "სრული საზღვაო კონტეინერებით ტრანსპორტირება"
                    return (
                      <>
                        <span className="text-white">სრული</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3]"> საზღვაო კონტეინერებით ტრანსპორტირება</span>
                      </>
                    )
                  } else {
                    // English: "FULL CONTAINER TRANSPORTATION (FCL)"
                    return (
                      <>
                        <span className="text-white">FULL CONTAINER</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3]"> TRANSPORTATION (FCL)</span>
                      </>
                    )
                  }
                })()}
              </h3>
              <div className="space-y-3 text-left">
                <div className={`text-base md:text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.seaFreight.fullContainer.description.split('\n').map((line, index) => {
                    const cleanLine = line.startsWith('•') ? line.substring(1).trim() : line
                    
                    const getIcon = (text: string) => {
                      if (text.includes('From any country worldwide') || text.includes('მსოფლიოს ნებისმიერი ქვეყნიდან')) {
                        return <Globe className="w-5 h-5 text-[#309f69] mr-2 flex-shrink-0 mt-1" />
                      }
                      if (text.includes('We operate under') || text.includes('ვმუშაობთ')) {
                        return <FileText className="w-5 h-5 text-[#309f69] mr-2 flex-shrink-0 mt-1" />
                      }
                      return null
                    }

                    const icon = getIcon(cleanLine)

                    return (
                      <p key={index} className="mb-2 flex items-start">
                        {icon}
                        <span>{cleanLine}</span>
                      </p>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Second Card - Groupage Container */}
            <div className={`p-4 md:p-8 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <h3 lang={language} className="text-2xl md:text-3xl font-bold mb-6">
                {(() => {
                  if (language === 'ka') {
                    // Georgian: "ნაკრები საზღვაო კონტეინერებით ტრანსპორტირება"
                    return (
                      <>
                        <span className="text-white">ნაკრები</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3]"> საზღვაო კონტეინერებით ტრანსპორტირება</span>
                      </>
                    )
                  } else {
                    // English: "GROUPAGE CONTAINER TRANSPORTATION (LCL)"
                    return (
                      <>
                        <span className="text-white">GROUPAGE CONTAINER</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3]"> TRANSPORTATION (LCL)</span>
                      </>
                    )
                  }
                })()}
              </h3>
              <div className="space-y-3 text-left">
                <div className={`text-base md:text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.seaFreight.groupage.description.split('\n').map((line, index) => {
                    const cleanLine = line.startsWith('•') ? line.substring(1).trim() : line
                    
                    const getIcon = (text: string) => {
                      if (text.includes('From China') || text.includes('ჩინეთიდან')) {
                        return <Globe className="w-5 h-5 text-[#309f69] mr-2 flex-shrink-0 mt-1" />
                      }
                      if (text.includes('Major consolidation') || text.includes('ძირითადი კონსოლიდაციის')) {
                        return <Ship className="w-5 h-5 text-[#309f69] mr-2 flex-shrink-0 mt-1" />
                      }
                      if (text.includes('We operate under') || text.includes('ვმუშაობთ')) {
                        return <FileText className="w-5 h-5 text-[#309f69] mr-2 flex-shrink-0 mt-1" />
                      }
                      return null
                    }

                    const hasFlags = cleanLine.includes('From China') || cleanLine.includes('ჩინეთიდან')
                    const icon = getIcon(cleanLine)

                    return (
                      <div key={index} className="mb-2 flex items-start">
                        {icon}
                        <span>{cleanLine}</span>
                        {hasFlags && (
                          <div className="flex gap-1 sm:gap-2 ml-1">
                            <img src={chinaFlag} alt="China flag" className="w-6 h-4 sm:w-8 sm:h-5 object-cover" />
                            <img src={indiaFlag} alt="India flag" className="w-6 h-4 sm:w-8 sm:h-5 object-cover" />
                            <img src={koreaFlag} alt="Korea flag" className="w-6 h-4 sm:w-8 sm:h-5 object-cover" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
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