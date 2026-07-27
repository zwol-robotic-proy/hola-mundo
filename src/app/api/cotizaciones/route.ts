import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validar datos requeridos
    if (!body.nombre || !body.email || !body.telefono) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    // Aquí irían las variables de entorno sensibles
    const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'cotizaciones@zwol-home.com';
    const notificationEmail = process.env.NEXT_PUBLIC_NOTIFICATION_EMAIL || 'soporte@zwol-home.com';

    // Preparar resumen de cotización
    const cotizacionResumen = `
      ====================================
      NUEVA COTIZACIÓN - ZWOL-HOME
      ====================================

      📋 DATOS DEL CLIENTE
      Nombre: ${body.nombre}
      Email: ${body.email}
      Teléfono: ${body.telefono}
      Tipo de Propiedad: ${body.tipoProp}

      🏠 ESPECIFICACIONES TÉCNICAS
      Habitaciones: ${body.habitaciones}
      Circuitos: ${body.circuitos}
      Metros Cuadrados: ${body.m2 || 'No especificado'}
      Pileta: ${body.pileta}
      Riego: ${body.riego}

      ⚙️ OPCIONES ADICIONALES
      ${body.confort?.length ? `Confort: ${body.confort.join(', ')}` : 'Sin opciones de confort'}

      🌐 CONECTIVIDAD
      Internet: ${body.internet}
      Panel Solar: ${body.solar}

      📝 NOTAS
      ${body.notas || 'Sin observaciones adicionales'}

      ⏰ Timestamp: ${body.timestamp}
      🔗 URL: ${body.appUrl}
      ====================================
    `;

    // Log en consola (en producción, esto iría a una BD)
    console.log('🎯 COTIZACIÓN RECIBIDA:', cotizacionResumen);

    // Aquí se podría integrar con:
    // - SendGrid / Mailgun para envío de emails
    // - Supabase / Firebase para almacenar en BD
    // - Slack webhook para notificaciones
    // - etc.

    return NextResponse.json(
      {
        success: true,
        message: 'Cotización recibida correctamente',
        cotizacionId: `ZWOL-${Date.now()}`,
        resumen: cotizacionResumen,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en POST /api/cotizaciones:', error);
    return NextResponse.json(
      { error: 'Error al procesar la cotización' },
      { status: 500 }
    );
  }
}

// Opcional: GET para verificar el estado del endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/cotizaciones',
    method: 'POST',
    description: 'Endpoint para recibir nuevas cotizaciones de ZWOL-HOME',
  });
}
