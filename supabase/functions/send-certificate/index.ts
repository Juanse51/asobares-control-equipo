import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });

  try {
    const { email, nombre, loteNombre, pdfBase64, fileName, tipo } = await req.json();

    if (!email) return new Response(JSON.stringify({ error: 'Email requerido' }), { status: 400, headers: { ...CORS, 'Content-Type': 'application/json' } });

    const MAILGUN_API_KEY = Deno.env.get('MAILGUN_API_KEY')!;
    const MAILGUN_DOMAIN = 'mg.asobares.org';
    const FROM = 'ASOBARES <asobares@asobares.org>';

    const pdfBytes = Uint8Array.from(atob(pdfBase64), (c) => c.charCodeAt(0));

    const esCarta = tipo === 'carta';
    const subject = esCarta ? `¡Bienvenido al Círculo Gastro de Asobares Colombia!` : `Certificado de Participación — ${loteNombre}`;
    const htmlBody = esCarta ? `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
        <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 28px;">
          <img src="https://gestion.asobares.org/asobares_original.png" alt="Asobares" style="height: 44px;" />
          <img src="https://gestion.asobares.org/Documentacion/Logos/circulo-gastro-logo.png" alt="Círculo Gastro" style="height: 44px;" />
        </div>
        <p style="color: #475569; font-size: 16px; margin-bottom: 16px;">Estimados: <strong>${nombre}</strong>,</p>
        <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-bottom: 16px;">
          Adjunto encontrará la carta de vinculación de tu establecimiento al Círculo Gastro de Asobares.
        </p>
        <p style="color: #475569; font-size: 15px; line-height: 1.6;">
          Bienvenido a la comunidad más importante de la industria de gastroentretenimiento del país.
        </p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
        <p style="color: #94a3b8; font-size: 13px;">
          <strong>Asociación de Bares y Restaurantes de Colombia — ASOBARES</strong><br>
          webasobares@gmail.com
        </p>
      </div>
    ` : `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
        <img src="https://gestion.asobares.org/asobares_original.png" alt="Asobares" style="height: 48px; margin-bottom: 24px;" />
        <h2 style="color: #1a1a2e; margin-bottom: 8px;">Certificado de Participación</h2>
        <p style="color: #475569; font-size: 16px;">Estimado/a <strong>${nombre}</strong>,</p>
        <p style="color: #475569; font-size: 15px; line-height: 1.6;">
          Adjunto encontrará su <strong>Certificado de Participación</strong> del curso:<br>
          <strong style="color: #1a1a2e; font-size: 16px;">${loteNombre}</strong>
        </p>
        <p style="color: #475569; font-size: 15px; line-height: 1.6;">Gracias por su participación y compromiso con la formación del sector.</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
        <p style="color: #94a3b8; font-size: 13px;">
          <strong>Asociación de Bares y Restaurantes de Colombia — ASOBARES</strong><br>
          webasobares@gmail.com
        </p>
      </div>
    `;

    const body = new FormData();
    body.append('from', FROM);
    body.append('to', email);
    body.append('subject', subject);
    body.append('html', htmlBody);
    body.append(
      'attachment',
      new Blob([pdfBytes], { type: 'application/pdf' }),
      fileName || 'certificado.pdf',
    );

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
