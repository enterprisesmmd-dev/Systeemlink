# 🐳 Strapi Docker Deployment Guide - Plesk

Complete gids voor het deployen van Strapi CMS via Docker op een Plesk server.

---

## 🎯 Overzicht

Deze deployment gebruikt **Docker Compose** met:
- **Strapi** container (Node.js 18 Alpine)
- **PostgreSQL 14** container (Alpine)
- **Persistent volumes** voor database en uploads
- **Nginx reverse proxy** in Plesk voor `/backend`
- **Health checks** voor beide containers
- **Auto-restart** bij crashes
- **Auto-start** bij server reboot

### Voordelen van Docker Deployment

✅ **Geïsoleerde omgeving** - Geen conflicten met andere software  
✅ **Eenvoudig te updaten** - Pull nieuwe image en rebuild  
✅ **Consistent** - Zelfde environment overal  
✅ **Schaalbaar** - Eenvoudig meerdere instances  
✅ **Portable** - Verplaats naar andere servers  
✅ **Rollback** - Terug naar vorige versie  
✅ **Resource limits** - CPU en memory limieten  

---

## 📋 Vereisten

### Server Requirements
- **Plesk Obsidian** 18.0+
- **OS**: Linux (Ubuntu 20.04/22.04 of CentOS 7/8)
- **RAM**: Minimaal 2GB (4GB aanbevolen)
- **Disk**: Minimaal 20GB vrije ruimte
- **SSH**: Root toegang

### Software
- **Docker**: Wordt automatisch geïnstalleerd door script
- **Docker Compose**: Wordt automatisch geïnstalleerd door script

---

## 🚀 Quick Start

### Stap 1: Upload Strapi Folder

```bash
# Vanaf je lokale machine
cd /path/to/systeemlink-project

# Maak tar zonder node_modules
tar -czf strapi.tar.gz strapi/ --exclude=strapi/node_modules --exclude=strapi/.tmp

# Upload naar server
scp strapi.tar.gz root@your-server:/tmp/

# Of gebruik FileZilla/WinSCP
```

### Stap 2: Extract op Server

```bash
# SSH naar server
ssh root@your-server

# Extract
cd /tmp
tar -xzf strapi.tar.gz
```

### Stap 3: Run Deployment Script

```bash
cd /tmp/strapi

# Maak executable
chmod +x deploy-plesk-docker.sh

# Run deployment
./deploy-plesk-docker.sh
```

Het script zal:
1. ✅ Docker & Docker Compose installeren (indien nodig)
2. ✅ Directory setup
3. ✅ Environment variabelen genereren
4. ✅ Docker images bouwen
5. ✅ Containers starten
6. ✅ Health checks uitvoeren
7. ✅ Nginx config genereren
8. ✅ Auto-start configureren
9. ✅ Backup script aanmaken

### Stap 4: Nginx Configuratie Toevoegen

**In Plesk:**

1. Log in op Plesk
2. Ga naar **Websites & Domains** → **systeemlink.nl**
3. Klik op **Apache & nginx Settings**
4. Scroll naar **"Additional nginx directives"**
5. Plak de configuratie uit `/var/www/vhosts/systeemlink.nl/strapi/nginx-strapi.conf`
6. Klik op **OK**

**Via Command Line:**

```bash
# Kopieer config
cat /var/www/vhosts/systeemlink.nl/strapi/nginx-strapi.conf
```

### Stap 5: Verifieer Deployment

```bash
# Check containers
docker-compose ps

# Verwachte output:
# NAME                     STATUS    PORTS
# systeemlink-strapi       Up        0.0.0.0:1337->1337/tcp
# systeemlink-postgres     Up        5432/tcp

# Check health
curl http://localhost:1337/_health
# Verwacht: {"status":"ok"}

# Check logs
docker-compose logs strapi
docker-compose logs strapiDB
```

### Stap 6: Configureer Strapi Admin

1. Open `https://systeemlink.nl/backend/admin`
2. Maak admin account aan
3. Configureer permissions (zie PLESK_INSTALLATION.md)
4. Maak API token aan
5. Vul Company Settings in

---

## 🐳 Docker Commands

### Container Management

