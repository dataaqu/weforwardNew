import Earth from './ui/globe'
import { ServiceTextEffect } from './ServiceTextEffect'
import { useTheme } from './theme-provider'

interface ServicePageLayoutProps {
  serviceKey: string;
}

export function ServicePageLayout({ serviceKey }: ServicePageLayoutProps) {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      {/* Header */}
      <div className={`pt-20 pb-8 text-center ${
        theme === 'dark' ? 'bg-black' : 'bg-white'
      }`}>
        <div style={{ marginTop: '30px' }}>
          <ServiceTextEffect serviceKey={serviceKey} />
        </div>
      </div>

      {/* Two Column Layout: Content Cards + Globe */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content Card */}
          <div>
            <div className={`p-8 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <h3 className={`text-3xl font-bold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Service Information
              </h3>
              <div className="space-y-3 text-left">
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Globe */}
          <div className="lg:sticky lg:top-24">
            <div className="w-full max-w-[500px] mx-auto">
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
