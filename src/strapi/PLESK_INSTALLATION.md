# 🚀 Systeemlink Strapi - Plesk Installation Guide

Complete gids voor het installeren van Strapi CMS op een Plesk server met PostgreSQL en Nginx reverse proxy op `systeemlink.nl/backend`.

---

## 📋 Vereisten

### Server Requirements
- **Plesk Obsidian** 18.0 of hoger
- **OS**: Linux (Ubuntu 20.04/22.04 of CentOS 7/8 aanbevolen)
- **RAM**: Minimaal 2GB (4GB aanbevolen)
- **Disk**: Minimaal 10GB vrije ruimte
- **SSH toegang** met sudo/root rechten

### Software Requirements
- **Node.js** 18.x of 20.x
- **PostgreSQL** 14.x of hoger
- **Nginx** (standaard in Plesk)
- **PM2** of **systemd** voor process management

---

## 🎯 Installatie Methoden

### Methode 1: Automatisch via Script (Aanbevolen)

#### Stap 1: Upload Strapi Folder
```bash
# Via SCP
scp -r strapi/ root@jouw-server:/tmp/strapi

# Of via SFTP in FileZilla/WinSCP
# Upload de hele /strapi folder naar /tmp/strapi
```

#### Stap 2: Maak Database aan in Plesk

1. Log in op **Plesk**
2. Ga naar **Databases** → **Add Database**
3. Configuratie:
   ```
   Database name: systeemlink_strapi
   Database user: systeemlink_strapi
   Password: [genereer sterk wachtwoord]
   ```
4. Klik op **OK**
5. Noteer de inloggegevens

#### Stap 3: Voer Deployment Script uit

```bash
# SSH naar server
ssh root@jouw-server

# Ga naar strapi folder
cd /tmp/strapi

# Maak script executable
chmod +x deploy-plesk.sh

# Voer script uit
./deploy-plesk.sh
```

Het script zal:
1. ✅ Controleren of alle requirements aanwezig zijn
2. ✅ Database configureren
3. ✅ Strapi installeren en builden
4. ✅ Systemd service aanmaken
5. ✅ Nginx configuratie genereren
6. ✅ Permissies en beveiliging instellen

#### Stap 4: Nginx Configuratie Toevoegen

Na het script moet je handmatig de Nginx configuratie toevoegen:

1. Log in op **Plesk**
2. Ga naar **Websites & Domains** → **systeemlink.nl**
3. Klik op **Apache & nginx Settings**
4. Scroll naar **Additional nginx directives**
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

---

### Methode 2: Handmatige Installatie

<details>
<summary>Klik hier voor handmatige installatie stappen</summary>

#### 1. Node.js Installeren

```bash
# Via NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificatie
node -v  # Should show v18.x.x
npm -v
```

#### 2. PostgreSQL Database Aanmaken

Via Plesk (zie Methode 1, Stap 2) of via command line:

```bash
# Login als postgres user
sudo -u postgres psql

# Maak database en user aan
CREATE USER systeemlink_strapi WITH PASSWORD 'jouw-wachtwoord';
CREATE DATABASE systeemlink_strapi OWNER systeemlink_strapi;
GRANT ALL PRIVILEGES ON DATABASE systeemlink_strapi TO systeemlink_strapi;
\q
```

#### 3. Strapi Installeren

```bash
# Maak directory aan
sudo mkdir -p /var/www/vhosts/systeemlink.nl/backend
cd /var/www/vhosts/systeemlink.nl/backend

# Upload en extracteer Strapi files
# (via SCP/SFTP)

# Installeer dependencies
npm install --production

# Maak .env bestand aan
nano .env
```

Kopieer inhoud van `.env.example` en vul in:
```bash
APP_KEYS=genereer-random-string-1,genereer-random-string-2,genereer-random-string-3,genereer-random-string-4
API_TOKEN_SALT=genereer-random-string
ADMIN_JWT_SECRET=genereer-random-string
TRANSFER_TOKEN_SALT=genereer-random-string
JWT_SECRET=genereer-random-string

DATABASE_PASSWORD=jouw-database-wachtwoord
```

Genereer secrets:
```bash
# Voor elk secret
openssl rand -base64 32
```

#### 4. Build Strapi

```bash
npm run build
```

#### 5. Systemd Service

```bash
sudo nano /etc/systemd/system/strapi-systeemlink.service
```

Plak:
```ini
[Unit]
Description=Systeemlink Strapi CMS
After=network.target postgresql.service

[Service]
Type=simple
User=systeemlink
WorkingDirectory=/var/www/vhosts/systeemlink.nl/backend
Environment=NODE_ENV=production
ExecStart=/usr/bin/node /var/www/vhosts/systeemlink.nl/backend/node_modules/@strapi/strapi/bin/strapi.js start
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=strapi-systeemlink

[Install]
WantedBy=multi-user.target
```

