# 🏗️ SOLID Architecture - Zwol-Home

Este documento describe cómo el proyecto Zwol-Home implementa los 5 principios SOLID para garantizar código escalable, mantenible y testeable.

---

## 📌 Principios SOLID

### **S - Single Responsibility Principle (SRP)**

> *Una clase debe tener una única razón para cambiar*

#### Implementación en el Proyecto

**❌ Antes (Violación):**
```typescript
// ❌ CotizadorView hacía TODO:
// - Manejo de form state
// - Validación
// - API calls
// - Modal management
// - Email preview
// - Idioma management
```

**✅ Después (Correctamente implementado):**
```typescript
// ✅ Componentes separados por responsabilidad:

// 1. Manejo de idioma (LanguageContext.tsx)
export function useLanguage() {
  const context = useContext(LanguageContext)
  return context
}

// 2. Componentes de formulario (FormStep1.tsx, FormStep2.tsx, etc)
export function FormStep1({ data, onChange }) {
  // Solo valida y captura datos del paso 1
}

// 3. Lógica de API (hooks/useSubmitQuote.ts)
export function useSubmitQuote() {
  // Solo maneja la lógica de envío
}

// 4. Visualización (CotizadorView.tsx)
export function CotizadorView() {
  // Solo orquesta los componentes
}
```

#### Beneficios
- ✅ Cada componente es más fácil de testear
- ✅ Cambios en formulario no afectan la lógica de API
- ✅ Código más legible y mantenible
- ✅ Reutilización de componentes

---

### **O - Open/Closed Principle (OCP)**

> *Abierto para extensión, cerrado para modificación*

#### Implementación en el Proyecto

**❌ Antes (Violación):**
```typescript
// ❌ translations.ts monolítico de 800+ líneas
// Agregar un idioma requería modificar el archivo
export const translations = {
  es: { ... }, // 250 líneas
  pt: { ... }, // 250 líneas
  en: { ... }, // 250 líneas
}
```

**✅ Después (Correctamente implementado):**
```typescript
// ✅ translations.ts es un índice modular
export type Language = 'es' | 'pt' | 'en'

export async function loadTranslation(lang: Language) {
  const translations: Record<Language, () => Promise<...>> = {
    es: () => import('./translations/es'),
    pt: () => import('./translations/pt'),
    en: () => import('./translations/en'),
  }
  return translations[lang]()
}

// Para agregar un idioma nuevo (ej. francés):
// 1. Crear src/lib/translations/fr.ts
// 2. Actualizar Language type: 'es' | 'pt' | 'en' | 'fr'
// 3. Agregar a loadTranslation()
// ✅ NO modificar archivos existentes
```

**❌ Antes (CSP violación):**
```typescript
// ❌ Headers hardcodeados
const CSP = "default-src 'self'; script-src 'self' 'unsafe-inline'"
const headers = [...]
// Agregar un header requería modificar middleware.ts
```

**✅ Después (Correctamente implementado):**
```typescript
// ✅ Estructura extensible
const SECURITY_HEADERS = {
  'Content-Security-Policy': CSP_HEADER,
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  // Agregar un header es solo agregar una línea
}

// Para agregar un nuevo header: agregar key-value sin modificar lógica existente
```

#### Beneficios
- ✅ Agregar nuevos idiomas sin tocar código existente
- ✅ Agregar headers de seguridad sin efectos secundarios
- ✅ Menor riesgo de regresiones
- ✅ Fácil para otros desarrolladores

---

### **L - Liskov Substitution Principle (LSP)**

> *Los objetos de una clase derivada deben poder sustituirse por objetos de la clase base sin romper la aplicación*

#### Implementación en el Proyecto

