-- D1 schema for the Radiant License Manager.

-- ---- Fresh database: run this once in the D1 "Console" ----
CREATE TABLE IF NOT EXISTS licenses (
  id          TEXT PRIMARY KEY,
  customer    TEXT NOT NULL,
  issued      TEXT NOT NULL,
  expires     TEXT NOT NULL,
  key         TEXT NOT NULL,
  created_at  TEXT NOT NULL,
  products    TEXT NOT NULL DEFAULT '',
  revoked     INTEGER NOT NULL DEFAULT 0,
  revoked_at  TEXT
);

-- ---- Existing database created before revocation was added ----
-- If the `licenses` table already exists without the revoked columns,
-- run these two statements once in the D1 Console to upgrade it:
--
--   ALTER TABLE licenses ADD COLUMN revoked INTEGER NOT NULL DEFAULT 0;
--   ALTER TABLE licenses ADD COLUMN revoked_at TEXT;
