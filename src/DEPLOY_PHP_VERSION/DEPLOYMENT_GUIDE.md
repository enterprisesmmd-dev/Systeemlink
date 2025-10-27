# 🚀 Deployment Guide - Systeemlink PHP

Complete gids voor het deployen van de Systeemlink website naar productie.

---

## 📋 Pre-Deployment Checklist

### ✅ **Voor Upload**

- [ ] Wijzig `ADMIN_PASSWORD` in `index.php`
- [ ] Update `SITE_URL` naar productie URL
- [ ] Update `COMPANY_EMAIL` naar correct email adres
- [ ] Test alle formulieren lokaal
- [ ] Verwijder development code
- [ ] Check alle links werken
- [ ] Test dark mode
- [ ] Test mobiele weergave
- [ ] Valideer HTML/CSS
- [ ] Test form submissions

---

## 🔧 Server Requirements

### **Minimum Requirements**

| Requirement | Minimum | Recommended |
|------------|---------|-------------|
| PHP Version | 7.4 | 8.0+ |
| Memory | 128MB | 256MB+ |
| Disk Space | 50MB | 100MB+ |
| Apache | 2.4 | 2.4+ |

### **Required Apache Modules**

```apache
mod_rewrite  ✅ (voor clean URLs)
mod_headers  ✅ (voor security headers)
mod_expires  ✅ (voor caching)
mod_deflate  ✅ (voor compression)
```

### **Check Modules**

```bash
# Check if mod_rewrite is enabled
apache2ctl -M | grep rewrite

# Enable if needed
sudo a2enmod rewrite headers expires deflate
sudo service apache2 restart
```

---

## 📦 Upload Methods

### **Method 1: FTP/SFTP** (Aanbevolen voor beginners)

1. **FileZilla gebruiken:**
   - Host: `ftp.jouwdomein.nl`
   - Username: Jouw FTP username
   - Password: Jouw FTP password
   - Port: 21 (FTP) of 22 (SFTP)

2. **Upload alle bestanden:**
   ```
   Local: DEPLOY_PHP_VERSION/*
   Remote: /public_html/ (of /httpdocs/)
   ```

3. **Check file structure:**
   ```
   /public_html/
   ├── index.php ✅
   ├── .htaccess ✅
   ├── includes/ ✅
   ├── pages/ ✅
   ├── admin/ ✅
   ├── assets/ ✅
   └── data/ ✅
   ```

### **Method 2: Git Deployment** (Aanbevolen voor developers)

```bash
# 1. SSH naar server
ssh user@server.nl

# 2. Navigate naar web root
cd /var/www/html

# 3. Clone repository
git clone https://github.com/jouw-repo/systeemlink-php.git .

# 4. Set permissions
chmod 755 data/
find data/ -type f -exec chmod 644 {} \;
```

### **Method 3: cPanel File Manager**

1. Login bij cPanel
2. Open "File Manager"
3. Navigate naar `public_html`
4. Upload ZIP file
5. Extract ZIP
6. Set permissions

---

## 🔐 File Permissions

### **Set Correct Permissions**

```bash
# Folders - 755 (rwxr-xr-x)
find . -type d -exec chmod 755 {} \;

# PHP Files - 644 (rw-r--r--)
find . -type f -name "*.php" -exec chmod 644 {} \;

# Data folder - WRITABLE
chmod 755 data/
chmod 644 data/*.json

# .htaccess - 644
chmod 644 .htaccess
```

### **Security Note**

⚠️ **NEVER** set 777 permissions!

---

## ⚙️ Configuration

### **1. Update index.php**

```php
<?php
// === PRODUCTIE CONFIGURATIE ===

// Disable error display
error_reporting(0);
ini_set('display_errors', 0);

// Update URLs
define('SITE_URL', 'https://www.systeemlink.nl');  // ✅ Wijzig dit!

// Update Password
define('ADMIN_PASSWORD', 'JouwSterkWachtwoord123!');  // ✅ Wijzig dit!

// Update Email
define('COMPANY_EMAIL', 'info@systeemlink.nl');  // ✅ Wijzig dit!
```

### **2. Verify .htaccess**

Check dat `.htaccess` correct is geüpload:

```bash
ls -la | grep .htaccess
```

Als niet zichtbaar, toon hidden files in FileZilla.

### **3. Test Rewrite Rules**

Ga naar: `https://jouwdomein.nl/?page=it-check`

Werkt dit? Dan werkt mod_rewrite! ✅

---

## 📧 Email Setup

### **Option 1: PHP mail()** (Basic)

Standaard gebruikt de site PHP `mail()`. Dit werkt op de meeste servers.

**Test:**
```bash
php -r "mail('jouw@email.nl', 'Test', 'Test bericht');"
```

### **Option 2: SMTP** (Recommended)

Voor betere deliverability, gebruik SMTP:

1. **Install PHPMailer:**

```bash
composer require phpmailer/phpmailer
```

2. **Update functions.php:**

```php
use PHPMailer\PHPMailer\PHPMailer;

function send_notification($to, $subject, $message) {
    $mail = new PHPMailer(true);
    
    $mail->isSMTP();
    $mail->Host = 'smtp.jouwprovider.nl';
    $mail->SMTPAuth = true;
    $mail->Username = 'info@systeemlink.nl';
    $mail->Password = 'jouw-wachtwoord';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    
    $mail->setFrom('info@systeemlink.nl', 'Systeemlink');
    $mail->addAddress($to);
    $mail->Subject = $subject;
    $mail->Body = $message;
    $mail->isHTML(true);
    
    return $mail->send();
}
```

