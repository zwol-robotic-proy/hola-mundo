'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { Language } from '@/lib/translations'

/**
 * Context para gestionar el idioma de la aplicación
 * Implementa: Dependency Inversion (DIP)
 * Evita: Prop drilling del language state
 */

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

/**
 * Provider para Language Context
 * Uso: <LanguageProvider>{children}</LanguageProvider>
 * 
 * Responsabilidad única:
 * - Gestionar estado de idioma
 * - Proveer interface consistente
 * - Persistir preferencia en localStorage (opcional)
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setLanguageState] = useState<Language>('es')

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    // Persistir preferencia
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', lang)
    }
  }, [])

  // Cargar preferencia guardada
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('preferred-language') as Language | null
      if (saved && ['es', 'pt', 'en'].includes(saved)) {
        setLanguageState(saved)
      }
    }
  }, [])

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

/**
 * Hook para acceder al contexto de Language
 * 
 * Uso:
 * const { currentLanguage, setLanguage } = useLanguage()
 * 
 * Implementa: Interface Segregation (ISP)
 * Proporciona interfaz mínima requerida
 */
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage debe usarse dentro de <LanguageProvider>')
  }
  return context
}

/**
 * Hook para obtener las traducciones del idioma actual
 * 
 * Uso:
 * const t = useTranslations()
 * const title = t.home.heroTitle
 * 
 * Ventajas:
 * - Type-safe
 * - Reactivo a cambios de idioma
 * - Acceso simplificado
 */
export function useTranslations() {
  const { currentLanguage } = useLanguage()
  // Import dinámico para lazy loading
  const translations = require(`@/lib/translations/${currentLanguage}`).default
  return translations
}
