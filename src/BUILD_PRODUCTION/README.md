# 🚀 Systeemlink - Production Build

Production-ready React build van de Systeemlink website **zonder admin functionaliteit**.

---

## 📦 Wat zit erin?

### ✅ **Alle Features**

- ✅ **14 Complete Pagina's** - Homepage, oplossingen, branches, etc.
- ✅ **IT-Check Wizard** - Interactive 16-stappen formulier
- ✅ **3 Scan Wizards** - Security, Workplace, Cloud scans
- ✅ **Form Submissions** - localStorage storage (geen backend nodig)
- ✅ **Dark Mode** - Volledig geïmplementeerd
- ✅ **Responsive Design** - Mobiel geoptimaliseerd
- ✅ **SEO Optimized** - Meta tags, sitemap, robots.txt
- ✅ **hCaptcha** - Spam bescherming
- ✅ **Cookie Consent** - AVG compliant

### ❌ **Uitgesloten (Admin)**

- ❌ CMS Admin systeem
- ❌ Puck Editor
- ❌ Page Builder
- ❌ Admin routes

---

## 🛠️ Build & Deploy

### **Optie 1: Vite Build (Aanbevolen)**

```bash
# 1. Installeer dependencies
npm install

# 2. Build voor productie
npm run build

# 3. Output in /dist folder
# dist/
#   ├── index.html
#   ├── assets/
#   │   ├── index-[hash].js
#   │   └── index-[hash].css
#   └── ...

# 4. Upload /dist/* naar server
```

### **Optie 2: Direct Deploy**

Als je de build al hebt:

```bash
# Upload deze bestanden naar je webserver:
├── index.html
├── .htaccess
├── robots.txt
├── sitemap.xml
└── dist/
    └── (alle build files)
```

---

## 🌐 Hosting Opties

### **1. Static Hosting (Gratis)**

Perfect voor deze SPA:

| Provider | Free Tier | SSL | Custom Domain |
|----------|-----------|-----|---------------|
| **Vercel** | ✅ Unlimited | ✅ Auto | ✅ Gratis |
| **Netlify** | ✅ 100GB/mo | ✅ Auto | ✅ Gratis |
| **Cloudflare Pages** | ✅ Unlimited | ✅ Auto | ✅ Gratis |
| **GitHub Pages** | ✅ 100GB/mo | ✅ Auto | ✅ Gratis |

**Aanbeveling:** Vercel of Netlify voor beste performance.

### **2. Traditionele Hosting**

Op Apache/Nginx server:

```bash
# 1. Upload naar /public_html/
# 2. Zorg dat .htaccess werkt
# 3. Klaar!
```

---

## 📤 Deploy naar Vercel

### **Methode 1: CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Build
npm run build

# Deploy
vercel --prod

# Volg de prompts
```

### **Methode 2: GitHub Integration**

1. Push code naar GitHub
2. Ga naar [vercel.com](https://vercel.com)
3. Klik "New Project"
4. Import GitHub repository
5. Vercel detecteert Vite automatisch
6. Deploy! 🚀

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

---

## 📤 Deploy naar Netlify

### **Drag & Drop**

1. Build lokaal: `npm run build`
2. Ga naar [netlify.com](https://netlify.com)
3. Sleep `/dist` folder naar Netlify
4. Klaar!

### **GitHub Integration**

1. Push naar GitHub
2. Connect repository in Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy!

---

## 📤 Deploy naar Apache Server

### **Via FTP/SFTP**

```bash
# 1. Build lokaal
npm run build

