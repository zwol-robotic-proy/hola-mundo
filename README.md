# 🏠 Zwol-Home - Plataforma de Domótica Industrial

Infraestructura avanzada de hogar inteligente que unifica robustez industrial con comodidad residencial. Sistema basado en ModBus TCP-IP con procesamiento local-first y cero latencia.

## 🎯 Características Principales

- **🔒 Local First**: Toda la lógica y datos se procesan en tu propiedad
- **⚡ Cero Latencia**: Protocolo ModBus TCP-IP con latencia de 0.2ms
- **🛡️ Confiabilidad Industrial**: Diseñado para operar 24/7 sin interrupciones
- **🌐 Totalmente Abierto**: Sin lock-in propietario, compatible con Home Assistant
- **📱 Multi-interfaz**: Panel táctil HMI + control smartphone + teclas físicas
- **🔐 Soberanía de Datos**: Privacidad garantizada, sin dependencia de servidores externos

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 22.20.x
- npm 11.x o superior
- Git

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/zwol-robotic-proy/hola-mundo.git
cd hola-mundo

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo (Turbopack)
npm run dev

# Abrir en el navegador
# http://localhost:3000
```

### Compilación y Producción

```bash
# Compilar para producción
npm run build

# Iniciar servidor de producción
npm start
```

## 🧪 Testing

Todos los módulos de utilidad (`src/lib/`) cuentan con tests unitarios con 100% de coverage.

```bash
# Ejecutar todos los tests
npm test

# Modo watch (desarrollo - recomendado)
npm test:watch

# Generar reporte de coverage
npm test:coverage

# Ejecutar tests de un módulo específico
npm test -- src/lib/__tests__/utils.test.ts
npm test -- src/lib/__tests__/contact.test.ts
npm test -- src/lib/__tests__/translations.test.ts
```

### Coverage Actual

| Módulo | Tests | Coverage |
|--------|-------|----------|
| `utils.ts` | 22 | ✅ 100% |
| `contact.ts` | 25 | ✅ 100% |
| `translations.ts` | 10 | ✅ 100% |
| **Total** | **57** | **✅ 100%** |

## 📊 Estructura del Proyecto

```
src/
├── app/                       # Next.js App Router
├── components/                # Componentes React (SOLID)
├── lib/                       # Utilidades y lógica
│   ├── utils.ts
│   ├── contact.ts
│   ├── translations.ts
│   ├── __tests__/            # Tests (100% coverage)
│   └── docs/                 # Documentación detallada
├── providers/                # Contextos (LanguageContext)
└── middleware.ts             # Seguridad y CSP
```

## 🔐 Seguridad

### Política de CSP (Content Security Policy)

El proyecto implementa una política de seguridad mediante `middleware.ts`:

```
✅ Content-Security-Policy       # Previene XSS
✅ X-Content-Type-Options       # Previene MIME sniffing
✅ X-Frame-Options              # Previene clickjacking
✅ Strict-Transport-Security    # Fuerza HTTPS
✅ Referrer-Policy              # Privacidad de referencias
✅ Permissions-Policy           # Control de features del navegador
```

Ver [`src/middleware.ts`](src/middleware.ts) para más detalles.

## 📚 Documentación

- [INDEX.md](INDEX.md) - Índice de toda la documentación
- [TESTING_GUIDE.md](TESTING_GUIDE.md) - Guía completa de testing
- [src/lib/README.md](src/lib/README.md) - Overview de la librería
- [SOLID_ARCHITECTURE.md](SOLID_ARCHITECTURE.md) - Detalles de principios SOLID

## 🏗️ Arquitectura SOLID

Este proyecto implementa los 5 principios SOLID:

- **S**ingle Responsibility: Cada componente tiene una única responsabilidad
- **O**pen/Closed: Abierto para extensión, cerrado para modificación  
- **L**iskov Substitution: Componentes intercambiables sin romper funcionalidad
- **I**nterface Segregation: Interfaces específicas y focalizadas
- **D**ependency Inversion: Dependen de abstracciones, no de implementaciones

## 🌍 Idiomas Soportados

- 🇪🇸 Español (es)
- 🇵🇹 Portugués (pt)
- 🇬🇧 Inglés (en)

## 📋 Scripts Principales

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo
npm run build            # Compilar para producción
npm start                # Servidor de producción

# Testing
npm test                 # Ejecutar tests
npm test:watch           # Modo watch
npm test:coverage        # Coverage report

# Calidad de código
npm run lint             # ESLint
npm run type-check       # Verificar tipos TypeScript
npm run format           # Prettier
```

## 💡 Mejores Prácticas

✅ Seguir principios SOLID  
✅ Escribir tests para nuevo código  
✅ Ejecutar linter y type-check antes de commit  
✅ Documentar componentes complejos  
✅ Usar TypeScript para type-safety  
✅ Mantener componentes pequeños y enfocados  

## 📄 Licencia

MIT License - © 2024 ZWOL-HOME

---

**Status**: 🚀 Production Ready | **Coverage**: 100% | **Last Update**: 2024
