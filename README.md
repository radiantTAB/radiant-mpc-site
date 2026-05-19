# radiant-mpc.com

The public marketing website for **Radiant Medical Physics Consulting LLC**, hosted by GitHub Pages at `https://radiant-mpc.com`.

## Stack

- Pure HTML + CSS (no build step, no JavaScript framework)
- Fonts: Fraunces (display, serif) + JetBrains Mono (mono) from Google Fonts
- Dark, refined aesthetic with cyan accent
- Mobile responsive
- Hosted free on GitHub Pages with HTTPS via GitHub's automatic Let's Encrypt cert

## Pages

| File              | URL                            | Purpose                       |
|-------------------|--------------------------------|-------------------------------|
| `index.html`      | `radiant-mpc.com/`             | Home / landing page           |
| `services.html`   | `radiant-mpc.com/services`     | What Radiant offers           |
| `tools.html`      | `radiant-mpc.com/tools`        | The Quik suite + custom work  |
| `about.html`      | `radiant-mpc.com/about`        | Background, credentials       |
| `contact.html`    | `radiant-mpc.com/contact`      | Email, location, what to send |
| `styles.css`      | —                              | Shared stylesheet             |
| `CNAME`           | —                              | Tells GitHub the custom domain|

## Editing content

You can edit any HTML file directly on github.com (pencil icon, top right of the file view) and the site rebuilds automatically within ~60 seconds. Or use Claude Code locally:

```powershell
cd C:\radiant-mpc-site
claude
```

Then ask Claude Code to update text, add a page, etc.

## Logo

The current "logo" is the typographic mark `◐ Radiant.` rendered via CSS. To replace with a real image logo:

1. Drop your logo file as `assets/logo.svg` (or `.png`)
2. In each HTML file, replace the `<a href="index.html" class="brand">…</a>` block with `<a href="index.html" class="brand"><img src="assets/logo.svg" alt="Radiant" height="32"></a>`

## DNS setup (GoDaddy → GitHub Pages)

This is a one-time setup. Do this after the first push.

### Step 1: Enable GitHub Pages

1. Push this repo to GitHub as **public** repo `radiantTAB/radiant-mpc-site` (it must be public for free Pages, or you need a Pro plan for private)
2. Go to repo **Settings → Pages**
3. Source: **Deploy from a branch** → `main` → `/ (root)`
4. Save. GitHub will start building.
5. Under "Custom domain", enter `radiant-mpc.com` and Save.

### Step 2: GoDaddy DNS records

Log into GoDaddy, go to **My Products → DNS** for `radiant-mpc.com`.

**Add four `A` records** (apex/root, points `radiant-mpc.com` itself at GitHub):

| Type | Name | Value             | TTL    |
|------|------|-------------------|--------|
| A    | @    | 185.199.108.153   | 600 s  |
| A    | @    | 185.199.109.153   | 600 s  |
| A    | @    | 185.199.110.153   | 600 s  |
| A    | @    | 185.199.111.153   | 600 s  |

**Add one `CNAME`** (for `www.radiant-mpc.com`):

| Type  | Name | Value                       | TTL    |
|-------|------|-----------------------------|--------|
| CNAME | www  | radiantTAB.github.io        | 600 s  |

⚠ **Important — do not break Zoho email.** Your Zoho `MX`, `TXT` (SPF), and `DKIM` records must stay exactly as they are. The records above are `A` and `CNAME` only — they don't touch mail. Leave anything labeled `MX`, `TXT`, `SPF`, `DKIM`, or `_domainkey` alone.

### Step 3: Wait for propagation

DNS changes typically propagate in 10 minutes to a few hours, occasionally up to 24 hours. You can check progress at https://dnschecker.org/#A/radiant-mpc.com — when all the green checks show 185.199.x.153, you're live.

### Step 4: Enable HTTPS

Once DNS resolves:
1. Go back to repo **Settings → Pages**
2. Wait for "DNS check successful"
3. Check **Enforce HTTPS** (GitHub auto-provisions the Let's Encrypt cert)

## Local preview

To preview the site before pushing:

```powershell
cd C:\radiant-mpc-site
# open index.html in a browser — that's it, no server needed
start index.html
```

## License & content

© 2026 Radiant Medical Physics Consulting LLC. All content on this site is the property of the practice.
