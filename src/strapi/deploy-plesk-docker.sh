#!/bin/bash

###############################################################################
# Systeemlink Strapi Docker Deployment Script voor Plesk Server
# 
# Dit script installeert en configureert Strapi CMS via Docker Compose
# op een Plesk server met Nginx reverse proxy op /backend subdirectory
#
# Vereisten:
# - Plesk Obsidian (18.0+)
# - Docker & Docker Compose geïnstalleerd
# - SSH toegang tot server
#
# Gebruik:
#   chmod +x deploy-plesk-docker.sh
#   ./deploy-plesk-docker.sh
###############################################################################

set -e  # Stop bij errors

# Kleuren voor output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
cat << "EOF"
╔════════════════════════════════════════════════════════════╗
║    Systeemlink Strapi Docker Deployment voor Plesk        ║
║              systeemlink.nl/backend                        ║
╚════════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"

###############################################################################
# CONFIGURATIE
###############################################################################

DOMAIN="${DOMAIN:-systeemlink.nl}"
STRAPI_DIR="${STRAPI_DIR:-/var/www/vhosts/${DOMAIN}/strapi}"
STRAPI_PORT="${STRAPI_PORT:-1337}"
DB_PASSWORD="${DB_PASSWORD}"

###############################################################################
# FUNCTIES
###############################################################################

