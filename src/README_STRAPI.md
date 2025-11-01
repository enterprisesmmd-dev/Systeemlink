# 🚀 Systeemlink Website + Strapi CMS

Complete React website met Strapi headless CMS backend voor Systeemlink IT-bedrijf.

---

## 📁 Project Structuur

```
systeemlink-project/
├── strapi/                          # 🎯 Strapi CMS Backend
│   ├── config/                      # Strapi configuratie
│   ├── src/                         # Content types & API
│   ├── scripts/                     # Migratie scripts
│   ├── deploy-plesk.sh              # Plesk deployment script
│   ├── docker-compose.yml           # Docker setup
│   └── package.json
│
├── components/                      # React components
│   ├── pages/                       # Page components
│   ├── sections/                    # Section components
│   ├── cms/                         # CMS admin components
│   ├── StrapiIntegration.tsx        # 🆕 Strapi voorbeeld components
│   └── ...
│
├── hooks/                           # React hooks
│   ├── useStrapiData.ts             # 🆕 Strapi data hook
│   └── ...
│
├── BUILD_PRODUCTION/                # Production build files
│
├── STRAPI_DEPLOYMENT_GUIDE.md       # 📖 Complete deployment gids
├── STRAPI_MIGRATION_SUMMARY.md      # 📋 Migratie overzicht
├── STRAPI_QUICK_REFERENCE.md        # ⚡ Quick reference
└── README_STRAPI.md                 # 👈 Dit bestand
```

---

## 🎯 Wat is er Veranderd?

### ❌ Verwijderd: PHP Backend
- PHP CMS systeem
- localStorage voor content opslag
- Lokaal form submission beheer

### ✅ Toegevoegd: Strapi CMS
- Moderne headless CMS
- PostgreSQL database (production)
- RESTful API
- Admin interface op `/backend/admin`
- Type-safe React integratie

---

## 🚀 Quick Start

### 1️⃣ Lokale Development

```bash
# Strapi opstarten
cd strapi
npm install
cp .env.example .env
npm run generate-secrets  # Kopieer output naar .env
npm run develop

# Admin panel: http://localhost:1337/admin
# Maak admin account + API token

# React frontend configureren
echo "VITE_STRAPI_URL=http://localhost:1337" >> .env
echo "VITE_STRAPI_API_TOKEN=your-token" >> .env

# React opstarten
npm run dev
```

**Zie**: `/strapi/QUICK_START.md` voor gedetailleerde instructies

### 2️⃣ Plesk Deployment

```bash
# Database aanmaken in Plesk (PostgreSQL)
# Naam: systeemlink_strapi
# User: systeemlink_strapi

# Upload en deploy
scp -r strapi/ root@your-server:/tmp/strapi
ssh root@your-server
cd /tmp/strapi
chmod +x deploy-plesk.sh
./deploy-plesk.sh

# Volg instructies voor Nginx configuratie!
```

**Zie**: `/strapi/PLESK_INSTALLATION.md` voor complete gids

---

## 📚 Documentatie

| Document | Beschrijving | Start hier als... |
|----------|--------------|-------------------|
| **[STRAPI_DEPLOYMENT_GUIDE.md](STRAPI_DEPLOYMENT_GUIDE.md)** | Complete deployment gids | Je wilt alles begrijpen |
| **[STRAPI_MIGRATION_SUMMARY.md](STRAPI_MIGRATION_SUMMARY.md)** | Migratie overzicht | Je wilt weten wat er is veranderd |
| **[STRAPI_QUICK_REFERENCE.md](STRAPI_QUICK_REFERENCE.md)** | Quick reference | Je zoekt een specifiek commando |
| **[strapi/QUICK_START.md](strapi/QUICK_START.md)** | Snelle setup | Je wilt snel beginnen |
| **[strapi/PLESK_INSTALLATION.md](strapi/PLESK_INSTALLATION.md)** | Plesk deployment | Je gaat deployen naar Plesk |
| **[strapi/README.md](strapi/README.md)** | Strapi overzicht | Je wilt de API begrijpen |

---

## 🔌 React Integratie

### Basic Usage

