# 🔄 Strapi Migration Summary - Van PHP naar Headless CMS

## ✅ Wat is Voltooid

### 1. Strapi Backend Setup ✓

**Locatie**: `/strapi`

Volledig geconfigureerde Strapi 4.25.12 installatie met:
- ✅ Docker support (docker-compose.yml)
- ✅ TypeScript configuratie
- ✅ Database configuratie (PostgreSQL + SQLite)
- ✅ Server & Admin configuratie
- ✅ CORS & Security middlewares
- ✅ API configuratie

### 2. Content Types ✓

**Alle benodigde content types aangemaakt:**

| Content Type | Type | Beschrijving |
|-------------|------|--------------|
| `page` | Collection | Website pagina's met SEO |
| `section` | Collection | Herbruikbare content secties |
| `form-submission` | Collection | Formulier inzendingen |
| `company-setting` | Single | Bedrijfsgegevens |
| `email-setting` | Single | Email configuratie |
| `support-widget-setting` | Single | Widget instellingen |
| `navigation-menu` | Collection | Navigatie menu's |

**Components:**
- `seo.meta` - SEO metadata
- `company.address` - Adresgegevens
- `company.contact` - Contactgegevens
- `company.business` - Bedrijfsregistratie
- `company.social` - Social media links

### 3. Deployment Scripts ✓

**Beschikbare scripts:**

| Script | Beschrijving |
|--------|--------------|
| `deploy-plesk.sh` | Volledige Plesk deployment automation |
| `scripts/migrate-data.js` | Migreer data van localStorage naar Strapi |
| `npm run generate-secrets` | Genereer secure environment secrets |
| `npm run health` | Health check van Strapi instance |

### 4. React Integratie ✓

**Nieuwe files:**

| File | Beschrijving |
|------|--------------|
| `/hooks/useStrapiData.ts` | Main hook voor Strapi data ophalen |
| `/components/StrapiIntegration.tsx` | Voorbeeld components en debug tools |

**Beschikbare hooks:**
```typescript
useStrapiData(endpoint, options)      // Generic data fetching
useCompanySettings()                  // Company settings
useSupportWidgetSettings()            // Support widget config
useEmailSettings()                    // Email configuration
usePageBySlug(slug)                   // Page by slug
useNavigationMenus(position)          // Navigation menus
submitToStrapi(endpoint, data)        // POST data
updateStrapi(endpoint, id, data)      // PUT data
deleteFromStrapi(endpoint, id)        // DELETE data
```

### 5. Documentatie ✓

**Complete gidsen aangemaakt:**

| Document | Beschrijving |
|----------|--------------|
| `STRAPI_DEPLOYMENT_GUIDE.md` | Complete deployment gids (dit document) |
| `PLESK_INSTALLATION.md` | Gedetailleerde Plesk installatie instructies |
| `QUICK_START.md` | Snelle setup voor lokale development |
| `strapi/README.md` | Strapi overzicht en API documentatie |

---

## 🚀 Volgende Stappen

### Voor Lokale Development:

```bash
# 1. Installeer Strapi dependencies
cd strapi
npm install

# 2. Configureer environment
cp .env.example .env
npm run generate-secrets
# Kopieer secrets naar .env

# 3. Start Strapi
npm run develop

# 4. Open admin panel
# http://localhost:1337/admin

# 5. Maak admin account aan

# 6. Configureer permissions
# Settings → Users & Permissions → Public → Enable permissions

# 7. Maak API token
# Settings → API Tokens → Create new token

# 8. Update React .env
echo "VITE_STRAPI_URL=http://localhost:1337" >> ../.env
echo "VITE_STRAPI_API_TOKEN=your-token" >> ../.env

# 9. Test integratie
npm run dev
```

### Voor Plesk Deployment:

