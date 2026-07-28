import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

type RequestBody = {
  name: string;
  subject: string;
  email: string;
  message: string;
};

export async function POST(request: Request) {
  const { name, subject, email, message }: RequestBody = await request.json();

  // Validar campos
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
  };

  const React = await import('react')
  const { renderToStaticMarkup } = await import('react-dom/server')
  const EmailTemplate = (await import('../src/components/EmailTemplate')).default

  const element = React.createElement(EmailTemplate, {
    name,
    email,
    phone: '',
    subject,
    message,
    projectData: {},
    appUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://zwol-home.com',
    contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'zwolhome@gmail.com',
    instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/zwol.robotic?igsh=MXJ4c2QyMWt0aDgzbQ==',
    instagramLabel: process.env.NEXT_PUBLIC_INSTAGRAM_LABEL || '@zwol.robotic',
  });

  const bodyHtml = `<!DOCTYPE html>${renderToStaticMarkup(element)}`;

  // Crear el transporter de nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // si usas 587, añade:
    // requireTLS: true,
  });

  // Opciones del mensaje
  const mailOptions = {
    from: `${name} <${email}>`,
    to: process.env.EMAIL_TO,      // <- aquí, tu buzón destino
    replyTo: email,               // <- la dirección que puso el usuario
    subject: subject,
    text: `
      Nombre: ${name}
      Email: ${email}
      Asunto: ${subject}
      Mensaje:
      ${message}
    `,
    html: bodyHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    // Prepara un mensaje por defecto
    let msg = 'Error al enviar el mensaje';

    // Si es un Error nativo, extraemos .message
    if (error instanceof Error) {
      console.error('Error enviando email:', error);
      msg = error.message;
    } else {
      console.error('Error inesperado:', error);
    }

    return NextResponse.json({ error: msg }, { status: 500 });
  }
};