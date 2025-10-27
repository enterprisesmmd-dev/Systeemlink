# ⚡ Quick Start - Systeemlink Production Build

Snel aan de slag met deployment in 5 minuten! 🚀

---

## 🎯 Kies je deployment methode:

### **Option A: Vercel (Aanbevolen - Supersnel!)**

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy (vanaf BUILD_PRODUCTION folder)
cd BUILD_PRODUCTION
npm install
vercel --prod

# Klaar! ✅
# Je krijgt een URL: https://systeemlink.vercel.app
```

**Voordelen:**
- ✅ Gratis SSL
- ✅ Global CDN
- ✅ Auto-scaling
- ✅ 2 minuten setup
- ✅ Custom domain gratis

---

### **Option B: Netlify (Ook makkelijk!)**

```bash
# 1. Build lokaal
cd BUILD_PRODUCTION
npm install
npm run build

# 2. Deploy via Netlify Drop
# - Ga naar https://app.netlify.com/drop
# - Sleep 'dist' folder naar website
# - Klaar!

# Of via CLI:
npm i -g netlify-cli
netlify deploy --prod
```

**Voordelen:**
- ✅ Drag & drop deployment
- ✅ Gratis SSL
- ✅ Forms support
- ✅ Analytics
- ✅ Split testing

---

### **Option C: Traditionele Hosting (Shared hosting)**

```bash
# 1. Build
cd BUILD_PRODUCTION
npm install
npm run build

# 2. Upload via FTP
# FileZilla/WinSCP:
#   Local: dist/*
#   Remote: /public_html/
#
# Include these files:
#   ✅ .htaccess
#   ✅ robots.txt
#   ✅ sitemap.xml

# 3. Klaar!
```

**Voor wie:**
- Je hebt al hosting (Hostinger, TransIP, etc.)
- Je wil geen nieuwe account
- Je kent FTP

---

## 📋 Welke methode past bij jou?

| Je wilt... | Gebruik |
|------------|---------|
| **Snel online** zonder gedoe | → Vercel |
| **Gratis** + **Supersnel** | → Vercel of Netlify |
| **Bestaande hosting** gebruiken | → FTP Upload |
| **Custom domain** toevoegen | → Allemaal mogelijk |
| **Beste performance** | → Vercel/Netlify/Cloudflare |
| **Minste configuratie** | → Netlify Drop |

---

## 🎬 Complete Workflows

### **Workflow 1: Vercel (GitHub)**

Perfect voor continuous deployment!

```bash
# 1. Push naar GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/jouw-username/systeemlink.git
git push -u origin main

# 2. Vercel Dashboard
# - Ga naar vercel.com
# - Klik "New Project"
# - Import GitHub repo
# - Vercel detecteert Vite automatisch
# - Deploy!

# 3. Bij elke git push → auto-deploy! 🚀
```

### **Workflow 2: Netlify (GitHub)**

```bash
# 1. Push naar GitHub (zie boven)

# 2. Netlify Dashboard
# - Ga naar app.netlify.com
# - Klik "New site from Git"
# - Connect GitHub
# - Select repository
# - Build settings (auto-detected)
# - Deploy!

# 3. Auto-deploy on git push! ✅
```

### **Workflow 3: Cloudflare Pages**

```bash
# 1. Push naar GitHub

# 2. Cloudflare Pages
# - Ga naar pages.cloudflare.com
# - Connect GitHub
# - Build command: npm run build
# - Output: dist
# - Deploy!

# Bonus: Gratis CDN + DDoS protection! 🛡️
```

---

## 🔧 Troubleshooting

### **Build fails**

```bash
# Clear everything
rm -rf node_modules dist
npm install
npm run build
```

### **"Module not found"**

```bash
# Check Node version
node -v  # Should be 18+

# Reinstall
rm -rf node_modules package-lock.json
npm install
```

### **Routes give 404 after refresh**

✅ **Vercel/Netlify:** Already handled!  
✅ **Apache:** Upload `.htaccess`  
✅ **Nginx:** Add config (see README.md)

---

## ⚙️ Pre-Flight Checklist

Voordat je deploy:

```bash
# 1. Test lokaal
npm run preview  # Open http://localhost:4173

