# Deployment Instructies - Systeemlink Website

Deze website is een React Single Page Application (SPA). Voor correcte werking van alle routes (zoals `/oplossingen`, `/branches`, etc.) zijn speciale configuraties nodig.

## 🚀 Snelle Oplossing

Als je een "404 Not Found" error krijgt bij het direct bezoeken van pagina's zoals `/oplossingen`:

### Voor Vercel
✅ Al geconfigureerd via `/vercel.json` - geen extra stappen nodig!

### Voor Netlify
✅ Al geconfigureerd via `/netlify.toml` en `/public/_redirects` - geen extra stappen nodig!

### Voor Traditionele Hosting (Apache)
✅ Upload het `.htaccess` bestand naar je root directory

---

## 📋 Volledige Deployment Instructies

### 1. Vercel (Aanbevolen)

**Automatische deployment:**
```bash
# Installeer Vercel CLI
npm i -g vercel

# Deploy vanuit project root
vercel

# Voor productie
vercel --prod
```

**Handmatige deployment via Vercel Dashboard:**
1. Ga naar [vercel.com](https://vercel.com)
2. Import je Git repository
3. Vercel detecteert automatisch de React/Vite configuratie
4. Klik op "Deploy"

✅ Het `vercel.json` bestand zorgt automatisch voor correcte routing!

---

### 2. Netlify

**Automatische deployment:**
```bash
# Installeer Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Voor productie
netlify deploy --prod
```

**Handmatige deployment via Netlify Dashboard:**
1. Ga naar [netlify.com](https://netlify.com)
2. Drag & drop de `/dist` folder NA het bouwen
3. Of connect je Git repository

**Build settings:**
- Build command: `npm run build`
- Publish directory: `dist`

✅ Het `netlify.toml` bestand zorgt automatisch voor correcte routing!

---

### 3. Traditionele Hosting (cPanel / DirectAdmin / FTP)

**Stappen:**

1. **Build de productie versie:**
```bash
npm run build
```

2. **Upload bestanden:**
   - Upload ALLE bestanden uit de `/dist` folder naar je webroot (meestal `public_html` of `htdocs`)
   - Upload het `.htaccess` bestand naar dezelfde directory

3. **Verifieer .htaccess:**
   - Zorg dat de `.htaccess` file **niet** verborgen is
   - Check of mod_rewrite enabled is (meestal standaard aan)

4. **Test de routing:**
   - Bezoek je website
   - Navigeer naar `/oplossingen` direct in de URL bar
   - Als het werkt, zie je de oplossingen pagina ✅

**Als je nog steeds 404 errors krijgt:**

**Optie A - Controleer mod_rewrite:**
```bash
# Via SSH
a2enmod rewrite
service apache2 restart
```

**Optie B - Verander AllowOverride (via host beheerder):**
```apache
# In je Apache config
<Directory /var/www/html>
    AllowOverride All
</Directory>
```

**Optie C - Voeg toe aan httpd.conf of vhost config:**
```apache
<Directory "/pad/naar/jouw/website">
    RewriteEngine On
    RewriteBase /
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ index.html [L]
</Directory>
```

---

### 4. Nginx

Voeg dit toe aan je Nginx config:

```nginx
server {
    listen 80;
    server_name systeemlink.nl www.systeemlink.nl;
    root /var/www/systeemlink/dist;
    index index.html;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Don't cache HTML
    location ~* \.(html)$ {
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

Herstart Nginx:
```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

### 5. GitHub Pages

**Let op:** GitHub Pages heeft beperkte ondersteuning voor SPA routing!

**Workaround met 404.html:**

1. Kopieer `index.html` naar `404.html` in je dist folder
2. Deploy naar GitHub Pages

**Of gebruik een dienst zoals:**
- Vercel (gratis, beter voor SPA's)
- Netlify (gratis, beter voor SPA's)

---

## 🧪 Testen

Na deployment, test deze URL's direct:
- ✅ `/` (home)
- ✅ `/oplossingen`
- ✅ `/branches`
- ✅ `/bedrijfsinformatie/contact`
- ✅ `/it-check`

Als ALLE routes werken zonder 404 error = success! 🎉

---

## 🐛 Troubleshooting

### "404 Not Found" bij directe URL's

**Probleem:** Je ziet de homepage, maar `/oplossingen` geeft een 404.

**Oplossingen:**
1. Check of `.htaccess` correct is geüpload (Apache)
2. Check of `netlify.toml` of `vercel.json` aanwezig is
3. Controleer of mod_rewrite enabled is
4. Check server logs voor specifieke errors

### Assets laden niet

**Probleem:** Pagina laadt maar CSS/JS werkt niet.

**Oplossing:** 
- Check of de `base` in `index.html` correct is
- Voor subdirectories: update `base` naar `/subdir/`

### Browser cache

**Probleem:** Oude versie blijft laden.

**Oplossing:**
```bash
# Hard refresh
- Windows/Linux: Ctrl + Shift + R
- Mac: Cmd + Shift + R

# Of clear cache in browser settings
```

---

## 📞 Support

Bij problemen:
- Check server error logs
- Test met verschillende browsers
- Contacteer je hosting provider voor mod_rewrite of .htaccess support

---

## 🔒 Security Checklist na Deployment

- [ ] HTTPS is enabled (SSL certificaat)
- [ ] Security headers worden gezet (check met securityheaders.com)
- [ ] .env bestanden zijn NIET geüpload (alleen lokaal)
- [ ] API keys zijn veilig opgeslagen (als van toepassing)
- [ ] CORS is correct geconfigureerd (als je een API hebt)
- [ ] Rate limiting is actief (indien nodig)

---

## 📊 Performance Checklist

- [ ] Gzip/Brotli compressie is enabled
- [ ] Static assets worden gecached
- [ ] Images zijn geoptimaliseerd
- [ ] CDN is geconfigureerd (optioneel)
- [ ] Lazy loading werkt correct

Succes met de deployment! 🚀
