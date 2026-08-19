# translations.ts - Sistema de Traducciones Multiidioma

## 📌 Descripción

Sistema centralizado de traducciones para la aplicación Zwol-Home. Proporciona traducciones completas en tres idiomas (Español, Portugués, Inglés) y funciones auxiliares para trabajar con idiomas.

## 🎯 Propósito

- Centralizar todas las traducciones de la aplicación
- Soportar múltiples idiomas (ES, PT, EN)
- Mantener consistencia entre idiomas
- Facilitar agregar nuevos idiomas
- Type-safe con TypeScript

## 📦 Importación

```typescript
import { 
  translations, 
  Language, 
  languageOptions 
} from '@/lib/translations'
```

## 🔧 Exportes

### 1. `Language` - Tipo Union

Define los idiomas soportados por la aplicación.

```typescript
type Language = "es" | "pt" | "en"
```

#### Valores

- `"es"` - Español
- `"pt"` - Portugués (Português)
- `"en"` - Inglés (English)

### 2. `languageOptions` - Array de Opciones

Array readonly con opciones de idioma para selectores y dropdowns.

```typescript
const languageOptions = [
  { value: "es", label: "Español" },
  { value: "pt", label: "Português" },
  { value: "en", label: "English" },
] as const
```

#### Estructura

Cada elemento tiene:
- `value: Language` - Código del idioma
- `label: string` - Etiqueta a mostrar al usuario

#### Casos de Uso

```typescript
// Mapear a opciones de select
<select>
  {languageOptions.map(opt => (
    <option key={opt.value} value={opt.value}>
      {opt.label}
    </option>
  ))}
</select>

// Buscar idioma por código
const esOption = languageOptions.find(opt => opt.value === 'es')
// { value: 'es', label: 'Español' }

// Obtener lista de códigos
const codes = languageOptions.map(opt => opt.value)
// ['es', 'pt', 'en']
```

### 3. `translations` - Objeto Principal

Objeto con todas las traducciones para cada idioma.

```typescript
const translations = {
  es: { /* ... */ },
  pt: { /* ... */ },
  en: { /* ... */ },
}
```

#### Estructura General

```
translations
├── es (Español)
│   ├── nav (Navegación)
│   └── home (Página de Inicio)
├── pt (Portugués)
│   ├── nav
│   └── home
└── en (Inglés)
    ├── nav
    └── home
```

## 📖 Secciones de Traducción

### Sección: `nav` - Navegación

Contiene todas las etiquetas de navegación y menú.

#### Claves disponibles

```typescript
translations.es.nav = {
  concept: string          // "01. Concepto"
  challenge: string        // "02. El Desafío"
  engineering: string      // "03. Arquitectura Robusta"
  control: string          // "04. Interfaces"
  ecosystem: string        // "05. Ecosistema"
  startProject: string     // "Iniciar Proyecto"
  menuToggle: string       // "Abrir menú"
}
```

#### Ejemplo de Uso

```typescript
import { translations, Language } from '@/lib/translations'

// Acceso directo
translations.es.nav.concept        // "01. Concepto"

// Con variable de idioma
const lang: Language = 'pt'
translations[lang].nav.challenge   // "02. O Desafio"

// En componentes
export const Navbar = ({ lang }: { lang: Language }) => {
  const navText = translations[lang].nav
  
  return (
    <nav>
      <a href="#concept">{navText.concept}</a>
      <a href="#challenge">{navText.challenge}</a>
      {/* ... */}
    </nav>
  )
}
```

### Sección: `home` - Página Principal

Contiene todas las traducciones de la página de inicio. Es la sección más grande con múltiples subsecciones.

#### Subsecciones

#### 1. Hero Section
```typescript
translations.es.home = {
  badge: string              // "Ingeniería Residencial..."
  heroTitle: string          // "Tu hogar, tus reglas,"
  heroTitleAccent: string    // "soft de vanguardia."
  heroSubtitle: string       // Subtítulo completo
  quote: string              // Cita destacada
  ctaExplore: string         // "Explorar Ecosistema"
  ctaSpecs: string           // "Especificaciones de Integración"
  // ...
}
```

#### 2. Statistics (Estadísticas)
```typescript
{
  statBrain: string          // "CEREBRO CENTRAL:"
  statLatency: string        // "LATENCIA DE RED:"
  statNodes: string          // "NODOS FÍSICOS I/O:"
  statBrainValue: string     // "ZWOL-CORE"
  statLatencyValue: string   // "0.2ms (CERO LATENCIA)"
  statNodesValue: string     // "HASTA 160 NODOS"
}
```

