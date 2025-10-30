import { useTranslation } from '../../components/translation-provider'
import { useTheme } from '../../components/theme-provider'
import { ServiceTextEffect } from '../../components/ServiceTextEffect'
import Earth from '../../components/ui/globe'

export function RailFreightPage() {
  const { t, language } = useTranslation()
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-stone-100'}`}>
      {/* Header */}
      <div className={`pt-20 pb-8 text-center ${
        theme === 'dark' ? 'bg-black' : 'bg-stone-100'
      }`}>
        <div style={{ marginTop: '30px' }}>
          <ServiceTextEffect serviceKey="railFreight" />
        </div>
      </div>

      {/* Two Column Layout: Content Cards + Globe */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content Cards */}
          <div className="space-y-8 flex flex-col justify-center">
            {/* First Card - Full Container */}
            <div className={`p-8 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <h3 lang={language} className={`text-3xl font-bold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {t.railFreight.fullContainer.title}
              </h3>
              <div className="space-y-3 text-left">
                <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  {t.railFreight.fullContainer.description.split('\n').map((line, index) => (
                    <p key={index} className="mb-2 flex items-start">
                      {line.startsWith('•') ? (
                        <>
                          <span className="text-4xl mr-4 bg-gradient-to-r from-[#309f69] to-[#2ff9c3] bg-clip-text text-transparent font-bold leading-none -mt-2">•</span>
                          <span>{line.substring(1).trim()}</span>
                        </>
                      ) : (
                        line
                      )}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Second Card - Groupage Container */}
            <div className={`p-8 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <h3 lang={language} className={`text-3xl font-bold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {t.railFreight.groupage.title}
              </h3>
              <div className="space-y-3 text-left">
                <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  {t.railFreight.groupage.description.split('\n').map((line, index) => (
                    <p key={index} className="mb-2 flex items-start">
                      {line.startsWith('•') ? (
                        <>
                          <span className="text-4xl mr-4 bg-gradient-to-r from-[#309f69] to-[#2ff9c3] bg-clip-text text-transparent font-bold leading-none -mt-2">•</span>
                          <span>{line.substring(1).trim()}</span>
                        </>
                      ) : (
                        line
                      )}
                    </p>
                  ))}
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