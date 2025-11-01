# 🚀 Strapi Quick Reference - Systeemlink

Snelle referentie voor de belangrijkste commando's, URLs en workflows.

---

## 🌐 URLs

### Development
```
Admin Panel:    http://localhost:1337/admin
API Base:       http://localhost:1337/api
Health Check:   http://localhost:1337/_health
React Frontend: http://localhost:5173
```

### Production
```
Admin Panel:    https://systeemlink.nl/backend/admin
API Base:       https://systeemlink.nl/backend/api
Health Check:   https://systeemlink.nl/backend/_health
Frontend:       https://systeemlink.nl
```

---

## ⚡ Quick Start Commands

### Lokale Development

```bash
# Start Strapi
cd strapi
npm run develop

# Genereer secrets
npm run generate-secrets

# Health check
npm run health

# Data migratie
STRAPI_ADMIN_TOKEN=your-token npm run migrate
```

### React Frontend

```bash
# Development
npm run dev

# Production build
cd BUILD_PRODUCTION
npm run build

# Add environment variables
echo "VITE_STRAPI_URL=http://localhost:1337" >> .env
echo "VITE_STRAPI_API_TOKEN=your-token" >> .env
```

---

## 🐳 Docker Commands

```bash
cd strapi

# Start containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Rebuild containers
docker-compose up -d --build

# Remove everything (including volumes)
docker-compose down -v
```

---

## 🔧 Server Management (Plesk Deployment)

### Service Commands

```bash
# Status
sudo systemctl status strapi-systeemlink

# Start
sudo systemctl start strapi-systeemlink

# Stop
sudo systemctl stop strapi-systeemlink

# Restart
sudo systemctl restart strapi-systeemlink

# Enable auto-start
sudo systemctl enable strapi-systeemlink

# Disable auto-start
sudo systemctl disable strapi-systeemlink
```

### Logs

```bash
# Live logs (follow)
sudo journalctl -u strapi-systeemlink -f

# Last 100 lines
sudo journalctl -u strapi-systeemlink -n 100

# Last hour
sudo journalctl -u strapi-systeemlink --since "1 hour ago"

# Today
sudo journalctl -u strapi-systeemlink --since today

# Errors only
sudo journalctl -u strapi-systeemlink -p err
```

---

## 💾 Database Management

### Backup

```bash
# Manual backup
pg_dump -U systeemlink_strapi systeemlink_strapi > backup-$(date +%Y%m%d).sql

# Compressed backup
pg_dump -U systeemlink_strapi systeemlink_strapi | gzip > backup-$(date +%Y%m%d).sql.gz

# Backup with custom format (faster restore)
pg_dump -U systeemlink_strapi -Fc systeemlink_strapi > backup-$(date +%Y%m%d).dump
```

### Restore

```bash
# From SQL file
psql -U systeemlink_strapi systeemlink_strapi < backup-20250101.sql

# From compressed SQL
gunzip < backup-20250101.sql.gz | psql -U systeemlink_strapi systeemlink_strapi

# From custom format
pg_restore -U systeemlink_strapi -d systeemlink_strapi backup-20250101.dump
```

### Database Maintenance

```bash
# Connect to database
psql -U systeemlink_strapi -d systeemlink_strapi

# Vacuum database
VACUUM ANALYZE;

# Check database size
SELECT pg_size_pretty(pg_database_size('systeemlink_strapi'));

# List all tables
\dt

# Describe table
\d pages

# Exit
\q
```

---

## 📦 Uploads Backup

```bash
# Backup uploads
tar -czf uploads-backup-$(date +%Y%m%d).tar.gz \
  /var/www/vhosts/systeemlink.nl/backend/public/uploads

# Restore uploads
tar -xzf uploads-backup-20250101.tar.gz \
  -C /var/www/vhosts/systeemlink.nl/backend/public/

# Sync uploads to remote backup
rsync -avz /var/www/vhosts/systeemlink.nl/backend/public/uploads/ \
  backup-server:/backups/systeemlink/uploads/
```

---

## 🔄 Updates

### Strapi Updates

```bash
cd /var/www/vhosts/systeemlink.nl/backend

# Backup first!
pg_dump -U systeemlink_strapi systeemlink_strapi > pre-update-backup.sql

# Check for updates
npm outdated

# Update all packages
npm update

# Or update specific package
npm update @strapi/strapi

# Rebuild
npm run build

# Restart
sudo systemctl restart strapi-systeemlink

# Test
curl https://systeemlink.nl/backend/_health
```

