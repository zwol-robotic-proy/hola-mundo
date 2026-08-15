# contact.ts - Configuración y Utilidades de Contacto

## 📌 Descripción

Módulo centralizado para gestionar información de contacto, configuración de redes sociales y funciones auxiliares para construir enlaces de contacto. Proporciona valores por defecto desde variables de entorno y funciones para generar URLs de WhatsApp.

## 🎯 Propósito

- Centralizar información de contacto de la aplicación
- Proveer configuración flexible mediante variables de entorno
- Generar enlaces de WhatsApp con formato correcto
- Mantener branding y contactos consistentes
- Facilitar cambios de configuración sin modificar código

## 📦 Importación

```typescript
import { 
  contactConfig, 
  buildWhatsAppLink, 
  getAppUrl 
} from '@/lib/contact'
```

## 🔧 Exportes

### 1. `contactConfig` - Objeto de Configuración

Objeto con toda la configuración de contacto. Valores por defecto desde variables de entorno.

#### Propiedades

| Propiedad | Variable de Entorno | Valor por Defecto | Descripción |
|-----------|--------------------|--------------------|-------------|
| `appName` | `NEXT_PUBLIC_APP_NAME` | "ZWOL-HOME" | Nombre de la aplicación |
| `appUrl` | `NEXT_PUBLIC_APP_URL` | "https://zwol-home.com" | URL principal de la app |
| `email` | `NEXT_PUBLIC_CONTACT_EMAIL` | "zwolhome@gmail.com" | Email de contacto |
| `notificationEmail` | `NEXT_PUBLIC_NOTIFICATION_EMAIL` | Fallback a email | Email para notificaciones |
| `phone` | `NEXT_PUBLIC_CONTACT_PHONE` | "1136834491" | Número telefónico sin formato |
| `phoneDisplay` | `NEXT_PUBLIC_CONTACT_PHONE_DISPLAY` | "+54 11 3683-4491" | Número formateado para mostrar |
| `instagramUrl` | `NEXT_PUBLIC_INSTAGRAM_URL` | URL por defecto | Link de Instagram |
| `instagramLabel` | `NEXT_PUBLIC_INSTAGRAM_LABEL` | "@zwol.robotic" | Handle de Instagram |
| `whatsappMessage` | `NEXT_PUBLIC_WHATSAPP_MESSAGE` | Mensaje por defecto | Mensaje inicial de WhatsApp |
| `senderName` | `NEXT_PUBLIC_EMAIL_SENDER_NAME` | "ZWOL-HOME" | Nombre del remitente de emails |
| `senderEmail` | `NEXT_PUBLIC_EMAIL_SENDER_EMAIL` | Fallback a email | Email del remitente |
| `signature` | `NEXT_PUBLIC_EMAIL_SIGNATURE` | Firma con URL | Firma de emails |

#### Ejemplo de Acceso

```typescript
console.log(contactConfig.email)           // 'zwolhome@gmail.com'
console.log(contactConfig.phoneDisplay)    // '+54 11 3683-4491'
console.log(contactConfig.instagramLabel)  // '@zwol.robotic'
console.log(contactConfig.appName)         // 'ZWOL-HOME'
```

### 2. `buildWhatsAppLink(phone?, message?)` - Función

Construye un enlace de WhatsApp con formato correcto.

#### Parámetros

- `phone` (string, optional) - Número telefónico. Default: `contactConfig.phone`
  - Acepta múltiples formatos: "1136834491", "+541136834491", "+54 11 3683-4491"
  - Se normaliza automáticamente

- `message` (string, optional) - Mensaje a enviar. Default: `contactConfig.whatsappMessage`
  - Se codifica automáticamente para URL
  - Soporta caracteres especiales

#### Retorna

- `string` - URL de WhatsApp completa y funcional

#### Características

- ✅ Normalización automática de números
- ✅ Formato correcto con código país (+54)
- ✅ Encoding correcto del mensaje
- ✅ URL lista para usar en `href`
- ✅ Soporta múltiples formatos de entrada

#### Ejemplos