```typescript
import { useStrapiData } from './hooks/useStrapiData';

function MyPage() {
  const { data, loading, error } = useStrapiData('pages');
  
  if (loading) return <Loader />;
  if (error) return <Error message={error.message} />;
  
  return <div>{/* render data */}</div>;
}
```

### Helper Hooks

```typescript
// Company settings
import { useCompanySettings } from './hooks/useStrapiData';
const { data: company } = useCompanySettings();

// Support widget settings
import { useSupportWidgetSettings } from './hooks/useStrapiData';
const { data: widget } = useSupportWidgetSettings();

// Page by slug
import { usePageBySlug } from './hooks/useStrapiData';
const { data: page } = usePageBySlug('home');
```

### Form Submissions

```typescript
import { submitToStrapi } from './hooks/useStrapiData';

await submitToStrapi('form-submissions', {
  type: 'contact',
  data: formData,
  metadata: {
    ip: 'client-ip',
    userAgent: navigator.userAgent,
  },
});
```

**Zie**: `/components/StrapiIntegration.tsx` voor complete voorbeelden

---

## 🌐 URLs & Endpoints

### Development
```
React:          http://localhost:5173
Strapi Admin:   http://localhost:1337/admin
Strapi API:     http://localhost:1337/api
Health:         http://localhost:1337/_health
```

### Production
```
Website:        https://systeemlink.nl
Strapi Admin:   https://systeemlink.nl/backend/admin
Strapi API:     https://systeemlink.nl/backend/api
Health:         https://systeemlink.nl/backend/_health
```

### API Endpoints
```
GET    /api/pages                    # Alle pagina's
GET    /api/pages/:id                # Enkele pagina
GET    /api/sections                 # Alle secties
POST   /api/form-submissions         # Nieuwe submission
GET    /api/company-setting          # Bedrijfsgegevens
GET    /api/support-widget-setting   # Widget instellingen
GET    /api/navigation-menus         # Navigatie
```

---

## 🎯 Content Types

| Type | Kind | Beschrijving |
|------|------|--------------|
| `page` | Collection | Website pagina's met secties en SEO |
| `section` | Collection | Herbruikbare content secties |
| `form-submission` | Collection | Formulier inzendingen |
| `company-setting` | Single | Bedrijfsgegevens (adres, contact, KVK) |
| `email-setting` | Single | Email configuratie |
| `support-widget-setting` | Single | Support widget instellingen |
| `navigation-menu` | Collection | Navigatie menu's |

**Components:**
- `seo.meta` - SEO metadata
- `company.address` - Adresgegevens
- `company.contact` - Contactgegevens
- `company.business` - KVK, BTW
- `company.social` - Social media

---

## ⚡ Quick Commands

### Strapi

```bash
# Development
cd strapi && npm run develop

# Production
npm start

# Generate secrets
npm run generate-secrets

# Health check
npm run health

# Data migration
STRAPI_ADMIN_TOKEN=token npm run migrate
```

### Server (Plesk)

```bash
# Service status
sudo systemctl status strapi-systeemlink

# Restart
sudo systemctl restart strapi-systeemlink

# Logs
sudo journalctl -u strapi-systeemlink -f

# Database backup
pg_dump -U systeemlink_strapi systeemlink_strapi > backup.sql
```

**Zie**: `/STRAPI_QUICK_REFERENCE.md` voor alle commando's

---

## 🔧 Development Workflow

### 1. Nieuwe Content Type Toevoegen

```bash
# 1. Maak schema aan
nano strapi/src/api/my-type/content-types/my-type/schema.json

# 2. Rebuild
cd strapi && npm run build

# 3. Restart
npm run develop  # of sudo systemctl restart strapi-systeemlink

# 4. Configureer permissions in admin
# Settings → Users & Permissions → Public
```

### 2. Content Bijwerken

```bash
# 1. Log in op admin panel
# http://localhost:1337/admin (dev)
# https://systeemlink.nl/backend/admin (prod)

# 2. Content Manager → Select content type

# 3. Create/Edit entry

# 4. Save & Publish
```

### 3. Deploy Updates