### Security Updates

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Force fix (breaking changes possible)
npm audit fix --force
```

---

## 🔍 Debugging

### Check Port Usage

```bash
# Check if port 1337 is in use
sudo lsof -i :1337

# Check which ports are listening
sudo netstat -tulpn | grep LISTEN

# Kill process on port 1337
sudo kill -9 $(lsof -t -i:1337)
```

### Test API Endpoints

```bash
# Health check
curl https://systeemlink.nl/backend/_health

# Get all pages
curl https://systeemlink.nl/backend/api/pages

# Get page with token
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://systeemlink.nl/backend/api/pages

# Create form submission
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"data":{"type":"contact","data":{"name":"Test"}}}' \
  https://systeemlink.nl/backend/api/form-submissions
```

### Test Database Connection

```bash
# Test PostgreSQL connection
psql -U systeemlink_strapi -d systeemlink_strapi -h localhost

# If fails, check:
# 1. Is PostgreSQL running?
sudo systemctl status postgresql

# 2. Is password correct?
cat /var/www/vhosts/systeemlink.nl/backend/.env | grep DATABASE_PASSWORD

# 3. Can user connect?
sudo -u postgres psql
\du  # List users
\l   # List databases
```

### Check Disk Space

```bash
# Disk usage
df -h

# Database size
du -sh /var/lib/postgresql/

# Strapi size
du -sh /var/www/vhosts/systeemlink.nl/backend/

# Uploads size
du -sh /var/www/vhosts/systeemlink.nl/backend/public/uploads/
```

---

## 🔐 Security

### Generate Secrets

```bash
# Single secret
openssl rand -base64 32

# All secrets at once (in Strapi directory)
npm run generate-secrets

# Or manually:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### File Permissions

```bash
cd /var/www/vhosts/systeemlink.nl/backend

# Set correct ownership
sudo chown -R systeemlink:systeemlink .

# .env should be read-only
sudo chmod 600 .env

# Check permissions
ls -la .env
# Should show: -rw------- 1 systeemlink systeemlink
```

### Firewall

```bash
# Check firewall status
sudo ufw status

# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow SSH
sudo ufw allow 22/tcp

# Enable firewall
sudo ufw enable
```

---

## 📊 Monitoring

### System Resources

```bash
# CPU and Memory
htop

# Or
top

# Strapi process info
ps aux | grep strapi

# Memory usage
free -h

# Disk I/O
iostat
```

### Database Monitoring

```bash
# Active connections
psql -U systeemlink_strapi -c "SELECT count(*) FROM pg_stat_activity;"

# Slow queries
psql -U systeemlink_strapi -c "
  SELECT pid, now() - query_start as duration, query
  FROM pg_stat_activity
  WHERE state = 'active' AND now() - query_start > interval '5 seconds';
"

# Database stats
psql -U systeemlink_strapi -c "
  SELECT schemaname, tablename, n_tup_ins, n_tup_upd, n_tup_del
  FROM pg_stat_user_tables
  ORDER BY n_tup_ins + n_tup_upd + n_tup_del DESC
  LIMIT 10;
"
```

---

## 🎯 Common Workflows

### Add New Content Type

```bash
# 1. Create schema file
nano /var/www/vhosts/systeemlink.nl/backend/src/api/my-content/content-types/my-content/schema.json

# 2. Rebuild
npm run build

# 3. Restart
sudo systemctl restart strapi-systeemlink

# 4. Configure permissions in admin panel
# Settings → Users & Permissions → Public → Enable permissions
```

### Deploy Updates

```bash
# 1. Backup database
pg_dump -U systeemlink_strapi systeemlink_strapi > backup-pre-deploy.sql

# 2. Pull latest code
cd /var/www/vhosts/systeemlink.nl/backend
git pull origin main

# 3. Install dependencies
npm install

# 4. Build
npm run build

# 5. Restart
sudo systemctl restart strapi-systeemlink

# 6. Test
curl https://systeemlink.nl/backend/_health

# 7. If issues, rollback:
# sudo systemctl stop strapi-systeemlink
# psql -U systeemlink_strapi systeemlink_strapi < backup-pre-deploy.sql
# git reset --hard HEAD~1
# npm run build
# sudo systemctl start strapi-systeemlink
```

