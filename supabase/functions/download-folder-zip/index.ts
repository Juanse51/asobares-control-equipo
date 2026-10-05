import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import JSZip from 'npm:jszip';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });

  try {
    const { folderId, folderName } = await req.json();

    if (!folderId) {
      return new Response(JSON.stringify({ error: 'folderId requerido' }), {
        status: 400, headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY');
    if (!GOOGLE_API_KEY) {
      return new Response(JSON.stringify({ error: 'GOOGLE_API_KEY no configurado' }), {
        status: 500, headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    const listUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false&fields=files(id,name,mimeType)&key=${GOOGLE_API_KEY}&pageSize=200`;
    const listRes = await fetch(listUrl);

    if (!listRes.ok) {
      const err = await listRes.text();
      return new Response(JSON.stringify({ error: 'Error al listar archivos', detail: err }), {
        status: 500, headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    const { files } = await listRes.json();

    if (!files || files.length === 0) {
      return new Response(JSON.stringify({ error: 'Carpeta vacía o no es pública' }), {
        status: 404, headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    const zip = new JSZip();

    for (const file of files) {
      if (file.mimeType === 'application/vnd.google-apps.folder') continue;
      if (file.mimeType.startsWith('application/vnd.google-apps')) continue;

      const fileRes = await fetch(
        `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media&key=${GOOGLE_API_KEY}`
      );
      if (!fileRes.ok) continue;

      const buffer = await fileRes.arrayBuffer();
      zip.file(file.name, buffer);
    }

    const zipBuffer = await zip.generateAsync({ type: 'arraybuffer' });
    const safeName = (folderName || 'logos').replace(/[<>:"/\\|?*]/g, '_');

    return new Response(zipBuffer, {
      headers: {
        ...CORS,
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${safeName}.zip"`,
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500, headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }
});