Enable en start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable strapi-systeemlink
sudo systemctl start strapi-systeemlink
sudo systemctl status strapi-systeemlink
```

#### 6. Nginx Configuratie

Zie Methode 1, Stap 4

</details>

---

## ⚙️ Strapi Configuratie

### 1. Admin Account Aanmaken

1. Ga naar `https://systeemlink.nl/backend/admin`
2. Vul het registratieformulier in:
   - **First name**: Jouw naam
   - **Email**: admin@systeemlink.nl
   - **Password**: Sterk wachtwoord (min. 8 karakters)
3. Klik op **Let's start**

### 2. API Token Aanmaken

Voor de React frontend heb je een API token nodig:

1. Log in op Strapi Admin
2. Ga naar **Settings** (⚙️) → **API Tokens**
3. Klik op **Create new API Token**
4. Configuratie:
   ```
   Name: Frontend Read-Only
   Description: Token voor React frontend
   Token duration: Unlimited
   Token type: Read-only
   ```
5. Klik op **Save**
6. **Kopieer de token** (je ziet hem maar 1 keer!)

### 3. Permissions Instellen

Public rol (voor unauthenticated requests):

1. **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. Enable de volgende permissions:

**Page**
- ✅ `find` (GET /api/pages)
- ✅ `findOne` (GET /api/pages/:id)

**Section**
- ✅ `find`
- ✅ `findOne`

**Form-submission**
- ✅ `create` (POST /api/form-submissions)

**Company-setting**
- ✅ `find`

**Email-setting**
- ✅ `find`

**Support-widget-setting**
- ✅ `find`

**Navigation-menu**
- ✅ `find`

3. Klik op **Save**

### 4. Company Settings Invullen

1. **Content Manager** → **Company Setting** (Single Type)
2. Vul alle gegevens in:

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

Social:
  LinkedIn: [optioneel]
  Twitter: [optioneel]
```

3. Klik op **Save** en **Publish**

---

## 🔌 React Frontend Integratie

### 1. Environment Variables

Update je React `.env` bestand:

```bash
# Strapi Backend
VITE_STRAPI_URL=https://systeemlink.nl/backend
VITE_STRAPI_API_TOKEN=jouw-api-token-hier
```

### 2. Strapi Hook Maken

Maak `/hooks/useStrapiData.ts`:

```typescript
import { useState, useEffect } from 'react';

interface StrapiResponse<T> {
  data: T;
  meta?: any;
}

interface UseStrapiDataReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useStrapiData<T>(
  endpoint: string,
  options?: RequestInit
): UseStrapiDataReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = `${import.meta.env.VITE_STRAPI_URL}/api/${endpoint}`;
      const token = import.meta.env.VITE_STRAPI_API_TOKEN;

      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: StrapiResponse<T> = await response.json();
      setData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      console.error('Strapi fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, loading, error, refetch: fetchData };
}

// Helper voor form submissions
export async function submitToStrapi(
  endpoint: string,
  data: any
): Promise<any> {
  const url = `${import.meta.env.VITE_STRAPI_URL}/api/${endpoint}`;
  const token = import.meta.env.VITE_STRAPI_API_TOKEN;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
```

### 3. Voorbeeld Gebruik

```typescript
import { useStrapiData, submitToStrapi } from './hooks/useStrapiData';

// Company Settings ophalen
function CompanyInfo() {
  const { data, loading, error } = useStrapiData('company-setting');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{data.attributes.name}</h1>
      <p>{data.attributes.tagline}</p>
      <p>{data.attributes.contact.phone}</p>
    </div>
  );
}

// Form submission
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
    alert('Form submitted!');
  } catch (error) {
    console.error('Submit error:', error);
  }
}
```

---

## 🔧 Service Management

### Handige Commando's

```bash
# Service status
sudo systemctl status strapi-systeemlink

# Service restart
sudo systemctl restart strapi-systeemlink

# Service stop
sudo systemctl stop strapi-systeemlink

# Service start
sudo systemctl start strapi-systeemlink

# Enable auto-start bij boot
sudo systemctl enable strapi-systeemlink

# Logs bekijken (live)
sudo journalctl -u strapi-systeemlink -f

# Logs laatste uur
sudo journalctl -u strapi-systeemlink --since "1 hour ago"

# Alle logs
sudo journalctl -u strapi-systeemlink --no-pager
```

### Health Check

```bash
# Check of Strapi draait
curl http://localhost:1337/_health

# Via public URL
curl https://systeemlink.nl/backend/_health
```

---

## 💾 Backup & Restore

### Database Backup

```bash
# Maak backup
pg_dump -U systeemlink_strapi systeemlink_strapi > backup-$(date +%Y%m%d).sql

# Met compressie
pg_dump -U systeemlink_strapi systeemlink_strapi | gzip > backup-$(date +%Y%m%d).sql.gz

# Automated backup (cron)
sudo crontab -e
# Voeg toe: Daily backup om 2:00 AM
0 2 * * * pg_dump -U systeemlink_strapi systeemlink_strapi | gzip > /backup/strapi-$(date +\%Y\%m\%d).sql.gz
```

### Database Restore

```bash
# Restore van backup
psql -U systeemlink_strapi systeemlink_strapi < backup-20250101.sql

