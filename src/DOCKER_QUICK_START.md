# 🐳 Docker Quick Start - Strapi op Plesk

Snelste manier om Strapi met Docker op Plesk te deployen.

---

## ⚡ 3-Stappen Deployment

### 1️⃣ Upload

```bash
# Op je lokale machine
cd /path/to/systeemlink-project
tar -czf strapi.tar.gz strapi/ --exclude=node_modules --exclude=.tmp
scp strapi.tar.gz root@your-server:/tmp/
```

### 2️⃣ Deploy

```bash
# SSH naar server
ssh root@your-server

# Extract en deploy
cd /tmp
tar -xzf strapi.tar.gz
cd strapi
chmod +x deploy-plesk-docker.sh
./deploy-plesk-docker.sh
```

**Het script installeert alles automatisch:**
- ✅ Docker & Docker Compose (indien nodig)
- ✅ PostgreSQL container
- ✅ Strapi container
- ✅ Volumes voor persistent data
- ✅ Auto-start configuratie
- ✅ Backup script

### 3️⃣ Nginx Configureren

**In Plesk:**

1. Log in op Plesk
2. **Websites & Domains** → **systeemlink.nl** → **Apache & nginx Settings**
3. Scroll naar **"Additional nginx directives"**
4. Plak deze configuratie:

```nginx
location /backend/ {
    rewrite ^/backend/(.*)$ /$1 break;
    proxy_pass http://127.0.0.1:1337;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
    proxy_connect_timeout 600s;
    proxy_send_timeout 600s;
    proxy_read_timeout 600s;
}

location /backend/uploads/ {
    rewrite ^/backend/uploads/(.*)$ /uploads/$1 break;
    proxy_pass http://127.0.0.1:1337;
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

5. Klik op **OK**

---

## ✅ Verifieer

```bash
# Check containers
docker-compose ps

# Test health
curl http://localhost:1337/_health

# Open admin panel
https://systeemlink.nl/backend/admin
```

---

## 🎯 Dat was het!

Je hebt nu:
- ✅ Strapi draaiend in Docker
- ✅ PostgreSQL database
- ✅ Nginx reverse proxy op `/backend`
- ✅ Auto-start bij reboot
- ✅ Backup script

---

## 📚 Handige Commands

```bash
# Ga naar Strapi directory
cd /var/www/vhosts/systeemlink.nl/strapi

# Logs bekijken
docker-compose logs -f strapi

# Restart
docker-compose restart

# Stop
docker-compose stop

# Start
docker-compose start

# Backup maken
./backup-strapi.sh
```

---

## 🔧 Volgende Stappen

1. **Maak admin account** → `https://systeemlink.nl/backend/admin`
2. **Configureer permissions** → Settings → Users & Permissions → Public
3. **Maak API token** → Settings → API Tokens
4. **Update React .env**:
   ```bash
   VITE_STRAPI_URL=https://systeemlink.nl/backend
   VITE_STRAPI_API_TOKEN=your-token
   ```
5. **Vul Company Settings in** → Content Manager → Company Setting

---

## 📖 Meer Info

- **Complete Docker Gids**: `/strapi/DOCKER_DEPLOYMENT.md`
- **Troubleshooting**: `/STRAPI_QUICK_REFERENCE.md`
- **Full Deployment Guide**: `/STRAPI_DEPLOYMENT_GUIDE.md`

---

**Docker voordelen:**
- 🔒 Geïsoleerde environment
- 🔄 Eenvoudig updaten
- 📦 Portable
- ⚡ Snelle deployment
- 🛡️ Consistent overal

---

© 2025 Systeemlink
