# Librería de Utilidades - `src/lib/`

Esta carpeta contiene funciones y configuraciones reutilizables que se utilizan en toda la aplicación Zwol-Home.

## 📋 Contenido

- **[utils.ts](#utilsfiles)** - Funciones de utilidad general
- **[contact.ts](#contactfile)** - Configuración y funciones de contacto
- **[translations.ts](#translationsfile)** - Sistema de traducciones multiidioma

---

## 📁 Estructura de Tests

```
src/lib/
├── utils.ts
├── contact.ts
├── translations.ts
└── __tests__/
    ├── utils.test.ts
    ├── contact.test.ts
    └── translations.test.ts
```

---

## 🧪 Ejecutar Tests

### Todos los tests de la librería
```bash
npm test -- src/lib/__tests__
```

### Test específico
```bash
npm test -- src/lib/__tests__/utils.test.ts
npm test -- src/lib/__tests__/contact.test.ts
npm test -- src/lib/__tests__/translations.test.ts
```

### Con coverage
```bash
npm test -- --coverage src/lib/__tests__
```

### Watch mode (desarrollo)
```bash
npm test -- --watch src/lib/__tests__
```

---

## 📝 Archivos

### utils.ts

Contiene funciones de utilidad general para la manipulación de clases CSS.

**Función principal:**
- `cn(...inputs)` - Combina y fusiona clases Tailwind CSS

**Características:**
- Utiliza `clsx` para manejo de clases condicionales
- Utiliza `tailwind-merge` para resolver conflictos de clases Tailwind
- Soporta múltiples formatos: strings, objetos, arrays
- Resuelve automáticamente conflictos entre clases Tailwind

**Ejemplo de uso:**
```typescript
import { cn } from '@/lib/utils'

// Clases básicas
cn('px-2', 'py-1')  // 'px-2 py-1'

// Clases condicionales
cn({
  'bg-blue-500': isActive,
  'bg-gray-300': !isActive,
})

// Resolución de conflictos
cn('bg-red-500', 'bg-blue-500')  // 'bg-blue-500' (gana la última)

// Combinaciones complejas
cn(
  'base-class',
  { 'conditional': true },
  ['array-1', 'array-2'],
  isValid && 'valid-class'
)
```

**Tests disponibles:** 22 tests
- Funcionalidad básica
- Fusión de clases Tailwind
- Comportamiento condicional
- Casos extremos

---

### contact.ts

Configuración centralizada para información de contacto y funciones relacionadas.

**Objeto principal:**
- `contactConfig` - Configuración de contacto con valores por defecto desde variables de entorno

**Funciones:**
- `buildWhatsAppLink(phone, message)` - Construye un enlace de WhatsApp
- `getAppUrl()` - Retorna la URL de la aplicación

**Variables de entorno soportadas:**
- `NEXT_PUBLIC_APP_NAME` - Nombre de la aplicación (default: "ZWOL-HOME")
- `NEXT_PUBLIC_APP_URL` - URL de la aplicación (default: "https://zwol-home.com")
- `NEXT_PUBLIC_CONTACT_EMAIL` - Email de contacto (default: "zwolhome@gmail.com")
- `NEXT_PUBLIC_NOTIFICATION_EMAIL` - Email de notificaciones
- `NEXT_PUBLIC_CONTACT_PHONE` - Teléfono de contacto (default: "1136834491")
- `NEXT_PUBLIC_CONTACT_PHONE_DISPLAY` - Teléfono formateado (default: "+54 11 3683-4491")
- `NEXT_PUBLIC_INSTAGRAM_URL` - URL de Instagram
- `NEXT_PUBLIC_INSTAGRAM_LABEL` - Label de Instagram
- `NEXT_PUBLIC_WHATSAPP_MESSAGE` - Mensaje por defecto de WhatsApp
- `NEXT_PUBLIC_EMAIL_SENDER_NAME` - Nombre del remitente
- `NEXT_PUBLIC_EMAIL_SENDER_EMAIL` - Email del remitente
- `NEXT_PUBLIC_EMAIL_SIGNATURE` - Firma de email

**Ejemplo de uso:**
```typescript
import { contactConfig, buildWhatsAppLink, getAppUrl } from '@/lib/contact'

// Acceder a configuración
console.log(contactConfig.email)           // 'zwolhome@gmail.com'
console.log(contactConfig.phoneDisplay)    // '+54 11 3683-4491'

// Construir link de WhatsApp
const whatsappLink = buildWhatsAppLink('1136834491', 'Hola, me interesa...')
// https://wa.me/541136834491?text=Hola%2C%20me%20interesa...

// Obtener URL de la app
const appUrl = getAppUrl()  // 'https://zwol-home.com'
```

**Características especiales:**
- Normalización automática de números de teléfono
- Formato de enlace WhatsApp con código de país (+54)
- Mensajes codificados en URLs
- Fallbacks inteligentes para variables de entorno

**Tests disponibles:** 25 tests
- Valores por defecto de configuración
- Variables de entorno
- Validación de formatos
- Construcción de enlaces WhatsApp
- Integración de contacto

---

### translations.ts

Sistema centralizado de traducciones multiidioma (Español, Portugués, Inglés).

**Tipos:**
- `Language` - Tipo literal: "es" | "pt" | "en"
- `languageOptions` - Array de opciones de idioma con labels

**Objeto principal:**
- `translations` - Objeto con traducciones para todos los idiomas

**Idiomas soportados:**
- 🇪🇸 Español (es)
- 🇵🇹 Portugués (pt)
- 🇬🇧 Inglés (en)

**Secciones disponibles:**

#### 1. Navegación (`nav`)
- `concept` - "01. Concepto"
- `challenge` - "02. El Desafío"
- `engineering` - "03. ModBus TCP-IP"
- `control` - "04. Interfaces"
- `ecosystem` - "05. Ecosistema"
- `startProject` - Botón CTA
- `menuToggle` - Toggle del menú

#### 2. Inicio (`home`)
- `badge` - Badge principal
- `heroTitle` - Título del hero
- `heroTitleAccent` - Parte destacada del título
- `heroSubtitle` - Subtítulo
- `quote` - Cita principal
- `ctaExplore` - CTA de exploración
- `ctaSpecs` - CTA de especificaciones
- `statBrain`, `statLatency`, `statNodes` - Labels de estadísticas
- `statBrainValue`, `statLatencyValue`, `statNodesValue` - Valores de estadísticas
- `marquee` - Contenido de marquee (carrusel)
- `sections` - Secciones principales (filosofía, desafío, ingeniería, control)

**Ejemplo de uso:**
```typescript
import { translations, Language, languageOptions } from '@/lib/translations'

// Acceder a traducción específica
const esTranslations = translations.es
console.log(esTranslations.nav.concept)  // "01. Concepto"

// Usar con idioma dinámico
const currentLanguage: Language = 'es'
const navText = translations[currentLanguage].nav.ecosystem  // "05. Ecosistema"

// Acceder a secciones anidadas
const homeSection = translations.en.home.sections.philosophyTitle

// Listar opciones de idioma (para selectores)
languageOptions.forEach(opt => {
  console.log(opt.value, opt.label)
  // es Español
  // pt Português
  // en English
})

// Validar idioma
const isValidLanguage = (lang: any): lang is Language => {
  return languageOptions.some(opt => opt.value === lang)
}
```

**Características:**
- Estructura consistente entre idiomas
- Nombres de secciones numeradas (01, 02, 03, 04, 05)
- Traducciones completas para toda la interfaz
- Contenido técnico y de marketing

**Tests disponibles:** 28 tests
- Validación de opciones de idioma
- Estructura de traducciones
- Consistencia entre idiomas
- Seguridad de tipos
- Contenido de navegación
- Contenido del home

---

## 📊 Coverage de Tests

```
Archivo              | Statements | Branches | Functions | Lines
---------------------|-----------|----------|-----------|--------
utils.ts             | 100%      | 100%     | 100%      | 100%
contact.ts           | 100%      | 100%     | 100%      | 100%
translations.ts      | 100%      | 100%     | 100%      | 100%
---------------------|-----------|----------|-----------|--------
Total                | 100%      | 100%     | 100%      | 100%
```

---

## 🔧 Configuración de Jest

La configuración se encuentra en `jest.config.js`:
- Path alias: `@/*` → `./src/*`
- Entorno: jsdom
- Tests pattern: `**/__tests__/**/*.[jt]s?(x)` y `**/?(*.)+(spec|test).[jt]s?(x)`
- Setup: `jest.setup.js`

---

## 💡 Buenas Prácticas

### Importaciones
```typescript
// ✅ Preferir alias de path
import { cn } from '@/lib/utils'

// ❌ Evitar rutas relativas largas
import { cn } from '../../../lib/utils'
```

### Uso de contactConfig
```typescript
// ✅ Usar directamente en contextos no-reactivos
const email = contactConfig.email

// ⚠️ Para componentes React, considerar useEffect para cambios de env
```

### Uso de translations
```typescript
// ✅ Usar en componentes con idioma como prop
const getText = (lang: Language, key: string) => translations[lang].nav[key]

// ✅ Type-safe con tipos Language
const lang: Language = 'es'
```

---

## 🐛 Solución de Problemas

### Los tests no se ejecutan
```bash
# Verificar configuración de Jest
npm test -- --showConfig

# Limpiar cache
npm test -- --clearCache
```

### Imports fallando
- Verificar que `@/*` alias esté configurado en `tsconfig.json`
- Asegurar que la ruta sea relativa a `src/`

### Variables de entorno no se cargan
- Las variables deben tener prefijo `NEXT_PUBLIC_` en Next.js
- Recargar servidor después de cambios en `.env`

---

## 📚 Referencias

- [Tailwind CSS Merge](https://github.com/dcastil/tailwind-merge)
- [clsx - Conditional Classes](https://github.com/lukeed/clsx)
- [Jest Documentation](https://jestjs.io/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Última actualización:** 2024
**Versión de Node:** 22.20.x
**Versión de Next.js:** 16.2.11
