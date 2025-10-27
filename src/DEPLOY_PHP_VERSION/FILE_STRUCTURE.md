# 📁 File Structure - Systeemlink PHP

Complete overzicht van alle bestanden en folders in de PHP versie.

---

## 🌳 Directory Structure

```
DEPLOY_PHP_VERSION/
│
├── 📄 index.php                    # Main entry point & router
├── 📄 .htaccess                    # Apache rewrite rules & security
├── 📄 README.md                    # Project documentation
├── 📄 DEPLOYMENT_GUIDE.md          # Deployment instructions
├── 📄 FILE_STRUCTURE.md            # This file
│
├── 📁 includes/                    # Core PHP includes
│   ├── functions.php               # Helper functions
│   ├── theme.php                   # Theme/dark mode functions
│   ├── header.php                  # Site header template
│   └── footer.php                  # Site footer template
│
├── 📁 pages/                       # Page templates
│   ├── home.php                    # Homepage
│   ├── it-check.php                # IT-Check wizard (16 steps)
│   ├── 404.php                     # 404 error page
│   │
│   ├── 📁 company/                 # Company pages
│   │   ├── about.php               # About us
│   │   ├── partners.php            # Partners & certifications
│   │   ├── certifications.php      # Certifications
│   │   ├── vacancies.php           # Job vacancies
│   │   └── contact.php             # Contact form
│   │
│   ├── 📁 solutions/               # Solution pages
│   │   ├── workplace.php           # Workplace management
│   │   ├── cloud.php               # Cloud & Microsoft 365
│   │   ├── network.php             # Network & security
│   │   └── support.php             # IT Support
│   │
│   ├── 📁 branches/                # Industry pages
│   │   ├── business-services.php   # Business services
│   │   ├── health-education.php    # Healthcare & education
│   │   ├── retail-logistics.php    # Retail & logistics
│   │   └── construction.php        # Construction & industry
│   │
│   ├── 📁 scans/                   # Scan wizard pages
│   │   ├── workplace-scan.php      # Modern workplace scan
│   │   ├── cloud-scan.php          # Cloud readiness scan
│   │   └── security-scan.php       # Security scan
│   │
│   └── 📁 landings/                # Landing pages
│       └── workplace-management.php # Workplace landing
│
├── 📁 admin/                       # CMS Admin system
│   ├── index.php                   # Admin dashboard
│   ├── login.php                   # Admin login
│   ├── logout.php                  # Admin logout
│   │
│   └── 📁 tabs/                    # Admin panel tabs
│       ├── pages.php               # Page management
│       ├── submissions.php         # Form submissions viewer
│       ├── company.php             # Company settings
│       └── settings.php            # General settings
│
├── 📁 assets/                      # Static assets
│   ├── 📁 css/
│   │   └── style.css               # Custom styles
│   │
│   ├── 📁 js/
│   │   ├── it-check-wizard.js      # IT-Check wizard logic
│   │   ├── scan-wizard.js          # Scan wizards logic
│   │   └── main.js                 # General JavaScript
│   │
│   ├── 📁 images/
│   │   ├── logo.png                # Company logo
│   │   ├── favicon.png             # Favicon
│   │   └── hero-bg.jpg             # Hero backgrounds
│   │
│   └── 📁 fonts/                   # Custom fonts (if any)
│
└── 📁 data/                        # JSON data storage
    ├── cms_pages.json              # CMS page content
    ├── submissions.json            # Form submissions
    ├── company_settings.json       # Company information
    └── .gitkeep                    # Keep folder in git
```

---

## 📄 File Descriptions

### **Root Files**

| File | Purpose | Critical |
|------|---------|----------|
| `index.php` | Main router, handles all requests | ✅ Yes |
| `.htaccess` | URL rewriting, security headers | ✅ Yes |
| `README.md` | Project documentation | ℹ️ Info |
| `DEPLOYMENT_GUIDE.md` | Deployment instructions | ℹ️ Info |

### **Includes**

| File | Purpose | Critical |
|------|---------|----------|
| `functions.php` | Core helper functions | ✅ Yes |
| `theme.php` | Dark mode handling | ✅ Yes |
| `header.php` | Site header HTML | ✅ Yes |
| `footer.php` | Site footer HTML | ✅ Yes |

### **Main Pages**

| File | URL | Purpose |
|------|-----|---------|
| `home.php` | `/` | Homepage |
| `it-check.php` | `/?page=it-check` | IT-Check wizard |
| `404.php` | N/A | Error page |

### **Company Pages**

| File | URL | Purpose |
|------|-----|---------|
| `about.php` | `/?page=bedrijfsinformatie/over-ons` | About page |
| `partners.php` | `/?page=bedrijfsinformatie/partners-certificeringen` | Partners |
| `certifications.php` | `/?page=bedrijfsinformatie/certificeringen` | Certifications |
| `vacancies.php` | `/?page=bedrijfsinformatie/vacatures` | Job vacancies |
| `contact.php` | `/?page=bedrijfsinformatie/contact` | Contact form |

### **Solution Pages**

| File | URL | Purpose |
|------|-----|---------|
| `workplace.php` | `/?page=oplossingen/werkplekbeheer` | Workplace solutions |
| `cloud.php` | `/?page=oplossingen/cloud-microsoft-365` | Cloud solutions |
| `network.php` | `/?page=oplossingen/netwerk-beveiliging` | Network solutions |
| `support.php` | `/?page=oplossingen/it-support` | Support solutions |

