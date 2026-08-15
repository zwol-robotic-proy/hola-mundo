import { cn } from '../utils'

describe('cn - Utility Function', () => {
  describe('Basic functionality', () => {
    it('should merge className strings', () => {
      const result = cn('px-2', 'py-1')
      expect(result).toContain('px-2')
      expect(result).toContain('py-1')
    })

    it('should handle empty strings', () => {
      const result = cn('', 'px-2', '', 'py-1')
      expect(result).toContain('px-2')
      expect(result).toContain('py-1')
    })

    it('should handle conditional classes with objects', () => {
      const result = cn({
        'bg-blue-500': true,
        'bg-red-500': false,
      })
      expect(result).toContain('bg-blue-500')
      expect(result).not.toContain('bg-red-500')
    })

    it('should handle arrays', () => {
      const result = cn(['px-2', 'py-1'], 'bg-white')
      expect(result).toContain('px-2')
      expect(result).toContain('py-1')
      expect(result).toContain('bg-white')
    })
  })

  describe('Tailwind merge behavior', () => {
    it('should resolve conflicting Tailwind classes', () => {
      const result = cn('bg-red-500', 'bg-blue-500')
      expect(result).toContain('bg-blue-500')
      expect(result).not.toContain('bg-red-500')
    })

    it('should handle conflicting padding', () => {
      const result = cn('px-2', 'px-4')
      expect(result).toContain('px-4')
      expect(result).not.toContain('px-2')
    })

    it('should handle multiple conflicting classes', () => {
      const result = cn('p-2 m-2', 'p-4 m-0')
      expect(result).toContain('p-4')
      expect(result).toContain('m-0')
      expect(result).not.toContain('p-2')
      expect(result).not.toContain('m-2')
    })
  })

  describe('Complex scenarios', () => {
    it('should handle mixed input types', () => {
      const result = cn(
        'base-class',
        { 'conditional-class': true, 'excluded-class': false },
        ['array-class-1', 'array-class-2'],
        undefined,
        null
      )
      expect(result).toContain('base-class')
      expect(result).toContain('conditional-class')
      expect(result).not.toContain('excluded-class')
      expect(result).toContain('array-class-1')
      expect(result).toContain('array-class-2')
    })

    it('should handle nested conditions', () => {
      const isActive = true
      const isDisabled = false
      const result = cn(
        'default-styles',
        isActive && 'active-styles',
        isDisabled && 'disabled-styles'
      )
      expect(result).toContain('default-styles')
      expect(result).toContain('active-styles')
      expect(result).not.toContain('disabled-styles')
    })

    it('should preserve custom classes alongside Tailwind', () => {
      const result = cn('custom-class', 'px-4 py-2', 'bg-white')
      expect(result).toContain('custom-class')
      expect(result).toContain('px-4')
      expect(result).toContain('py-2')
      expect(result).toContain('bg-white')
    })
  })

  describe('Edge cases', () => {
    it('should handle no arguments', () => {
      const result = cn()
      expect(typeof result).toBe('string')
    })

    it('should handle single argument', () => {
      const result = cn('px-2')
      expect(result).toBe('px-2')
    })

    it('should handle whitespace-only strings', () => {
      const result = cn('   ', 'px-2', '   ')
      expect(result).toContain('px-2')
    })
  })
})
