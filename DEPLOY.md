# Deploy checklist (e.g. for Google Ads)

Before going live, do this once:

1. **Set your domain**  
   Find and replace in all HTML files and in `robots.txt`, `sitemap.xml`:
   - Domain is set to `https://play90sarcade.fun/` for GitHub Pages / Google Ads.

2. **Contact email**  
   In `contact.html`, replace `your-email@example.com` with your real contact email.

3. **Optional: favicon**  
   Replace `favicon.svg` in the project root with your own icon if you want a custom favicon.

After that, upload the folder to your host (Netlify, Vercel, GitHub Pages, etc.) and submit your site URL to Google Ads.

---

## Google Search Console (indexing & “validation failed”)

### Why “Page with redirect” is not always a bug

Google lists **http://**, **https://www.**, etc. under **Page with redirect** when those URLs **correctly** redirect to **`https://play90sarcade.fun/`**. They are **not indexed as separate pages**—that is expected. The important URL is the **final** one: **https://play90sarcade.fun/** (HTTPS, no www).

**Server-side** HTTP→HTTPS and host rules come from **GitHub Pages** (“Enforce HTTPS”) + **DNS**. Your **inline script** is a backup for clients; Google prefers **301** redirects at the host (GitHub does this when DNS + HTTPS are fully OK).

### Why “Duplicate, Google chose different canonical”

During migration, Google may still associate old URLs (e.g. `github.io`) with your site. **One** canonical homepage is **`https://play90sarcade.fun/`** (see `rel="canonical"` + `og:url` + JSON-LD on `index.html`). After DNS is stable, use **URL Inspection** → **Request indexing** for the homepage and wait.

### DNS checklist (GitHub Pages)

1. In the **domain registrar**, point **apex** `play90sarcade.fun` to GitHub’s **A / AAAA** records (see [GitHub docs](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)).
2. For **www**: add a **CNAME** `www` → `YOURUSERNAME.github.io` (or the hostname GitHub shows).
3. In **GitHub → Settings → Pages → Custom domain**, wait until **DNS check** is **green** (not “in progress”).
4. Keep **Enforce HTTPS** enabled.

### Search Console property

Prefer a **Domain property** for `play90sarcade.fun` so **http/https** and **www** are covered in one place.

### After a fix

Click **Validate fix** in GSC only after deploy and DNS are green; **re-crawling can take days**—validation may still show “failed” until Google has seen enough successful crawls.