### **Scan Pages**

| File | URL | Purpose |
|------|-----|---------|
| `workplace-scan.php` | `/?page=scan/modern-workplace` | Workplace scan wizard |
| `cloud-scan.php` | `/?page=scan/cloud-readiness` | Cloud scan wizard |
| `security-scan.php` | `/?page=scan/security` | Security scan wizard |

### **Admin Files**

| File | URL | Purpose |
|------|-----|---------|
| `admin/index.php` | `/?page=admin` | Admin dashboard |
| `admin/login.php` | `/?page=admin/login` | Login page |
| `admin/logout.php` | `/?page=admin/logout` | Logout action |

---

## 📦 Size Information

### **Estimated Sizes**

```
Total Size: ~2-5 MB (without images)

Breakdown:
├── PHP Files:        ~500 KB
├── CSS Files:        ~50 KB
├── JavaScript:       ~100 KB
├── Images:           ~1-3 MB (depends on optimization)
└── Data (JSON):      ~10-50 KB (grows with submissions)
```

### **Database Usage**

**No database required!** 

All data stored in JSON files in `/data/` folder:
- `cms_pages.json` - ~20 KB
- `submissions.json` - Grows with usage (~1 KB per submission)
- `company_settings.json` - ~2 KB

---

## 🔐 Permission Requirements

### **Folders**

```bash
.                       755  (rwxr-xr-x)
├── includes/           755
├── pages/              755
├── admin/              755
├── assets/             755
└── data/               755  ⚠️ MUST BE WRITABLE
```

### **Files**

```bash
.htaccess               644  (rw-r--r--)
index.php               644
All .php files          644
All .js files           644
All .css files          644
All .json files         644  ⚠️ IN data/ FOLDER
```

---

## 🎯 Critical Files

These files are **essential** and must not be deleted:

1. ✅ `index.php` - Router
2. ✅ `.htaccess` - URL rewriting
3. ✅ `includes/functions.php` - Core functions
4. ✅ `includes/header.php` - Site header
5. ✅ `includes/footer.php` - Site footer
6. ✅ `assets/css/style.css` - Styling
7. ✅ `data/` folder - Data storage

---

## 🔄 Update Workflow

### **To Update a Page:**

1. Edit file in `/pages/`
2. Upload via FTP
3. Test on staging
4. Deploy to production

### **To Add a New Page:**

1. Create new PHP file in `/pages/`
2. Add route to `index.php`:
   ```php
   'new-page' => 'pages/new-page.php',
   ```
3. Create page content
4. Add to navigation in `header.php`
5. Upload and test

### **To Update Styling:**

1. Edit `assets/css/style.css`
2. Upload via FTP
3. Clear browser cache
4. Test changes

---

## 📋 Checklist for New Installation

### **Before Upload**

- [ ] Review all file paths
- [ ] Update configuration in `index.php`
- [ ] Test locally
- [ ] Optimize images
- [ ] Minify CSS/JS (optional)

### **After Upload**

- [ ] Verify file structure
- [ ] Set permissions on `/data/`
- [ ] Test all pages load
- [ ] Test form submissions
- [ ] Test admin login
- [ ] Configure email
- [ ] Setup SSL

---

## 🗂️ Optional Files (Not Included)

These can be added based on needs:

```
├── robots.txt              # SEO - search engine rules
├── sitemap.xml            # SEO - site structure
├── .env                   # Environment variables
├── composer.json          # PHP dependencies
├── package.json           # Node dependencies (if using build tools)
└── logs/                  # Error logs folder
    └── error.log          # PHP error log
```

---

## 📊 Growth Expectations

### **Data Folder Growth**

Estimated growth over time:

```
Month 1:  submissions.json ~10 KB    (100 submissions)
Month 6:  submissions.json ~50 KB    (500 submissions)  
Year 1:   submissions.json ~120 KB   (1200 submissions)
```

### **When to Archive**

Consider archiving submissions when:
- File exceeds 1 MB
- Performance degradation noticed
- More than 10,000 submissions

**Archiving:**
```bash
# Move old submissions to archive
mv data/submissions.json data/archive/submissions-2024.json

# Create fresh file
echo "[]" > data/submissions.json
```

---

## 🔍 Finding Files

### **Quick Reference**

Need to edit...

**Navigation menu?** → `includes/header.php`  
**Footer content?** → `includes/footer.php`  
**Homepage hero?** → `pages/home.php`  
**Contact form?** → `pages/company/contact.php`  
**IT-Check questions?** → `assets/js/it-check-wizard.js`  
**Company details?** → `index.php` (constants)  
**Styling?** → `assets/css/style.css`  
**Admin password?** → `index.php` (ADMIN_PASSWORD)  

---

## 💾 Backup Strategy

### **What to Backup**

**Critical (Backup Daily):**
- `/data/` folder

**Important (Backup Weekly):**
- All `/pages/` files
- All `/includes/` files
- `/admin/` folder
- `index.php`
- `.htaccess`

**Nice to Have (Backup Monthly):**
- `/assets/` folder
- Complete site backup

---

## ✨ Summary

**Total Files:** ~30-40 PHP files  
**Total Folders:** 10+ directories  
**Database:** None (JSON-based)  
**Size:** 2-5 MB (without large images)  
**Complexity:** Low to Medium  
**Maintenance:** Minimal  

---

**Questions?** Check `README.md` or `DEPLOYMENT_GUIDE.md`

© 2024 Systeemlink
