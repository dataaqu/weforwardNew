'use client';
import { useTranslation } from './translation-provider';
import { useTheme } from './theme-provider';

interface ServiceTextEffectProps {
  serviceKey: string;
}

export function ServiceTextEffect({ serviceKey }: ServiceTextEffectProps) {
  const { t, language } = useTranslation();
  const { theme } = useTheme();

  const getServiceTitle = () => {
    const services = t.services.services as any;
    return services[serviceKey]?.title || '';
  };

  const renderTitle = () => {
    const title = getServiceTitle();
    const words = title.split(' ');
    
    if (words.length === 1) {
      // Single word - apply gradient to entire word
      return (
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3]">
          {title}
        </span>
      );
    } else {
      // Multiple words - first words white, last word gradient
      const firstWords = words.slice(0, -1).join(' ');
      const lastWord = words[words.length - 1];
      
      return (
        <>
          <span className={theme === 'dark' ? 'text-white' : 'text-black'}>{firstWords} </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#309f69] to-[#2ff9c3]">
            {lastWord}
          </span>
        </>
      );
    }
  };

  return (
    <h1 lang={language} className={`font-bold ${
      serviceKey === 'warehouse' ? 'text-3xl md:text-5xl' : 'text-5xl'
    }`}>
      {renderTitle()}
    </h1>
  );
}