import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { translations } from '../lib/translations'
import type { Language, Translations } from '../lib/translations'

interface TranslationContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

interface TranslationProviderProps {
  children: ReactNode
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [language, setLanguage] = useState<Language>('en')

  const contextValue: TranslationContextType = {
    language,
    setLanguage,
    t: translations[language]
  }

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}
