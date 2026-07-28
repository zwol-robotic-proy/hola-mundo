import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import { contactConfig, getAppUrl } from '@/lib/contact';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.nombre || !body.email || !body.telefono) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    const appUrl = body.appUrl || getAppUrl();
    const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || contactConfig.email;
    const notificationEmail = process.env.NEXT_PUBLIC_NOTIFICATION_EMAIL || contactConfig.notificationEmail;
    const smtpHost = process.env.SMTP_HOST || process.env.NEXT_PUBLIC_SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || process.env.NEXT_PUBLIC_SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER || process.env.NEXT_PUBLIC_SMTP_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.NEXT_PUBLIC_SMTP_PASS;
    const smtpSecure = (process.env.SMTP_SECURE || process.env.NEXT_PUBLIC_SMTP_SECURE || 'true').toLowerCase() === 'true';

    const projectData = {
      'Tipo de propiedad': body.tipoProp,
      'Habitaciones': body.habitaciones,
      'Circuitos': body.circuitos,
      'Metros cuadrados': body.m2 || 'No especificado',
      'Pileta': body.pileta,
      'Riego': body.riego,
      'Confort': body.confort?.length ? body.confort.join(', ') : 'Sin opciones de confort',
      'Internet': body.internet,
      'Solar': body.solar,
      'Notas': body.notas || 'Sin observaciones adicionales',
    };

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Verificar conexión SMTP antes de enviar
    await transporter.verify();
    console.log("✅ SMTP conectado correctamente");

    const detailsList = Object.entries(projectData)
      .map(([label, value]) => `<li><strong>${escapeHtml(label)}:</strong> ${escapeHtml(String(value))}</li>`)
      .join('');

    const html = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nueva cotización - ZWOL-HOME</title>
    <style>
      body { margin: 0; padding: 0; background: linear-gradient(135deg, #030509 0%, #0a0e17 100%); font-family: Arial, Helvetica, sans-serif; color: #e2e8f0; }
      a { color: #00d2ff; text-decoration: none; }
      .wrapper { padding: 24px 16px; }
      .card { max-width: 680px; margin: 0 auto; background: rgba(10, 14, 23, 0.96); border: 1px solid rgba(0, 210, 255, 0.25); border-radius: 24px; overflow: hidden; box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35); }
      .header { background: linear-gradient(120deg, #00d2ff 0%, #2563eb 100%); padding: 28px 32px; color: #030509; }
      .header h1 { margin: 0 0 8px; font-size: 24px; line-height: 1.2; }
      .header p { margin: 0; font-size: 14px; font-weight: 600; }
      .content { padding: 28px 32px 10px; }
      .field { margin-bottom: 12px; padding: 12px 14px; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); }
      .field strong { display: block; margin-bottom: 4px; color: #00d2ff; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; }
      .message-box { margin-top: 10px; padding: 14px; border-radius: 12px; background: #f8fafc; color: #111827; line-height: 1.6; }
      .details { margin-top: 22px; padding: 18px; border-radius: 16px; background: rgba(0, 210, 255, 0.08); border: 1px solid rgba(0, 210, 255, 0.18); }
      .details h2 { margin: 0 0 12px; font-size: 16px; color: #00d2ff; }
      .details ul { margin: 0; padding-left: 18px; }
      .details li { margin-bottom: 6px; color: #f8fafc; }
      .footer { padding: 20px 32px 32px; font-size: 12px; color: #94a3b8; text-align: center; }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="card">
        <div class="header">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
            <div style="width: 40px; height: 40px; border-radius: 50%; background: #030509; color: #00d2ff; display: flex; align-items: center; justify-content: center; font-size: 20px;">⚡</div>
            <h1 style="margin: 0;">Nueva cotización recibida</h1>
          </div>
          <p>ZWOL-HOME · Proyecto premium de automatización residencial</p>
        </div>
        <div class="content">
          <div class="field"><strong>Nombre</strong><div>${escapeHtml(body.nombre)}</div></div>
          <div class="field"><strong>Email</strong><div>${escapeHtml(body.email)}</div></div>
          <div class="field"><strong>Teléfono</strong><div>${escapeHtml(body.telefono)}</div></div>
          <div class="field"><strong>Asunto</strong><div>${escapeHtml('Nueva cotización - ZWOL-HOME')}</div></div>
          <div class="field"><strong>Mensaje</strong><div class="message-box">${escapeHtml(body.notas || 'El cliente solicitó una cotización.')}</div></div>
          <div class="details">
            <h2>Detalle del proyecto</h2>
            <ul>${detailsList}</ul>
          </div>
        </div>
        <div class="footer">
          <p>Este mensaje fue enviado desde el formulario de cotización de ZWOL-HOME.</p>
          <p>Web: <a href="${appUrl}">${appUrl}</a> · Email: <a href="mailto:${contactEmail}">${contactEmail}</a></p>
          <p>Instagram: <a href="${contactConfig.instagramUrl}">${contactConfig.instagramLabel}</a></p>
        </div>
      </div>
    </div>
  </body>
</html>`;

    const mailOptions = {
      from: `ZWOL-HOME <${smtpUser}>`,
      to: notificationEmail,
      replyTo: body.email,
      subject: 'ZWOL-HOME',
      text: [
        `Nueva cotización de ${body.nombre}`,
        `Email: ${body.email}`,
        `Teléfono: ${body.telefono}`,
        `Tipo de propiedad: ${body.tipoProp}`,
        `Mensaje: ${body.notas || 'Sin observaciones adicionales'}`,
      ].join('\n'),
      html,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        success: true,
        message: 'Cotización enviada correctamente',
        cotizacionId: `ZWOL-${Date.now()}`,
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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/cotizaciones',
    method: 'POST',
    description: 'Endpoint para recibir nuevas cotizaciones de ZWOL-HOME',
  });
}
