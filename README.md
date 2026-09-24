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

## Shop details

WhatsApp, phone, and email shown on the page are set in `js/main.js` and `index.html`. Address and opening hours on the page are still placeholders.
