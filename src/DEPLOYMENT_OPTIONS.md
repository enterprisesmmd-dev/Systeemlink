# 🚀 Strapi Deployment Opties - Systeemlink

Kies de deployment methode die het beste bij jouw situatie past.

---

## 📊 Vergelijking

| Feature | Docker (Aanbevolen) | Native | Docker Compose |
|---------|---------------------|--------|----------------|
| **Setup tijd** | ⚡⚡⚡ 10-15 min | ⚡⚡ 20-30 min | ⚡⚡⚡ 10-15 min |
| **Isolatie** | ✅ Volledig | ❌ Gedeeld | ✅ Volledig |
| **Updates** | ✅ Eenvoudig | ⚠️ Handmatig | ✅ Eenvoudig |
| **Rollback** | ✅ Snel | ❌ Moeilijk | ✅ Snel |
| **Resources** | 📊 Matig | 📊 Laag | 📊 Matig |
| **Portability** | ✅ Hoog | ❌ Laag | ✅ Hoog |
| **Best voor** | Production | Development | CI/CD |

---

## 🐳 Optie 1: Docker Deployment (AANBEVOLEN)

### ✅ Wanneer Gebruiken?
- Production deployment op Plesk
- Je wilt eenvoudig updaten en rollback
- Je hebt Docker kennis
- Je wilt resource isolatie

### 🚀 Quick Start

```bash
# Upload en extract
scp strapi.tar.gz root@server:/tmp/
ssh root@server
cd /tmp && tar -xzf strapi.tar.gz

# Deploy met één commando
cd strapi
./deploy-plesk-docker.sh
```

### 📚 Documentatie
- **Quick Start**: `/DOCKER_QUICK_START.md`
- **Complete Gids**: `/strapi/DOCKER_DEPLOYMENT.md`

### 🎯 Voordelen
- ✅ Geïsoleerde containers
- ✅ Automatische health checks
- ✅ Eenvoudig updaten (`docker-compose pull`)
- ✅ Rollback in seconden
- ✅ Consistent tussen environments
- ✅ Resource limits mogelijk

### ⚠️ Nadelen
- Vereist Docker kennis
- Iets meer overhead (minimal)
- Docker moet geïnstalleerd zijn

---

## 🖥️ Optie 2: Native Deployment (Systemd)

### ✅ Wanneer Gebruiken?
- Je wilt geen Docker gebruiken
- Maximale performance (minimal overhead)
- Je hebt Node.js en PostgreSQL al draaien

### 🚀 Quick Start

```bash
# Upload en extract
scp strapi.tar.gz root@server:/tmp/
ssh root@server
cd /tmp && tar -xzf strapi.tar.gz

# Deploy met systemd
cd strapi
./deploy-plesk.sh
```

### 📚 Documentatie
- **Complete Gids**: `/strapi/PLESK_INSTALLATION.md`
- **Troubleshooting**: `/STRAPI_QUICK_REFERENCE.md`

### 🎯 Voordelen
- ✅ Directe toegang tot OS
- ✅ Minimal overhead
- ✅ Eenvoudiger debugging
- ✅ Werkt op elk Linux systeem

### ⚠️ Nadelen
- Afhankelijk van OS packages
- Updates zijn complexer
- Rollback is moeilijker
- Minder geïsoleerd

---

## 🏗️ Optie 3: Docker Compose (Development)

### ✅ Wanneer Gebruiken?
- Lokale development
- Testing
- CI/CD pipelines
- Development teams

### 🚀 Quick Start

```bash
cd strapi

# Kopieer environment
cp .env.example .env
npm run generate-secrets  # Kopieer naar .env

# Start met docker-compose
docker-compose up -d

# Logs bekijken
docker-compose logs -f
```

### 📚 Documentatie
- **Quick Start**: `/strapi/QUICK_START.md`
- **Docker Compose**: `/strapi/docker-compose.yml`

### 🎯 Voordelen
- ✅ Snel opstarten
- ✅ Eenvoudig delen met team
- ✅ Consistent development environment
- ✅ Eenvoudig reset (`docker-compose down -v`)

### ⚠️ Nadelen
- Minder geschikt voor production
- Vereist Docker
- Volumes management

---

## 🎯 Aanbevelingen

### Voor Systeemlink Production

**Beste keuze: Docker Deployment (Optie 1)**

Waarom?
1. ✅ Eenvoudig te onderhouden
2. ✅ Snelle updates mogelijk
3. ✅ Rollback bij problemen
4. ✅ Geïsoleerd van andere services
5. ✅ Auto-restart bij crashes
6. ✅ Resource limits mogelijk

### Voor Development

**Beste keuze: Docker Compose (Optie 3)**

Waarom?
1. ✅ Snel opstarten
2. ✅ Eenvoudig reset
3. ✅ Consistent tussen developers
4. ✅ Eenvoudig delen

### Voor Minimale Resources

**Beste keuze: Native Deployment (Optie 2)**

Waarom?
1. ✅ Minimale overhead
2. ✅ Directe OS toegang
3. ✅ Geen extra dependencies

---

## 📋 Deployment Checklist

### Voor Alle Opties

