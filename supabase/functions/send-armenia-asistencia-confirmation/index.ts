import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });

  try {
    const payload = await req.json();
    const record = payload.record ?? payload;
    const { nombre, apellido, correo, cargo, ciudad, departamento } = record;

    if (!correo) {
      return new Response(JSON.stringify({ error: 'No email in record' }), {
        status: 400,
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    const nombreCompleto = [nombre, apellido].filter(Boolean).join(' ');
    const MAILGUN_API_KEY = Deno.env.get('MAILGUN_API_KEY')!;
    const MAILGUN_DOMAIN = 'mg.asobares.org';
    const FROM = 'Asobares Armenia <ceo@vamosarayar.com>';

    const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08);">

        <tr>
          <td style="padding:0;">
            <img src="https://asobares.org/wp-content/uploads/2026/08/Banner-forms-4-scaled.jpg" alt="Asistencia Armenia 24" style="width:100%;display:block;" />
          </td>
        </tr>

        <tr>
          <td style="padding:40px 40px 8px;text-align:center;">
            <div style="display:inline-block;width:72px;height:72px;background:linear-gradient(135deg,#2db84b,#1e7c34);border-radius:50%;line-height:72px;font-size:36px;color:#fff;margin-bottom:20px;">✓</div>
            <h2 style="margin:0 0 8px;font-size:22px;color:#1a1a1a;">
              Hola, <span style="color:#2db84b;">${nombreCompleto}</span>
            </h2>
            <p style="margin:6px 0 0;font-size:16px;font-weight:700;color:#1a1a1a;">
              ¡Tu registro fue recibido exitosamente!
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:24px 40px 32px;">
            <p style="margin:0 0 20px;font-size:15px;color:#475569;line-height:1.7;text-align:center;">
              Quedaste registrado(a) en el Ciclo de Formación y Capacitaciones del programa de Fortalecimiento Empresarial en Armenia, Quindío.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fff9;border:1px solid #c8e6c9;border-radius:12px;margin:0 0 24px;">
              <tr>
                <td style="padding:20px 24px;">
                  <p style="margin:0 0 14px;font-size:11px;font-weight:700;color:#4a7c59;letter-spacing:2px;">TUS DATOS DE REGISTRO</p>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    ${cargo ? `<tr><td style="padding:8px 0;border-bottom:1px solid #e8f5e9;"><span style="font-size:12px;color:#64748b;">CARGO</span><br/><span style="font-size:14px;color:#1a2e1a;font-weight:600;">${cargo}</span></td></tr>` : ''}
                    ${ciudad ? `<tr><td style="padding:8px 0;"><span style="font-size:12px;color:#64748b;">CIUDAD</span><br/><span style="font-size:14px;color:#1a2e1a;font-weight:600;">${ciudad}${departamento ? ', ' + departamento : ''}</span></td></tr>` : ''}
                  </table>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 8px;font-size:15px;color:#475569;text-align:center;line-height:1.6;">
              Pronto te informaremos las fechas y lugares de las capacitaciones.
            </p>
            <p style="margin:0;font-size:15px;color:#475569;text-align:center;line-height:1.6;">
              ¿Tienes preguntas? Escríbenos a
              <a href="mailto:direccion.ejecutiva@asobares.org" style="color:#2db84b;text-decoration:none;font-weight:600;">direccion.ejecutiva@asobares.org</a>
            </p>
          </td>
        </tr>

        <tr>
          <td style="background:#f9fafb;padding:20px 40px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:12px;color:#94a3b8;text-align:center;line-height:1.6;">
              <strong>Asociación de Bares y Restaurantes de Colombia — ASOBARES</strong><br/>
              webasobares@gmail.com · <a href="https://asobares.org" style="color:#94a3b8;">asobares.org</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#f0f0f0;padding:10px 40px;border-top:1px solid #e0e0e0;">
            <p style="margin:0;font-size:11px;color:#b0b0b0;text-align:center;">
              Sistema desarrollado por <a href="https://vamosarayar.com" style="color:#2db84b;text-decoration:none;font-weight:600;">vamosarayar.com</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const formBody = new FormData();
    formBody.append('from', FROM);
    formBody.append('to', correo);
    formBody.append('subject', '¡Registro confirmado! Ciclo de Formación y Capacitaciones — Armenia');
    formBody.append('html', html);

    const auth = btoa(`api:${MAILGUN_API_KEY}`);
    const res = await fetch(`https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`, {
      method: 'POST',
      headers: { Authorization: `Basic ${auth}` },
      body: formBody,
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
