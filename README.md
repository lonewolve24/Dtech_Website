# Dtech Electronics

One-page site for Dtech Electronics laptop repair. Customers reach the shop on WhatsApp. There is no contact form and no laptop catalog.

## Preview locally

From this folder:

```bash
python3 -m http.server 8765
```

Open http://127.0.0.1:8765

## Deploy

Railway uses the `Dockerfile` in this folder. It serves the site with nginx and listens on the `PORT` Railway sets.

Connect the GitHub repo in Railway and deploy from `main`.

On the **website** Railway service (not the CRM), set:

```
TRACK_API_URL=https://crm.dtech-electronics.com/api/public/repair-status/
```

The CRM still needs `PUBLIC_TRACK_ALLOWED_ORIGINS` set to this site (`https://www.dtech-electronics.com`).

## Shop details

The shop is at Serekunda, Babung Fatty Junction, Monday to Saturday, 9:00am to 7:00pm. WhatsApp, phone, and email are on the page.