**Pre-Deployment:**
- [ ] Server toegang (SSH)
- [ ] Plesk toegankelijk
- [ ] Strapi folder uploaded
- [ ] Database wachtwoord klaar

**Deployment:**
- [ ] Script succesvol uitgevoerd
- [ ] Containers/service draait
- [ ] Health check OK
- [ ] Nginx config toegevoegd

**Post-Deployment:**
- [ ] Admin panel bereikbaar
- [ ] Admin account aangemaakt
- [ ] API token aangemaakt
- [ ] Permissions geconfigureerd
- [ ] Company settings ingevuld
- [ ] React frontend configuratie
- [ ] Backup getest

---

## 🔄 Migratie tussen Opties

### Van Native naar Docker

```bash
# 1. Backup data
pg_dump -U systeemlink_strapi systeemlink_strapi > backup.sql
tar -czf uploads.tar.gz /var/www/vhosts/systeemlink.nl/backend/public/uploads

# 2. Stop native service
sudo systemctl stop strapi-systeemlink
sudo systemctl disable strapi-systeemlink

# 3. Deploy Docker
./deploy-plesk-docker.sh

# 4. Restore data
gunzip < backup.sql.gz | docker exec -i systeemlink-postgres psql -U strapi systeemlink_strapi
docker cp uploads.tar.gz systeemlink-strapi:/tmp/
docker exec systeemlink-strapi tar -xzf /tmp/uploads.tar.gz -C /opt/app/public/
```

### Van Docker naar Native

```bash
# 1. Backup Docker volumes
./backup-strapi.sh

# 2. Stop Docker containers
docker-compose down

# 3. Deploy native
./deploy-plesk.sh

# 4. Restore data
psql -U systeemlink_strapi systeemlink_strapi < backup.sql
tar -xzf uploads.tar.gz -C /var/www/vhosts/systeemlink.nl/backend/public/
```

---

## 🛠️ Handige Commands

### Docker Deployment

```bash
# Locatie
cd /var/www/vhosts/systeemlink.nl/strapi

# Status
docker-compose ps

# Logs
docker-compose logs -f strapi

# Restart
docker-compose restart

# Backup
./backup-strapi.sh

# Update
docker-compose pull
docker-compose up -d
```

### Native Deployment

```bash
# Locatie
cd /var/www/vhosts/systeemlink.nl/backend

# Status
sudo systemctl status strapi-systeemlink

# Logs
sudo journalctl -u strapi-systeemlink -f

# Restart
sudo systemctl restart strapi-systeemlink

# Update
npm install
npm run build
sudo systemctl restart strapi-systeemlink
```

---

## 💡 Tips & Best Practices

### Algemeen

1. **Altijd backup maken** voor updates
2. **Test updates** eerst lokaal/staging
3. **Monitor resources** (CPU, memory, disk)
4. **Setup automated backups** (cron)
5. **Document wijzigingen** in CHANGELOG

### Docker Specifiek

1. **Tag images** voor versie beheer
2. **Gebruik .env** voor configuratie
3. **Cleanup oude images** regelmatig
4. **Monitor disk usage** (volumes)
5. **Setup log rotation**

### Native Specifiek

1. **Update OS packages** regelmatig
2. **Monitor disk space**
3. **Setup swap** voor builds
4. **Document dependencies**
5. **Version pin** in package.json

---

## 📞 Support

**Deployment Problemen?**

1. Check relevante documentatie:
   - Docker: `/strapi/DOCKER_DEPLOYMENT.md`
   - Native: `/strapi/PLESK_INSTALLATION.md`
   - Quick Ref: `/STRAPI_QUICK_REFERENCE.md`

2. Check logs:
   - Docker: `docker-compose logs`
   - Native: `journalctl -u strapi-systeemlink`

3. Contact support:
   - Email: info@systeemlink.nl
   - Tel: +31 613777733

---

## 🎓 Leer Meer

### Docker
- **Docker Basics**: https://docs.docker.com/get-started/
- **Docker Compose**: https://docs.docker.com/compose/
- **Best Practices**: https://docs.docker.com/develop/dev-best-practices/

### Strapi
- **Strapi Docs**: https://docs.strapi.io
- **Deployment**: https://docs.strapi.io/dev-docs/deployment
- **Docker Guide**: https://docs.strapi.io/dev-docs/installation/docker

### Linux/Systemd
- **Systemd**: https://www.freedesktop.org/wiki/Software/systemd/
- **Nginx**: https://nginx.org/en/docs/
- **PostgreSQL**: https://www.postgresql.org/docs/

---

## ✅ Beslisboom

```
Wil je Docker gebruiken?
├─ JA → Heb je Docker ervaring?
│       ├─ JA → Optie 1: Docker Deployment ⭐
│       └─ NEE → Lees eerst DOCKER_DEPLOYMENT.md
│                dan Optie 1: Docker Deployment
│
└─ NEE → Wil je minimale overhead?
         ├─ JA → Optie 2: Native Deployment
         └─ NEE → Optie 1: Docker Deployment
                  (alsnog aan te raden)
```

---

**Voor Systeemlink Production: Gebruik Optie 1 (Docker Deployment)** ⭐

Start hier: `/DOCKER_QUICK_START.md`

---

© 2025 Systeemlink. Alle rechten voorbehouden.