```bash
# Ga naar Strapi directory
cd /var/www/vhosts/systeemlink.nl/strapi

# Start containers
docker-compose start

# Stop containers
docker-compose stop

# Restart containers
docker-compose restart

# Restart alleen Strapi
docker-compose restart strapi

# Stop en verwijder containers
docker-compose down

# Stop en verwijder containers + volumes (DANGER!)
docker-compose down -v

# Start in background
docker-compose up -d

# Start in foreground (voor debugging)
docker-compose up
```

### Logs

```bash
# Live logs (alle containers)
docker-compose logs -f

# Live logs (alleen Strapi)
docker-compose logs -f strapi

# Live logs (alleen database)
docker-compose logs -f strapiDB

# Laatste 100 regels
docker-compose logs --tail=100 strapi

# Logs sinds 1 uur geleden
docker-compose logs --since 1h strapi

# Logs met timestamps
docker-compose logs -f -t strapi
```

### Status & Info

```bash
# Container status
docker-compose ps

# Gedetailleerde info
docker ps -a

# Resource usage
docker stats

# Inspect container
docker inspect systeemlink-strapi

# Exec in container
docker exec -it systeemlink-strapi sh

# Check environment variables
docker exec systeemlink-strapi env
```

### Images

```bash
# List images
docker images

# Remove unused images
docker image prune -a

# Rebuild without cache
docker-compose build --no-cache

# Pull latest base images
docker-compose pull
```

### Volumes

```bash
# List volumes
docker volume ls

# Inspect volume
docker volume inspect strapi_strapi-data

# Backup uploads volume
docker run --rm --volumes-from systeemlink-strapi \
  -v $(pwd):/backup alpine \
  tar czf /backup/uploads-backup.tar.gz /opt/app/public/uploads

# Restore uploads volume
docker run --rm --volumes-from systeemlink-strapi \
  -v $(pwd):/backup alpine \
  tar xzf /backup/uploads-backup.tar.gz -C /
```

---

## 🔄 Updates

### Strapi Updates

```bash
cd /var/www/vhosts/systeemlink.nl/strapi

# 1. Backup eerst!
./backup-strapi.sh

# 2. Pull latest code (als je git gebruikt)
git pull

# 3. Update package.json versie
nano package.json
# Bijvoorbeeld: "@strapi/strapi": "4.26.0"

# 4. Rebuild containers
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# 5. Check logs
docker-compose logs -f strapi

# 6. Test
curl http://localhost:1337/_health
```

### Node.js Version Update

```bash
# Update Dockerfile
nano Dockerfile

# Wijzig eerste regel:
FROM node:20-alpine  # Was: node:18-alpine

# Rebuild
docker-compose build --no-cache
docker-compose up -d
```

### PostgreSQL Update

```bash
# 1. BACKUP DATABASE EERST!
docker exec systeemlink-postgres pg_dump -U strapi systeemlink_strapi > backup.sql

# 2. Update docker-compose.yml
nano docker-compose.yml

# Wijzig image:
image: postgres:15-alpine  # Was: postgres:14-alpine

# 3. Stop containers
docker-compose down

# 4. Start met nieuwe versie
docker-compose up -d

# Postgres zal automatisch upgraden
```

---

## 💾 Backup & Restore

### Automatische Backup

Het deployment script maakt een backup script aan: `/var/www/vhosts/systeemlink.nl/strapi/backup-strapi.sh`

```bash
# Manual run
cd /var/www/vhosts/systeemlink.nl/strapi
./backup-strapi.sh
```

**Cron Setup voor Dagelijkse Backup:**

```bash
# Edit crontab
sudo crontab -e

# Voeg toe (dagelijks om 2:00 AM):
0 2 * * * /var/www/vhosts/systeemlink.nl/strapi/backup-strapi.sh
```

### Database Backup

```bash
# Backup
docker exec systeemlink-postgres pg_dump -U strapi systeemlink_strapi | gzip > backup-$(date +%Y%m%d).sql.gz

# Restore
gunzip < backup-20250101.sql.gz | docker exec -i systeemlink-postgres psql -U strapi systeemlink_strapi

# Copy backup out of container
docker cp systeemlink-postgres:/backup/db.sql ./db-backup.sql
```

### Uploads Backup

```bash
# Backup uploads volume
docker run --rm --volumes-from systeemlink-strapi \
  -v /backup:/backup alpine \
  tar czf /backup/uploads-$(date +%Y%m%d).tar.gz /opt/app/public/uploads

# Restore uploads volume
docker run --rm --volumes-from systeemlink-strapi \
  -v /backup:/backup alpine \
  tar xzf /backup/uploads-20250101.tar.gz -C /
```

