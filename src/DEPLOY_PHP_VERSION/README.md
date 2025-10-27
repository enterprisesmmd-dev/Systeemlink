# 🚀 Systeemlink - PHP Versie

Complete PHP implementatie van de Systeemlink website met alle functionaliteit van de React versie.

---

## 📦 Wat is inbegrepen?

### ✅ **Volledige Functionaliteit**

- ✅ **14 Complete Pagina's** - Alle pages van de React versie
- ✅ **Interactive IT-Check Wizard** - 16 stappen met auto-advance
- ✅ **3 Scan Wizards** - Security, Workplace, Cloud scans
- ✅ **CMS Admin Systeem** - Volledige content management
- ✅ **Form Submissions** - Opslag en beheer van alle formulieren
- ✅ **Dark Mode** - Volledig ondersteund
- ✅ **hCaptcha Integratie** - Spam bescherming
- ✅ **Responsive Design** - Mobiel geoptimaliseerd
- ✅ **SEO Optimized** - Meta tags, structured data
- ✅ **Cookie Consent** - AVG compliant

---

## 🛠️ Installatie

### **Systeemvereisten**

- PHP 7.4 of hoger
- Apache webserver met mod_rewrite
- MySQL (optioneel, gebruikt nu JSON files)

### **Stap 1: Upload Files**

Upload alle bestanden naar uw webserver:

```bash
/public_html/
├── index.php
├── .htaccess
├── includes/
├── pages/
├── admin/
├── assets/
└── data/
```

### **Stap 2: Permissions**

Zet schrijf permissions op de data folder:

```bash
chmod 755 data/
chmod 644 data/*.json
```

### **Stap 3: Configuratie**

Edit `index.php` en pas aan:

```php
define('SITE_URL', 'https://jouwdomein.nl');
define('ADMIN_PASSWORD', 'JouwSterkWachtwoord123!');
define('COMPANY_EMAIL', 'info@jouwbedrijf.nl');
```

### **Stap 4: Test**

Ga naar: `https://jouwdomein.nl`

---

## 🔐 Admin Toegang

### **Login**

URL: `https://jouwdomein.nl/?page=admin`

**Standaard credentials:**
- Wachtwoord: `Systeemlink2024!`

⚠️ **BELANGRIJK**: Wijzig dit wachtwoord in `index.php` voor productie!

### **Admin Functies**

✅ **Pagina Beheer** - Bewerk alle pagina's  
✅ **Submissions** - Bekijk alle form inzendingen  
✅ **Bedrijfsinfo** - Update contactgegevens  
✅ **Instellingen** - Algemene site instellingen  

---

## 📄 Pagina Structuur

### **Hoofdpagina's**

1. **Home** - `/` - Homepage met hero slider
2. **IT-Check** - `/?page=it-check` - 16 stappen wizard
3. **Contact** - `/?page=bedrijfsinformatie/contact`

### **Oplossingen**

- `/?page=oplossingen` - Overzicht
- `/?page=oplossingen/werkplekbeheer` - Werkplekbeheer
- `/?page=oplossingen/cloud-microsoft-365` - Cloud
- `/?page=oplossingen/netwerk-beveiliging` - Netwerk
- `/?page=oplossingen/it-support` - Support

### **Branches**

- `/?page=branches` - Overzicht
- `/?page=branches/zakelijke-dienstverlening`
- `/?page=branches/zorg-onderwijs`
- `/?page=branches/retail-logistiek`
- `/?page=branches/bouw-industrie`

### **Scan Pagina's**

- `/?page=scan/security` - Security scan
- `/?page=scan/modern-workplace` - Workplace scan
- `/?page=scan/cloud-readiness` - Cloud scan

---

## 💾 Data Opslag

### **JSON Files** (in `/data/`)

- `cms_pages.json` - CMS pagina content
- `submissions.json` - Alle form submissions
- `company_settings.json` - Bedrijfsinformatie

### **Voorbeeld submissions.json:**

```json
[
  {
    "id": "sub_123456",
    "timestamp": 1234567890,
    "type": "IT-Check",
    "data": {
      "bedrijf": "Bedrijfsnaam",
      "naam": "Jan Jansen",
      "email": "jan@bedrijf.nl",
      "telefoon": "06-12345678",
      "answers": {
        "employees": "11-50",
        "industry": "retail",
        "budget": "2.5k"
      }
    },
    "ip": "192.168.1.1"
  }
]
```

---

## 🎨 Styling & Assets

### **Tailwind CSS**

- Gebruikt Tailwind CDN voor snelle deployment
- Dark mode support via `dark:` classes
- Custom configuratie in `/assets/css/style.css`