# Van gzip backup
gunzip < backup-20250101.sql.gz | psql -U systeemlink_strapi systeemlink_strapi
```

### Uploads Backup

```bash
# Backup uploads folder
tar -czf uploads-backup-$(date +%Y%m%d).tar.gz \
  /var/www/vhosts/systeemlink.nl/backend/public/uploads

# Restore uploads
tar -xzf uploads-backup-20250101.tar.gz -C /var/www/vhosts/systeemlink.nl/backend/public/
```

---

## 🔒 Security Best Practices

### 1. Firewall

```bash
# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Status
sudo ufw status
```

### 2. SSL Certificate

SSL wordt automatisch door Plesk beheerd via Let's Encrypt.

Verifieer in Plesk:
1. **Websites & Domains** → **systeemlink.nl**
2. **SSL/TLS Certificates**
3. Zorg dat Let's Encrypt certificate actief is

### 3. Environment Variables Beveiliging

```bash
# Zorg dat .env alleen leesbaar is voor owner
chmod 600 /var/www/vhosts/systeemlink.nl/backend/.env

# Check permissies
ls -la /var/www/vhosts/systeemlink.nl/backend/.env
# Should show: -rw------- 1 systeemlink systeemlink
```

### 4. Update Strategie

```bash
# Weekly security updates
sudo apt update && sudo apt upgrade -y

# Strapi updates (test eerst op staging!)
cd /var/www/vhosts/systeemlink.nl/backend
npm update
npm audit fix
npm run build
sudo systemctl restart strapi-systeemlink
```

---

## 🐛 Troubleshooting

### Strapi Start Niet

```bash
# Check logs
sudo journalctl -u strapi-systeemlink -n 50

# Common issues:
# 1. Database connectie
psql -U systeemlink_strapi -d systeemlink_strapi -h localhost
# Als dit faalt, check DATABASE_PASSWORD in .env

# 2. Port al in gebruik
sudo lsof -i :1337
# Kill process: sudo kill -9 PID

# 3. Permissies
sudo chown -R systeemlink:systeemlink /var/www/vhosts/systeemlink.nl/backend
```

### 502 Bad Gateway

```bash
# Check of Strapi draait
sudo systemctl status strapi-systeemlink

# Check Nginx configuratie
sudo nginx -t

# Herstart Nginx
sudo systemctl restart nginx

# Check of port 1337 luistert
sudo netstat -tulpn | grep 1337
```

### CORS Errors

Update `/var/www/vhosts/systeemlink.nl/backend/config/middlewares.ts`:

```typescript
{
  name: 'strapi::cors',
  config: {
    origin: ['https://systeemlink.nl', 'https://www.systeemlink.nl', 'http://localhost:5173'],
  },
},
```

Rebuild en restart:
```bash
npm run build
sudo systemctl restart strapi-systeemlink
```

### Database Connectie Problemen

```bash
# Test database connectie
psql -U systeemlink_strapi -d systeemlink_strapi -h localhost

# Als password authentication faalt:
sudo nano /etc/postgresql/14/main/pg_hba.conf

# Zoek regel:
# local   all             all                                     peer
# Verander naar:
# local   all             all                                     md5

# Herstart PostgreSQL
sudo systemctl restart postgresql
```

### Memory Issues

```bash
# Check geheugengebruik
free -h

# Strapi gebruikt veel geheugen bij build
# Temporary swap maken:
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Permanent maken:
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

## 📊 Monitoring

### Basic Monitoring

```bash
# CPU en memory usage
htop

# Disk usage
df -h

# Strapi process info
ps aux | grep strapi

# Network connections
sudo netstat -tulpn | grep :1337
```

### Uptime Monitoring

Gebruik een service zoals:
- **UptimeRobot** (gratis)
- **Pingdom**
- **StatusCake**

Monitor URL: `https://systeemlink.nl/backend/_health`

---

## 🎯 Performance Optimization

### 1. Node.js Process Manager (PM2)

Optioneel alternatief voor systemd:

```bash
# Installeer PM2
sudo npm install -g pm2

# Start Strapi met PM2
pm2 start npm --name "strapi" -- start

# Auto-start bij reboot
pm2 startup
pm2 save

# Monitoring
pm2 monit
```

### 2. Database Optimization

```bash
# Vacuum database
sudo -u postgres vacuumdb -U systeemlink_strapi -d systeemlink_strapi -f -v -z

# Analyze queries
sudo -u postgres psql systeemlink_strapi
EXPLAIN ANALYZE SELECT * FROM pages;
```

### 3. Nginx Caching

Voeg toe aan Nginx configuratie in Plesk:

```nginx
# Cache voor static assets
location /backend/uploads/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

---

## 📚 Additional Resources

- [Strapi Documentation](https://docs.strapi.io/)
- [Plesk Documentation](https://docs.plesk.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Nginx Documentation](https://nginx.org/en/docs/)

---

## 🆘 Support

Voor hulp bij de installatie:

- **Email**: info@systeemlink.nl
- **Telefoon**: +31 613777733
- **Strapi Community**: https://discord.strapi.io

---

© 2025 Systeemlink. Alle rechten voorbehouden.