print_step() {
    echo -e "\n${GREEN}▶ $1${NC}\n"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ ERROR: $1${NC}"
    exit 1
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_info() {
    echo -e "${CYAN}ℹ $1${NC}"
}

check_root() {
    if [ "$EUID" -ne 0 ]; then 
        print_error "Dit script moet als root worden uitgevoerd. Gebruik: sudo ./deploy-plesk-docker.sh"
    fi
}

###############################################################################
# STAP 1: PRE-FLIGHT CHECKS
###############################################################################

print_step "Stap 1: Pre-flight checks"

check_root

# Check Plesk
if ! command -v plesk &> /dev/null; then
    print_error "Plesk is niet gevonden op deze server"
fi
print_success "Plesk is geïnstalleerd"

# Check domein
if [ ! -d "/var/www/vhosts/${DOMAIN}" ]; then
    print_error "Domein ${DOMAIN} is niet gevonden in Plesk"
fi
print_success "Domein ${DOMAIN} gevonden"

# Check Docker
if ! command -v docker &> /dev/null; then
    print_warning "Docker is niet geïnstalleerd. Installeren..."
    
    # Installeer Docker
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    
    systemctl start docker
    systemctl enable docker
    print_success "Docker geïnstalleerd"
else
    DOCKER_VERSION=$(docker --version)
    print_success "Docker is geïnstalleerd: ${DOCKER_VERSION}"
fi

# Check Docker Compose
if ! command -v docker-compose &> /dev/null; then
    print_warning "Docker Compose is niet geïnstalleerd. Installeren..."
    
    # Installeer Docker Compose
    COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep 'tag_name' | cut -d\" -f4)
    curl -L "https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    
    print_success "Docker Compose geïnstalleerd"
else
    COMPOSE_VERSION=$(docker-compose --version)
    print_success "Docker Compose is geïnstalleerd: ${COMPOSE_VERSION}"
fi

###############################################################################
# STAP 2: DIRECTORY SETUP
###############################################################################

print_step "Stap 2: Directory setup"

# Maak Strapi directory
mkdir -p "${STRAPI_DIR}"
cd "${STRAPI_DIR}"

# Kopieer bestanden als ze niet al bestaan
if [ ! -f "docker-compose.yml" ]; then
    if [ -d "/tmp/strapi" ]; then
        print_info "Kopiëren van /tmp/strapi naar ${STRAPI_DIR}"
        cp -r /tmp/strapi/* .
        print_success "Strapi bestanden gekopieerd"
    else
        print_error "Strapi bestanden niet gevonden in /tmp/strapi. Upload eerst de strapi folder!"
    fi
else
    print_warning "docker-compose.yml bestaat al. Bestanden worden niet overschreven."
fi

###############################################################################
# STAP 3: ENVIRONMENT CONFIGURATIE
###############################################################################

print_step "Stap 3: Environment configuratie"

# Vraag database wachtwoord als niet ingesteld
if [ -z "$DB_PASSWORD" ]; then
    echo -n "Voer database wachtwoord in: "
    read -s DB_PASSWORD
    echo
fi

# Genereer secrets
print_info "Genereren van secrets..."
APP_KEY_1=$(openssl rand -base64 32)
APP_KEY_2=$(openssl rand -base64 32)
APP_KEY_3=$(openssl rand -base64 32)
APP_KEY_4=$(openssl rand -base64 32)
API_TOKEN_SALT=$(openssl rand -base64 32)
ADMIN_JWT_SECRET=$(openssl rand -base64 32)
TRANSFER_TOKEN_SALT=$(openssl rand -base64 32)
JWT_SECRET=$(openssl rand -base64 32)

# Maak .env bestand
cat > .env <<EOF
# Server
HOST=0.0.0.0
PORT=1337
STRAPI_PORT=${STRAPI_PORT}

# Secrets
APP_KEYS=${APP_KEY_1},${APP_KEY_2},${APP_KEY_3},${APP_KEY_4}
API_TOKEN_SALT=${API_TOKEN_SALT}
ADMIN_JWT_SECRET=${ADMIN_JWT_SECRET}
TRANSFER_TOKEN_SALT=${TRANSFER_TOKEN_SALT}
JWT_SECRET=${JWT_SECRET}

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=strapiDB
DATABASE_PORT=5432
DATABASE_NAME=systeemlink_strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=${DB_PASSWORD}
DATABASE_SSL=false

# Node Environment
NODE_ENV=production

# Public URL
PUBLIC_URL=https://${DOMAIN}/backend

# CORS Origins
CORS_ORIGINS=https://${DOMAIN},https://www.${DOMAIN}
EOF

chmod 600 .env
print_success ".env bestand aangemaakt en beveiligd"

###############################################################################
# STAP 4: DOCKER BUILD EN START
###############################################################################

print_step "Stap 4: Docker containers bouwen en starten"

print_info "Dit kan enkele minuten duren..."

# Stop eventueel draaiende containers
if docker ps -a | grep -q systeemlink-strapi; then
    print_warning "Bestaande containers gevonden. Stoppen..."
    docker-compose down
fi

# Build images
print_info "Bouwen van Docker images..."
docker-compose build --no-cache

# Start containers
print_info "Starten van containers..."
docker-compose up -d

# Wacht tot Strapi klaar is
print_info "Wachten tot Strapi start (dit kan 1-2 minuten duren)..."
sleep 10

# Check health
RETRIES=30
COUNTER=0
while [ $COUNTER -lt $RETRIES ]; do
    if docker exec systeemlink-strapi wget --spider -q http://localhost:1337/_health 2>/dev/null; then
        print_success "Strapi is succesvol gestart!"
        break
    fi
    
    COUNTER=$((COUNTER + 1))
    if [ $COUNTER -eq $RETRIES ]; then
        print_error "Strapi start niet. Check logs: docker-compose logs strapi"
    fi
    
    echo -n "."
    sleep 5
done
echo ""

###############################################################################
# STAP 5: NGINX CONFIGURATIE
###############################################################################

print_step "Stap 5: Nginx configuratie"

# Maak nginx config bestand
cat > nginx-strapi.conf <<'NGINXCONF'
# Strapi Backend op /backend
location /backend/ {
    # Remove /backend prefix voor Strapi
    rewrite ^/backend/(.*)$ /$1 break;
    
    # Proxy naar Docker container
    proxy_pass http://127.0.0.1:1337;
    proxy_http_version 1.1;
    
    # Headers
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host $host;
    proxy_cache_bypass $http_upgrade;
    
    # Timeouts
    proxy_connect_timeout 600s;
    proxy_send_timeout 600s;
    proxy_read_timeout 600s;
    send_timeout 600s;
    
    # Buffers
    proxy_buffer_size 128k;
    proxy_buffers 4 256k;
    proxy_busy_buffers_size 256k;
    
    # Disable buffering for SSE
    proxy_buffering off;
}

# Strapi uploads
location /backend/uploads/ {
    rewrite ^/backend/uploads/(.*)$ /uploads/$1 break;
    proxy_pass http://127.0.0.1:1337;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    
    # Cache static assets
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Strapi admin panel assets
location /backend/admin {
    rewrite ^/backend(.*)$ $1 break;
    proxy_pass http://127.0.0.1:1337;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
NGINXCONF

print_success "Nginx configuratie bestand aangemaakt: ${STRAPI_DIR}/nginx-strapi.conf"

print_warning "
╔════════════════════════════════════════════════════════════╗
║           NGINX CONFIGURATIE HANDMATIG TOEVOEGEN           ║
╚════════════════════════════════════════════════════════════╝

1. Log in op Plesk: https://$(hostname -I | awk '{print $1}'):8443
2. Ga naar: Websites & Domains → ${DOMAIN}
3. Klik op: Apache & nginx Settings
4. Scroll naar: 'Additional nginx directives'
5. Kopieer en plak de inhoud van: ${STRAPI_DIR}/nginx-strapi.conf
6. Klik op 'OK' om op te slaan

Of kopieer nu:
${CYAN}cat ${STRAPI_DIR}/nginx-strapi.conf${NC}
"

###############################################################################
# STAP 6: FIREWALL
###############################################################################

print_step "Stap 6: Firewall configuratie"

if command -v ufw &> /dev/null; then
    if ufw status | grep -q "Status: active"; then
        print_info "UFW firewall detecteerd"
        
        # Docker port is alleen localhost toegankelijk
        print_success "Docker containers zijn alleen via localhost bereikbaar (veilig)"
    fi
fi

###############################################################################
# STAP 7: AUTO-START CONFIGURATIE
###############################################################################

print_step "Stap 7: Auto-start configuratie"

# Maak systemd service voor auto-start
cat > /etc/systemd/system/strapi-docker.service <<EOF
[Unit]
Description=Systeemlink Strapi Docker Compose
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=${STRAPI_DIR}
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable strapi-docker.service
print_success "Auto-start geconfigureerd"

###############################################################################
# STAP 8: BACKUP SCRIPT
###############################################################################

print_step "Stap 8: Backup script aanmaken"

cat > backup-strapi.sh <<'BACKUPSCRIPT'
#!/bin/bash
# Strapi Docker Backup Script

BACKUP_DIR="/backup/strapi"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p ${BACKUP_DIR}

echo "Starting Strapi backup..."

# Backup database
docker exec systeemlink-postgres pg_dump -U strapi systeemlink_strapi | gzip > ${BACKUP_DIR}/db-${DATE}.sql.gz

# Backup uploads
docker run --rm --volumes-from systeemlink-strapi -v ${BACKUP_DIR}:/backup alpine tar czf /backup/uploads-${DATE}.tar.gz /opt/app/public/uploads

# Cleanup old backups (keep last 7 days)
find ${BACKUP_DIR} -name "*.gz" -mtime +7 -delete

echo "Backup completed: ${BACKUP_DIR}"
BACKUPSCRIPT

chmod +x backup-strapi.sh
print_success "Backup script aangemaakt: ${STRAPI_DIR}/backup-strapi.sh"

# Optioneel: Voeg toe aan cron
print_info "Om dagelijkse backups in te stellen, voeg toe aan crontab:"
echo -e "${CYAN}0 2 * * * ${STRAPI_DIR}/backup-strapi.sh${NC}"

###############################################################################
# VOLTOOIING
###############################################################################

echo -e "\n${GREEN}"
cat << "EOF"
╔════════════════════════════════════════════════════════════╗
║          ✓ DOCKER DEPLOYMENT SUCCESVOL VOLTOOID            ║
╚════════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"

echo -e "${BLUE}
╔════════════════════════════════════════════════════════════╗
║                    DEPLOYMENT INFO                         ║
╚════════════════════════════════════════════════════════════╝${NC}

${GREEN}Installation Directory:${NC} ${STRAPI_DIR}
${GREEN}Docker Containers:${NC}
  - systeemlink-strapi (Strapi CMS)
  - systeemlink-postgres (PostgreSQL)

${GREEN}Status Check:${NC}
  docker-compose ps
  docker-compose logs strapi
  docker-compose logs strapiDB

${GREEN}Container Management:${NC}
  docker-compose start      # Start containers
  docker-compose stop       # Stop containers
  docker-compose restart    # Restart containers
  docker-compose down       # Stop en verwijder containers
  docker-compose up -d      # Start in background

${GREEN}Logs:${NC}
  docker-compose logs -f strapi     # Live Strapi logs
  docker-compose logs -f strapiDB   # Live database logs

${GREEN}Backup:${NC}
  ${STRAPI_DIR}/backup-strapi.sh    # Run backup

${BLUE}
╔════════════════════════════════════════════════════════════╗
║                    VOLGENDE STAPPEN                        ║
╚════════════════════════════════════════════════════════════╝${NC}

${YELLOW}1. Nginx configuratie toevoegen (zie instructies hierboven)${NC}

${YELLOW}2. Test Strapi:${NC}
   curl http://localhost:${STRAPI_PORT}/_health
   # Verwacht: {\"status\":\"ok\"}

${YELLOW}3. Toegang tot admin panel:${NC}
   Open: https://${DOMAIN}/backend/admin
   Maak je eerste admin account aan

${YELLOW}4. API Token aanmaken:${NC}
   Settings → API Tokens → Create new API Token
   Name: Frontend Read-Only
   Type: Read-only
   Duration: Unlimited
   
${YELLOW}5. Permissions instellen:${NC}
   Settings → Users & Permissions → Roles → Public
   Enable permissions zoals beschreven in documentatie

${YELLOW}6. React Frontend configureren:${NC}
   # Update .env in React project:
   VITE_STRAPI_URL=https://${DOMAIN}/backend
   VITE_STRAPI_API_TOKEN=your-token-here

${YELLOW}7. Company Settings invullen in Strapi admin${NC}

${BLUE}
╔════════════════════════════════════════════════════════════╗
║                         URLS                               ║
╚════════════════════════════════════════════════════════════╝${NC}

  🌐 Website:        https://${DOMAIN}
  ⚙️  Strapi Admin:   https://${DOMAIN}/backend/admin
  📡 API:            https://${DOMAIN}/backend/api
  📊 Health Check:   http://localhost:${STRAPI_PORT}/_health

${BLUE}
╔════════════════════════════════════════════════════════════╗
║                    TROUBLESHOOTING                         ║
╚════════════════════════════════════════════════════════════╝${NC}

${CYAN}Containers starten niet:${NC}
  docker-compose logs

${CYAN}Database connectie faalt:${NC}
  docker-compose logs strapiDB
  
${CYAN}Strapi crasht:${NC}
  docker-compose logs strapi
  docker-compose restart strapi

${CYAN}Rebuilden na wijzigingen:${NC}
  docker-compose down
  docker-compose build --no-cache
  docker-compose up -d

${CYAN}Complete reset (DANGER!):${NC}
  docker-compose down -v  # Verwijdert ook volumes!
  docker-compose up -d

${GREEN}✓ Deployment voltooid!${NC}
"