```bash
# 1. Backup!
pg_dump -U systeemlink_strapi systeemlink_strapi > backup.sql

# 2. Pull code
cd /var/www/vhosts/systeemlink.nl/backend
git pull

# 3. Install & build
npm install
npm run build

# 4. Restart
sudo systemctl restart strapi-systeemlink

# 5. Test
curl https://systeemlink.nl/backend/_health
```

---

## 🔐 Environment Variables

### React (.env)

```bash
# Development
VITE_STRAPI_URL=http://localhost:1337
VITE_STRAPI_API_TOKEN=dev-token

# Production
VITE_STRAPI_URL=https://systeemlink.nl/backend
VITE_STRAPI_API_TOKEN=production-token
```

### Strapi (.env)

```bash
# Development
HOST=0.0.0.0
PORT=1337
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
NODE_ENV=development
CORS_ORIGINS=http://localhost:5173

# Production
HOST=0.0.0.0
PORT=1337
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=systeemlink_strapi
DATABASE_USERNAME=systeemlink_strapi
DATABASE_PASSWORD=secure-password
NODE_ENV=production
PUBLIC_URL=https://systeemlink.nl/backend
CORS_ORIGINS=https://systeemlink.nl

# Secrets (beide)
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=random-salt
ADMIN_JWT_SECRET=random-secret
TRANSFER_TOKEN_SALT=random-salt
JWT_SECRET=random-secret
```

**Genereer secrets**: `cd strapi && npm run generate-secrets`

---

## 🐛 Troubleshooting

### Probleem: Strapi start niet

```bash
# Logs bekijken
sudo journalctl -u strapi-systeemlink -n 50

# Veelvoorkomende oplossingen:
# 1. Port in gebruik
sudo lsof -i :1337 && kill -9 PID

# 2. Database connectie
psql -U systeemlink_strapi -d systeemlink_strapi

# 3. Permissies
sudo chown -R systeemlink:systeemlink /var/www/vhosts/systeemlink.nl/backend
```

### Probleem: 502 Bad Gateway

```bash
# Check service
sudo systemctl status strapi-systeemlink

# Restart nginx
sudo systemctl restart nginx

# Check nginx config
sudo nginx -t
```

### Probleem: CORS Errors

```bash
# Update CORS in strapi/config/middlewares.ts
# En rebuild:
npm run build
sudo systemctl restart strapi-systeemlink
```

### Probleem: API returns 403

```bash
# 1. Check token in React .env
# 2. Check permissions in Strapi admin:
#    Settings → Users & Permissions → Roles → Public
# 3. Maak nieuw API token indien nodig
```

**Zie**: `/STRAPI_QUICK_REFERENCE.md` → Emergency Procedures

---

## 📦 Backup & Restore

### Database

```bash
# Backup
pg_dump -U systeemlink_strapi systeemlink_strapi | gzip > backup-$(date +%Y%m%d).sql.gz

# Restore
gunzip < backup-20250101.sql.gz | psql -U systeemlink_strapi systeemlink_strapi
```

### Uploads

```bash
# Backup
tar -czf uploads-backup-$(date +%Y%m%d).tar.gz \
  /var/www/vhosts/systeemlink.nl/backend/public/uploads

# Restore
tar -xzf uploads-backup.tar.gz -C /var/www/vhosts/systeemlink.nl/backend/public/
```

### Automated Daily Backup

```bash
# Add to crontab
sudo crontab -e

# Add line:
0 2 * * * pg_dump -U systeemlink_strapi systeemlink_strapi | gzip > /backup/strapi-$(date +\%Y\%m\%d).sql.gz
```

---

## 🎓 Training & Support

### Voor Content Managers

**Admin Interface Training:**
1. Login procedure
2. Content Manager navigatie
3. Pagina's bewerken
4. Media uploaden
5. Form submissions bekijken
6. SEO metadata invullen

**URL**: https://systeemlink.nl/backend/admin

### Voor Developers

**Technische Training:**
1. Strapi architectuur
2. Content types begrijpen
3. API endpoints gebruiken
4. React hooks implementeren
5. Nieuwe features toevoegen
6. Deployment procedures

