import { contactConfig, buildWhatsAppLink, getAppUrl } from '../contact'

describe('Contact Module', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  describe('contactConfig object', () => {
    it('should have default values', () => {
      expect(contactConfig.appName).toBe('ZWOL-HOME')
      expect(contactConfig.email).toBe('zwolhome@gmail.com')
      expect(contactConfig.phone).toBe('1136834491')
    })

    it('should read from environment variables', () => {
      process.env.NEXT_PUBLIC_APP_NAME = 'Test App'
      process.env.NEXT_PUBLIC_CONTACT_EMAIL = 'test@example.com'
      
      // Reimport to get new env values
      jest.resetModules()
      const { contactConfig: newConfig } = require('../contact')
      
      expect(newConfig.appName).toBe('Test App')
      expect(newConfig.email).toBe('test@example.com')
    })

    it('should have all required properties', () => {
      expect(contactConfig).toHaveProperty('appName')
      expect(contactConfig).toHaveProperty('appUrl')
      expect(contactConfig).toHaveProperty('email')
      expect(contactConfig).toHaveProperty('notificationEmail')
      expect(contactConfig).toHaveProperty('phone')
      expect(contactConfig).toHaveProperty('phoneDisplay')
      expect(contactConfig).toHaveProperty('instagramUrl')
      expect(contactConfig).toHaveProperty('instagramLabel')
      expect(contactConfig).toHaveProperty('whatsappMessage')
      expect(contactConfig).toHaveProperty('senderName')
      expect(contactConfig).toHaveProperty('senderEmail')
      expect(contactConfig).toHaveProperty('signature')
    })

    it('should have valid email formats', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      expect(emailRegex.test(contactConfig.email)).toBe(true)
      expect(emailRegex.test(contactConfig.notificationEmail)).toBe(true)
      expect(emailRegex.test(contactConfig.senderEmail)).toBe(true)
    })

    it('should have valid URLs', () => {
      const urlRegex = /^https?:\/\/.+/
      expect(urlRegex.test(contactConfig.appUrl)).toBe(true)
      expect(urlRegex.test(contactConfig.instagramUrl)).toBe(true)
    })

    it('should have phone in numeric format', () => {
      const numericRegex = /^\d+$/
      expect(numericRegex.test(contactConfig.phone)).toBe(true)
    })
  })

  describe('buildWhatsAppLink function', () => {
    it('should build a valid WhatsApp link with default parameters', () => {
      const link = buildWhatsAppLink()
      expect(link).toContain('https://wa.me/')
      expect(link).toContain('?text=')
    })

    it('should normalize phone number removing special characters', () => {
      const link = buildWhatsAppLink('+54 11 3683-4491')
      expect(link).toContain('5411')
    })

    it('should handle phone numbers with 54 prefix correctly', () => {
      const link = buildWhatsAppLink('541136834491')
      expect(link).toContain('wa.me/541136834491')
    })

    it('should encode the message properly', () => {
      const message = 'Hola, ¿cómo estás?'
      const link = buildWhatsAppLink('1136834491', message)
      expect(link).toContain(encodeURIComponent(message))
    })

    it('should use default message when not provided', () => {
      const link = buildWhatsAppLink('1136834491')
      expect(link).toContain(encodeURIComponent(contactConfig.whatsappMessage))
    })

    it('should handle various phone number formats', () => {
      const formats = [
        '1136834491',
        '+541136834491',
        '+54 11 3683-4491',
        '11-3683-4491',
      ]

      formats.forEach(phone => {
        const link = buildWhatsAppLink(phone)
        expect(link).toMatch(/^https:\/\/wa\.me\/\d+\?text=/)
      })
    })

    it('should properly construct full phone with 54 country code', () => {
      const link = buildWhatsAppLink('1136834491')
      // Should have 54 + 11 + 3683-4491 (without country code prefix)
      expect(link).toContain('wa.me/54')
    })

    it('should handle custom messages with special characters', () => {
      const specialMessage = 'Consultaría sobre: instalación + configuración'
      const link = buildWhatsAppLink('1136834491', specialMessage)
      expect(link).toContain(encodeURIComponent(specialMessage))
    })
  })

  describe('getAppUrl function', () => {
    it('should return the configured app URL', () => {
      const url = getAppUrl()
      expect(url).toBe(contactConfig.appUrl)
    })

    it('should return a valid URL', () => {
      const url = getAppUrl()
      expect(url).toMatch(/^https?:\/\/.+/)
    })

    it('should return consistent values', () => {
      const url1 = getAppUrl()
      const url2 = getAppUrl()
      expect(url1).toBe(url2)
    })
  })

  describe('Integration scenarios', () => {
    it('should create a complete WhatsApp contact flow', () => {
      const phone = contactConfig.phone
      const message = 'Quiero información sobre el sistema Zwol-Home'
      const link = buildWhatsAppLink(phone, message)
      
      expect(link).toContain('https://wa.me/')
      expect(link).toContain('54')
      expect(link).toContain(encodeURIComponent(message))
    })

    it('should handle fallback email chain correctly', () => {
      expect(contactConfig.email).toBeDefined()
      expect(contactConfig.notificationEmail).toBeDefined()
      expect(typeof contactConfig.email).toBe('string')
      expect(typeof contactConfig.notificationEmail).toBe('string')
    })

    it('should have consistent branding across config', () => {
      expect(contactConfig.senderName).toContain('ZWOL')
      expect(contactConfig.appName).toContain('ZWOL')
      expect(contactConfig.signature).toContain('ZWOL')
    })
  })
})
