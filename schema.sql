-- D1 schema for the Radiant License Manager.
-- Run this once in the D1 "Console" after creating the database.
--
-- Mirrors the `licenses` table from the original Flask tool
-- (C:\Radiant_License\admin\app.py). The `admin` table is intentionally
-- dropped — Cloudflare Access handles admin login now.

CREATE TABLE IF NOT EXISTS licenses (
  id          TEXT PRIMARY KEY,
  customer    TEXT NOT NULL,
  issued      TEXT NOT NULL,
  expires     TEXT NOT NULL,
  key         TEXT NOT NULL,
  created_at  TEXT NOT NULL,
  products    TEXT NOT NULL DEFAULT ''
);
