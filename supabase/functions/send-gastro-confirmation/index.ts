import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOGO_GASTRO = 'https://asobares.org/wp-content/uploads/2026/07/logos-gastromarketing-day-03.png';
const LOGO_ASOBARES = 'https://asobares.org/wp-content/uploads/2026/07/logos-gastromarketing-day-02.png';
const LOGO_APLUS = 'https://asobares.org/wp-content/uploads/2026/07/logos-gastromarketing-day-01.png';

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });

  try {
    const payload = await req.json();

    // Supabase Database Webhook payload: { type, table, record, old_record }
    const record = payload.record ?? payload;
    const { nombre, apellidos, email } = record;

    if (!email) {
      return new Response(JSON.stringify({ error: 'No email in record' }), {
        status: 400,
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    const nombreCompleto = [nombre, apellidos].filter(Boolean).join(' ');

    const MAILGUN_API_KEY = Deno.env.get('MAILGUN_API_KEY')!;
    const MAILGUN_DOMAIN = 'mg.asobares.org';
    const FROM = 'Gastromarketing Day <ceo@vamosarayar.com>';

    const htmlBody = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08);">

          <!-- Header con logos -->
          <tr>
            <td style="background:#1a1a1a;padding:28px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:0 12px;">
                    <img src="${LOGO_APLUS}" alt="Aplus" style="height:48px;max-width:140px;object-fit:contain;" />
                  </td>
                  <td align="center" style="padding:0 12px;border-left:1px solid #333;border-right:1px solid #333;">
                    <img src="${LOGO_GASTRO}" alt="Gastromarketing Day" style="height:56px;max-width:180px;object-fit:contain;" />
                  </td>
                  <td align="center" style="padding:0 12px;">
                    <img src="${LOGO_ASOBARES}" alt="Asobares" style="height:48px;max-width:140px;object-fit:contain;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Checkmark + saludo -->
          <tr>
            <td style="padding:40px 40px 8px;text-align:center;">
              <div style="display:inline-block;width:72px;height:72px;background:#e8521a;border-radius:50%;line-height:72px;font-size:36px;color:#fff;margin-bottom:20px;">✓</div>
              <h1 style="margin:0 0 8px;font-size:28px;color:#1a1a1a;">
                Hola, <span style="color:#e8521a;">${nombreCompleto}</span>
              </h1>
              <p style="margin:12px 0 0;font-size:17px;font-weight:700;color:#1a1a1a;">
                ¡Gracias por postularte para ser parte del Gastromarketing Day!
              </p>
            </td>
          </tr>

          <!-- Cuerpo -->
          <tr>
            <td style="padding:24px 40px;">
              <p style="margin:0 0 20px;font-size:15px;color:#475569;line-height:1.7;text-align:center;">
                En próximos días un miembro de nuestro equipo se estará contactando contigo
                para confirmar tu acreditación al evento y que recibas tu invitación.
              </p>

              <!-- Caja de contacto -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f8;border-radius:12px;margin:8px 0 24px;">
                <tr>
                  <td style="padding:24px 28px;text-align:center;">
                    <p style="margin:0;font-size:14px;color:#475569;line-height:1.8;">
                      ¡Nos alegra mucho tu interés en sumar a este evento! Si tienes alguna duda,
                      puedes comunicarte al siguiente contacto
                      <strong style="color:#e8521a;">3212304589</strong>
                      o al correo electrónico
                      <a href="mailto:direccion.ejecutiva@asobares.org" style="color:#e8521a;text-decoration:none;font-weight:bold;">direccion.ejecutiva@asobares.org</a>.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:16px;font-weight:700;color:#1a1a1a;text-align:center;">¡Un saludo!</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:20px 40px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:12px;color:#94a3b8;text-align:center;line-height:1.6;">
                <strong>Asociación de Bares y Restaurantes de Colombia — ASOBARES</strong><br/>
                webasobares@gmail.com · <a href="https://asobares.org" style="color:#94a3b8;">asobares.org</a>
              </p>
            </td>
          </tr>

          <!-- Crédito sistema -->
          <tr>
            <td style="background:#f0f0f0;padding:12px 40px;border-top:1px solid #e0e0e0;">
              <p style="margin:0;font-size:11px;color:#b0b0b0;text-align:center;">
                Sistema desarrollado por <a href="https://vamosarayar.com" style="color:#e8521a;text-decoration:none;font-weight:600;">vamosarayar.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const body = new FormData();
    body.append('from', FROM);
    body.append('to', email);
    body.append('subject', '¡Tu postulación al Gastromarketing Day fue recibida!');
    body.append('html', htmlBody);

    const auth = btoa(`api:${MAILGUN_API_KEY}`);
    const res = await fetch(`https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`, {
      method: 'POST',
      headers: { Authorization: `Basic ${auth}` },
      body,
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Mailgun error ${res.status}: ${err}`);
    }

    const result = await res.json();
    return new Response(JSON.stringify({ success: true, id: result.id }), {
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }
});
