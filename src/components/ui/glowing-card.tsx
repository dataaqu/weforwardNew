import React from "react";

interface GlowingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Starting gradient color.
   */
  fromColor?: string;
  /**
   * Middle gradient color.
   */
  viaColor?: string;
  /**
   * Ending gradient color.
   */
  toColor?: string;
  /**
   * Optional image URL
   */
  imageUrl?: string;
  /**
   * Theme mode
   */
  theme?: 'light' | 'dark';
  /**
   * Mobile mode for smaller glow
   */
  isMobile?: boolean;
}

export default function GlowingCard({
  fromColor = "#4158D0",
  viaColor = "#C850C0",
  toColor = "#FFCC70",
  imageUrl,
  theme = 'dark',
  isMobile = false,
}: GlowingCardProps) {
  return (
    <div
      className={`rounded-2xl bg-gradient-to-r p-0.5 transition-all duration-500 hover:brightness-110 ${
        isMobile ? 'hover:shadow-sm' : 'hover:shadow-glow'
      }`}
      style={{
        backgroundImage: `linear-gradient(to right, ${fromColor}, ${viaColor}, ${toColor})`,
      }}
    >
      <div className={`flex h-48 w-full items-center justify-center rounded-2xl p-6 ${
        theme === 'dark' ? 'bg-stone-900' : 'bg-white'
      }`}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Membership logo"
            className="h-32 w-auto object-contain"
          />
        )}
      </div>
    </div>
  );
}
