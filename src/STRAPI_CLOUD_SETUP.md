# ☁️ Strapi Cloud Setup - Systeemlink

Complete gids voor het gebruik van **Strapi Cloud** (gratis) in plaats van self-hosting. Veel eenvoudiger en geen server nodig!

---

## 🎯 Waarom Strapi Cloud?

### ✅ Voordelen

- **Gratis** - Free tier perfect voor Systeemlink
- **Geen server nodig** - Volledig gehost
- **Auto-updates** - Automatische Strapi updates
- **Backups** - Automatische backups
- **SSL** - Gratis HTTPS
- **CDN** - Snelle content delivery
- **Monitoring** - Built-in monitoring
- **Support** - Community support
- **0 configuratie** - Deploy in minuten

### Free Tier Limieten

- ✅ **1 project** (perfect voor 1 website)
- ✅ **1GB assets storage** (ruim genoeg)
- ✅ **Community support**
- ✅ **Unlimited API calls**
- ✅ **Unlimited content types**
- ✅ **Custom domain** mogelijk

**Voor Systeemlink is dit perfect!** 🎉

---

## 🚀 Setup Stappen (15 minuten)

### Stap 1: Strapi Cloud Account Aanmaken

1. Ga naar **https://strapi.io/cloud**
2. Klik op **"Start Free"**
3. Sign up met:
   - Email: info@systeemlink.nl
   - Of gebruik GitHub/Google login

### Stap 2: Nieuw Project Aanmaken

1. Klik op **"Create Project"**
2. Configuratie:
   ```
   Project Name: Systeemlink
   Region: Europe (Amsterdam) - dichtste bij Nederland
   Database: PostgreSQL (included)
   Plan: Free
   ```
3. Klik op **"Deploy"**
4. Wacht 2-3 minuten voor deployment

### Stap 3: Content Types Uploaden

**Optie A: Via GitHub (Aanbevolen)**

1. Maak GitHub repository aan
2. Upload alleen `/strapi/src` folder:
   ```bash
   cd /path/to/systeemlink-project/strapi
   
   # Initialize git (if not already)
   git init
   git add src/
   git add package.json
   git commit -m "Initial content types"
   
   # Push to GitHub
   git remote add origin https://github.com/yourusername/systeemlink-strapi.git
   git push -u origin main
   ```
3. In Strapi Cloud:
   - Settings → Repository → Connect GitHub
   - Select repository
   - Auto-deploy enabled ✅

**Optie B: Handmatig**

1. Download content types van lokaal project
2. In Strapi Cloud Admin:
   - Ga naar **Content-Type Builder**
   - Recreate elk content type handmatig
   - Of gebruik import functie

### Stap 4: Admin Account Aanmaken

1. Open je Strapi Cloud URL:
   ```
   https://your-project.strapiapp.com/admin
   ```
2. Maak admin account aan:
   ```
   First name: [Jouw naam]
   Email: info@systeemlink.nl
   Password: [Sterk wachtwoord]
   ```

### Stap 5: API Token Aanmaken

1. **Settings** → **API Tokens** → **Create new API Token**
2. Configuratie:
   ```
   Name: Frontend API
   Description: Token voor systeemlink.nl website
   Token type: Read-only
   Token duration: Unlimited
   ```
3. **Save** en kopieer token

### Stap 6: Permissions Instellen

**Settings → Users & Permissions → Roles → Public**

Enable voor alle content types:
- ✅ `find`
- ✅ `findOne`

Enable voor `form-submission`:
- ✅ `create`

**Save**

### Stap 7: Company Settings Invullen

**Content Manager → Company Setting**

```yaml
Name: Systeemlink
Tagline: Jouw IT-partner in de regio Amsterdam

Address:
  Street: Planetenpark 19
  Postal Code: 1443BS
  City: Purmerend
  Country: Nederland

Contact:
  Phone: +31 613777733
  Email: info@systeemlink.nl
  Website: https://systeemlink.nl

Business:
  KVK: 88308170
  BTW: NL004588053B11
```

**Save & Publish**

### Stap 8: React Frontend Configureren

Update `.env`:

```bash
# Strapi Cloud URL
VITE_STRAPI_URL=https://your-project.strapiapp.com
VITE_STRAPI_API_TOKEN=your-token-here
```

Test:

```bash
npm run dev
```

---

## 🔧 Content Types Setup in Cloud