### Complete Backup

```bash
#!/bin/bash
# complete-backup.sh

BACKUP_DIR="/backup/strapi"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p ${BACKUP_DIR}

# Database
docker exec systeemlink-postgres pg_dump -U strapi systeemlink_strapi | \
  gzip > ${BACKUP_DIR}/db-${DATE}.sql.gz

# Uploads
docker run --rm --volumes-from systeemlink-strapi \
  -v ${BACKUP_DIR}:/backup alpine \
  tar czf /backup/uploads-${DATE}.tar.gz /opt/app/public/uploads

# Environment
cp /var/www/vhosts/systeemlink.nl/strapi/.env ${BACKUP_DIR}/env-${DATE}.txt

# Docker Compose
cp /var/www/vhosts/systeemlink.nl/strapi/docker-compose.yml ${BACKUP_DIR}/

echo "Backup completed: ${BACKUP_DIR}"
```

---

## 🔧 Configuration

### Environment Variables

Edit `.env` in Strapi directory:

```bash
cd /var/www/vhosts/systeemlink.nl/strapi
nano .env
```

Na wijzigingen:

```bash
docker-compose restart strapi
```

### Resource Limits

Edit `docker-compose.yml`:

```yaml
services:
  strapi:
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 2G
        reservations:
          cpus: '1.0'
          memory: 1G
```

Apply:

```bash
docker-compose down
docker-compose up -d
```

### Custom Domain/Port

```bash
# Edit .env
nano .env

# Change:
PUBLIC_URL=https://cms.systeemlink.nl
STRAPI_PORT=3000

# Update docker-compose.yml ports
nano docker-compose.yml

# Change:
ports:
  - "3000:1337"

# Restart
docker-compose down
docker-compose up -d
```

---

## 🐛 Troubleshooting

### Containers Starten Niet

```bash
# Check logs
docker-compose logs

# Check specific container
docker-compose logs strapi

# Common issues:

# 1. Port already in use
sudo lsof -i :1337
# Kill process: sudo kill -9 PID

# 2. Permission issues
sudo chown -R 1000:1000 /var/www/vhosts/systeemlink.nl/strapi

# 3. Rebuild from scratch
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

### Database Connection Failed

```bash
# Check database logs
docker-compose logs strapiDB

# Test database connection
docker exec -it systeemlink-postgres psql -U strapi -d systeemlink_strapi

# Check database password in .env
cat .env | grep DATABASE_PASSWORD

# Restart database
docker-compose restart strapiDB
```

### Strapi Build Fails

```bash
# Check logs
docker-compose logs strapi

# Common causes:

# 1. Out of memory
free -h
# Add swap if needed (see STRAPI_DEPLOYMENT_GUIDE.md)

# 2. Network issues during build
docker-compose build --no-cache

# 3. Corrupted node_modules
docker-compose down
docker volume prune
docker-compose build --no-cache
docker-compose up -d
```

### 502 Bad Gateway

```bash
# 1. Check if Strapi container is running
docker-compose ps

# 2. Check Strapi logs
docker-compose logs strapi

# 3. Check health endpoint
docker exec systeemlink-strapi wget --spider -q http://localhost:1337/_health

# 4. Restart Strapi
docker-compose restart strapi

# 5. Check Nginx config in Plesk
# Verify reverse proxy is correctly configured
```

### Permission Errors

```bash
# Fix ownership
sudo chown -R 1000:1000 /var/www/vhosts/systeemlink.nl/strapi

# Fix .env permissions
chmod 600 /var/www/vhosts/systeemlink.nl/strapi/.env

# Restart
docker-compose restart
```

### High Memory Usage

```bash
# Check memory usage
docker stats

# Add memory limits to docker-compose.yml
services:
  strapi:
    mem_limit: 1g
    memswap_limit: 2g

# Restart
docker-compose down
docker-compose up -d
```

### Container Keeps Restarting

```bash
# Check why it's restarting
docker-compose logs --tail=100 strapi

# Check exit code
docker ps -a

# Remove restart policy temporarily for debugging
docker-compose down
# Edit docker-compose.yml: restart: "no"
docker-compose up

# Watch logs in real-time
```

---

## 📊 Monitoring

### Container Health

```bash
# Check health status
docker inspect systeemlink-strapi | grep -A 20 Health

