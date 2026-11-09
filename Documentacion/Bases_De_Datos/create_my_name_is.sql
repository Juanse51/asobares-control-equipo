-- ============================================================
-- Tabla: inscripciones_my_name_is
-- Programa: My Name Is… — Inglés especializado en Mesa y Bar
-- Organiza: Asobares Colombia | Apoyo: Fontur
-- ============================================================

CREATE TABLE IF NOT EXISTS inscripciones_my_name_is (
  id                        UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at                TIMESTAMPTZ DEFAULT NOW(),

  -- Sección B — Información personal
  nombre                    TEXT NOT NULL,
  apellidos                 TEXT NOT NULL,
  tipo_identificacion       TEXT,
  numero_identificacion     TEXT,
  genero                    TEXT,
  etnia                     TEXT,
  grupos_poblacionales      TEXT,
  email                     TEXT NOT NULL,
  telefono                  TEXT,
  cargo                     TEXT,
  rango_edad                TEXT,
  nivel_ingles              TEXT,

  -- Sección C — Información laboral
  razon_social              TEXT,
  nit                       TEXT,
  nombre_comercial          TEXT,
  tipo_establecimiento      TEXT,
  tipo_establecimiento_otro TEXT,
  departamento              TEXT,
  ciudad                    TEXT,
  direccion                 TEXT,
  como_se_entero            TEXT,

  -- Gestión interna CRM
  estado                    TEXT DEFAULT 'inscrito',
  notas                     TEXT
);

-- RLS: habilitar seguridad a nivel de fila
ALTER TABLE inscripciones_my_name_is ENABLE ROW LEVEL SECURITY;

-- Permitir inserciones desde el landing (anon)
CREATE POLICY "allow_insert_mni" ON inscripciones_my_name_is
  FOR INSERT TO anon WITH CHECK (true);

-- Permitir lectura y edición solo a roles autenticados
CREATE POLICY "allow_select_mni" ON inscripciones_my_name_is
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "allow_update_mni" ON inscripciones_my_name_is
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "allow_delete_mni" ON inscripciones_my_name_is
  FOR DELETE TO authenticated USING (true);
