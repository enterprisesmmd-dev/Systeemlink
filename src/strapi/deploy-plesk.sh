#!/bin/bash

###############################################################################
# Systeemlink Strapi Deployment Script voor Plesk Server
# 
# Dit script installeert en configureert Strapi CMS op een Plesk server
# met PostgreSQL database en Nginx reverse proxy op /backend subdirectory
#
# Vereisten:
# - Plesk Obsidian (18.0+)
# - Node.js 18+ (via Plesk Node.js Manager)
# - PostgreSQL database (aangemaakt via Plesk)
# - SSH toegang tot server
#
# Gebruik:
#   chmod +x deploy-plesk.sh
#   ./deploy-plesk.sh
###############################################################################

set -e  # Stop bij errors

# Kleuren voor output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║         Systeemlink Strapi Deployment voor Plesk          ║"
echo "║                    systeemlink.nl/backend                  ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

###############################################################################
# CONFIGURATIE - PAS AAN VOOR JOUW SERVER
###############################################################################

# Plesk domeinnaam
DOMAIN="systeemlink.nl"

# Strapi configuratie
STRAPI_PORT=1337
STRAPI_DIR="/var/www/vhosts/${DOMAIN}/backend"
STRAPI_USER="systeemlink"

# Database configuratie (vul in na aanmaken in Plesk)
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="systeemlink_strapi"
DB_USER="systeemlink_strapi"
DB_PASSWORD=""  # Wordt gevraagd tijdens installatie

# Nginx configuratie
NGINX_CONF="/etc/nginx/plesk.conf.d/vhosts/${DOMAIN}.conf"

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

check_root() {
    if [ "$EUID" -ne 0 ]; then 
        print_error "Dit script moet als root worden uitgevoerd. Gebruik: sudo ./deploy-plesk.sh"
    fi
}

###############################################################################
# STAP 1: PRE-FLIGHT CHECKS
###############################################################################

print_step "Stap 1: Pre-flight checks"

check_root

# Check of Plesk is geïnstalleerd
if ! command -v plesk &> /dev/null; then
    print_error "Plesk is niet gevonden op deze server"
fi
print_success "Plesk is geïnstalleerd"

# Check of domein bestaat
if [ ! -d "/var/www/vhosts/${DOMAIN}" ]; then
    print_error "Domein ${DOMAIN} is niet gevonden in Plesk"
fi
print_success "Domein ${DOMAIN} gevonden"

# Check of Node.js is geïnstalleerd
if ! command -v node &> /dev/null; then
    print_error "Node.js is niet geïnstalleerd. Installeer Node.js 18+ via Plesk Node.js Manager"
fi
NODE_VERSION=$(node -v)
print_success "Node.js ${NODE_VERSION} is geïnstalleerd"

# Check of PostgreSQL is geïnstalleerd
if ! command -v psql &> /dev/null; then
    print_error "PostgreSQL is niet geïnstalleerd. Installeer PostgreSQL via Plesk"
fi
print_success "PostgreSQL is geïnstalleerd"

###############################################################################
# STAP 2: DATABASE AANMAKEN
###############################################################################

print_step "Stap 2: Database configureren"

# Vraag database wachtwoord
if [ -z "$DB_PASSWORD" ]; then
    echo -n "Voer database wachtwoord in voor gebruiker ${DB_USER}: "
    read -s DB_PASSWORD
    echo
fi

