import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });

  try {
    const { email, nombre, loteNombre, pdfBase64, fileName } = await req.json();

    if (!email) return new Response(JSON.stringify({ error: 'Email requerido' }), { status: 400, headers: { ...CORS, 'Content-Type': 'application/json' } });

    const MAILGUN_API_KEY = Deno.env.get('MAILGUN_API_KEY')!;
    const MAILGUN_DOMAIN = 'mg.asobares.org';
    const FROM = 'ASOBARES <asobares@asobares.org>';

    const pdfBytes = Uint8Array.from(atob(pdfBase64), (c) => c.charCodeAt(0));

    const body = new FormData();
    body.append('from', FROM);
    body.append('to', email);
    body.append('subject', `Certificado de Participación — ${loteNombre}`);
    body.append('html', `
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
    `);
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
