'use client';
import { useState, useEffect } from 'react';
import { TextEffect } from './core/text-effect';
import { useTranslation } from './translation-provider';

export function TextEffectWithExit() {
  const [trigger, setTrigger] = useState(false);
  const { t, language } = useTranslation();

  useEffect(() => {
    setTrigger(false);
    const timeout = setTimeout(() => {
      setTrigger(true);
    }, 50);
    return () => clearTimeout(timeout);
  }, [language]);

  const blurSlideVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.01 },
      },
      exit: {
        transition: { staggerChildren: 0.01, staggerDirection: 1 },
      },
    },
    item: {
      hidden: {
        opacity: 0,
        filter: 'blur(10px) brightness(0%)',
        y: 0,
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px) brightness(100%)',
        transition: {
          duration: 0.4,
        },
      },
      exit: {
        opacity: 0,
        y: -30,
        filter: 'blur(10px) brightness(0%)',
        transition: {
          duration: 0.4,
        },
      },
    },
  };

  return (
    <TextEffect
      className="inline-flex text-5xl font-bold"
      per="char"
      variants={blurSlideVariants}
      trigger={trigger}
    >
      {t.services.services.roadFreight.title}
    </TextEffect>
  );
}