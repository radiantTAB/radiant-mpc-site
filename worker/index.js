// index.js — Worker entry point for radiant-mpc.com.
//
// Routing:
//   /admin/api/*  -> License Manager JSON API (handled here)
//   everything else -> static assets (the marketing site + admin pages)
//
// The /admin/* paths (pages and API) are protected by Cloudflare Access —
// configure an Access application covering radiant-mpc.com/admin so only
// the admin can reach this. The API trusts that gate.

import { signLicense } from "./license-core.js";
import { RADIANT_PRODUCTS, PRODUCT_IDS, PRODUCT_NAMES } from "./products.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/admin/api/")) {
      try {
        return await handleApi(request, env, url);
      } catch (err) {
        return json({ error: String((err && err.message) || err) }, 500);
      }
    }
    return env.ASSETS.fetch(request);
  },
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

async function handleApi(request, env, url) {
  const path = url.pathname;

  // GET /admin/api/products — the catalog, for the issue-form checklist.
  if (path === "/admin/api/products" && request.method === "GET") {
    return json({
      products: RADIANT_PRODUCTS.map(([id, name]) => ({ id, name })),
    });
  }

  // GET /admin/api/licenses — every issued key, newest first.
  if (path === "/admin/api/licenses" && request.method === "GET") {
    if (!env.DB) return json({ error: "Database is not connected yet." }, 500);
    const { results } = await env.DB.prepare(
      "SELECT * FROM licenses ORDER BY created_at DESC"
    ).all();
    const today = todayISO();
    const licenses = (results || []).map((r) => {
      const ids = (r.products || "").split(",").filter(Boolean);
      return {
        id: r.id,
        customer: r.customer,
        issued: r.issued,
        expires: r.expires,
        key: r.key,
        status: r.expires < today ? "Expired" : "Active",
        products: ids.map((p) => PRODUCT_NAMES[p] || p),
      };
    });
    return json({ licenses });
  }

  // POST /admin/api/licenses — issue and store a new signed key.
  if (path === "/admin/api/licenses" && request.method === "POST") {
    if (!env.DB) return json({ error: "Database is not connected yet." }, 500);
    if (!env.LICENSE_SIGNING_KEY) {
      return json(
        { error: "Signing key is not configured (set the LICENSE_SIGNING_KEY secret)." },
        500
      );
    }

    const body = await request.json().catch(() => ({}));
    const customer = String(body.customer || "").trim();
    const days = parseInt(body.days, 10);
    const products = (Array.isArray(body.products) ? body.products : []).filter(
      (p) => PRODUCT_IDS.includes(p)
    );

    if (!customer) return json({ error: "Customer name is required." }, 400);
    if (!Number.isInteger(days) || days < 1) {
      return json({ error: "Trial length must be a whole number of days (1 or more)." }, 400);
    }
    if (products.length === 0) {
      return json({ error: "Select at least one product for this license." }, 400);
    }

    const result = await signLicense(env.LICENSE_SIGNING_KEY, customer, days, products);

    await env.DB.prepare(
      "INSERT INTO licenses (id, customer, issued, expires, key, created_at, products) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?)"
    )
      .bind(
        result.id,
        result.customer,
        result.issued,
        result.expires,
        result.key,
        new Date().toISOString(),
        result.products.join(",")
      )
      .run();

    return json({
      ok: true,
      license: {
        ...result,
        product_names: result.products.map((p) => PRODUCT_NAMES[p] || p),
      },
    });
  }

  return json({ error: "Not found." }, 404);
}
