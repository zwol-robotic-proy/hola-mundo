/* eslint-disable @next/next/no-head-element, @next/next/no-img-element */

import React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  projectData?: Record<string, string | string[] | undefined>;
  appUrl?: string;
  contactEmail?: string;
  instagramUrl?: string;
  instagramLabel?: string;
}

export default function EmailTemplate({
  name,
  email,
  phone,
  subject,
  message,
  projectData,
  appUrl,
  contactEmail,
  instagramUrl,
  instagramLabel,
}: EmailTemplateProps) {
  const fields = [
    { label: "Nombre", value: name || "No informado" },
    { label: "Email", value: email || "No informado" },
    { label: "Teléfono", value: phone || "No informado" },
    { label: "Asunto", value: subject || "Sin asunto" },
  ];

  const details = projectData
    ? Object.entries(projectData).filter(([, value]) => Boolean(value))
    : [];

  return (
    <html lang="es-419">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>⚡ Nueva cotización recibida <strong>ZWOL-HOME</strong></title>
        <style>{`
          body {
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #030509 0%, #0a0e17 100%);
            font-family: Arial, Helvetica, sans-serif;
            color: #e2e8f0;
          }
          a {
            color: #00d2ff;
            text-decoration: none;
          }
          .wrapper {
            padding: 24px 16px;
          }
          .card {
            max-width: 680px;
            margin: 0 auto;
            background: rgba(10, 14, 23, 0.96);
            color: #ffffff
            border: 1px solid rgba(0, 210, 255, 0.25);
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);
          }
          .header {
            background: linear-gradient(120deg, #00d2ff 0%, #2563eb 100%);
            padding: 28px 32px;
            color: #030509;
          }
          .header h1 {
            margin: 0 0 8px;
            font-size: 24px;
            line-height: 1.2;
          }
          .header p {
            margin: 0;
            font-size: 14px;
            font-weight: 600;
          }
          .content {
            padding: 28px 32px 10px;
          }
          .field {
            margin-bottom: 12px;
            padding: 12px 14px;
            border-radius: 12px;
            background: rgb(255, 255, 255);
            border: 1px solid rgba(255,255,255,0.08);
          }
          .field strong {
            display: block;
            margin-bottom: 4px;
            color: #00d2ff;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }
          .message-box {
            margin-top: 10px;
            padding: 14px;
            border-radius: 12px;
            background: #ffffff;
            color: #111827;
            line-height: 1.6;
            border: 1px solid #e5e7eb;
          }
          .details {
            margin-top: 22px;
            padding: 18px;
            border-radius: 16px;
            background: rgba(0, 210, 255, 0.08);
            border: 1px solid rgba(0, 210, 255, 0.18);
          }
          .details h2 {
            margin: 0 0 12px;
            font-size: 16px;
            color: #00d2ff;
          }
          .details ul {
            margin: 0;
            padding-left: 18px;
          }
          .details li {
            margin-bottom: 6px;
            color: #f8fafc;
          }
          .footer {
            padding: 20px 32px 32px;
            font-size: 12px;
            color: #94a3b8;
            text-align: center;
          }
          .footer a {
            color: #00d2ff;
          }
        `}</style>
      </head>
      <body>
        <div className="wrapper">
          <div className="card">
            <div className="header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#030509', color: '#00d2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                  ⚡
                </div>
                <h1 style={{ margin: 0 }}>Nueva cotización</h1>
              </div>
              <p>ZWOL-HOME · Proyecto premium de automatización residencial</p>
            </div>

            <div className="content">
              <div className="field">
                <strong>FECHA: </strong>
                <div>{new Date().toLocaleDateString()}</div>
              </div>
              {fields.map((field) => (
                <div className="field" key={field.label}>
                  <strong>{field.label}</strong>

                    {field.label === "Email" ? (
                    <a
                      href={`mailto:${field.value}`}
                      style={{
                        color: "#00d2ff",
                        textDecoration: "none",
                      }}
                    >
                      {field.value}
                    </a>
                    ) : field.label === "Teléfono" ? (
                      <a
                        href={`https://wa.me/54${field.value.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                        color: "#00d2ff",
                        textDecoration: "none",
                        }}
                      >
                        {field.value}
                      </a>
                    ) : (
                      <div className="message-box">
                        {field.value}
                      </div>
                    )}
                  </div>
                  ))}
                </div>
                </div>
              ))}

              <div className="field">
                <strong>Mensaje </strong>
                <div className="message-box" dangerouslySetInnerHTML={{ __html: (message || "Sin observaciones").replace(/\n/g, "<br />") }} />
              </div>

              {details.length > 0 && (
                <div className="details">
                  <h2>Detalle del proyecto</h2>
                  <ul>
                    {details.map(([label, value]) => (
                      <li key={label}>
                        <strong>{label}:</strong> {Array.isArray(value) ? value.join(", ") : value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="footer">
              <p>Este mensaje fue enviado desde el formulario de cotización de ZWOL-HOME.</p>
              <p>
                Web: <a href={appUrl}>{appUrl}</a> · Email: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </p>
              <p>
                Instagram: <a href={instagramUrl}>{instagramLabel}</a>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