### Migrate Data from Old System

```bash
# 1. Ensure Strapi is running
systemctl status strapi-systeemlink

# 2. Create full access API token in admin

# 3. Run migration
cd /var/www/vhosts/systeemlink.nl/backend
STRAPI_ADMIN_TOKEN=your-token node scripts/migrate-data.js

# 4. Verify in admin panel
# Content Manager → Check all content types
```

---

## 📝 API Examples

### React Hook Usage

```typescript
// Get all pages
const { data, loading, error } = useStrapiData('pages');

// Get page with populate
const { data } = useStrapiData('pages', {
  populate: ['sections', 'seo']
});

// Get page by slug
const { data } = useStrapiData('pages', {
  filters: { slug: { $eq: 'home' } },
  populate: ['sections']
});

// Company settings
const { data: company } = useCompanySettings();

// Submit form
await submitToStrapi('form-submissions', {
  type: 'contact',
  data: formData
});
```

### Direct API Calls

```typescript
// GET request
const response = await fetch(
  `${import.meta.env.VITE_STRAPI_URL}/api/pages`,
  {
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`
    }
  }
);

// POST request
const response = await fetch(
  `${import.meta.env.VITE_STRAPI_URL}/api/form-submissions`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`
    },
    body: JSON.stringify({ data: payload })
  }
);
```

---

## 🆘 Emergency Procedures

### Service Won't Start

```bash
# 1. Check logs
sudo journalctl -u strapi-systeemlink -n 50

# 2. Test manually
cd /var/www/vhosts/systeemlink.nl/backend
npm start

# 3. Common fixes:
# - Port in use: sudo lsof -i :1337 && kill -9 PID
# - Database: psql -U systeemlink_strapi -d systeemlink_strapi
# - Permissions: sudo chown -R systeemlink:systeemlink .
# - Rebuild: npm run build
```

### Database Connection Lost

```bash
# 1. Check PostgreSQL
sudo systemctl status postgresql

# 2. Restart PostgreSQL
sudo systemctl restart postgresql

# 3. Test connection
psql -U systeemlink_strapi -d systeemlink_strapi

# 4. Restart Strapi
sudo systemctl restart strapi-systeemlink
```

### Out of Memory

```bash
# 1. Check memory
free -h

# 2. Add swap (temporary)
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 3. Restart Strapi
sudo systemctl restart strapi-systeemlink

# 4. Make swap permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### Complete Reset (DANGER!)

```bash
# ⚠️ WARNING: This will delete ALL data!

# 1. Backup first!
pg_dump -U systeemlink_strapi systeemlink_strapi > backup-before-reset.sql
tar -czf uploads-backup.tar.gz public/uploads/

# 2. Stop service
sudo systemctl stop strapi-systeemlink

# 3. Drop and recreate database
sudo -u postgres psql
DROP DATABASE systeemlink_strapi;
CREATE DATABASE systeemlink_strapi OWNER systeemlink_strapi;
\q

# 4. Remove build artifacts
cd /var/www/vhosts/systeemlink.nl/backend
rm -rf .cache/ dist/ build/

# 5. Rebuild
npm run build

# 6. Start service
sudo systemctl start strapi-systeemlink
```

---

## 📚 Documentation Links

- **Complete Deployment Guide**: `/STRAPI_DEPLOYMENT_GUIDE.md`
- **Plesk Installation**: `/strapi/PLESK_INSTALLATION.md`
- **Quick Start**: `/strapi/QUICK_START.md`
- **Migration Summary**: `/STRAPI_MIGRATION_SUMMARY.md`
- **Strapi README**: `/strapi/README.md`

**External:**
- Strapi Docs: https://docs.strapi.io
- Strapi API: https://docs.strapi.io/dev-docs/api/rest
- PostgreSQL: https://www.postgresql.org/docs/

---

## 📞 Support

**Email**: info@systeemlink.nl  
**Tel**: +31 613777733  
**Website**: https://systeemlink.nl

---

**Quick tip**: Bookmark deze pagina voor snelle toegang tot commando's! 🔖

---

© 2025 Systeemlink. Alle rechten voorbehouden.