# 2. Upload via FileZilla/WinSCP:
Local: dist/*
Remote: /public_html/

# 3. Upload extra files:
.htaccess → /public_html/.htaccess
robots.txt → /public_html/robots.txt
sitemap.xml → /public_html/sitemap.xml

# 4. Test
https://jouwdomein.nl
```

### **Via SSH**

```bash
# 1. SSH naar server
ssh user@server.com

# 2. Navigate
cd /var/www/html

# 3. Upload build (bijv. met scp)
scp -r dist/* user@server:/var/www/html/

# 4. Set permissions
chmod -R 755 /var/www/html
```

---

## ⚙️ Server Configuratie

### **Apache** (gebruik .htaccess)

Al inbegrepen! `.htaccess` bevat:
- ✅ SPA routing (alle routes → index.html)
- ✅ Force HTTPS (uncomment in productie)
- ✅ Security headers
- ✅ Cache headers
- ✅ Gzip compression

### **Nginx**

Als je Nginx gebruikt:

```nginx
server {
    listen 80;
    server_name systeemlink.nl;
    root /var/www/html;
    index index.html;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;
}
```

---

## 🔐 SSL Certificate

### **Let's Encrypt (Gratis)**

```bash
# Install Certbot
sudo apt install certbot python3-certbot-apache

# Get certificate
sudo certbot --apache -d systeemlink.nl -d www.systeemlink.nl

# Auto-renewal check
sudo certbot renew --dry-run
```

### **Cloudflare (Gratis + CDN)**

1. Account aanmaken op Cloudflare
2. Domain toevoegen
3. Nameservers wijzigen bij registrar
4. SSL/TLS → "Full"
5. Gratis SSL + CDN! 🎉

---

## 📊 Performance Optimalisatie

### **Al geïmplementeerd:**

✅ **Code Splitting** - Vendor chunks  
✅ **Minification** - Terser  
✅ **Tree Shaking** - Ongebruikte code verwijderd  
✅ **Asset Optimization** - Images, fonts  
✅ **Lazy Loading** - Route-based  
✅ **Caching** - Browser cache headers  

### **Extra optimalisaties:**

```bash
# 1. Image optimization
# - Gebruik WebP formaat
# - Compress met TinyPNG/Squoosh
# - Max 100KB per image

# 2. Enable Brotli compression
# Nginx: brotli on;
# Apache: mod_brotli

# 3. Use CDN
# - Cloudflare
# - jsDelivr voor libraries
```

---

## 📈 Monitoring & Analytics

### **Google Analytics**

Edit `index.html` en voeg toe:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### **Performance Monitoring**

```javascript
// Al ingebouwd in index.html!
// Check console voor load times
```

---

## 🧪 Testing

### **Before Deploy**

```bash
# 1. Build
npm run build

# 2. Preview locally
npm run preview

# 3. Test in browser
http://localhost:4173

# 4. Check:
# - All routes work
# - Forms submit
# - Dark mode toggles
# - Mobile responsive
# - Images load
# - No console errors
```

### **After Deploy**

- [ ] Homepage loads
- [ ] Navigation works
- [ ] Forms submit
- [ ] Dark mode works
- [ ] Mobile menu works
- [ ] SSL certificate valid
- [ ] Sitemap accessible
- [ ] robots.txt accessible
- [ ] Google PageSpeed > 90

---

## 🐛 Troubleshooting

### **404 on refresh**

**Problem:** Routes werken, maar refresh geeft 404.

**Solution:** 
- Apache: Check `.htaccess` is geüpload
- Nginx: Add `try_files` directive
- Vercel/Netlify: Automatisch gefixed

### **Assets niet geladen**

**Problem:** CSS/JS files 404.

**Solution:**
- Check base path in `vite.config.ts`
- Verify files in `/dist/assets/`
- Check server path mapping

### **Dark mode werkt niet**

**Problem:** Toggle doet niets.

**Solution:**
- Check cookies enabled
- Clear browser cache
- Check JavaScript console voor errors

### **Forms verzenden niet**

**Problem:** Submit doet niets.

**Solution:**
- Check hCaptcha sitekey
- Check browser console
- Verify localStorage werkt

---

## 📁 File Structure

```
BUILD_PRODUCTION/
├── index.html              # Main HTML
├── .htaccess               # Apache config
├── robots.txt              # SEO
├── sitemap.xml             # SEO
├── package.json            # Dependencies
├── vite.config.ts          # Build config
├── App-Production.tsx      # Main app (no admin)
│
└── dist/                   # Build output (after npm run build)
    ├── index.html
    ├── assets/
    │   ├── index-[hash].js
    │   ├── index-[hash].css
    │   └── vendor-[hash].js
    └── ...
```

---

## 🔄 Update Workflow

### **Content wijzigen:**

1. Edit component in `/components/`
2. Rebuild: `npm run build`
3. Upload nieuwe `/dist/` naar server
4. Clear CDN cache (if using)

### **Nieuwe pagina toevoegen:**

1. Create page component
2. Add route to `App-Production.tsx`
3. Update `sitemap.xml`
4. Build & deploy

---

## 💾 Form Data

### **Storage**

Forms worden opgeslagen in **localStorage** (client-side):

```javascript
// Data structure
{
  "submissions": [
    {
      "id": "sub_123",
      "type": "IT-Check",
      "timestamp": 1234567890,
      "data": { ... }
    }
  ]
}
```

### **Backend integratie (optioneel)**

Om data naar backend te sturen, edit form submit handlers:

```typescript
// In ITCheckPage.tsx of ContactPage.tsx
const handleSubmit = async (data) => {
  // Send to API
  await fetch('https://api.jouwdomein.nl/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
};
```

---

## 🎯 Production Checklist

Before going live:

- [ ] Build succesvol: `npm run build`
- [ ] Preview test gedaan: `npm run preview`
- [ ] Alle routes getest
- [ ] Forms werken
- [ ] Dark mode test
- [ ] Mobile test (Chrome DevTools)
- [ ] SSL certificaat geconfigureerd
- [ ] Domain DNS ingesteld
- [ ] robots.txt geüpload
- [ ] sitemap.xml geüpload
- [ ] Google Analytics toegevoegd
- [ ] Performance test (PageSpeed)
- [ ] Security headers check (securityheaders.com)
- [ ] Backup gemaakt

---

## 📞 Support

**Build issues?**

1. Check Node version: `node -v` (should be 18+)
2. Clear node_modules: `rm -rf node_modules && npm install`
3. Clear cache: `rm -rf dist`

**Deploy issues?**

1. Check `.htaccess` uploaded
2. Verify file permissions (755 for folders, 644 for files)
3. Check server logs

---

## ✨ Features Samenvatting

| Feature | Status |
|---------|--------|
| Homepage | ✅ Compleet |
| 14 Pagina's | ✅ Alle routes |
| IT-Check Wizard | ✅ 16 stappen |
| 3 Scan Wizards | ✅ Interactive |
| Form Submissions | ✅ localStorage |
| Dark Mode | ✅ Toggle |
| Responsive | ✅ Mobiel optimaal |
| SEO | ✅ Sitemap + meta |
| Performance | ✅ Optimized |
| Security | ✅ Headers |
| SSL Ready | ✅ .htaccess |
| CDN Ready | ✅ Static assets |

---

## 🚀 Deploy Now!

**Snelste route:**

```bash
npm install
npm run build
vercel --prod
```

**Done in 2 minuten!** 🎉

---

© 2024 Systeemlink - Production Build v1.0