```typescript
import { buildWhatsAppLink } from '@/lib/contact'

// Con parámetros por defecto
const link1 = buildWhatsAppLink()
// https://wa.me/541136834491?text=Hola%2C%20vengo%20de%20ZWOL-HOME%20...

// Con teléfono personalizado
const link2 = buildWhatsAppLink('1136834491')
// https://wa.me/541136834491?text=...

// Con mensaje personalizado
const link3 = buildWhatsAppLink(
  '1136834491',
  'Quiero información sobre domótica'
)
// https://wa.me/541136834491?text=Quiero%20informaci%C3%B3n%20sobre%20dom%C3%B3tica

// Diferentes formatos de teléfono
buildWhatsAppLink('+541136834491')           // ✅
buildWhatsAppLink('+54 11 3683-4491')        // ✅
buildWhatsAppLink('541136834491')            // ✅
buildWhatsAppLink('11-3683-4491')            // ✅

// Con caracteres especiales en mensaje
const specialMsg = 'Consultaría: instalación + configuración'
buildWhatsAppLink('1136834491', specialMsg)
// Codifica correctamente: 'Consultaría: instalación %2B configuración'
```

### 3. `getAppUrl()` - Función

Retorna la URL de la aplicación desde la configuración.

#### Parámetros

Ninguno

#### Retorna

- `string` - URL de la aplicación (`contactConfig.appUrl`)

#### Ejemplo

```typescript
import { getAppUrl } from '@/lib/contact'

const appUrl = getAppUrl()
// 'https://zwol-home.com'

// Construir URLs absolutas
const contactPage = `${getAppUrl()}/contacto`
// 'https://zwol-home.com/contacto'
```

## 📖 Casos de Uso Completos

### Caso 1: Formulario de Contacto

```typescript
import { contactConfig, buildWhatsAppLink } from '@/lib/contact'

export const ContactForm = () => {
  const handleWhatsAppClick = () => {
    const message = 'Me interesa más información sobre Zwol-Home'
    const link = buildWhatsAppLink(contactConfig.phone, message)
    window.open(link, '_blank')
  }

  return (
    <div>
      <a href={`mailto:${contactConfig.email}`}>
        Enviar Email
      </a>
      
      <button onClick={handleWhatsAppClick}>
        Contactar por WhatsApp
      </button>
      
      <a href={contactConfig.instagramUrl} target="_blank">
        {contactConfig.instagramLabel}
      </a>
    </div>
  )
}
```

### Caso 2: Footer de Sitio

```typescript
import { contactConfig, getAppUrl } from '@/lib/contact'

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Contacto */}
          <div>
            <h3 className="font-bold mb-4">Contacto</h3>
            <p>Email: {contactConfig.email}</p>
            <p>Tel: {contactConfig.phoneDisplay}</p>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="font-bold mb-4">Síguenos</h3>
            <a href={contactConfig.instagramUrl}>
              {contactConfig.instagramLabel}
            </a>
          </div>

          {/* Información */}
          <div>
            <h3 className="font-bold mb-4">{contactConfig.appName}</h3>
            <p>{contactConfig.signature}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

### Caso 3: Botón de WhatsApp Flotante

```typescript
import { buildWhatsAppLink } from '@/lib/contact'

export const FloatingWhatsAppButton = () => {
  const whatsappLink = buildWhatsAppLink(
    undefined,
    'Hola, tengo una consulta sobre Zwol-Home'
  )

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600"
    >
      <WhatsAppIcon />
    </a>
  )
}
```

### Caso 4: Email de Confirmación

```typescript
import { contactConfig } from '@/lib/contact'
import nodemailer from 'nodemailer'

export async function sendNotification(userMessage: string) {
  const transporter = nodemailer.createTransport({
    // Configuración SMTP
  })

  await transporter.sendMail({
    from: contactConfig.senderEmail,
    to: contactConfig.notificationEmail,
    subject: 'Nuevo mensaje de contacto',
    html: `
      <p>${userMessage}</p>
      <br>
      <p>${contactConfig.signature}</p>
    `,
  })
}
```

## 🧪 Tests

Total de tests: **25**

### Categorías de Tests

#### 1. Objeto contactConfig (8 tests)
- Valores por defecto
- Lectura desde variables de entorno
- Validación de propiedades requeridas
- Validación de formatos de email
- Validación de URLs

#### 2. Función buildWhatsAppLink (10 tests)
- Link válido con parámetros por defecto
- Normalización de números
- Formato con código país
- Encoding de mensajes
- Manejo de diferentes formatos de teléfono

#### 3. Función getAppUrl (3 tests)
- Retorna URL configurada
- Formato URL válido
- Valores consistentes

#### 4. Integración (4 tests)
- Flujo completo de contacto
- Cadena de fallbacks de email
- Branding consistente

### Ejecutar Tests

```bash
# Solo tests de contact
npm test -- src/lib/__tests__/contact.test.ts

