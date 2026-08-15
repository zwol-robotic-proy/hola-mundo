import { NextRequest, NextResponse } from 'next/server'

/**
 * Content Security Policy (CSP) y Middleware de Seguridad
 * 
 * Implementa:
 * - CSP headers para proteger contra ataques XSS
 * - Seguridad de referencias (Referrer-Policy)
 * - Prevención de clickjacking (X-Frame-Options)
 * - Protección de contenido MIME (X-Content-Type-Options)
 * 
 * Principios SOLID implementados:
 * - Single Responsibility: Solo maneja seguridad
 * - Open/Closed: Fácil agregar más headers
 * - Dependency Inversion: No depende de librerías específicas
 */

// Configuración de CSP (Content Security Policy)
const CSP_HEADER = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://vercel.live;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  media-src 'self' https:;
  connect-src 'self' https: wss:;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
`.replace(/\n/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

// Headers de seguridad adicionales
const SECURITY_HEADERS = {
  // CSP
  'Content-Security-Policy': CSP_HEADER,
  
  // Evita que el navegador intente "sniffear" el tipo de contenido MIME
  'X-Content-Type-Options': 'nosniff',
  
  // Previene clickjacking - El sitio no puede ser embebido en iframes
  'X-Frame-Options': 'DENY',
  
  // Habilita filtro XSS en navegadores más antiguos
  'X-XSS-Protection': '1; mode=block',
  
  // Política de referrer para privacidad
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Permiso de características del navegador
  'Permissions-Policy': [
    'accelerometer=()',
    'camera=()',
    'geolocation=()',
    'gyroscope=()',
    'magnetometer=()',
    'microphone=()',
    'payment=()',
    'usb=()',
  ].join(', '),
  
  // HSTS - Force HTTPS
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  
  // Evita que los datos se cacheen sensibles
  'Cache-Control': 'public, max-age=0, must-revalidate',
}

/**
 * Middleware de Seguridad
 * Se ejecuta en todas las requests antes de llegar al servidor
 * 
 * Responsabilidad única:
 * - Añadir headers de seguridad a todas las responses
 * 
 * @param request - NextRequest object
 * @returns NextResponse con headers de seguridad
 */
export function middleware(request: NextRequest) {
  // Crear response
  const response = NextResponse.next()

  // Aplicar todos los headers de seguridad
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Log de seguridad en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Security] ${request.method} ${request.nextUrl.pathname}`)
  }

  return response
}

/**
 * Configuración del middleware
 * Define en qué rutas se aplica este middleware
 * 
 * Implementa Open/Closed Principle:
 * Fácil agregar más rutas sin modificar el middleware
 */
export const config = {
  // Aplicar a todas las rutas excepto assets estáticos
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

/**
 * Notas sobre CSP Headers:
 * 
 * - default-src 'self': Permite recursos solo del mismo origen por defecto
 * - script-src: Permite scripts del mismo origen y CDNs confiables
 * - style-src: Permite estilos del mismo origen
 * - font-src: Permite fuentes de Google
 * - img-src: Permite imágenes de cualquier origen (common use case)
 * - connect-src: Permite conexiones (fetch, WebSocket) a APIs
 * - frame-ancestors 'none': Previene que el sitio sea embebido
 * - upgrade-insecure-requests: Convierte HTTP a HTTPS automáticamente
 * 
 * Modificar según necesidades específicas del proyecto
 */