# Check of database al bestaat
DB_EXISTS=$(sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'")

if [ "$DB_EXISTS" = "1" ]; then
    print_warning "Database ${DB_NAME} bestaat al"
    echo -n "Wil je de bestaande database gebruiken? [y/N]: "
    read -r response
    if [[ ! "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        print_error "Installatie geannuleerd"
    fi
else
    # Maak database en gebruiker aan
    sudo -u postgres psql <<EOF
CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASSWORD}';
CREATE DATABASE ${DB_NAME} OWNER ${DB_USER};
GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};
EOF
    print_success "Database ${DB_NAME} aangemaakt"
fi

###############################################################################
# STAP 3: STRAPI INSTALLEREN
###############################################################################

print_step "Stap 3: Strapi installeren"

# Maak directory aan
mkdir -p "${STRAPI_DIR}"
cd "${STRAPI_DIR}"

# Kopieer Strapi bestanden (aangenomen dat script in strapi folder draait)
if [ -f "../package.json" ]; then
    cp -r ../* .
    print_success "Strapi bestanden gekopieerd"
else
    print_error "Strapi bestanden niet gevonden. Zorg dat dit script in de /strapi folder staat"
fi

# Genereer secrets
print_step "Secrets genereren..."
APP_KEYS="$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32)"
API_TOKEN_SALT="$(openssl rand -base64 32)"
ADMIN_JWT_SECRET="$(openssl rand -base64 32)"
TRANSFER_TOKEN_SALT="$(openssl rand -base64 32)"
JWT_SECRET="$(openssl rand -base64 32)"

# Maak .env bestand aan
cat > .env <<EOF
# Server
HOST=0.0.0.0
PORT=${STRAPI_PORT}
APP_KEYS=${APP_KEYS}
API_TOKEN_SALT=${API_TOKEN_SALT}
ADMIN_JWT_SECRET=${ADMIN_JWT_SECRET}
TRANSFER_TOKEN_SALT=${TRANSFER_TOKEN_SALT}
JWT_SECRET=${JWT_SECRET}

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=${DB_HOST}
DATABASE_PORT=${DB_PORT}
DATABASE_NAME=${DB_NAME}
DATABASE_USERNAME=${DB_USER}
DATABASE_PASSWORD=${DB_PASSWORD}
DATABASE_SSL=false

# Node Environment
NODE_ENV=production

# Admin URL
ADMIN_PATH=/admin

# Public URL
PUBLIC_URL=https://${DOMAIN}/backend

# CORS Origins
CORS_ORIGINS=https://${DOMAIN},https://www.${DOMAIN}
EOF

print_success ".env bestand aangemaakt"

# Installeer dependencies
print_step "Dependencies installeren (dit kan even duren)..."
npm install --production

# Build Strapi
print_step "Strapi bouwen..."
npm run build

print_success "Strapi is succesvol geïnstalleerd"

###############################################################################
# STAP 4: SYSTEMD SERVICE
###############################################################################

print_step "Stap 4: Systemd service configureren"

# Maak systemd service aan
cat > /etc/systemd/system/strapi-systeemlink.service <<EOF
[Unit]
Description=Systeemlink Strapi CMS
After=network.target postgresql.service

[Service]
Type=simple
User=${STRAPI_USER}
WorkingDirectory=${STRAPI_DIR}
Environment=NODE_ENV=production
ExecStart=/usr/bin/node ${STRAPI_DIR}/node_modules/@strapi/strapi/bin/strapi.js start
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=strapi-systeemlink

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd
systemctl daemon-reload

# Start en enable service
systemctl enable strapi-systeemlink.service
systemctl start strapi-systeemlink.service

# Check status
if systemctl is-active --quiet strapi-systeemlink.service; then
    print_success "Strapi service is actief"
else
    print_error "Strapi service kon niet worden gestart. Check logs: journalctl -u strapi-systeemlink -f"
fi

###############################################################################
# STAP 5: NGINX REVERSE PROXY
###############################################################################

print_step "Stap 5: Nginx reverse proxy configureren"

# Maak Nginx configuratie aan voor /backend
cat > "${STRAPI_DIR}/nginx-backend.conf" <<'EOF'
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
EOF

print_success "Nginx configuratie aangemaakt"

print_warning "
╔════════════════════════════════════════════════════════════╗
║              NGINX CONFIGURATIE HANDMATIG TOEVOEGEN        ║
╚════════════════════════════════════════════════════════════╝

1. Log in op Plesk
2. Ga naar: Websites & Domains → ${DOMAIN} → Apache & nginx Settings
3. Scroll naar 'Additional nginx directives'
4. Voeg de volgende configuratie toe:

$(cat ${STRAPI_DIR}/nginx-backend.conf)

5. Klik op 'OK' om op te slaan
6. Nginx wordt automatisch herstart
"

###############################################################################
# STAP 6: FIREWALL
###############################################################################

print_step "Stap 6: Firewall configureren"

# Check of firewall actief is
if command -v ufw &> /dev/null; then
    if ufw status | grep -q "Status: active"; then
        # Sta localhost connecties toe op Strapi port
        print_warning "UFW firewall is actief. Zorg dat localhost connecties zijn toegestaan"
    fi
fi

###############################################################################
# STAP 7: BEVEILIGING
###############################################################################

print_step "Stap 7: Beveiliging configureren"

# Stel juiste permissies in
chown -R ${STRAPI_USER}:${STRAPI_USER} "${STRAPI_DIR}"
chmod 600 "${STRAPI_DIR}/.env"
chmod -R 755 "${STRAPI_DIR}/public"

print_success "Permissies ingesteld"

###############################################################################
# VOLTOOIING
###############################################################################

echo -e "\n${GREEN}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║              ✓ INSTALLATIE SUCCESVOL VOLTOOID             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

echo -e "${BLUE}
╔════════════════════════════════════════════════════════════╗
║                    VOLGENDE STAPPEN                        ║
╚════════════════════════════════════════════════════════════╝${NC}

${YELLOW}1. Nginx configuratie toevoegen:${NC}
   - Log in op Plesk
   - Voeg de Nginx configuratie toe (zie boven)
   - Test: https://${DOMAIN}/backend/admin

${YELLOW}2. Strapi Admin account aanmaken:${NC}
   - Ga naar: https://${DOMAIN}/backend/admin
   - Maak je eerste admin account aan

${YELLOW}3. API Token aanmaken:${NC}
   - Log in op Strapi admin
   - Ga naar: Settings → API Tokens → Create new API Token
   - Name: 'Frontend Read-Only'
   - Token type: 'Read-only'
   - Token duration: 'Unlimited'
   - Kopieer de token voor gebruik in React frontend

${YELLOW}4. Permissions instellen:${NC}
   - Settings → Users & Permissions → Roles → Public
   - Enable 'find' en 'findOne' voor alle content types
   - Enable 'create' voor 'form-submission'

${YELLOW}5. React Frontend configureren:${NC}
   - Update .env bestand:
     ${GREEN}VITE_STRAPI_URL=https://${DOMAIN}/backend
     VITE_STRAPI_API_TOKEN=<jouw-api-token>${NC}

${YELLOW}6. Company Settings invullen:${NC}
   - Ga naar: Content Manager → Company Setting
   - Vul alle bedrijfsgegevens in

${YELLOW}7. Backup instellen:${NC}
   - Database backup via Plesk
   - Strapi uploads backup: ${STRAPI_DIR}/public/uploads

╔════════════════════════════════════════════════════════════╗
║                    HANDIGE COMMANDO'S                      ║
╚════════════════════════════════════════════════════════════╝

${BLUE}Service beheren:${NC}
  sudo systemctl status strapi-systeemlink
  sudo systemctl restart strapi-systeemlink
  sudo systemctl stop strapi-systeemlink

${BLUE}Logs bekijken:${NC}
  sudo journalctl -u strapi-systeemlink -f
  sudo journalctl -u strapi-systeemlink --since \"1 hour ago\"

${BLUE}Database backup:${NC}
  pg_dump -U ${DB_USER} ${DB_NAME} > backup-\$(date +%Y%m%d).sql

${BLUE}Database restore:${NC}
  psql -U ${DB_USER} ${DB_NAME} < backup-YYYYMMDD.sql

╔════════════════════════════════════════════════════════════╗
║                         URLs                               ║
╚════════════════════════════════════════════════════════════╝

  🌐 Website:        https://${DOMAIN}
  ⚙️  Strapi Admin:   https://${DOMAIN}/backend/admin
  📡 API:            https://${DOMAIN}/backend/api
  📊 Health Check:   https://${DOMAIN}/backend/_health

╔════════════════════════════════════════════════════════════╗
║                         SUPPORT                            ║
╚════════════════════════════════════════════════════════════╝

  📧 Email: info@systeemlink.nl
  📱 Tel:   +31 613777733

${GREEN}Installatie directory: ${STRAPI_DIR}
Database: ${DB_NAME}
Service: strapi-systeemlink${NC}
"

# Test of Strapi draait
echo -e "\n${BLUE}Testing Strapi...${NC}"
sleep 3
if curl -s http://localhost:${STRAPI_PORT}/_health > /dev/null; then
    print_success "Strapi is actief en bereikbaar op localhost:${STRAPI_PORT}"
else
    print_warning "Strapi health check faalt. Check logs: journalctl -u strapi-systeemlink -f"
fi

echo -e "\n${GREEN}✓ Deployment voltooid!${NC}\n"