#### 3. Marquee (Carrusel)
```typescript
{
  marquee: {
    architecture: string     // "Arquitectura Industrial"
    localFirst: string       // "Procesamiento Local First"
    topology: string         // "Topología Descentralizada"
    hmi: string              // "Pantalla Táctil HMI 10\""
    nodes: string            // "Hasta 160 Nodos..."
    assistant: string        // "Integración Home Assistant"
  }
}
```

#### 4. Sections (Secciones Principales)
```typescript
{
  sections: {
    // 01. Filosofía
    philosophyLabel: string
    philosophyTitle: string
    philosophyTitleAccent: string
    philosophyText: string
    card1Title: string
    card1Text: string
    // ... más cards
    
    // 02. Desafío
    challengeLabel: string
    challengeTitle: string
    challengeTitleAccent: string
    // ... contenido del desafío
    
    // 03. Ingeniería
    engineeringLabel: string
    engineeringTitle: string
    // ... contenido técnico
    
    // 04. Control
    controlLabel: string
    controlTitle: string
    // ... contenido de control
  }
}
```

## 📖 Ejemplos de Uso

### Ejemplo 1: Selector de Idioma

```typescript
import { Language, languageOptions, translations } from '@/lib/translations'
import { useState } from 'react'

export const LanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState<Language>('es')

  return (
    <div>
      <select 
        value={currentLang}
        onChange={(e) => setCurrentLang(e.target.value as Language)}
      >
        {languageOptions.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      
      <p>{translations[currentLang].nav.concept}</p>
    </div>
  )
}
```

### Ejemplo 2: Componente Multiidioma Hero

```typescript
import { Language, translations } from '@/lib/translations'

interface HeroProps {
  language: Language
}

export const Hero = ({ language }: HeroProps) => {
  const home = translations[language].home

  return (
    <section className="hero">
      <span className="badge">{home.badge}</span>
      <h1>
        {home.heroTitle}
        <span className="accent">{home.heroTitleAccent}</span>
      </h1>
      <p className="subtitle">{home.heroSubtitle}</p>
      <blockquote>{home.quote}</blockquote>
      <div className="cta-buttons">
        <button>{home.ctaExplore}</button>
        <button>{home.ctaSpecs}</button>
      </div>
    </section>
  )
}
```

### Ejemplo 3: Validador de Idioma Type-Safe

```typescript
import { Language, languageOptions } from '@/lib/translations'

// Función helper para validar idioma
export function isValidLanguage(value: unknown): value is Language {
  return languageOptions.some(opt => opt.value === value)
}

// Uso
const userLang: unknown = getUserLanguageFromURL()

if (isValidLanguage(userLang)) {
  // Ahora TypeScript sabe que userLang es Language
  const text = translations[userLang].nav.concept
} else {
  // Fallback a español
  const text = translations.es.nav.concept
}
```

### Ejemplo 4: Hook Personalizado para Traducciones

```typescript
import { Language, translations } from '@/lib/translations'
import { useRouter } from 'next/router'

// Hook personalizado
export function useTranslation() {
  const router = useRouter()
  const lang = (router.locale || 'es') as Language
  
  return translations[lang]
}

// En componentes
export const MyComponent = () => {
  const t = useTranslation()
  
  return (
    <div>
      <h1>{t.home.heroTitle}</h1>
      <nav>
        <a>{t.nav.concept}</a>
        <a>{t.nav.challenge}</a>
      </nav>
    </div>
  )
}
```

### Ejemplo 5: Traducción Dinámica con Fallback

```typescript
import { Language, translations } from '@/lib/translations'

function getTranslation(lang: Language | unknown, path: string) {
  // Validar idioma
  const validLang: Language = 
    typeof lang === 'string' && ['es', 'pt', 'en'].includes(lang)
      ? (lang as Language)
      : 'es'
  
  // Acceder a path usando objeto navegable
  return getNestedValue(translations[validLang], path)
}

// Uso
const text = getTranslation('es', 'home.heroTitle')
const text2 = getTranslation('invalid', 'home.heroTitle')  // Fallback a ES
```

### Ejemplo 6: Listar Todas las Traducciones

```typescript
import { translations, languageOptions } from '@/lib/translations'

// Mostrar todas las traducciones para un path
function showAllTranslations(path: string) {
  return languageOptions.map(opt => ({
    language: opt.label,
    text: getNestedValue(translations[opt.value], path)
  }))
}

// Resultado
console.log(showAllTranslations('home.heroTitle'))
// [
//   { language: 'Español', text: 'Tu hogar, tus reglas,' },
//   { language: 'Português', text: 'Sua casa, suas regras,' },
//   { language: 'English', text: 'Your home, your rules,' }
// ]
```

## 🧪 Tests

Total de tests: **28**

### Categorías de Tests

#### 1. Tipo Language y Opciones (4 tests)
- Validez de opciones
- Idiomas soportados
- Labels correctos
- Estructura consistente

