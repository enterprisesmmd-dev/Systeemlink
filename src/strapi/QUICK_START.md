# 🚀 Quick Start - Systeemlink Strapi

Snelle setup gids voor lokale development en Plesk deployment.

---

## 🏠 Lokale Development

### Stap 1: Dependencies Installeren

```bash
cd strapi
npm install
```

### Stap 2: Environment Configureren

Kopieer `.env.example` naar `.env`:

```bash
cp .env.example .env
```

Genereer random secrets:

```bash
# Voor elk veld in .env, genereer een secret:
openssl rand -base64 32
```

Update `.env`:

```bash
# Server
HOST=0.0.0.0
PORT=1337
APP_KEYS=secret1,secret2,secret3,secret4
API_TOKEN_SALT=random-secret
ADMIN_JWT_SECRET=random-secret
TRANSFER_TOKEN_SALT=random-secret
JWT_SECRET=random-secret

# Database (SQLite voor development)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Node Environment
NODE_ENV=development
```

### Stap 3: Strapi Starten

```bash
npm run develop
```

Strapi draait nu op: http://localhost:1337

### Stap 4: Admin Account Aanmaken

1. Open http://localhost:1337/admin
2. Vul registratieformulier in
3. Klik op "Let's start"

### Stap 5: Permissions Instellen

**Settings → Users & Permissions → Roles → Public**

Enable voor alle content types:
- ✅ `find`
- ✅ `findOne`

Enable voor `form-submission`:
- ✅ `create`

Klik op **Save**

### Stap 6: API Token Aanmaken

**Settings → API Tokens → Create new API Token**

```
Name: Frontend Read-Only
Description: Token voor React frontend
Token duration: Unlimited
Token type: Read-only
```

Kopieer de token!

### Stap 7: React Frontend Configureren

Update React `.env` bestand:

```bash
VITE_STRAPI_URL=http://localhost:1337
VITE_STRAPI_API_TOKEN=your-token-here
```

### Stap 8: Data Migreren (Optioneel)

Als je bestaande CMS data hebt:

```bash
# Zorg dat Strapi draait
npm run develop

# In een nieuw terminal venster:
STRAPI_ADMIN_TOKEN=your-admin-token node scripts/migrate-data.js
```

---

## 🌐 Plesk Deployment

### Voor Deployment

1. **Database**: Maak PostgreSQL database aan in Plesk
2. **SSH**: Zorg dat je SSH toegang hebt
3. **Node.js**: Installeer Node.js 18+ via Plesk

### Deployment

```bash
# Upload strapi folder naar server
scp -r strapi/ root@your-server:/tmp/strapi

# SSH naar server
ssh root@your-server

# Ga naar strapi folder
cd /tmp/strapi

# Maak script executable
chmod +x deploy-plesk.sh

# Voer deployment uit
./deploy-plesk.sh
```

Volg de instructies in het script!

Zie **PLESK_INSTALLATION.md** voor gedetailleerde instructies.

---

## 🔌 React Integratie

### Basic Usage

```typescript
import { useStrapiData } from './hooks/useStrapiData';

function MyComponent() {
  const { data, loading, error } = useStrapiData('pages');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{JSON.stringify(data)}</div>;
}
```

### Company Settings

```typescript
import { useCompanySettings } from './hooks/useStrapiData';

function Footer() {
  const { data: company } = useCompanySettings();
  
  return (
    <footer>
      <p>{company?.attributes.contact.phone}</p>
      <p>{company?.attributes.address.street}</p>
    </footer>
  );
}
```

### Form Submission

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
      },
    });
    alert('Form submitted successfully!');
  } catch (error) {
    console.error('Submit error:', error);
    alert('Failed to submit form');
  }
}
```

### Page by Slug

```typescript
import { usePageBySlug } from './hooks/useStrapiData';

function DynamicPage({ slug }: { slug: string }) {
  const { data: page, loading } = usePageBySlug(slug);
  
  if (loading) return <div>Loading...</div>;
  if (!page) return <div>Page not found</div>;
  
  return (
    <div>
      <h1>{page.attributes.title}</h1>
      {/* Render sections */}
    </div>
  );
}
```

---

## 📚 Content Types

### Page

```json
{
  "title": "Home",
  "slug": "home",
  "path": "/",
  "sections": [1, 2, 3],
  "seo": {
    "metaTitle": "Home - Systeemlink",
    "metaDescription": "..."
  },
  "published": true
}
```

### Section

```json
{
  "name": "Hero Section",
  "type": "hero",
  "order": 1,
  "enabled": true,
  "content": {
    "title": "Welcome",
    "subtitle": "...",
    "buttonText": "Learn More",
    "buttonLink": "/about"
  }
}
```

### Form Submission

```json
{
  "type": "contact",
  "data": {
    "name": "Jan",
    "email": "jan@example.com",
    "message": "..."
  },
  "metadata": {
    "ip": "127.0.0.1",
    "userAgent": "...",
    "referrer": "..."
  },
  "status": "new",
  "read": false
}
```

---

## 🛠️ Handige Commando's

```bash
# Development mode
npm run develop

# Production build
npm run build

# Production start
npm start

# View logs (Plesk deployment)
sudo journalctl -u strapi-systeemlink -f

# Restart service (Plesk)
sudo systemctl restart strapi-systeemlink

# Database backup
pg_dump -U systeemlink_strapi systeemlink_strapi > backup.sql

# Health check
curl http://localhost:1337/_health
```

---

## 🔍 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/pages` | GET | Alle pagina's |
| `/api/pages/:id` | GET | Enkele pagina |
| `/api/sections` | GET | Alle secties |
| `/api/company-setting` | GET | Bedrijfsinstellingen |
| `/api/form-submissions` | GET | Alle formulier inzendingen |
| `/api/form-submissions` | POST | Nieuwe inzending |
| `/api/email-setting` | GET | Email instellingen |
| `/api/support-widget-setting` | GET | Widget instellingen |
| `/api/navigation-menus` | GET | Navigatie menu's |

---

## 🐛 Troubleshooting

### Strapi start niet

```bash
# Check logs
npm run develop

# Check port
lsof -i :1337

# Kill process
kill -9 PID
```

### Database connectie faalt

```bash
# Test connectie
psql -U systeemlink_strapi -d systeemlink_strapi -h localhost

# Check .env settings
cat .env | grep DATABASE
```

### CORS errors

Update `config/middlewares.ts`:

```typescript
{
  name: 'strapi::cors',
  config: {
    origin: ['http://localhost:5173', 'https://systeemlink.nl'],
  },
}
```

### API returns 403

1. Check API Token
2. Check Public permissions
3. Check token in Authorization header

---

## 📞 Support

- **Email**: info@systeemlink.nl
- **Tel**: +31 613777733
- **Strapi Docs**: https://docs.strapi.io

---

Veel succes! 🚀