### **Icons**

- Lucide Icons via CDN
- Auto-initialize met `lucide.createIcons()`

### **Custom CSS**

Plaats custom styles in `/assets/css/style.css`:

```css
/* Custom scrollbar */
::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: #0ea5e9;
    border-radius: 5px;
}
```

---

## 📧 Email Configuratie

### **PHP Mail**

De site gebruikt standaard PHP `mail()` functie.

Edit in `/includes/functions.php`:

```php
function send_notification($to, $subject, $message) {
    $headers = [
        'From: Systeemlink <info@systeemlink.nl>',
        'Reply-To: info@systeemlink.nl',
        'Content-Type: text/html; charset=UTF-8'
    ];
    
    return mail($to, $subject, $message, implode("\r\n", $headers));
}
```

### **SMTP (Recommended)**

Voor betere deliverability, gebruik SMTP:

```php
// Gebruik PHPMailer of een SMTP service
// https://github.com/PHPMailer/PHPMailer
```

---

## 🔒 Security

### **Ingebouwde Beveiliging**

✅ **Input Sanitization** - Alle user input wordt gesanitized  
✅ **CSRF Protection** - Token verificatie  
✅ **XSS Prevention** - htmlspecialchars()  
✅ **SQL Injection** - N/A (gebruikt JSON, geen database)  
✅ **hCaptcha** - Spam bescherming formulieren  

### **Aanbevolen Extra's**

1. **HTTPS** - Gebruik altijd SSL certificaat
2. **Firewall** - Server-level firewall (mod_security)
3. **Rate Limiting** - Bescherm tegen brute force
4. **Backups** - Dagelijkse backups van /data/ folder

---

## 🚀 Performance

### **Optimalisaties**

- ✅ Compressed HTML output
- ✅ Browser caching (.htaccess)
- ✅ Lazy loading images
- ✅ Minified CSS/JS (in productie)
- ✅ CDN voor libraries

### **Caching**

Voor betere performance, enable PHP OPcache in `php.ini`:

```ini
opcache.enable=1
opcache.memory_consumption=128
opcache.max_accelerated_files=10000
```

---

## 🌐 Multi-language (Toekomstig)

De structuur ondersteunt multi-language:

```php
// In /includes/i18n.php
function __($key) {
    $lang = $_COOKIE['language'] ?? 'nl';
    $translations = load_json_data("i18n/{$lang}.json");
    return $translations[$key] ?? $key;
}
```

---

## 📊 Analytics

### **Google Analytics**

Voeg toe aan `/includes/footer.php`:

```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🐛 Troubleshooting

### **404 Errors**

✅ Check `.htaccess` is geüpload  
✅ Verify mod_rewrite is enabled  
✅ Check file permissions  

### **Admin Login Werkt Niet**

✅ Check session_start() in index.php  
✅ Verify write permissions op /tmp/ of session folder  

### **Forms Worden Niet Verzonden**

✅ Check /data/ folder write permissions  
✅ Verify hCaptcha sitekey  
✅ Check error logs  

### **Dark Mode Werkt Niet**

✅ Check cookies zijn enabled  
✅ Verify JavaScript is enabled  
✅ Check Tailwind CDN is geladen  

---

## 📝 Changelog

### **v1.0.0** (Current)

- ✅ Complete PHP implementatie
- ✅ 14 pagina's
- ✅ IT-Check wizard met 16 stappen
- ✅ 3 scan wizards
- ✅ CMS admin systeem
- ✅ Form submissions
- ✅ Dark mode
- ✅ Responsive design

---

## 🤝 Support

Voor vragen of support:

- 📧 Email: info@systeemlink.nl
- 📞 Telefoon: +31 613777733
- 🌐 Website: https://systeemlink.nl

---

## 📜 License

© 2024 Systeemlink. Alle rechten voorbehouden.

---

## ✨ Features Samenvatting

| Feature | Status |
|---------|--------|
| Homepage | ✅ Compleet |
| IT-Check Wizard | ✅ 16 stappen |
| Security Scan | ✅ Interactive |
| Workplace Scan | ✅ Interactive |
| Cloud Scan | ✅ Interactive |
| CMS Admin | ✅ Volledig |
| Form Submissions | ✅ JSON storage |
| Dark Mode | ✅ Cookie-based |
| hCaptcha | ✅ Geïntegreerd |
| Responsive | ✅ Mobiel optimaal |
| SEO | ✅ Meta tags |
| Email Notifications | ✅ PHP mail() |

---

**Veel succes met de deployment! 🚀**
