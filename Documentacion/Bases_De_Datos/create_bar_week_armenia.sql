-- ============================================================
-- Tabla: inscripciones_bar_week_armenia
-- Evento: Bar Week Armenia 2026 — Cóctel + Tapa por $35.000
-- Organiza: Asobares Colombia
-- ============================================================

CREATE TABLE IF NOT EXISTS inscripciones_bar_week_armenia (
  id                        UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at                TIMESTAMPTZ DEFAULT NOW(),

  -- Autorización
  acepta_datos              BOOLEAN DEFAULT false,

  -- Datos del establecimiento
  nombre_establecimiento    TEXT NOT NULL,
  razon_social              TEXT,
  nit                       TEXT,
  direccion                 TEXT NOT NULL,
  barrio                    TEXT NOT NULL,
  localidad                 TEXT,          -- "Sector o zona" en la UI de Armenia
  telefono_reservas         TEXT,
  horarios                  TEXT,
  capacidad                 TEXT,
  concepto_gastronomico     TEXT,
  concepto_musical          TEXT,
  perfil_publico            TEXT,
  oferta_actual             TEXT,
  marcas_licores            TEXT,
  tiene_patrocinios         TEXT,
  cuales_patrocinios        TEXT,
  instagram                 TEXT,
  facebook                  TEXT,
  pagina_web                TEXT,
  logo_marca                TEXT,          -- Ruta en Storage bucket "formularios/bar-week-armenia/"

  -- Contacto
  nombre_contacto           TEXT NOT NULL,
  telefono_contacto         TEXT,
  correo_contacto           TEXT NOT NULL,

  -- Gestión interna CRM
  estado                    TEXT DEFAULT 'pendiente',
  notas                     TEXT
);

-- RLS
ALTER TABLE inscripciones_bar_week_armenia ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_insert_bwa" ON inscripciones_bar_week_armenia
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "allow_select_bwa" ON inscripciones_bar_week_armenia
  FOR SELECT TO anon USING (true);

CREATE POLICY "allow_update_bwa" ON inscripciones_bar_week_armenia
  FOR UPDATE TO anon USING (true) WITH CHECK (true);

CREATE POLICY "allow_delete_bwa" ON inscripciones_bar_week_armenia
  FOR DELETE TO anon USING (true);
