/* eslint-disable @next/next/no-head-element, @next/next/no-img-element */

import React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function EmailTemplate({
  name,
  email,
  subject = 'Sin asunto',
  message,
}: EmailTemplateProps) {
  return (
    <html lang="es-419">
      <head>
        <meta charSet="UTF-8" />
        <title>REXANTEC</title>
        <style>
          {`
            /* Reset y tipografía */
            body {
              margin: 0;
              padding: 0;
              background: #f4f4f4;
              font-family: Arial, sans-serif;
            }
            img { display: block; border: none; }

            /* Contenedor principal */
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #0f446ca1;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              color: #e5e7eb;
            }

            /* Cabecera: logo + título centrados */
            .header {
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
              background: transparent;
            }
            .header img {
              width: 32px;
              height: 32px;
              margin-right: 12px;
            }
            .header h2 {
              margin: 0;
              font-size: 24px;
              font-weight: bold;
            }

            /* Cuerpo del mensaje */
            .content {
              padding: 0 20px 20px;
              line-height: 1.5;
            }
            .field {
              display: flex;
              align-items: flex-start;
              margin: 8px 0;
            }
            .field strong {
              width: 80px;
              flex-shrink: 0;
            }
            /* Campo “Mensaje” con caja gris y bordes redondeados */
            .message-field .message-box {
              flex: 1;
              background: #e5e7eb;
              border-radius: 8px;
              padding: 10px;
              color: #333333;
            }

            /* Pie de página */
            .footer {
              text-align: center;
              padding: 12px;
              font-size: 12px;
              background: transparent;
              color: #e5e7eb;
            }
          `}
        </style>
      </head>
      <body>
        <div className="container">
          {/* Header */}
          <div className="header">
            <img
              src="https://www.rexantec.com.ar/favicon/favicon-32x32.png"
              alt="Logo REXANTEC"/>
            <h2>REXANTEC</h2>
          </div>

          {/* Content */}
          <div className="content">
            <div className="field">
              <strong>Nombre:</strong>
              <span>{name}</span>
            </div>
            <div className="field">
              <strong>Email:</strong>
              <span>{email}</span>
            </div>
            <div className="field">
              <strong>Asunto:</strong>
              <span>{subject}</span>
            </div>
            <div className="field message-field">
              <strong>Mensaje:</strong>
              <div
                className="message-box"
                dangerouslySetInnerHTML={{
                  __html: message.replace(/\n/g, '<br/>'),
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="footer">
            Mensaje enviado desde el formulario de&nbsp;
            <a href={'https://www.rexantec.com.ar'}>
              https://www.rexantec.com.ar.
            </a>
          </div>
        </div>
      </body>
    </html>
  );
};