---

## 🔒 Security Hardening

### **1. Protect Admin**

**Add IP whitelist** in `.htaccess`:

```apache
# Protect admin folder
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_URI} ^/admin
    RewriteCond %{REMOTE_ADDR} !^123\.456\.789\.0$  # Jouw IP
    RewriteRule .* - [F]
</IfModule>
```

### **2. SSL Certificate** (Required!)

```bash
# Via Let's Encrypt (gratis)
sudo certbot --apache -d systeemlink.nl -d www.systeemlink.nl
```

Of via cPanel: SSL/TLS → Install SSL Certificate

### **3. Security Headers**

Already in `.htaccess`:

```apache
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
```

### **4. Hide PHP Version**

In `php.ini`:

```ini
expose_php = Off
```

### **5. Disable Directory Listing**

Already in `.htaccess`:

```apache
Options -Indexes
```

---

## 🚀 Performance Optimization

### **1. Enable OPcache**

In `php.ini`:

```ini
opcache.enable=1
opcache.memory_consumption=128
opcache.max_accelerated_files=10000
opcache.revalidate_freq=2
```

### **2. Enable Gzip Compression**

Already in `.htaccess`:

```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript
</IfModule>
```

### **3. Browser Caching**

Already in `.htaccess`:

```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
</IfModule>
```

### **4. CDN voor Assets**

Optioneel: Gebruik Cloudflare voor:
- Static asset caching
- DDoS protection
- Global CDN

---

## 📊 Monitoring

### **1. Error Logging**

Create `error_log.php`:

```php
<?php
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/logs/error.log');
```

### **2. Google Analytics**

Add to `/includes/footer.php`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### **3. Uptime Monitoring**

Gebruik services zoals:
- UptimeRobot (gratis)
- Pingdom
- StatusCake

---

## 🧪 Post-Deployment Testing

### **Functional Tests**

- [ ] Homepage loads correctly
- [ ] All menu links work
- [ ] IT-Check wizard works
- [ ] Contact form submits
- [ ] Admin login works
- [ ] Dark mode toggles
- [ ] Mobile menu works
- [ ] Forms submit correctly
- [ ] Email notifications sent
- [ ] Admin can view submissions

### **Performance Tests**

- [ ] Google PageSpeed Score > 90
- [ ] GTmetrix Grade A/B
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s

### **Security Tests**

- [ ] HTTPS enforced
- [ ] Admin protected
- [ ] Forms have CSRF protection
- [ ] hCaptcha works
- [ ] SQL injection protected (N/A - no DB)
- [ ] XSS protected

### **SEO Tests**

- [ ] Meta tags present
- [ ] Canonical URLs set
- [ ] robots.txt accessible
- [ ] sitemap.xml accessible
- [ ] Schema markup valid

---

## 🐛 Troubleshooting

### **Problem: 500 Internal Server Error**

**Solutions:**
1. Check `.htaccess` syntax
2. Check file permissions
3. Check PHP error log
4. Disable `.htaccess` temporarily

### **Problem: 404 on all pages**

**Solution:**
```apache
# Verify mod_rewrite
apache2ctl -M | grep rewrite

# Enable if missing
sudo a2enmod rewrite
sudo service apache2 restart
```

### **Problem: Admin login doesn't work**

**Solutions:**
1. Check session path is writable:
   ```bash
   chmod 1733 /tmp
   ```
2. Verify password in `index.php`
3. Clear browser cookies

### **Problem: Forms don't submit**

**Solutions:**
1. Check `/data/` folder permissions: `755`
2. Check JSON files writable: `644`
3. Check PHP mail configuration
4. Test hCaptcha sitekey

### **Problem: Dark mode doesn't work**

**Solutions:**
1. Check cookies enabled in browser
2. Verify JavaScript loads
3. Check Tailwind CDN loads
4. Clear browser cache

---

## 📝 Maintenance

### **Regular Tasks**

**Daily:**
- [ ] Check error logs
- [ ] Monitor uptime

**Weekly:**
- [ ] Review form submissions
- [ ] Backup `/data/` folder
- [ ] Check security updates

**Monthly:**
- [ ] Full site backup
- [ ] Performance audit
- [ ] Security scan
- [ ] Update dependencies

### **Backup Script**

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y-%m-%d)
BACKUP_DIR="/backups/systeemlink"
WEB_ROOT="/var/www/html"

# Create backup
tar -czf $BACKUP_DIR/backup-$DATE.tar.gz $WEB_ROOT/data/

# Keep only last 30 days
find $BACKUP_DIR -name "backup-*.tar.gz" -mtime +30 -delete

echo "Backup completed: backup-$DATE.tar.gz"
```

Set cron:
```bash
0 2 * * * /path/to/backup.sh
```

---

## 🎉 Launch Checklist

### **Final Steps**

- [ ] All tests passed
- [ ] Backups configured
- [ ] Monitoring active
- [ ] SSL certificate installed
- [ ] DNS configured correctly
- [ ] Admin password changed
- [ ] Error reporting disabled
- [ ] Performance optimized
- [ ] Security hardened
- [ ] Documentation updated

### **Go Live!**

```bash
# Verify everything
curl -I https://www.systeemlink.nl

# Should return:
HTTP/2 200
server: Apache
x-content-type-options: nosniff
x-frame-options: SAMEORIGIN
```

---

## 📞 Support

**Issues?**

1. Check this guide
2. Check error logs
3. Contact hosting support
4. Email: info@systeemlink.nl

---

**Veel succes met de deployment! 🚀**

© 2024 Systeemlink