#### 2. Estructura de Traducciones (4 tests)
- Idiomas presentes
- Tipo Language válido
- Consistencia de keys
- Secciones principales

#### 3. Traducciones de Navegación (3 tests)
- Keys en español
- Conceptos numerados
- Consistencia entre idiomas

#### 4. Traducciones de Home (3 tests)
- Badge en todos los idiomas
- Contenido hero
- Botones CTA
- Contenido de estadísticas

#### 5. Helpers de Selección (3 tests)
- Búsqueda por valor
- Obtener lista de valores
- Validación de idioma

#### 6. Integridad de Contenido (4 tests)
- Strings no vacíos
- Branding consistente

#### 7. Type Safety (4 tests)
- Acceso type-safe
- Iteración type-safe

### Ejecutar Tests

```bash
# Solo tests de translations
npm test -- src/lib/__tests__/translations.test.ts

# Con watch
npm test -- --watch src/lib/__tests__/translations.test.ts

# Con coverage
npm test -- --coverage src/lib/__tests__/translations.test.ts
```

## 💡 Best Practices

### ✅ Hacer

```typescript
// 1. Usar Language como tipo
const currentLang: Language = 'es'
const text = translations[currentLang].nav.concept

// 2. Validar idiomas antes de usar
if (isValidLanguage(userInput)) {
  const t = translations[userInput]
}

// 3. Usar helpers para acceso seguro
const lang = languageOptions.find(o => o.value === 'es')

// 4. Centralizar acceso en hooks/contexto
const useTranslation = () => translations[currentLang]
```

### ❌ Evitar

```typescript
// 1. No typear como string
const lang = 'es'  // Mejor: as Language o Language tipo

// 2. No hardcodear traducciones
const title = "Tu hogar, tus reglas"  // ❌
const title = translations.es.home.heroTitle  // ✅

// 3. No añadir keys sin verificar otros idiomas
translations.es.home.newKey = "..."  // ❌ ¿Y PT y EN?

// 4. No comparar strings directamente
if (lang === 'es')  // ⚠️ Mejor validar con isValidLanguage
```

## 🐛 Solución de Problemas

### Missing translation key en otro idioma
```typescript
// Verificar que la key exista en TODOS los idiomas
translations.es.home.newKey  // ✅
translations.pt.home.newKey  // ❌ Error si no existe
translations.en.home.newKey  // ❌ Error si no existe

// Solución: añadir en los 3 idiomas simultáneamente
```

### Type error al acceder a translations
```typescript
// Verificar que lang sea Language
const lang: Language = 'es'  // ✅
const lang = 'es'  // ⚠️ TypeScript asume string

// Solución: usar validador
if (isValidLanguage(lang)) {
  translations[lang]  // ✅ Seguro
}
```

### Cambios de idioma no se reflejan
```typescript
// Verificar que el componente re-renderiza
// Si usas contexto o estado, asegurar que se pase lang como dependencia
const text = useMemo(() => translations[lang].home.title, [lang])
```

## 📚 Estructura Completa de Keys

```
translations[Language]
├── nav
│   ├── concept
│   ├── challenge
│   ├── engineering
│   ├── control
│   ├── ecosystem
│   ├── startProject
│   └── menuToggle
│
└── home
    ├── badge
    ├── heroTitle
    ├── heroTitleAccent
    ├── heroSubtitle
    ├── quote
    ├── ctaExplore
    ├── ctaSpecs
    ├── statBrain
    ├── statLatency
    ├── statNodes
    ├── statBrainValue
    ├── statLatencyValue
    ├── statNodesValue
    ├── marquee (objeto)
    │   ├── architecture
    │   ├── localFirst
    │   ├── topology
    │   ├── hmi
    │   ├── nodes
    │   └── assistant
    │
    └── sections (objeto con todas las secciones)
        ├── philosophyLabel
        ├── philosophyTitle
        ├── philosophyTitleAccent
        ├── philosophyText
        ├── card[1-3]Title
        ├── card[1-3]Text
        ├── challengeLabel
        ├── challengeTitle
        ├── challengeVs
        ├── challengeReply
        ├── challengeLeft[1-3]Title
        ├── challengeLeft[1-3]Text
        ├── challengeRight[1-3]Title
        ├── challengeRight[1-3]Text
        ├── engineeringLabel
        ├── engineeringTitle
        ├── engineeringText
        ├── stat160
        ├── statLatencyLabel
        ├── engineeringList[1-3]
        ├── controlLabel
        ├── controlTitle
        └── controlText
```

## 🔗 Ver También

- [TypeScript Type Guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
- [React i18n Best Practices](https://react.i18next.com/)
- [Internationalization in Next.js](https://nextjs.org/docs/advanced-features/i18n-routing)

---

**Última actualización:** 2024
**Idiomas Soportados:** Español, Portugués, Inglés
**Estado:** Production Ready
