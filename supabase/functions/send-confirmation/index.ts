import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });

  try {
    const { email, nombre, evento, fecha, hora, lugar, direccion, link, link_label } = await req.json();

    if (!email) return new Response(JSON.stringify({ error: 'Email requerido' }), { status: 400, headers: { ...CORS, 'Content-Type': 'application/json' } });

    const MAILGUN_API_KEY = Deno.env.get('MAILGUN_API_KEY')!;
    const MAILGUN_DOMAIN = 'mg.asobares.org';
    const FROM = 'ASOBARES <asobares@asobares.org>';

    const body = new FormData();
    body.append('from', FROM);
    body.append('to', email);
    body.append('subject', `¡Inscripción confirmada! — ${evento}`);
    body.append('html', `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #ffffff; padding: 28px 40px; text-align: center; border-radius: 8px 8px 0 0; border-bottom: 3px solid #E84338;">
          <img src="https://gestion.asobares.org/asobares_original.png" alt="Asobares" style="height: 44px;" />
        </div>
        <div style="padding: 32px 40px; background: #ffffff;">
          <h2 style="color: #1a1a2e; margin-bottom: 8px;">¡Tu inscripción fue confirmada!</h2>
          <p style="color: #475569; font-size: 16px; margin-bottom: 24px;">Hola <strong>${nombre}</strong>, quedaste registrado/a en:</p>

          <div style="background: #f8fafc; border-left: 4px solid #E84338; border-radius: 4px; padding: 20px 24px; margin-bottom: 24px;">
            <p style="font-size: 18px; font-weight: 800; color: #1a1a2e; margin-bottom: 12px;">${evento}</p>
            <p style="color: #475569; font-size: 14px; margin-bottom: 6px;">📅 <strong>${fecha}</strong>${hora ? ' · ' + hora : ''}</p>
            <p style="color: #475569; font-size: 14px; margin-bottom: 0;">📍 <strong>${lugar}</strong>${direccion ? ' · ' + direccion : ''}</p>
          </div>

          <p style="color: #475569; font-size: 15px; line-height: 1.6;">El ingreso es <strong>sin costo</strong>. Te esperamos puntual — los cupos son limitados.</p>
          ${link ? `<div style="text-align:center; margin-top: 24px;"><a href="${link}" target="_blank" style="display:inline-block; background: #E84338; color: white; font-size: 16px; font-weight: 700; padding: 14px 32px; border-radius: 10px; text-decoration: none;">${link_label || 'Ingresar al evento'}</a></div>` : ''}
        </div>
        <div style="background: #f8fafc; padding: 20px 40px; border-top: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; text-align: center;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">
            <strong>Asociación de Bares y Restaurantes de Colombia — ASOBARES</strong><br>
            webasobares@gmail.com
          </p>
          <p style="color: #cbd5e1; font-size: 11px; margin-top: 8px;">Plataforma desarrollada por <a href="https://vamosarayar.com" style="color: #94a3b8;">Rayar!</a></p>
        </div>
      </div>
    `);

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