```bash
# 1. Maak database aan in Plesk
# Database: systeemlink_strapi
# User: systeemlink_strapi

# 2. Upload strapi folder naar server
scp -r strapi/ root@your-server:/tmp/strapi

# 3. SSH naar server
ssh root@your-server

# 4. Run deployment script
cd /tmp/strapi
chmod +x deploy-plesk.sh
./deploy-plesk.sh

# 5. Voeg Nginx configuratie toe in Plesk
# Websites & Domains → systeemlink.nl → Apache & nginx Settings
# Zie PLESK_INSTALLATION.md voor exacte configuratie

# 6. Test deployment
curl https://systeemlink.nl/backend/_health

# 7. Configureer Strapi admin
# https://systeemlink.nl/backend/admin

# 8. Update React production .env
echo "VITE_STRAPI_URL=https://systeemlink.nl/backend" >> BUILD_PRODUCTION/.env.production
echo "VITE_STRAPI_API_TOKEN=production-token" >> BUILD_PRODUCTION/.env.production

# 9. Deploy React app
cd BUILD_PRODUCTION
npm run build
# Upload dist/ naar Plesk
```

---

## 🔧 Migration van Bestaande Code

### Wat Moet Worden Aangepast

#### 1. CMS Admin Component

**Oude code** (gebruikt localStorage):
```typescript
// components/CMSAdmin.tsx
const [content, setContent] = useState(() => {
  const stored = localStorage.getItem('cmsContent');
  return stored ? JSON.parse(stored) : initialContent;
});
```

**Nieuwe code** (gebruikt Strapi):
```typescript
import { useStrapiData, submitToStrapi } from '../hooks/useStrapiData';

function CMSAdmin() {
  const { data: pages, loading } = useStrapiData('pages', {
    populate: ['sections', 'seo']
  });
  
  // ...
}
```

#### 2. Company Settings

**Oude code**:
```typescript
const companyInfo = {
  name: 'Systeemlink',
  address: 'Planetenpark 19, 1443BS Purmerend',
  // ...
};
```

**Nieuwe code**:
```typescript
import { useCompanySettings } from '../hooks/useStrapiData';

function Footer() {
  const { data: company } = useCompanySettings();
  
  return (
    <footer>
      <p>{company?.attributes.address.street}</p>
      <p>{company?.attributes.address.postalCode} {company?.attributes.address.city}</p>
    </footer>
  );
}
```

#### 3. Form Submissions

**Oude code**:
```typescript
const handleSubmit = (data) => {
  const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
  submissions.push(data);
  localStorage.setItem('submissions', JSON.stringify(submissions));
};
```

**Nieuwe code**:
```typescript
import { submitToStrapi } from '../hooks/useStrapiData';

const handleSubmit = async (data) => {
  try {
    await submitToStrapi('form-submissions', {
      type: 'contact',
      data: data,
      metadata: {
        ip: 'client-ip',
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      },
    });
    toast.success('Formulier verzonden!');
  } catch (error) {
    toast.error('Er ging iets mis');
  }
};
```

#### 4. Page Data

**Oude code**:
```typescript
const pageData = {
  title: 'Home',
  sections: [/* ... */]
};
```

**Nieuwe code**:
```typescript
import { usePageBySlug } from '../hooks/useStrapiData';

function HomePage() {
  const { data, loading } = usePageBySlug('home');
  
  if (loading) return <Loader />;
  
  const page = data?.[0];
  
  return (
    <div>
      <h1>{page?.attributes.title}</h1>
      {/* Render sections */}
    </div>
  );
}
```

---

## 🎯 Voordelen van de Nieuwe Setup

### Voor Developers

✅ **Type-safe API** - Volledige TypeScript support  
✅ **Modern Stack** - Laatste versies van Node.js, PostgreSQL  
✅ **Better DX** - Auto-generated API, clear documentation  
✅ **Flexible** - Eenvoudig nieuwe content types toevoegen  
✅ **Testable** - Lokale SQLite database voor development  

### Voor Content Managers

✅ **Intuitive UI** - Moderne, gebruiksvriendelijke interface  
✅ **Media Library** - Geïntegreerd bestandsbeheer  
✅ **Draft/Publish** - Content workflow  
✅ **Role-based Access** - Granulaire permissies  
✅ **No Code** - Geen technische kennis vereist  

