"use client";
import Earth from "./ui/globe";
import { useTheme } from './theme-provider';

function ClientFeedback() {
  const { theme } = useTheme();

  return (
    <>
      <section className={`relative h-full min-h-[50vh] ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
      }`}>
        <div className={`absolute bottom-0 left-0 z-[2] right-0 top-0 ${
          theme === 'dark'
            ? '[mask-image:radial-gradient(ellipse_40%_50%_at_50%_0%,#000_60%,transparent_110%)]'
            : '[mask-image:radial-gradient(ellipse_40%_50%_at_50%_0%,#307654_60%,transparent_110%)]'
        }`}></div>

        <div className="flex flex-col pt-0 justify-center items-center min-h-[50vh] relative">
          <div className="w-full max-w-[500px] mx-auto relative z-10 py-10">
            <Earth
              className="w-full"
              baseColor={theme === 'dark' ? [0.08, 0.08, 0.08] : [0.188, 0.463, 0.329]}
              markerColor={theme === 'dark' ? [0, 1, 0] : [0.1, 0.3, 0.2]}
              glowColor={[0, 0, 0]}
              dark={theme === 'dark' ? 1 : 0}
              mapBrightness={theme === 'dark' ? 6 : 2}
              diffuse={theme === 'dark' ? 1.2 : 0.8}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default ClientFeedback;
