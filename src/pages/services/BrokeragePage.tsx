import { useTranslation } from '../../components/translation-provider'
import { useTheme } from '../../components/theme-provider'
import { ServiceTextEffect } from '../../components/ServiceTextEffect'
import Earth from '../../components/ui/globe'
import { FileText, Shield, HelpCircle, Clock, Users, FileCheck } from 'lucide-react'

export function BrokeragePage() {
  const { t, language } = useTranslation()
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-stone-100'}`}>
      {/* Header */}
      <div className={`pt-20 pb-8 text-center ${
        theme === 'dark' ? 'bg-black' : 'bg-stone-100'
      }`}>
        <div style={{ marginTop: '30px' }}>
          <ServiceTextEffect serviceKey="brokerage" />
        </div>
      </div>

      {/* Two Column Layout: Content Cards + Globe */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content Card */}
          <div className="flex justify-center">
            <div className={`p-4 md:p-8 rounded-lg border w-full ${
              theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <h3 lang={language} className="text-2xl md:text-3xl font-bold mb-6">
                {(() => {
                  if (language === 'ka') {
                    // Georgian: "საბროკერო მომსახურება"
                    return (
                      <>
                        <span className="text-white">საბროკერო</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3]"> მომსახურება</span>
                      </>
                    )
                  } else {
                    // English: "CUSTOMS BROKERAGE SERVICES"
                    return (
                      <>
                        <span className="text-white">CUSTOMS BROKERAGE</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3]"> SERVICES</span>
                      </>
                    )
                  }
                })()}
              </h3>
              <div className="space-y-3 text-left">
                <div className={`text-base md:text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.brokerage.services.description.split('\n').map((line, index) => {
                    const cleanLine = line.startsWith('•') ? line.substring(1).trim() : line
                    
                    const getIcon = (text: string) => {
                      if (text.includes('Import, export & transit declarations') || text.includes('იმპორტის, ექსპორტისა და ტრანზიტის დეკლარაციები')) {
                        return <FileText className="w-5 h-5 text-[#309f69] mr-2 flex-shrink-0 mt-1" />
                      }
                      if (text.includes('Document verification') || text.includes('დოკუმენტების გადამოწმება')) {
                        return <Shield className="w-5 h-5 text-[#309f69] mr-2 flex-shrink-0 mt-1" />
                      }
                      if (text.includes('HS code classification') || text.includes('HS კოდების კლასიფიკაცია')) {
                        return <HelpCircle className="w-5 h-5 text-[#309f69] mr-2 flex-shrink-0 mt-1" />
                      }
                      if (text.includes('Temporary import/export') || text.includes('დროებითი იმპორტი/ექსპორტის')) {
                        return <Clock className="w-5 h-5 text-[#309f69] mr-2 flex-shrink-0 mt-1" />
                      }
                      if (text.includes('Representation at customs') || text.includes('წარმომადგენლობა საბაჟოში')) {
                        return <Users className="w-5 h-5 text-[#309f69] mr-2 flex-shrink-0 mt-1" />
                      }
                      if (text.includes('Preparation of certificates') || text.includes('სერთიფიკატების მომზადება')) {
                        return <FileCheck className="w-5 h-5 text-[#309f69] mr-2 flex-shrink-0 mt-1" />
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