# Con watch
npm test -- --watch src/lib/__tests__/contact.test.ts

# Con coverage
npm test -- --coverage src/lib/__tests__/contact.test.ts
```

## 🔐 Variables de Entorno

### Configuración en `.env.local`

```bash
# Información de la aplicación
NEXT_PUBLIC_APP_NAME="ZWOL-HOME"
NEXT_PUBLIC_APP_URL="https://zwol-home.com"

# Contacto
NEXT_PUBLIC_CONTACT_EMAIL="zwolhome@gmail.com"
NEXT_PUBLIC_CONTACT_PHONE="1136834491"
NEXT_PUBLIC_CONTACT_PHONE_DISPLAY="+54 11 3683-4491"

# Redes Sociales
NEXT_PUBLIC_INSTAGRAM_URL="https://www.instagram.com/zwol.robotic"
NEXT_PUBLIC_INSTAGRAM_LABEL="@zwol.robotic"

# Email
NEXT_PUBLIC_EMAIL_SENDER_NAME="ZWOL-HOME"
NEXT_PUBLIC_EMAIL_SENDER_EMAIL="zwolhome@gmail.com"
NEXT_PUBLIC_EMAIL_SIGNATURE="Atentamente,\nEquipo ZWOL-HOME\nwww.zwol-home.com"

# WhatsApp
NEXT_PUBLIC_WHATSAPP_MESSAGE="Hola, vengo de ZWOL-HOME y quiero consultar por un proyecto."
NEXT_PUBLIC_NOTIFICATION_EMAIL="notificaciones@zwol-home.com"
```

⚠️ **Importante:** Todas las variables deben tener prefijo `NEXT_PUBLIC_` para ser accesibles desde el frontend.

## 💡 Best Practices

### ✅ Hacer

```typescript
// 1. Usar contactConfig para toda información centralizada
const email = contactConfig.email

// 2. Usar buildWhatsAppLink para generar enlaces
const link = buildWhatsAppLink()

// 3. Usar getAppUrl para URLs absolutas
const fullUrl = `${getAppUrl()}/page`

// 4. Cambiar configuración desde env, no hardcodeado
process.env.NEXT_PUBLIC_APP_NAME  // ✅
```

### ❌ Evitar

```typescript
// 1. No hardcodear email/teléfono
const email = "zwolhome@gmail.com"  // ❌

// 2. No construir enlaces WhatsApp manualmente
const link = `https://wa.me/541136834491?text=${msg}`  // ❌

// 3. No duplicar configuración
// En múltiples lugares, usar contactConfig siempre

// 4. No olvidar NEXT_PUBLIC_ en variables de entorno
CONTACT_EMAIL="..."  // ❌ No accesible en frontend
NEXT_PUBLIC_CONTACT_EMAIL="..."  // ✅
```

## 🐛 Solución de Problemas

### Las variables de entorno no se cargan
```bash
# 1. Verificar que tengan prefijo NEXT_PUBLIC_
NEXT_PUBLIC_APP_NAME="..."  # ✅

# 2. Reiniciar el servidor de desarrollo
npm run dev  # Ctrl+C y volver a iniciar

# 3. Verificar archivo .env.local existe
cat .env.local
```

### El link de WhatsApp no funciona
```typescript
// Verificar formato del teléfono
buildWhatsAppLink('541136834491')  // ✅ Con código país
buildWhatsAppLink('1136834491')    // ✅ Sin código país (se agrega)

// Verificar message encoding
const msg = 'Hola ¿cómo estás?'   // ✅ Se codifica automáticamente
```

### Email no se envía
```typescript
// Verificar que senderEmail sea válido
contactConfig.senderEmail  // Debe ser email válido

// Verificar credentials SMTP en nodemailer
// contactConfig solo provee los datos, no maneja envío
```

## 📚 Dependencias

- **nodemailer** - ^9.0.3 (opcional, para envío de emails)

## 🔗 Ver También

- [WhatsApp Business API](https://www.whatsapp.com/business/api/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Nodemailer Documentation](https://nodemailer.com/)

---

**Última actualización:** 2024
**Estado:** Production Ready
**País:** Argentina (+54)
