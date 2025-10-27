#!/bin/bash

###############################################################################
# Systeemlink Production Deployment Script
# Automated build and deployment to server
###############################################################################

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration (edit these)
SERVER_USER="username"
SERVER_HOST="systeemlink.nl"
SERVER_PATH="/var/www/html"
LOCAL_BUILD_DIR="./dist"

echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo -e "${BLUE}  Systeemlink Production Deployment${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}\n"

# Step 1: Clean previous build
echo -e "${YELLOW}[1/6] Cleaning previous build...${NC}"
rm -rf dist/
echo -e "${GREEN}✓ Clean complete${NC}\n"

# Step 2: Install dependencies
echo -e "${YELLOW}[2/6] Installing dependencies...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ npm install failed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Dependencies installed${NC}\n"

# Step 3: Build
echo -e "${YELLOW}[3/6] Building for production...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Build complete${NC}\n"

# Step 4: Copy additional files
echo -e "${YELLOW}[4/6] Copying additional files...${NC}"
cp .htaccess dist/.htaccess
cp robots.txt dist/robots.txt
cp sitemap.xml dist/sitemap.xml
echo -e "${GREEN}✓ Files copied${NC}\n"

# Step 5: Test build
echo -e "${YELLOW}[5/6] Testing build...${NC}"
if [ ! -f "dist/index.html" ]; then
    echo -e "${RED}✗ Build validation failed: index.html not found${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Build validated${NC}\n"

# Step 6: Deploy
echo -e "${YELLOW}[6/6] Deploying to server...${NC}"
echo -e "${BLUE}Server: ${SERVER_USER}@${SERVER_HOST}${NC}"
echo -e "${BLUE}Path: ${SERVER_PATH}${NC}\n"

# Uncomment to actually deploy:
# rsync -avz --delete ${LOCAL_BUILD_DIR}/ ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/
# 
# if [ $? -eq 0 ]; then
#     echo -e "${GREEN}✓ Deployment successful!${NC}\n"
# else
#     echo -e "${RED}✗ Deployment failed${NC}"
#     exit 1
# fi

echo -e "${YELLOW}⚠ Deployment skipped (uncomment rsync command to enable)${NC}\n"

# Success message
echo -e "${GREEN}═══════════════════════════════════════${NC}"
echo -e "${GREEN}  ✓ Build Complete!${NC}"
echo -e "${GREEN}═══════════════════════════════════════${NC}\n"

echo -e "Build output: ${BLUE}${LOCAL_BUILD_DIR}/${NC}"
echo -e "\nNext steps:"
echo -e "  1. Test build locally: ${BLUE}npm run preview${NC}"
echo -e "  2. Enable deployment in this script"
echo -e "  3. Or manually upload ${BLUE}${LOCAL_BUILD_DIR}/*${NC}\n"

# Stats
BUILD_SIZE=$(du -sh dist/ | cut -f1)
echo -e "Build size: ${BLUE}${BUILD_SIZE}${NC}"
echo -e "Files: ${BLUE}$(find dist/ -type f | wc -l)${NC}\n"

echo -e "${GREEN}Deployment ready! 🚀${NC}\n"