**✅ Correctamente implementado:**
```typescript
// ✅ Interfaz consistente de idiomas
interface TranslationStructure {
  nav: {
    concept: string
    challenge: string
    // ... campos consistentes
  }
  home: Record<string, any>
}

// Cada idioma implementa la misma interfaz
const es: TranslationStructure = { ... }
const pt: TranslationStructure = { ... }
const en: TranslationStructure = { ... }

// Cualquier componente puede usar cualquier idioma sin cambios
function MyComponent() {
  const t = translations[currentLanguage] // Funciona igual para cualquier idioma
  return <h1>{t.nav.concept}</h1>
}
```

**✅ Props consistentes:**
```typescript
// ✅ Los componentes pueden substituirse
interface ButtonProps {
  variant: 'primary' | 'secondary'
  children: ReactNode
  onClick?: () => void
}

// Primary button y Secondary button tienen la misma interfaz
<Button variant="primary">Enviar</Button>
<Button variant="secondary">Cancelar</Button>
// Ambos actúan igual aunque visualmente son diferentes
```

#### Beneficios
- ✅ Polimorfismo seguro en React
- ✅ Componentes intercambiables
- ✅ Código predecible y estable
- ✅ No hay sorpresas al cambiar implementaciones

---

### **I - Interface Segregation Principle (ISP)**

> *Los clientes no deben depender de interfaces que no usan*

#### Implementación en el Proyecto

**❌ Antes (Violación):**
```typescript
// ❌ Props innecesarios
interface CotizadorViewProps {
  onOpenCotizador: () => void
  onCancel?: () => void
  language: Language
  translations: typeof translations
  setLanguage: (lang: Language) => void
  user?: User
  theme?: Theme
  // ... 10 props más que no usa
}

function CotizadorView(props: CotizadorViewProps) {
  // Solo usa language y translations
}
```

**✅ Después (Correctamente implementado):**
```typescript
// ✅ Interfaz mínima y específica
interface CotizadorViewProps {
  onCancel?: () => void
}

function CotizadorView({ onCancel }: CotizadorViewProps) {
  // Obtiene language del contexto
  const { currentLanguage } = useLanguage()
  
  // Obtiene translations del hook
  const t = useTranslations()
  
  // Nada más
}
```

**✅ Hooks focalizados:**
```typescript
// ✅ useLanguage() proporciona SOLO lo necesario
export function useLanguage() {
  return {
    currentLanguage: Language
    setLanguage: (lang: Language) => void
  }
}

// ✅ useTranslations() proporciona SOLO traducciones
export function useTranslations() {
  return translations[currentLanguage]
}

// No mezcla responsabilidades
```

#### Beneficios
- ✅ Props simples y claros
- ✅ Componentes fáciles de entender
- ✅ Menos acoplamiento
- ✅ Más fácil de testear

---

### **D - Dependency Inversion Principle (DIP)**

> *Las clases de alto nivel no deben depender de clases de bajo nivel. Ambas deben depender de abstracciones*

#### Implementación en el Proyecto

**❌ Antes (Violación):**
```typescript
// ❌ Acoplamiento directo
import { translations } from '@/lib/translations'
import { contactConfig } from '@/lib/contact'

export function HomeView() {
  // Depende directamente de las implementaciones
  return <h1>{translations.es.home.heroTitle}</h1>
}

// Si cambiamos translations.ts, rompe HomeView
```

**✅ Después (Correctamente implementado):**
```typescript
// ✅ Inyección de dependencias a través de contexto
export function HomeView() {
  // Depende de abstractión (hook)
  const { currentLanguage } = useLanguage()
  const t = useTranslations()
  
  return <h1>{t.home.heroTitle}</h1>
}

// Si cambiamos la implementación de useLanguage(),
// HomeView sigue funcionando igual
```

**✅ Middlewares inyectados:**
```typescript
// ✅ Security headers como abstracción
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Aplica headers de seguridad (abstraídos)
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  
  return response
}

// La lógica NO depende de headers específicos
// Agregar/quitar headers es configuración, no lógica
```