# 2. Check deze dingen:
#    □ Alle pagina's laden
#    □ Forms werken
#    □ Dark mode toggle werkt
#    □ Mobiel responsive
#    □ Geen console errors

# 3. Build stats bekijken
npm run build
# Kijk naar bundle size in console
```

---

## 🎯 Production Checklist

After deploy:

- [ ] Website bereikbaar op domain
- [ ] SSL certificate actief (https://)
- [ ] Alle routes werken
- [ ] Forms submitten
- [ ] Dark mode werkt
- [ ] Mobile responsive
- [ ] Google PageSpeed test (>90 score)
- [ ] sitemap.xml bereikbaar
- [ ] robots.txt bereikbaar

---

## 🚀 Deploy Script (Advanced)

Voor automated deployment:

```bash
# Make executable
chmod +x deploy.sh

# Run
./deploy.sh

# Script will:
# ✓ Clean
# ✓ Install
# ✓ Build
# ✓ Validate
# ✓ (Optional) Deploy to server
```

Edit `deploy.sh` voor je server details.

---

## 📊 Expected Performance

Na deployment verwacht je:

| Metric | Target | Tool |
|--------|--------|------|
| PageSpeed Score | >90 | PageSpeed Insights |
| First Contentful Paint | <1.5s | Lighthouse |
| Time to Interactive | <3s | Lighthouse |
| Total Bundle Size | <500KB | Build output |
| Lighthouse Score | 95+ | Chrome DevTools |

---

## 🌐 Custom Domain Setup

### **Vercel**

```bash
# Dashboard:
# Settings → Domains → Add Domain
# Follow DNS instructions
```

### **Netlify**

```bash
# Dashboard:
# Site Settings → Domain Management → Add Custom Domain
# Configure DNS
```

### **DNS Settings**

Voor `systeemlink.nl`:

```
Type: A
Name: @
Value: [Server IP of CDN]

Type: CNAME
Name: www
Value: systeemlink.nl
```

---

## 💡 Pro Tips

### **Performance**

```bash
# 1. Enable Brotli compression (better than gzip)
# → Auto-enabled on Vercel/Netlify

# 2. Use WebP images
# Convert: https://squoosh.app

# 3. Lazy load images
# Already implemented! ✅
```

### **SEO**

```bash
# 1. Submit sitemap to Google
https://search.google.com/search-console

# 2. Add structured data
# Already included in index.html! ✅

# 3. Test meta tags
https://metatags.io
```

### **Monitoring**

```bash
# 1. Add Google Analytics
# Edit index.html, add GA code

# 2. Monitor uptime
# Use: uptimerobot.com (gratis)

# 3. Performance monitoring
# Use: Vercel Analytics (gratis)
```

---

## 🆘 Need Help?

### **Build Issues**

1. Check Node version: `node -v` (need 18+)
2. Clear cache: `npm cache clean --force`
3. Reinstall: `rm -rf node_modules && npm install`

### **Deploy Issues**

1. Check build succeeds locally
2. Verify all files uploaded
3. Check server logs
4. Contact hosting support

### **Route Issues**

1. Check `.htaccess` uploaded (Apache)
2. Verify SPA routing config (Nginx)
3. Test with `/?page=test` format

---

## ✨ Summary

**Fastest Route to Production:**

```bash
cd BUILD_PRODUCTION
npm install
npm run build
vercel --prod
```

**Total Time:** 2-3 minuten  
**Cost:** €0  
**SSL:** Automatic  
**Domain:** Easy to add  

**You're live!** 🎉🚀

---

## 📞 Quick Links

- **Vercel:** https://vercel.com
- **Netlify:** https://netlify.com
- **Cloudflare Pages:** https://pages.cloudflare.com
- **GitHub:** https://github.com
- **PageSpeed:** https://pagespeed.web.dev

---

**Questions?** Check `README.md` voor complete documentation.

© 2024 Systeemlink