### Voor Operations

✅ **Self-hosted** - Volledige controle over data  
✅ **Scalable** - Horizontaal schaalbaar met PostgreSQL  
✅ **Secure** - API tokens, role-based access, CORS  
✅ **Backup-friendly** - Standard database backup tools  
✅ **Monitoring** - Systemd service, logs via journalctl  

---

## 📊 Environment Variables Overzicht

### React Frontend

```bash
# .env (development)
VITE_STRAPI_URL=http://localhost:1337
VITE_STRAPI_API_TOKEN=your-development-token

# .env.production (production)
VITE_STRAPI_URL=https://systeemlink.nl/backend
VITE_STRAPI_API_TOKEN=your-production-token
```

### Strapi Backend

```bash
# Development (.env)
HOST=0.0.0.0
PORT=1337
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
NODE_ENV=development
CORS_ORIGINS=http://localhost:5173

# Production (.env)
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
CORS_ORIGINS=https://systeemlink.nl,https://www.systeemlink.nl

# Secrets (both environments)
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=random-salt
ADMIN_JWT_SECRET=random-secret
TRANSFER_TOKEN_SALT=random-salt
JWT_SECRET=random-secret
```

---

## 🔐 Security Checklist

### Strapi Backend

- [ ] Strong database password gebruikt
- [ ] Alle secrets zijn random gegenereerd
- [ ] .env bestand is niet in git
- [ ] .env heeft correcte permissions (600)
- [ ] API tokens zijn Read-only voor public endpoints
- [ ] Admin JWT secret is sterk
- [ ] CORS is correct geconfigureerd
- [ ] Public permissions zijn beperkt tot noodzakelijke endpoints
- [ ] Admin password is sterk (min 12 karakters)
- [ ] 2FA enabled voor admin account (optioneel)

### Server

- [ ] SSH key authentication enabled
- [ ] Firewall configured (UFW/iptables)
- [ ] SSL certificate actief (Let's Encrypt)
- [ ] Database alleen toegankelijk via localhost
- [ ] Regular security updates enabled
- [ ] Backups worden encrypted opgeslagen
- [ ] Log retention policy ingesteld

### React Frontend

- [ ] API token niet in client-side code
- [ ] Environment variables correct gebruikt
- [ ] Geen sensitive data in localStorage
- [ ] HTTPS enforced
- [ ] Content Security Policy headers
- [ ] XSS protection enabled

---

## 📱 API Response Formats

### Page Response

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Home",
        "slug": "home",
        "path": "/",
        "published": true,
        "createdAt": "2025-01-01T00:00:00.000Z",
        "updatedAt": "2025-01-01T12:00:00.000Z",
        "sections": [
          {
            "id": 1,
            "name": "Hero Section",
            "type": "hero",
            "order": 1,
            "enabled": true,
            "content": {
              "title": "Welcome",
              "subtitle": "..."
            }
          }
        ],
        "seo": {
          "id": 1,
          "metaTitle": "Home - Systeemlink",
          "metaDescription": "...",
          "keywords": "...",
          "metaRobots": "index,follow"
        }
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

### Company Settings Response

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "name": "Systeemlink",
      "tagline": "Jouw IT-partner",
      "description": "...",
      "address": {
        "id": 1,
        "street": "Planetenpark 19",
        "postalCode": "1443BS",
        "city": "Purmerend",
        "country": "Nederland"
      },
      "contact": {
        "id": 1,
        "phone": "+31 613777733",
        "email": "info@systeemlink.nl",
        "website": "https://systeemlink.nl"
      },
      "business": {
        "id": 1,
        "kvk": "88308170",
        "btw": "NL004588053B11"
      },
      "social": {
        "id": 1,
        "linkedin": "",
        "twitter": "",
        "facebook": "",
        "instagram": "",
        "youtube": ""
      }
    }
  }
}
```

---

## 🎓 Training & Onboarding

### Voor Content Managers

**Training Checklist:**
1. [ ] Login procedure (admin panel)
2. [ ] Content Manager navigatie
3. [ ] Pagina's bewerken
4. [ ] Secties toevoegen/verwijderen
5. [ ] SEO metadata invullen
6. [ ] Media uploaden
7. [ ] Draft vs Published workflow
8. [ ] Form submissions bekijken
9. [ ] Company settings bijwerken

**Training Video's** (aanmaken):
- Basis navigatie Strapi admin
- Pagina's bewerken
- Formulier inzendingen beheren
- Bedrijfsgegevens bijwerken

### Voor Developers

**Checklist:**
1. [ ] Strapi architectuur begrijpen
2. [ ] Content types schema's lezen
3. [ ] API endpoints kennen
4. [ ] useStrapiData hook gebruiken
5. [ ] Nieuwe content types aanmaken
6. [ ] Permissions configureren
7. [ ] Deployment process begrijpen
8. [ ] Backup & restore procedures

**Code Voorbeelden**:
Zie `/components/StrapiIntegration.tsx` voor praktische voorbeelden.

---

## 📈 Performance Optimizations

### Strapi Backend

```typescript
// config/api.ts
export default {
  rest: {
    defaultLimit: 25,
    maxLimit: 100,
  },
};
```

### React Frontend

```typescript
// Cache strategy
const { data, loading } = useStrapiData('company-setting', {
  // React Query toevoegen voor caching?
});

