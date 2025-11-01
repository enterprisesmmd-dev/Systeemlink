# 🚀 Complete Strapi Deployment Guide - Systeemlink

Deze gids beschrijft de **volledige setup van Strapi CMS** als headless backend voor de Systeemlink website, inclusief deployment naar een Plesk server op `systeemlink.nl/backend`.

---

## 📋 Table of Contents

1. [Overzicht](#overzicht)
2. [Architectuur](#architectuur)
3. [Lokale Development Setup](#lokale-development-setup)
4. [Plesk Server Deployment](#plesk-server-deployment)
5. [React Frontend Integratie](#react-frontend-integratie)
6. [Data Migratie](#data-migratie)
7. [Maintenance & Backup](#maintenance--backup)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Overzicht

### Wat is veranderd?

We hebben de PHP backend vervangen door **Strapi** - een moderne, open-source headless CMS. Alle bewerkbare content (pagina's, secties, form submissions, bedrijfsinstellingen) worden nu beheerd via Strapi.

### Voordelen

✅ **Modern Admin Interface** - Intuïtieve UI voor content beheer  
✅ **RESTful API** - Gestandaardiseerde API endpoints  
✅ **Type-safe** - TypeScript support out-of-the-box  
✅ **Flexible Content Types** - Eenvoudig nieuwe content types toevoegen  
✅ **Role-Based Access** - Granulaire permissie controle  
✅ **Versioning & Publishing** - Draft/publish workflow  
✅ **Media Library** - Geïntegreerd bestandsbeheer  
✅ **Self-hosted** - Volledige controle over je data  

### Technische Stack

- **Backend**: Strapi 4.25.12
- **Database**: PostgreSQL 14+ (production) / SQLite (development)
- **Deployment**: Plesk Obsidian + Systemd + Nginx
- **Frontend**: React + TypeScript
- **URL**: `https://systeemlink.nl/backend`

---

## 🏗️ Architectuur

```
┌─────────────────────────────────────────────────────────────┐
│                    systeemlink.nl                            │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Frontend (React)                                            │
│  ├── Pages (HomePage, ContactPage, etc.)                    │
│  ├── Components (Header, Footer, etc.)                      │
│  └── Hooks (useStrapiData, useCompanySettings)             │
│           │                                                   │
│           │ HTTP/HTTPS                                       │
│           ▼                                                   │
│  Nginx Reverse Proxy (/backend → localhost:1337)           │
│           │                                                   │
│           ▼                                                   │
│  Strapi CMS (Node.js)                                       │
│  ├── Content Types (Pages, Sections, Forms, etc.)          │
│  ├── API Routes (/api/pages, /api/sections, etc.)          │
│  ├── Admin Panel (/backend/admin)                           │
│  └── Media Library (/backend/uploads)                       │
│           │                                                   │
│           ▼                                                   │
│  PostgreSQL Database                                         │
│  └── Tables (pages, sections, form_submissions, etc.)       │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Content Types

1. **Page** - Website pagina's met SEO en secties
2. **Section** - Herbruikbare content secties (hero, features, CTA, etc.)
3. **Form Submission** - Alle formulier inzendingen (IT-Check, Contact, Scans)
4. **Company Setting** - Bedrijfsgegevens (single type)
5. **Email Setting** - Email configuratie (single type)
6. **Support Widget Setting** - Support widget instellingen (single type)
7. **Navigation Menu** - Navigatie menu's

### API Endpoints

```
GET    /api/pages                    # Alle pagina's
GET    /api/pages/:id                # Enkele pagina
GET    /api/sections                 # Alle secties
GET    /api/form-submissions         # Alle submissions (admin)
POST   /api/form-submissions         # Nieuwe submission
GET    /api/company-setting          # Bedrijfsgegevens
GET    /api/email-setting            # Email instellingen
GET    /api/support-widget-setting   # Widget instellingen
GET    /api/navigation-menus         # Navigatie menu's
```

---

## 💻 Lokale Development Setup

### Stap 1: Prerequisites

Zorg dat je het volgende hebt geïnstalleerd:

- **Node.js** 18.x of 20.x ([download](https://nodejs.org/))
- **npm** of **yarn**
- **Git**

### Stap 2: Strapi Installeren

```bash
# Ga naar project root
cd /path/to/systeemlink-project

# Ga naar strapi folder
cd strapi

# Installeer dependencies
npm install
```

### Stap 3: Environment Configureren

Kopieer `.env.example` naar `.env`:

```bash
cp .env.example .env
```

Genereer secrets:

```bash
# Genereer alle secrets in één keer
npm run generate-secrets
```

Kopieer de output en plak in `.env`:

```bash
# Server
HOST=0.0.0.0
PORT=1337
APP_KEYS=generated-key-1,generated-key-2,generated-key-3,generated-key-4
API_TOKEN_SALT=generated-salt
ADMIN_JWT_SECRET=generated-secret
TRANSFER_TOKEN_SALT=generated-salt
JWT_SECRET=generated-secret

# Database (SQLite voor development)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Node Environment
NODE_ENV=development

# CORS Origins
CORS_ORIGINS=http://localhost:5173
```

### Stap 4: Strapi Starten

```bash
# Start Strapi in development mode
npm run develop
```

Strapi is nu beschikbaar op:
- **Admin Panel**: http://localhost:1337/admin
- **API**: http://localhost:1337/api

### Stap 5: Admin Account Aanmaken

1. Open http://localhost:1337/admin
2. Vul het registratieformulier in:
   - First name: Jouw naam
   - Email: admin@systeemlink.nl
   - Password: Sterk wachtwoord (min. 8 karakters)
3. Klik op **"Let's start"**

### Stap 6: API Permissions Instellen

Voor **public** toegang (unauthenticated requests):

1. Ga naar **Settings** (⚙️) → **Users & Permissions Plugin** → **Roles** → **Public**
2. Enable de volgende permissions:

**Page**
- ✅ `find`
- ✅ `findOne`

**Section**
- ✅ `find`
- ✅ `findOne`

**Form-submission**
- ✅ `create` (voor formulier inzendingen)

**Company-setting**
- ✅ `find`

**Email-setting**
- ✅ `find`

**Support-widget-setting**
- ✅ `find`

**Navigation-menu**
- ✅ `find`

3. Klik op **Save**

### Stap 7: API Token Aanmaken

Voor de React frontend:

1. Ga naar **Settings** → **API Tokens** → **Create new API Token**
2. Configuratie:
   ```
   Name: Frontend Read-Only
   Description: Token voor React frontend
   Token duration: Unlimited
   Token type: Read-only
   ```
3. Klik op **Save**
4. **Kopieer de token** (je ziet hem maar 1 keer!)

### Stap 8: React Frontend Configureren

Update je React `.env` bestand (in project root):

```bash
# Voeg toe aan .env
VITE_STRAPI_URL=http://localhost:1337
VITE_STRAPI_API_TOKEN=jouw-gekopieerde-token
```

Herstart je React dev server:

```bash
npm run dev
```

### Stap 9: Test Integratie

Voeg tijdelijk de debug panel toe aan je React app:

```tsx
// In App.tsx
import { StrapiDebugPanel } from './components/StrapiIntegration';

function App() {
  return (
    <>
      {/* Je bestaande app */}
      
      {/* Debug panel (alleen in development) */}
      {import.meta.env.DEV && <StrapiDebugPanel />}
    </>
  );
}
```

Je ziet nu een "Strapi Debug" knop linksonder die de connectie status toont.

---

## 🌐 Plesk Server Deployment

### Vereisten

Zorg dat je Plesk server het volgende heeft:

- **Plesk Obsidian** 18.0 of hoger
- **SSH toegang** met root/sudo rechten
- **Node.js 18+** (installeer via Plesk → Tools & Settings → Updates → System Updates → Node.js)
- **PostgreSQL** (installeer via Plesk → Databases)

### Stap 1: Database Aanmaken

Via Plesk interface:

1. Log in op **Plesk**
2. Ga naar **Databases** → **Add Database**
3. Configuratie:
   ```
   Database name: systeemlink_strapi
   Database user: systeemlink_strapi
   Password: [genereer sterk wachtwoord]
   ```
4. Klik op **OK**
5. **Noteer de database credentials!**

### Stap 2: Upload Strapi Files

Vanaf je lokale machine:

```bash
# Zip de strapi folder (excluding node_modules)
cd /path/to/systeemlink-project
tar -czf strapi.tar.gz strapi/ --exclude=strapi/node_modules --exclude=strapi/.tmp

# Upload naar server
scp strapi.tar.gz root@your-server-ip:/tmp/

# Of gebruik FileZilla/WinSCP
```

### Stap 3: SSH naar Server

```bash
ssh root@your-server-ip
```

### Stap 4: Extract en Voer Deployment Script uit

```bash
# Extract
cd /tmp
tar -xzf strapi.tar.gz
cd strapi

# Maak script executable
chmod +x deploy-plesk.sh

# Voer deployment uit
./deploy-plesk.sh
```

Het script zal:
1. ✅ Pre-flight checks uitvoeren
2. ✅ Database configureren
3. ✅ Strapi installeren en builden
4. ✅ Systemd service aanmaken en starten
5. ✅ Nginx configuratie genereren

Volg de instructies op het scherm!

### Stap 5: Nginx Configuratie Toevoegen

Na het script moet je **handmatig** de Nginx configuratie toevoegen in Plesk:

1. Log in op **Plesk**
2. Ga naar **Websites & Domains** → **systeemlink.nl**
3. Klik op **Apache & nginx Settings**
4. Scroll naar **"Additional nginx directives"**
5. Plak de volgende configuratie:

```nginx
# Strapi Backend op /backend
location /backend/ {
    # Rewrite /backend naar root voor Strapi
    rewrite ^/backend/(.*)$ /$1 break;
    
    # Proxy settings
    proxy_pass http://127.0.0.1:1337;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
    
    # Timeouts
    proxy_connect_timeout 600;
    proxy_send_timeout 600;
    proxy_read_timeout 600;
    send_timeout 600;
    
    # Buffer settings
    proxy_buffer_size 128k;
    proxy_buffers 4 256k;
    proxy_busy_buffers_size 256k;
}

# Strapi uploads
location /backend/uploads/ {
    rewrite ^/backend/uploads/(.*)$ /uploads/$1 break;
    proxy_pass http://127.0.0.1:1337;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
}
```

6. Klik op **OK** (Nginx wordt automatisch herstart)

### Stap 6: Test Deployment

```bash
# Test health endpoint
curl https://systeemlink.nl/backend/_health

# Expected response: {"status":"ok"}
```

Open in browser:
- **Admin Panel**: https://systeemlink.nl/backend/admin
- **API**: https://systeemlink.nl/backend/api

### Stap 7: Configureer Strapi Admin

1. Ga naar https://systeemlink.nl/backend/admin
2. Maak admin account aan
3. Configureer permissions (zie Stap 6 van Lokale Setup)
4. Maak API token aan (zie Stap 7 van Lokale Setup)

### Stap 8: Update React Production Build

Update je React production environment variabelen:

```bash
# In BUILD_PRODUCTION/.env.production
VITE_STRAPI_URL=https://systeemlink.nl/backend
VITE_STRAPI_API_TOKEN=jouw-production-token
```

Rebuild en deploy React app:

```bash
cd BUILD_PRODUCTION
npm run build
# Deploy dist/ naar Plesk
```

---

## 🔌 React Frontend Integratie

### useStrapiData Hook

De basis hook voor het ophalen van data:

```typescript
import { useStrapiData } from './hooks/useStrapiData';

function MyComponent() {
  const { data, loading, error, refetch } = useStrapiData('pages');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{/* render data */}</div>;
}
```

### Query Parameters

```typescript
// Met populate
const { data } = useStrapiData('pages', {
  populate: ['sections', 'seo']
});

// Met filters
const { data } = useStrapiData('pages', {
  filters: {
    slug: { $eq: 'home' }
  }
});

// Met sorting
const { data } = useStrapiData('pages', {
  sort: ['createdAt:desc']
});

// Gecombineerd
const { data } = useStrapiData('pages', {
  populate: ['sections', 'seo'],
  filters: { published: { $eq: true } },
  sort: ['order:asc'],
  pagination: { page: 1, pageSize: 10 }
});
```

### Helper Hooks

```typescript
// Company Settings
import { useCompanySettings } from './hooks/useStrapiData';

function Footer() {
  const { data: company } = useCompanySettings();
  return <div>{company?.attributes.contact.phone}</div>;
}

// Support Widget Settings
import { useSupportWidgetSettings } from './hooks/useStrapiData';

function SupportWidget() {
  const { data: settings } = useSupportWidgetSettings();
  // ...
}

// Page by Slug
import { usePageBySlug } from './hooks/useStrapiData';

function DynamicPage({ slug }: { slug: string }) {
  const { data: page } = usePageBySlug(slug);
  // ...
}
```

### Form Submissions

```typescript
import { submitToStrapi } from './hooks/useStrapiData';

async function handleSubmit(formData: any) {
  try {
    await submitToStrapi('form-submissions', {
      type: 'contact',
      data: formData,
      metadata: {
        ip: 'client-ip',
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        timestamp: new Date().toISOString(),
      },
    });
    
    // Success
    toast.success('Bedankt voor je bericht!');
  } catch (error) {
    // Error handling
    toast.error('Er ging iets mis. Probeer het opnieuw.');
  }
}
```

### Component Voorbeelden

Zie `/components/StrapiIntegration.tsx` voor complete voorbeelden van:
- `StrapiStatus` - Status indicator
- `CompanyInfoExample` - Company settings weergave
- `SupportWidgetExample` - Support widget
- `DynamicPageExample` - Dynamische pagina renderer
- `StrapiDebugPanel` - Debug panel voor development

---

## 📦 Data Migratie

Als je bestaande CMS data hebt in localStorage, kun je deze migreren naar Strapi:

### Stap 1: Voorbereiden

Zorg dat:
- Strapi lokaal draait (`npm run develop`)
- Je bent ingelogd in Strapi admin
- Permissions zijn correct ingesteld

### Stap 2: Admin Token Aanmaken

Voor migratie heb je een **Full Access** token nodig:

1. **Settings** → **API Tokens** → **Create new API Token**
2. Configuratie:
   ```
   Name: Migration
   Description: Tijdelijk token voor data migratie
   Token duration: 7 days
   Token type: Full Access
   ```
3. Kopieer de token

### Stap 3: Migratie Uitvoeren

```bash
cd strapi

# Run migratie script
STRAPI_ADMIN_TOKEN=jouw-token node scripts/migrate-data.js
```

Het script zal:
- ✅ Company Settings migreren
- ✅ Email Settings migreren
- ✅ Support Widget Settings migreren
- ✅ Navigation Menus migreren
- ✅ Voorbeeld pagina's migreren

### Stap 4: Verifiëren

Check in Strapi admin of alle data correct is gemigreerd:
- Content Manager → Company Setting
- Content Manager → Pages
- Content Manager → Sections
- etc.

### Stap 5: Token Verwijderen

**Belangrijk**: Verwijder het Full Access token na migratie!

Settings → API Tokens → [Migration token] → Delete

---

## 🔧 Maintenance & Backup

### Service Management

```bash
# Status check
sudo systemctl status strapi-systeemlink

# Restart
sudo systemctl restart strapi-systeemlink

# Stop
sudo systemctl stop strapi-systeemlink

# Start
sudo systemctl start strapi-systeemlink

# Logs (live)
sudo journalctl -u strapi-systeemlink -f

# Logs (laatste 100 regels)
sudo journalctl -u strapi-systeemlink -n 100
```

### Database Backup

```bash
# Manual backup
pg_dump -U systeemlink_strapi systeemlink_strapi > backup-$(date +%Y%m%d).sql

# Met compressie
pg_dump -U systeemlink_strapi systeemlink_strapi | gzip > backup-$(date +%Y%m%d).sql.gz

# Automated daily backup (cron)
sudo crontab -e
# Voeg toe:
0 2 * * * pg_dump -U systeemlink_strapi systeemlink_strapi | gzip > /backup/strapi-$(date +\%Y\%m\%d).sql.gz
```

### Database Restore

```bash
# Restore
psql -U systeemlink_strapi systeemlink_strapi < backup-20250101.sql

# Van gzip
gunzip < backup-20250101.sql.gz | psql -U systeemlink_strapi systeemlink_strapi
```

### Uploads Backup

```bash
# Backup uploads folder
tar -czf uploads-backup-$(date +%Y%m%d).tar.gz \
  /var/www/vhosts/systeemlink.nl/backend/public/uploads

# Restore
tar -xzf uploads-backup-20250101.tar.gz -C /var/www/vhosts/systeemlink.nl/backend/public/
```

### Updates

```bash
# Strapi updates (test eerst lokaal!)
cd /var/www/vhosts/systeemlink.nl/backend

# Backup maken
pg_dump -U systeemlink_strapi systeemlink_strapi > pre-update-backup.sql

# Update packages
npm update

# Rebuild
npm run build

# Restart
sudo systemctl restart strapi-systeemlink

# Test
curl https://systeemlink.nl/backend/_health
```

---

## 🐛 Troubleshooting

### Strapi Start Niet

**Symptoom**: Service faalt bij start

```bash
# Check logs
sudo journalctl -u strapi-systeemlink -n 50

# Common issues:

# 1. Database connectie problemen
# Test database:
psql -U systeemlink_strapi -d systeemlink_strapi -h localhost
# Fix: Check DATABASE_PASSWORD in .env

# 2. Port al in gebruik
sudo lsof -i :1337
# Fix: Kill process of wijzig PORT in .env

# 3. Permissie problemen
sudo chown -R systeemlink:systeemlink /var/www/vhosts/systeemlink.nl/backend
```

### 502 Bad Gateway

**Symptoom**: Nginx toont 502 error

```bash
# 1. Check of Strapi draait
sudo systemctl status strapi-systeemlink

# 2. Check Nginx configuratie
sudo nginx -t

# 3. Restart beide services
sudo systemctl restart strapi-systeemlink
sudo systemctl restart nginx

# 4. Check of port 1337 luistert
sudo netstat -tulpn | grep 1337
```

### CORS Errors

**Symptoom**: Browser console toont CORS errors

```bash
# Fix 1: Update CORS_ORIGINS in .env
echo 'CORS_ORIGINS=https://systeemlink.nl,https://www.systeemlink.nl' >> .env

# Fix 2: Update config/middlewares.ts
nano /var/www/vhosts/systeemlink.nl/backend/config/middlewares.ts
```

Update middlewares.ts:
```typescript
{
  name: 'strapi::cors',
  config: {
    origin: [
      'https://systeemlink.nl',
      'https://www.systeemlink.nl',
      'http://localhost:5173' // development
    ],
  },
}
```

```bash
# Rebuild en restart
npm run build
sudo systemctl restart strapi-systeemlink
```

### API Returns 403 Forbidden

**Symptoom**: API calls falen met 403

**Mogelijke oorzaken**:
1. Incorrect API token
2. Permissions niet ingesteld
3. Token type verkeerd (Full Access vs Read-only)

**Oplossing**:
1. Verifieer token in React .env
2. Check Strapi Admin → Settings → Users & Permissions → Roles → Public
3. Enable correcte permissions
4. Maak nieuw token aan indien nodig

### Memory Issues

**Symptoom**: Strapi crasht bij build of runtime

```bash
# Check memory
free -h

# Temporary swap voor build
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Rebuild
npm run build

# Permanent swap
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### Database Connection Pool Exhausted

**Symptoom**: "connection pool exhausted" errors

Edit `config/database.ts`:
```typescript
export default ({ env }) => ({
  connection: {
    // ...
    pool: {
      min: 2,
      max: 10,
      acquireTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
    },
  },
});
```

---

## 📞 Support & Resources

### Documentatie

- **Strapi Docs**: https://docs.strapi.io
- **Strapi API Reference**: https://docs.strapi.io/dev-docs/api/rest
- **Plesk Docs**: https://docs.plesk.com
- **PostgreSQL Docs**: https://www.postgresql.org/docs/

### Community

- **Strapi Discord**: https://discord.strapi.io
- **Strapi Forum**: https://forum.strapi.io
- **GitHub Issues**: https://github.com/strapi/strapi/issues

### Systeemlink Support

- **Email**: info@systeemlink.nl
- **Telefoon**: +31 613777733
- **Website**: https://systeemlink.nl

---

## ✅ Deployment Checklist

Gebruik deze checklist om te verifiëren dat alles correct is ingesteld:

### Lokale Development

- [ ] Strapi draait op localhost:1337
- [ ] Admin account aangemaakt
- [ ] Public permissions ingesteld
- [ ] API token aangemaakt
- [ ] React .env geconfigureerd met VITE_STRAPI_URL en VITE_STRAPI_API_TOKEN
- [ ] Company Settings ingevuld
- [ ] Test pagina aangemaakt

### Production Deployment

- [ ] PostgreSQL database aangemaakt in Plesk
- [ ] Strapi files geüpload naar server
- [ ] deploy-plesk.sh succesvol uitgevoerd
- [ ] Nginx configuratie toegevoegd in Plesk
- [ ] Strapi service draait (systemctl status)
- [ ] Health check succesvol (curl /backend/_health)
- [ ] Admin panel bereikbaar
- [ ] Production admin account aangemaakt
- [ ] Production API token aangemaakt
- [ ] Public permissions ingesteld
- [ ] Company Settings ingevuld
- [ ] React production .env bijgewerkt
- [ ] React production build gedeployed
- [ ] Frontend kan data ophalen van backend
- [ ] Form submissions werken
- [ ] Database backup ingesteld (cron)
- [ ] SSL certificate actief

---

© 2025 Systeemlink. Alle rechten voorbehouden.
