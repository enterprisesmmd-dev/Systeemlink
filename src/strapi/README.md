# 🚀 Systeemlink Strapi Backend

Complete Strapi CMS backend voor de Systeemlink website met alle bewerkbare content types.

---

## 📦 Wat zit erin?

### ✅ **Content Types**

- **Pages** - Alle pagina's met secties, SEO, content
- **Sections** - Herbruikbare secties (hero, features, CTA, etc.)
- **Form Submissions** - Alle form inzendingen (IT-Check, Contact, Scans)
- **Company Settings** - Bedrijfsgegevens, contactinfo
- **Email Settings** - Email configuratie voor notificaties
- **Support Widget** - Support widget instellingen
- **Navigation** - Menu items en navigatie
- **SEO Meta** - SEO instellingen per pagina

---

## 🛠️ Quick Start

### **Option 1: Docker (Aanbevolen)**

```bash
cd strapi
docker-compose up -d
```

Strapi draait nu op: `http://localhost:1337`

### **Option 2: Lokaal**

```bash
cd strapi
npm install
npm run develop
```

---

## 🔐 Admin Toegang

**URL:** `http://localhost:1337/admin`

**Eerste keer:**
1. Maak een admin account aan
2. Ga naar Settings → Users & Permissions → Roles → Public
3. Enable read permissions voor alle content types
4. Enable create permissions voor `form-submissions`

---

## 📊 Content Types Overzicht

### **1. Page**
```typescript
{
  title: string;
  slug: string;
  path: string;
  sections: Relation[];
  seo: Component;
  published: boolean;
}
```

### **2. Section**
```typescript
{
  name: string;
  type: enum ['hero', 'slider', 'content', 'stats', 'features', 'cta', ...];
  content: JSON;
  order: number;
}
```

### **3. Form Submission**
```typescript
{
  type: enum ['it-check', 'contact', 'scan', 'general'];
  data: JSON;
  metadata: {
    ip: string;
    userAgent: string;
    referrer: string;
  };
}
```

### **4. Company Settings**
```typescript
{
  name: string;
  address: Component;
  contact: Component;
  social: Component;
  business: Component;
}
```

---

## 🌐 API Endpoints

### **Pages**
```
GET    /api/pages
GET    /api/pages/:id
POST   /api/pages
PUT    /api/pages/:id
DELETE /api/pages/:id
```

### **Form Submissions**
```
GET    /api/form-submissions
POST   /api/form-submissions
```

### **Company Settings**
```
GET    /api/company-setting
PUT    /api/company-setting
```

---

## 🔌 React Integratie

### **Setup**

```typescript
// .env
VITE_STRAPI_URL=http://localhost:1337
VITE_STRAPI_API_TOKEN=your-api-token
```

### **Gebruik**

```typescript
import { useStrapiData } from './hooks/useStrapiData';

function MyComponent() {
  const { data, loading, error } = useStrapiData('pages');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{/* render data */}</div>;
}
```

---

## 🚀 Deployment

### **Render.com**

1. **Create new Web Service**
2. **Connect Git repository**
3. **Settings:**
   ```
   Build Command: npm install && npm run build
   Start Command: npm start
   Environment: Node
   ```

4. **Environment Variables:**
   ```
   NODE_ENV=production
   DATABASE_CLIENT=postgres
   DATABASE_HOST=your-db-host
   DATABASE_PORT=5432
   DATABASE_NAME=your-db-name
   DATABASE_USERNAME=your-db-user
   DATABASE_PASSWORD=your-db-password
   JWT_SECRET=generate-random-secret
   API_TOKEN_SALT=generate-random-salt
   ADMIN_JWT_SECRET=generate-random-secret
   APP_KEYS=generate-random-keys
   ```

5. **Add PostgreSQL Database**

### **Railway.app**

```bash
railway login
railway init
railway add -p postgres
railway up
```

### **Heroku**

```bash
heroku create systeemlink-strapi
heroku addons:create heroku-postgresql:mini
git push heroku main
```

---

## 🔒 Security

### **API Tokens**

1. Settings → API Tokens → Create new API Token
2. Type: Read-Only (voor frontend)
3. Copy token en add to `.env`

### **CORS**

Edit `config/middlewares.ts`:

```typescript
export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:5173', 'https://systeemlink.nl'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
  },
  // ...
];
```

---

## 📝 Data Migratie

Migreer bestaande CMS data naar Strapi:

```bash
cd strapi
npm run migrate
```

Dit script importeert alle data uit `initialCMSContent`.

---

## 🐛 Troubleshooting

### **Port already in use**
```bash
lsof -ti:1337 | xargs kill -9
```

### **Database connection failed**
Check `.env` database credentials

### **CORS errors**
Update `config/middlewares.ts` met correct origin

---

## 📚 Documentatie

- [Strapi Docs](https://docs.strapi.io)
- [REST API](https://docs.strapi.io/dev-docs/api/rest)
- [GraphQL](https://docs.strapi.io/dev-docs/plugins/graphql)

---

## 🤝 Support

Voor vragen:
- 📧 Email: info@systeemlink.nl
- 🌐 Website: https://systeemlink.nl

---

© 2024 Systeemlink. Alle rechten voorbehouden.