// Lazy loading
const DynamicPage = lazy(() => import('./components/DynamicPage'));
```

### Database

```sql
-- Add indexes for frequently queried fields
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_sections_order ON sections("order");
CREATE INDEX idx_form_submissions_created ON form_submissions(created_at);
```

---

## 🎯 Success Metrics

Na deployment, meet de volgende metrics:

- **API Response Time**: < 200ms average
- **Page Load Time**: < 2s (including API calls)
- **Admin Panel Load**: < 1s
- **Database Query Time**: < 50ms average
- **Uptime**: > 99.9%
- **Error Rate**: < 0.1%

**Monitoring Tools**:
- UptimeRobot voor uptime monitoring
- Google PageSpeed voor frontend performance
- Strapi admin → Settings → Application Monitoring (optioneel)

---

## ✅ Final Checklist

### Pre-Launch

- [ ] Lokale development volledig werkend
- [ ] Alle content types getest
- [ ] API permissions correct ingesteld
- [ ] React integratie werkend
- [ ] Form submissions werkend
- [ ] SEO metadata correct
- [ ] Media uploads werkend

### Launch

- [ ] Database aangemaakt in Plesk
- [ ] Strapi gedeployed naar server
- [ ] Nginx configuratie toegevoegd
- [ ] SSL certificate actief
- [ ] Health check succesvol
- [ ] Admin panel bereikbaar
- [ ] API endpoints werkend
- [ ] React production build gedeployed
- [ ] DNS correct geconfigureerd
- [ ] Backups ingesteld

### Post-Launch

- [ ] Monitoring ingesteld
- [ ] Team getraind
- [ ] Documentatie gedeeld
- [ ] Backup getest (restore test)
- [ ] Performance metrics baseline
- [ ] Incident response plan
- [ ] Support contact info

---

## 📞 Support Contact

Voor vragen over de Strapi setup:

**Development**:
- Check `/STRAPI_DEPLOYMENT_GUIDE.md` voor complete gids
- Check `/PLESK_INSTALLATION.md` voor Plesk specifieke instructies
- Check `/strapi/QUICK_START.md` voor snelle setup

**Strapi Specifiek**:
- Strapi Docs: https://docs.strapi.io
- Strapi Discord: https://discord.strapi.io

**Systeemlink**:
- Email: info@systeemlink.nl
- Tel: +31 613777733

---

**Status**: ✅ Klaar voor deployment  
**Versie**: 1.0.0  
**Datum**: 2025-01-01  
**Auteur**: Systeemlink Development Team

---

© 2025 Systeemlink. Alle rechten voorbehouden.