Je kunt content types op 3 manieren toevoegen:

### Methode 1: GitHub Sync (Best)

```bash
# In je strapi folder
git init
git add src/ package.json config/
git commit -m "Strapi content types"
git push

# In Strapi Cloud
# Settings → Repository → Connect
# Auto-sync enabled
```

### Methode 2: Copy-Paste Schema's

Voor elk content type:

1. Content-Type Builder → Create new collection/single type
2. Copy schema van lokaal `src/api/*/schema.json`
3. Paste in advanced settings
4. Save

### Methode 3: Handmatig Recreate

1. Content-Type Builder
2. Create nieuw type
3. Voeg fields toe zoals in schema
4. Save

---

## 🌐 Custom Domain Setup

### Optie 1: Subdomain (Gratis)

```
cms.systeemlink.nl → Strapi Cloud
```

**Setup:**

1. In Strapi Cloud:
   - Settings → Domains
   - Add custom domain: `cms.systeemlink.nl`
   
2. In DNS (Plesk/Cloudflare):
   ```
   Type: CNAME
   Name: cms
   Value: your-project.strapiapp.com
   TTL: Auto
   ```

3. Wacht 5-10 minuten voor DNS propagation

4. Update React `.env`:
   ```bash
   VITE_STRAPI_URL=https://cms.systeemlink.nl
   ```

### Optie 2: Subpath (Vereist Reverse Proxy)

Als je `/backend` wilt gebruiken:

```nginx
# In Plesk nginx config
location /backend/ {
    proxy_pass https://your-project.strapiapp.com/;
    proxy_set_header Host your-project.strapiapp.com;
    proxy_ssl_server_name on;
    # ... rest van config
}
```

**Maar subdomain is eenvoudiger!**

---

## 📊 Content Management

### Content Toevoegen

1. Log in: `https://your-project.strapiapp.com/admin`
2. Content Manager → Select type
3. Create entry
4. Save & Publish

### Media Uploaden

1. Media Library
2. Upload assets
3. 1GB gratis storage

### Forms Submissions Bekijken

1. Content Manager → Form Submissions
2. Bekijk alle inzendingen
3. Filter op type, status, datum

---

## 🔄 Updates & Deployment

### Auto-Deploy (via GitHub)

```bash
# Maak wijzigingen lokaal
cd strapi/src
# Edit files

# Commit en push
git add .
git commit -m "Update content types"
git push

# Strapi Cloud deploy automatisch! 🎉
```

### Manual Deploy

1. Strapi Cloud Dashboard
2. Deployments tab
3. Trigger Manual Deploy

---

## 💾 Backups

**Automatisch inbegrepen:**
- Dagelijkse backups
- Point-in-time recovery
- 7 dagen retention

**Manual Backup:**

1. Settings → Backups
2. Create backup
3. Download als nodig

---

## 🔐 Security

### API Token Security

```typescript
// BELANGRIJK: Gebruik ALLEEN Read-Only token in frontend
// Vite zal VITE_ variabelen exposen naar client

// .env
VITE_STRAPI_URL=https://cms.systeemlink.nl
VITE_STRAPI_API_TOKEN=read-only-token-here
```

### Admin Access

- 2FA beschikbaar (Settings → Profile)
- IP whitelist mogelijk (Pro plan)
- Audit logs (Pro plan)

### CORS

Auto-configured in Strapi Cloud:
- Alle origins toegestaan voor public endpoints
- Admin panel alleen via Strapi Cloud domain

---

## 📈 Monitoring

### Built-in Monitoring

Strapi Cloud Dashboard toont:
- API response times
- Error rates
- Request counts
- Storage usage

### External Monitoring

Setup UptimeRobot voor health checks:

```
URL: https://your-project.strapiapp.com/_health
Method: GET
Expected: HTTP 200
Interval: 5 minutes
```

---

## 🐛 Troubleshooting

### Build Fails

**Symptoom**: Deployment fails in Cloud

**Check:**
1. package.json dependencies
2. Node.js version (18 or 20)
3. Build logs in Dashboard

**Fix:**
```json
// package.json
{
  "engines": {
    "node": ">=18.0.0 <=20.x.x",
    "npm": ">=6.0.0"
  }
}
```

### CORS Errors

**Symptoom**: Browser console shows CORS errors