# Watch health checks
watch -n 5 'docker inspect systeemlink-strapi | grep -A 5 Health'
```

### Resource Monitoring

```bash
# Real-time stats
docker stats

# Disk usage
docker system df

# Detailed disk usage
docker system df -v
```

### Logs Monitoring

```bash
# Setup log rotation
# Docker automatically rotates logs

# Check log size
docker inspect systeemlink-strapi | grep LogPath
du -h $(docker inspect systeemlink-strapi | grep LogPath | cut -d'"' -f4)
```

### External Monitoring

**Setup UptimeRobot:**
- Monitor URL: `https://systeemlink.nl/backend/_health`
- Expected response: `{"status":"ok"}`
- Alert on: Down, Response time > 2000ms

**Setup Healthchecks.io:**
```bash
# Add to cron
*/5 * * * * curl -fsS --retry 3 https://hc-ping.com/your-uuid-here > /dev/null
```

---

## 🔐 Security

### Container Security

```bash
# Run as non-root user (already configured in Dockerfile)
USER node

# Scan for vulnerabilities
docker scan systeemlink/strapi:latest

# Update base images regularly
docker-compose pull
docker-compose up -d
```

### Network Security

```bash
# Containers only accessible via localhost
# Exposed through Nginx reverse proxy

# Check open ports
sudo netstat -tulpn | grep docker

# Firewall rules (containers use internal network)
# No additional rules needed
```

### Secrets Management

```bash
# .env file permissions
chmod 600 .env

# Never commit .env to git
# Already in .gitignore

# Rotate secrets periodically
cd /var/www/vhosts/systeemlink.nl/strapi
npm run generate-secrets
# Copy new secrets to .env
docker-compose restart strapi
```

---

## 🚀 Performance Optimization

### Enable Caching

Add to Nginx config:

```nginx
# Cache API responses
location /backend/api/ {
    proxy_cache_path /tmp/nginx_cache levels=1:2 keys_zone=api_cache:10m max_size=100m inactive=60m;
    proxy_cache api_cache;
    proxy_cache_valid 200 5m;
    proxy_cache_key "$scheme$request_method$host$request_uri";
}
```

### Database Connection Pooling

Edit `config/database.ts`:

```typescript
pool: {
  min: 2,
  max: 10,
  acquireTimeoutMillis: 30000,
  idleTimeoutMillis: 30000,
}
```

### Optimize Docker Images

```bash
# Multi-stage builds (already implemented)
# Use Alpine images (already implemented)
# Minimize layers in Dockerfile

# Clean up build cache periodically
docker builder prune
```

---

## 📚 Additional Resources

- **Docker Docs**: https://docs.docker.com
- **Docker Compose**: https://docs.docker.com/compose/
- **Strapi Docker**: https://docs.strapi.io/dev-docs/installation/docker
- **PostgreSQL Docker**: https://hub.docker.com/_/postgres

---

## ✅ Checklist

### Pre-Deployment
- [ ] Server heeft genoeg resources (2GB+ RAM)
- [ ] Plesk is geïnstalleerd en toegankelijk
- [ ] SSH toegang werkt
- [ ] Strapi folder is geüpload naar /tmp/strapi

### Deployment
- [ ] deploy-plesk-docker.sh succesvol uitgevoerd
- [ ] Docker containers draaien (docker-compose ps)
- [ ] Health check OK (curl localhost:1337/_health)
- [ ] Nginx configuratie toegevoegd in Plesk
- [ ] Strapi admin bereikbaar via /backend/admin

### Post-Deployment
- [ ] Admin account aangemaakt
- [ ] API token aangemaakt
- [ ] Permissions geconfigureerd
- [ ] Company settings ingevuld
- [ ] React frontend configuratie bijgewerkt
- [ ] Backup script getest
- [ ] Auto-start getest (server reboot)
- [ ] Monitoring ingesteld

---

## 📞 Support

**Systeemlink:**
- Email: info@systeemlink.nl
- Tel: +31 613777733

**Docker Community:**
- Forum: https://forums.docker.com
- Stack Overflow: https://stackoverflow.com/questions/tagged/docker

---

**Status**: ✅ Production Ready  
**Version**: 1.0.0  
**Last Updated**: 2025-01-01

© 2025 Systeemlink. Alle rechten voorbehouden.