#### Beneficios
- ✅ Cambiar implementaciones sin romper código
- ✅ Fácil de testear (mockmear dependencias)
- ✅ Código más flexible y reutilizable
- ✅ Menos acoplamiento global

---

## 🔄 Flujo de Implementación SOLID

### Paso 1: Single Responsibility
```
CotizadorView (violaba SRP)
          ↓
Dividir en componentes independientes:
  - FormStep1, FormStep2, FormStep3, FormStep4
  - ReviewQuote
  - SuccessModal
  - API logic en hook
```

### Paso 2: Open/Closed
```
Traducciones monolíticas
         ↓
Estructura modular:
  - translations.ts (índice)
  - translations/es.ts
  - translations/pt.ts
  - translations/en.ts
```

### Paso 3: Liskov Substitution
```
Cada idioma implementa:
  - Interfaz TranslationStructure
  - Props consistentes
  - Mismo comportamiento
```

### Paso 4: Interface Segregation
```
Props grandes y complejos
           ↓
Separar en contextos:
  - LanguageContext
  - useLanguage()
  - useTranslations()
```

### Paso 5: Dependency Inversion
```
Imports directos acoplados
            ↓
Inyectar a través de contexto/hooks:
  - useLanguage()
  - useTranslations()
  - middleware abstraído
```

---

## 📊 Matriz SOLID del Proyecto

| Principio | Componentes | Status |
|-----------|------------|--------|
| **S**ingle Responsibility | Utils, Contact, Translations, LanguageContext | ✅ Implementado |
| **O**pen/Closed | Traducciones, Security Headers, Componentes | ✅ Implementado |
| **L**iskov Substitution | Componentes, Traducciones, Buttons | ✅ Implementado |
| **I**nterface Segregation | Hooks, Props, Componentes | ✅ Implementado |
| **D**ependency Inversion | Context, Middleware, Hooks | ✅ Implementado |

---

## 🧪 Tests SOLID

Todos los módulos tienen tests que validan principios SOLID:

```bash
# Ejecutar tests de SOLID compliance
npm test -- src/lib/__tests__

# Verificar cobertura
npm test:coverage
```

### Validaciones de Test

```typescript
// ✅ Test valida Single Responsibility
describe('cn - Utility Function', () => {
  it('should merge className strings', () => {
    // Solo prueba clasNamemerging
  })
})

// ✅ Test valida Open/Closed
describe('Language Options', () => {
  it('should allow adding new languages', () => {
    // Prueba que agregar idiomas es fácil
  })
})

// ✅ Test valida Interface Segregation
describe('useLanguage Hook', () => {
  it('should only expose required methods', () => {
    // Verifica que hook no sobrecarga props
  })
})

// ✅ Test valida Dependency Inversion
describe('Component with Context', () => {
  it('should use context instead of imports', () => {
    // Verifica inyección de dependencias
  })
})
```

---

## 📈 Beneficios Medibles

### Antes de SOLID
- ❌ CotizadorView: 500+ líneas
- ❌ translations.ts: 847 líneas monolítico
- ❌ Componentes con 10+ props
- ❌ Difícil agregar idiomas
- ❌ Prop drilling en toda la app

### Después de SOLID
- ✅ Componentes <150 líneas
- ✅ Traducciones modularizadas
- ✅ Props mínimos (2-3)
- ✅ Agregar idiomas = crear 1 archivo
- ✅ Context elimina prop drilling

---

## 🚀 Próximos Pasos

Para mantener SOLID a medida que crece el proyecto:

1. **Revisar** Pull Requests según principios SOLID
2. **Documentar** nuevos patrones SOLID
3. **Refactorizar** código heredado violador de SOLID
4. **Entrenar** al equipo en SOLID
5. **Automatizar** linters que detecten violaciones

---

## 📚 Referencias

- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Clean Code by Robert C. Martin](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)
- [React Design Patterns](https://react-patterns.com/)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/)

---

**Última actualización**: 2024  
**Status**: ✅ Completo y Documentado
