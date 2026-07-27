# 🏠 ZWOL-HOME | Industrial Smart Home Platform

> **La unificación definitiva entre la domótica de lujo y la robustez de la ingeniería industrial**

[![Next.js](https://img.shields.io/badge/Next.js-16.2.11-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.1-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.13-06b6d4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.180.0-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![Turbopack](https://img.shields.io/badge/Turbopack-Enabled-ff6b6b?style=flat-square&logo=webpack)](https://turbo.build/)

---

## 🚀 Características Tecnológicas

### **Frontend Stack de Vanguardia**

- **Next.js 16.2.11** - Framework React full-stack con Turbopack para compilación ultrarrápida
- **React 19.1.1** - Componentes modernos con server/client arquitectura optimizada
- **TypeScript 5.9.2** - Type-safety absoluto en todo el stack
- **Tailwind CSS 4.1.13** - Utility-first CSS con JIT compilation
- **Three.js 0.180.0** - Motor 3D WebGL para animaciones de fondo interactivas
- **Framer Motion 12.23.12** - Animaciones declarativas y transiciones fluidas
- **GSAP 3.13.0** - Librería de animaciones profesionales

### **UI & Componentes Premium**

- **Radix UI 1.x** - Componentes accesibles sin estilos precargados
  - Dialog, Navigation Menu, Scroll Area, Slot
- **Lucide React 0.542.0** - Iconos SVG minimalistas y optimizados
- **React Icons 5.5.0** - Font Awesome integrado en React
- **Sonner 2.0.7** - Sistema de notificaciones toast elegante
- **Class Variance Authority 0.7.1** - Factory pattern para componentes complejos

### **Arquitectura & Utilidades**

- **React Hook Form 7.62.0** - Manejo de formularios con performance óptimo
- **Zod 4.1.5** - Validación de esquemas TypeScript-first
- **Zustand 5.0.8** - State management minimalista
- **Next-Themes 0.4.6** - Dark/Light mode con persistencia
- **Lenis 1.3.11** - Smooth scrolling de alta calidad
- **Studio Freight Lenis 1.0.42** - Scroll hijacking profesional

### **Herramientas de Desarrollo**

- **ESLint 9.35.0** - Linting con configuración Next.js
- **Prettier 3.6.2** - Code formatting automático
- **Tailwind CSS PostCSS 4.3.3** - Post-procesado optimizado de estilos

---

## 🏗️ Arquitectura del Proyecto

```
src/
├── app/
│   ├── globals.css          # Estilos globales + animaciones
│   ├── layout.tsx           # Root layout con proveedores
│   └── page.tsx             # Página principal (home + cotizador)
├── components/
│   ├── BackgroundCanvas.tsx # Motor 3D con Three.js
│   ├── CustomCursor.tsx     # Cursor interactivo personalizado
│   ├── Navbar.tsx           # Navegación responsiva
│   ├── HomeView.tsx         # Landing page con 6 secciones
│   ├── CotizadorView.tsx    # Formulario wizard interactivo
│   ├── hero/                # Sub-componentes del hero
│   ├── navbar/              # Sub-componentes de navegación
│   └── ui/                  # Componentes reutilizables
├── lib/
│   └── utils.ts             # Funciones utilitarias
└── providers/
    └── Providers.tsx        # Wrapper de proveedores (temas, etc.)
```

---

## ⚡ Secciones del Sitio

### **01. Hero Section**
- Presentación con gradientes dinámicos
- Imagen de producto con overlay interactivo
- CTAs llamativas con sombras de neón
- Estadísticas en tiempo real del sistema

### **02. Marquee Ticker Animado**
- Scroll horizontal infinito con tecnologías clave
- Icons Font Awesome integrados
- Performance optimizado con CSS puro

### **03. Concepto Fundamental**
- 3 pilares: Sin ataduras propietarias, Fiabilidad 24/7, Privacidad Local-First
- Cards con glass-morphism
- Efectos hover con transformaciones

### **04. El Desafío**
- Comparativa visual: Problema vs Solución
- Diseño en dos columnas con borders temáticos
- Colores rojo/cian para contraste

### **05. Ingeniería ModBus TCP-IP**
- Specs técnicas: 160 nodos, 0.2ms latencia
- Grid con información de infraestructura
- Imagen de servidores industriales

### **06. Hardware de Control**
- 3 interfaces: Panel HMI, App móvil, Teclas físicas
- Cards con imágenes placeholder de Unsplash
- Descripciones técnicas detalladas

### **07. Ecosistema Abierto**
- 4 plataformas: Home Assistant, Apple HomeKit, Google Home, Spotify
- Grid responsive con hover effects
- Iconos de marcas reales

### **08. Lógicas Autónomas**
- 3 escenas: Bienvenida, Ausencia Dinámica, Eficiencia Energética
- Cards con iconos temáticos
- Descripciones operacionales

### **09. Footer Premium**
- CTA a cotizador destacado
- Información de empresa
- Copyright y especificaciones

---

## 🎨 Diseño & Animaciones

### **Glass Morphism**
```css
.glass-panel {
  background: linear-gradient(135deg, rgba(17, 23, 38, 0.7) 0%, rgba(10, 14, 23, 0.8) 100%);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: 1px solid rgba(0, 210, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}
```

### **Paleta de Colores**
- `zwol-black`: `#030509` - Fondo principal
- `zwol-dark`: `#0A0E17` - Fondo secundario
- `zwol-cyan`: `#00d2ff` - Color de marca (neón)
- `zwol-blue`: `#2563eb` - Acentos

### **Animaciones Clave**
- **Marquee**: Scroll horizontal infinito (25s)
- **Fade In**: Transición suave on-scroll
- **Glass Hover**: Elevación con blur aumentado
- **Custom Cursor**: Seguimiento suave del mouse

---

## 🔧 Configuración de Entorno

### **Requisitos Previos**
```bash
Node.js >= 22.0.0
npm >= 10.0.0
```

### **Variables de Entorno**

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Configuración de Emails (NO SUBIR A GIT)
NEXT_PUBLIC_CONTACT_EMAIL=tu-email@empresa.com
NEXT_PUBLIC_NOTIFICATION_EMAIL=notificaciones@empresa.com
NEXT_PUBLIC_SMTP_HOST=smtp.servidor.com
NEXT_PUBLIC_SMTP_PORT=587
NEXT_PUBLIC_SMTP_USER=usuario@empresa.com
NEXT_PUBLIC_SMTP_PASS=contraseña-segura

# URLs Base
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> ⚠️ **Importante**: El archivo `.env.local` está en `.gitignore` y NO se sincronizará con origen.

---

## 📥 Instalación & Setup

### **1. Clonar repositorio**
```bash
git clone https://github.com/zwol-robotic-proy/hola-mundo.git
cd hola-mundo
```

### **2. Instalar dependencias**
```bash
npm install
```

### **3. Configurar variables de entorno**
```bash
cp .env.example .env.local
# Edita .env.local con tus valores
```

### **4. Iniciar servidor de desarrollo**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🚀 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo con Turbopack |
| `npm run build` | Compila para producción |
| `npm run start` | Inicia servidor de producción |
| `npm run lint` | Ejecuta ESLint |
| `npm run type-check` | Verifica tipos TypeScript |
| `npm run format` | Formatea código con Prettier |

---

## 📊 Performance

- ⚡ **Turbopack**: Compilación 10x más rápida que webpack
- 🎯 **Image Optimization**: Next.js Image para lazy-loading automático
- 🔍 **Tree Shaking**: Eliminación de código no utilizado
- 📦 **Bundle Size**: Optimizado para web vital metrics
- ⚙️ **Incremental Static Regeneration**: Caché inteligente

---

## 🔒 Seguridad

- ✅ **TypeScript**: Type-safety en todo el código
- ✅ **Environment Variables**: Datos sensibles en .env.local (gitignored)
- ✅ **Content Security Policy**: Headers de seguridad configurados
- ✅ **XSS Protection**: Sanitización de inputs con React
- ✅ **CSRF Protection**: Next.js maneja tokens automáticamente

---

## 📱 Responsividad

Optimizado para todos los dispositivos:
- 📱 Mobile: 375px - 640px
- 📱 Tablet: 641px - 1024px
- 🖥️ Desktop: 1025px+
- 🖥️ 4K: 2560px+

---

## 🎯 Roadmap

- [ ] Integración con CMS (Sanity/Contentful)
- [ ] Dashboard de analytics en tiempo real
- [ ] Checkout y pagos (Stripe/MercadoPago)
- [ ] Multi-idioma (i18n)
- [ ] PWA (Progressive Web App)
- [ ] API REST documentada (OpenAPI/Swagger)
- [ ] Tests E2E (Playwright)

---

## 📄 Licencia

MIT © 2026 ZWOL-HOME - Infraestructura Domótica Industrial

---

## 👨‍💻 Autor

**Ivan Maidana**
- GitHub: [@zwol-robotic-proy](https://github.com/zwol-robotic-proy)
- Email: ivan@zwol-home.com

---

## 🙌 Agradecimientos

Construido con las herramientas más modernas de Next.js, React y la comunidad open source.

**¡Eleva tu propiedad. Con Zwol-Home!** 🏠✨
