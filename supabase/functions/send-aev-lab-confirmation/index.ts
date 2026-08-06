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
    const FROM = 'Área en Vivo Lab <ceo@vamosarayar.com>';

    const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08);">

        <!-- Header oscuro -->
        <tr>
          <td style="background:#0d0505;padding:32px 40px;text-align:center;">
            <img src="https://gestion.asobares.org/asobares_blanco.png" alt="Asobares" style="height:44px;object-fit:contain;margin-bottom:20px;display:block;margin-left:auto;margin-right:auto;" />
            <p style="margin:0;font-size:11px;font-weight:700;color:#f59e0b;letter-spacing:2.5px;">ÁREA EN VIVO LAB</p>
            <h1 style="margin:8px 0 4px;font-size:22px;font-weight:900;color:white;line-height:1.2;">SONIDO, VIDEO<br>Y PERFORMANCE DJ</h1>
            <span style="display:inline-block;background:#E84338;color:white;font-size:11px;font-weight:700;padding:4px 14px;border-radius:20px;margin-top:8px;letter-spacing:1px;">AGENDA ACADÉMICA</span>
          </td>
        </tr>

        <!-- Checkmark + saludo -->
        <tr>
          <td style="padding:40px 40px 8px;text-align:center;">
            <div style="display:inline-block;width:72px;height:72px;background:linear-gradient(135deg,#E84338,#c41e16);border-radius:50%;line-height:72px;font-size:36px;color:#fff;margin-bottom:20px;">✓</div>
            <h2 style="margin:0 0 8px;font-size:24px;color:#1a1a1a;">
              Hola, <span style="color:#E84338;">${nombreCompleto}</span>
            </h2>
            <p style="margin:10px 0 0;font-size:16px;font-weight:700;color:#1a1a1a;">
              ¡Tu inscripción fue recibida exitosamente!
            </p>
          </td>
        </tr>

        <!-- Cuerpo -->
        <tr>
          <td style="padding:24px 40px 32px;">
            <p style="margin:0 0 20px;font-size:15px;color:#475569;line-height:1.7;text-align:center;">
              Te esperamos en el evento. Recuerda llevar tu documento de identidad para el registro en la entrada.
            </p>

            <!-- Info evento -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0505;border-radius:12px;margin:0 0 24px;">
              <tr>
                <td style="padding:24px 28px;text-align:center;">
                  <p style="margin:0 0 6px;font-size:20px;font-weight:800;color:#E84338;">Miércoles 12 de Agosto</p>
                  <p style="margin:0 0 12px;font-size:14px;color:#94a3b8;">4:00 p.m. a 8:00 p.m.</p>
                  <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:white;">📍 Octava Club</p>
                  <p style="margin:0;font-size:13px;color:#64748b;">Cra. 8 #63-41, Chapinero · Bogotá</p>
                </td>
              </tr>
            </table>

            <p style="margin:0;font-size:15px;color:#475569;text-align:center;line-height:1.6;">
              ¿Tienes preguntas? Escríbenos a
              <a href="mailto:direccion.ejecutiva@asobares.org" style="color:#E84338;text-decoration:none;font-weight:600;">direccion.ejecutiva@asobares.org</a>
            </p>
          </td>
        </tr>

        <!-- Logos sponsors -->
        <tr>
          <td style="background:#ffffff;padding:28px 32px;border-top:1px solid #e5e7eb;text-align:center;">
            <p style="margin:0 0 20px;font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:2px;">ORGANIZA Y APOYA</p>
            <table width="100%" cellpadding="0" cellspacing="0"><tr>
              <td align="center" style="padding:0 6px;"><img src="https://asobares.org/wp-content/uploads/2026/01/Nuevo-logo-Asobares-Color-scaled.png" alt="Asobares" style="height:40px;object-fit:contain;" /></td>
              <td align="center" style="padding:0 6px;"><img src="https://asobares.org/wp-content/uploads/2025/03/Cluster_DJ_Positivo_Color_Luz.png" alt="Cluster DJ" style="height:40px;object-fit:contain;" /></td>
              <td align="center" style="padding:0 6px;"><img src="https://asobares.org/wp-content/uploads/2026/08/Logo_CCB_big.svg" alt="Cámara de Comercio" style="height:40px;object-fit:contain;" /></td>
              <td align="center" style="padding:0 6px;"><img src="https://asobares.org/wp-content/uploads/2026/08/cluster-musica-bogota.png" alt="Cluster Música Bogotá" style="height:40px;object-fit:contain;" /></td>
              <td align="center" style="padding:0 6px;"><img src="https://asobares.org/wp-content/uploads/2026/08/Bogota_marca_ciudad.svg.webp" alt="Bogotá" style="height:40px;object-fit:contain;" /></td>
            </tr></table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f0f0f0;padding:16px 40px;border-top:1px solid #e0e0e0;">
            <p style="margin:0;font-size:12px;color:#94a3b8;text-align:center;line-height:1.6;">
              <strong>Asociación de Bares y Restaurantes de Colombia — ASOBARES</strong><br/>
              webasobares@gmail.com · <a href="https://asobares.org" style="color:#94a3b8;">asobares.org</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#e8e8e8;padding:10px 40px;">
            <p style="margin:0;font-size:11px;color:#b0b0b0;text-align:center;">
              Sistema desarrollado por <a href="https://vamosarayar.com" style="color:#E84338;text-decoration:none;font-weight:600;">vamosarayar.com</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const body = new FormData();
    body.append('from', FROM);
    body.append('to', email);
    body.append('subject', '¡Inscripción confirmada! Sonido, Video y Performance DJ — 12 de Agosto');
    body.append('html', html);

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
