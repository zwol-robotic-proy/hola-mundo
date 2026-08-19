import { translations, Language, languageOptions } from '../translations'

describe('Translations Module', () => {
  describe('Language type and options', () => {
    it('should have valid language options', () => {
      expect(languageOptions).toHaveLength(3)
    })

    it('should have Spanish, Portuguese, and English options', () => {
      const values = languageOptions.map(opt => opt.value)
      expect(values).toContain('es')
      expect(values).toContain('pt')
      expect(values).toContain('en')
    })

    it('should have proper labels for each language', () => {
      const labels = languageOptions.map(opt => opt.label)
      expect(labels).toContain('Español')
      expect(labels).toContain('Português')
      expect(labels).toContain('English')
    })

    it('should have consistent structure for all options', () => {
      languageOptions.forEach(opt => {
        expect(opt).toHaveProperty('value')
        expect(opt).toHaveProperty('label')
        expect(typeof opt.value).toBe('string')
        expect(typeof opt.label).toBe('string')
      })
    })
  })

  describe('Translation structure', () => {
    it('should have translations for all supported languages', () => {
      expect(translations).toHaveProperty('es')
      expect(translations).toHaveProperty('pt')
      expect(translations).toHaveProperty('en')
    })

    it('should have all languages as Language type', () => {
      const langs = Object.keys(translations) as Language[]
      langs.forEach(lang => {
        expect(['es', 'pt', 'en']).toContain(lang)
      })
    })

    it('should have consistent keys across all languages', () => {
      const esKeys = Object.keys(translations.es).sort()
      const ptKeys = Object.keys(translations.pt).sort()
      const enKeys = Object.keys(translations.en).sort()

      expect(ptKeys).toEqual(esKeys)
      expect(enKeys).toEqual(esKeys)
    })

    it('should have section keys in each translation', () => {
      const sections = ['nav', 'home']
      
      Object.values(translations).forEach(langTranslations => {
        sections.forEach(section => {
          expect(langTranslations).toHaveProperty(section)
        })
      })
    })
  })

  describe('Navigation translations', () => {
    it('should have all nav keys in Spanish', () => {
      const navKeys = [
        'concept',
        'challenge',
        'engineering',
        'control',
        'ecosystem',
        'startProject',
        'menuToggle',
      ]

      navKeys.forEach(key => {
        expect(translations.es.nav).toHaveProperty(key)
        expect(typeof translations.es.nav[key as keyof typeof translations.es.nav]).toBe('string')
      })
    })

    it('should have Spanish nav concepts', () => {
      expect(translations.es.nav.concept).toContain('01')
      expect(translations.es.nav.challenge).toContain('02')
      expect(translations.es.nav.engineering).toContain('03')
      expect(translations.es.nav.control).toContain('04')
      expect(translations.es.nav.ecosystem).toContain('05')
    })

    it('should have consistent nav structure across languages', () => {
      const navKeysEs = Object.keys(translations.es.nav)
      const navKeysPt = Object.keys(translations.pt.nav)
      const navKeysEn = Object.keys(translations.en.nav)

      expect(navKeysPt.sort()).toEqual(navKeysEs.sort())
      expect(navKeysEn.sort()).toEqual(navKeysEs.sort())
    })
  })

  describe('Home section translations', () => {
    it('should have badge in all languages', () => {
      expect(translations.es.home).toHaveProperty('badge')
      expect(translations.pt.home).toHaveProperty('badge')
      expect(translations.en.home).toHaveProperty('badge')
    })

    it('should have hero content', () => {
      const heroKeys = ['heroTitle', 'heroTitleAccent', 'heroSubtitle']
      heroKeys.forEach(key => {
        expect(translations.es.home).toHaveProperty(key)
      })
    })

    it('should have CTA buttons in all translations', () => {
      const ctaKeys = ['ctaExplore', 'ctaSpecs']
      ctaKeys.forEach(key => {
        expect(translations.es.home).toHaveProperty(key)
        expect(translations.pt.home).toHaveProperty(key)
        expect(translations.en.home).toHaveProperty(key)
      })
    })

    it('should have stats content', () => {
      const statKeys = [
        'statBrain',
        'statLatency',
        'statNodes',
        'statBrainValue',
        'statLatencyValue',
        'statNodesValue',
      ]

      statKeys.forEach(key => {
        expect(translations.es.home).toHaveProperty(key)
      })
    })

    it('should have marquee content', () => {
      expect(translations.es.home).toHaveProperty('marquee')
      expect(translations.es.home.marquee).toHaveProperty('architecture')
      expect(translations.es.home.marquee).toHaveProperty('localFirst')
      expect(translations.es.home.marquee).toHaveProperty('topology')
      expect(translations.es.home.marquee).toHaveProperty('hmi')
      expect(translations.es.home.marquee).toHaveProperty('nodes')
      expect(translations.es.home.marquee).toHaveProperty('assistant')
    })

    it('should have sections object', () => {
      expect(translations.es.home).toHaveProperty('sections')
      expect(typeof translations.es.home.sections).toBe('object')
    })
  })

  describe('Content consistency', () => {
    it('should have non-empty strings for all translations', () => {
      const checkNonEmptyStrings = (obj: any, path: string = '') => {
        Object.entries(obj).forEach(([key, value]) => {
          const currentPath = `${path}.${key}`
          if (typeof value === 'string') {
            expect(value.length).toBeGreaterThan(0)
          } else if (typeof value === 'object' && value !== null) {
            checkNonEmptyStrings(value, currentPath)
          }
        })
      }

      Object.entries(translations).forEach(([lang, translation]) => {
        checkNonEmptyStrings(translation, `translations[${lang}]`)
      })
    })

    it('should have Zwol branding in appropriate places', () => {
      expect(translations.es.home.heroTitleAccent).toContain('soft')
      expect(translations.es.home.sections.philosophyTitle).toBeDefined()
    })
  })

  describe('Language selection helpers', () => {
    it('should provide helper to find language by value', () => {
      const option = languageOptions.find(opt => opt.value === 'es')
      expect(option).toBeDefined()
      expect(option?.label).toBe('Español')
    })

    it('should provide way to get all language values', () => {
      const values = languageOptions.map(opt => opt.value) as Language[]
      expect(values).toHaveLength(3)
      expect(values).toEqual(expect.arrayContaining(['es', 'pt', 'en']))
    })

    it('should provide way to validate language', () => {
      const isValidLanguage = (lang: any): lang is Language => {
        return languageOptions.some(opt => opt.value === lang)
      }

      expect(isValidLanguage('es')).toBe(true)
      expect(isValidLanguage('pt')).toBe(true)
      expect(isValidLanguage('en')).toBe(true)
      expect(isValidLanguage('fr')).toBe(false)
      expect(isValidLanguage('invalid')).toBe(false)
    })
  })

  describe('Type safety', () => {
    it('should allow accessing translations with correct types', () => {
      const lang: Language = 'es'
      const translation = translations[lang]
      
      expect(translation).toBeDefined()
      expect(translation.nav).toBeDefined()
      expect(translation.home).toBeDefined()
    })

    it('should provide type-safe language iteration', () => {
      const langs: Language[] = ['es', 'pt', 'en']
      
      langs.forEach(lang => {
        expect(translations[lang]).toBeDefined()
        expect(typeof translations[lang]).toBe('object')
      })
    })
  })
})