**Fix:**
1. Check API Token is correct
2. Check Public permissions enabled
3. Add origin in Strapi if needed:
   ```js
   // config/middlewares.js (via GitHub)
   module.exports = {
     settings: {
       cors: {
         origin: ['https://systeemlink.nl']
       }
     }
   }
   ```

### Slow Response Times

**Region mismatch:**
- Verander region naar Europe (Amsterdam)
- Settings → Project Settings → Region

### Storage Limit Reached

**Free tier: 1GB**

**Solutions:**
1. Compress images voor upload
2. Use external storage (Cloudinary)
3. Upgrade to Pro ($99/month voor 50GB)

---

## 💰 Cost Comparison

### Strapi Cloud (Free)

- ✅ **€0/maand**
- ✅ Unlimited API calls
- ✅ 1GB storage
- ✅ Auto backups
- ✅ SSL included
- ✅ Monitoring
- ✅ Auto-updates

### Self-Hosting (Plesk)

- 💰 **€20-50/maand** (server kosten)
- ⚙️ Handmatige setup
- ⚙️ Zelf backups regelen
- ⚙️ SSL configureren
- ⚙️ Updates handmatig
- ⚙️ Monitoring zelf opzetten

**Voor Systeemlink: Strapi Cloud is de betere keuze!** ✅

---

## 🚀 Migration van Self-Host naar Cloud

Als je al self-hosted hebt:

### Stap 1: Backup Data

```bash
# Database backup
pg_dump -U strapi systeemlink_strapi > backup.sql
```

### Stap 2: Setup Strapi Cloud

Volg stappen hierboven

### Stap 3: Import Data

Via Strapi Admin:
1. Recreate content types
2. Content Manager → Import entries
3. Of gebruik Strapi's Import/Export plugin

### Stap 4: Migrate Media

1. Download uploads van old server
2. Upload naar Strapi Cloud Media Library
3. Of gebruik Cloudinary transfer

### Stap 5: Update Frontend

```bash
# Update .env
VITE_STRAPI_URL=https://cms.systeemlink.nl
VITE_STRAPI_API_TOKEN=new-token

# Test
npm run dev

# Deploy
npm run build
```

---

## 📱 Mobile App Support

Strapi Cloud API werkt perfect voor:
- React Native apps
- Flutter apps
- iOS/Android native apps

Same API token, same endpoints! 🎉

---

## 🎓 Resources

### Strapi Cloud Docs
- **Official Docs**: https://docs.strapi.io/cloud/intro
- **Getting Started**: https://docs.strapi.io/cloud/getting-started/deployment
- **Custom Domains**: https://docs.strapi.io/cloud/projects/settings#domains

### Support
- **Strapi Discord**: https://discord.strapi.io
- **Forum**: https://forum.strapi.io
- **GitHub Issues**: https://github.com/strapi/strapi/issues

### Systeemlink
- **Email**: info@systeemlink.nl
- **Tel**: +31 613777733

---

## ✅ Setup Checklist

- [ ] Strapi Cloud account aangemaakt
- [ ] Project gedeployed (Europe region)
- [ ] Content types toegevoegd
- [ ] Admin account aangemaakt
- [ ] API Token aangemaakt (Read-only)
- [ ] Public permissions ingesteld
- [ ] Company Settings ingevuld
- [ ] Custom domain geconfigureerd (optioneel)
- [ ] React .env bijgewerkt
- [ ] Frontend getest
- [ ] Production build gedeployed
- [ ] Monitoring setup (UptimeRobot)

---

## 🎉 Klaar!

Je hebt nu een volledig functioneel Strapi CMS via Cloud, zonder server, zonder configuratie, volledig gratis!

**Strapi Cloud URL**: `https://your-project.strapiapp.com/admin`  
**Custom Domain**: `https://cms.systeemlink.nl/admin` (optioneel)  
**API**: `https://your-project.strapiapp.com/api`

**Total Setup Time**: 15 minuten  
**Monthly Cost**: €0  
**Maintenance**: 0 uur/maand

---

## 🔮 Upgrade Opties (Later)

Als je groeit en meer nodig hebt:

### Pro Plan ($99/mo)
- 50GB storage
- Priority support
- 5 projects
- Advanced monitoring
- Audit logs
- IP whitelist

### Team Plan ($499/mo)
- 250GB storage
- SSO
- 20 projects
- Dedicated support
- Custom SLA

**Maar Free is perfect voor nu!** 🚀

---

© 2025 Systeemlink. Alle rechten voorbehouden.