**Documentatie**: Start met `/STRAPI_DEPLOYMENT_GUIDE.md`

### Support Contacten

**Systeemlink:**
- Email: info@systeemlink.nl
- Tel: +31 613777733
- Website: https://systeemlink.nl

**Strapi Community:**
- Docs: https://docs.strapi.io
- Discord: https://discord.strapi.io
- Forum: https://forum.strapi.io

---

## ✅ Deployment Checklist

### Pre-Deployment

- [ ] Lokale development getest
- [ ] Alle content types werkend
- [ ] React integratie getest
- [ ] Form submissions werkend
- [ ] Database credentials beschikbaar
- [ ] Secrets gegenereerd
- [ ] Documentatie gelezen

### Deployment

- [ ] PostgreSQL database aangemaakt
- [ ] Strapi gedeployed (deploy-plesk.sh)
- [ ] Nginx configuratie toegevoegd
- [ ] Service draait (systemctl status)
- [ ] Health check OK
- [ ] Admin panel bereikbaar
- [ ] API token aangemaakt
- [ ] Permissions ingesteld
- [ ] Company settings ingevuld

### Post-Deployment

- [ ] React production build gedeployed
- [ ] Frontend kan data ophalen
- [ ] Forms verzenden naar Strapi
- [ ] SSL certificate actief
- [ ] Monitoring ingesteld
- [ ] Backups geautomatiseerd
- [ ] Team getraind
- [ ] Documentatie gedeeld

---

## 🎯 Features

### CMS Features
✅ Intuïtieve admin interface  
✅ Drag & drop media library  
✅ Draft/publish workflow  
✅ Role-based access control  
✅ RESTful API  
✅ Type-safe TypeScript  
✅ Flexible content modeling  
✅ Built-in SEO management  

### Website Features
✅ 14+ pagina's  
✅ Modulair sectie systeem  
✅ IT-Check wizard (16 stappen)  
✅ 3 scan pagina's (Network, Cloud, Workplace)  
✅ hCaptcha integratie  
✅ Dark mode  
✅ Volledig responsive  
✅ Support widget  
✅ Form submissions tracking  

---

## 📈 Performance & Monitoring

### Monitoring Tools

- **Uptime**: UptimeRobot op `https://systeemlink.nl/backend/_health`
- **Logs**: `sudo journalctl -u strapi-systeemlink -f`
- **Resources**: `htop` of `top`
- **Database**: PostgreSQL built-in stats

### Performance Targets

- API Response Time: < 200ms
- Page Load Time: < 2s
- Admin Panel Load: < 1s
- Database Query: < 50ms
- Uptime: > 99.9%

---

## 🔮 Roadmap & Future Improvements

### Potentiële Verbeteringen

- [ ] GraphQL API (optioneel)
- [ ] Caching layer (Redis)
- [ ] CDN voor uploads
- [ ] Automated testing
- [ ] CI/CD pipeline
- [ ] Staging environment
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Email notifications via Strapi

---

## 📝 Version Info

**Strapi**: 4.25.12  
**Node.js**: 18.x / 20.x  
**PostgreSQL**: 14+  
**React**: 18.x  
**TypeScript**: 5.x  

**Deployment**: Plesk Obsidian 18.0+  
**Server**: Linux (Ubuntu/CentOS)  
**Web Server**: Nginx (reverse proxy)  
**Process Manager**: Systemd  

---

## 🏆 Credits

**Ontwikkeld voor**: Systeemlink  
**Adres**: Planetenpark 19, 1443BS Purmerend  
**KVK**: 88308170  
**BTW**: NL004588053B11  
**Tel**: +31 613777733  
**Email**: info@systeemlink.nl  
**Website**: https://systeemlink.nl  

---

## 📄 License

MIT License - Systeemlink © 2025

---

**🎉 Klaar voor deployment!**

Voor vragen of hulp, zie de documentatie of neem contact op met support.

**Start hier**: Open `/STRAPI_DEPLOYMENT_GUIDE.md` voor de complete gids.

---

**Laatste update**: 2025-01-01  
**Versie**: 1.0.0  
**Status**: ✅ Production Ready
