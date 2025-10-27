# 📝 Systeemlink CMS Admin Guide

## Toegang tot CMS

**URL:** `/#/be-he-er-admin`

**Wachtwoord:** `Systeemlink2024!`

---

## ✨ Functionaliteiten

### 1. **Pagina Beheer**
- Bewerk content van alle 15 pagina's
- Voeg secties toe (Hero, Content, Stats, Features, CTA, Forms)
- Pas teksten, titels en beschrijvingen aan per sectie
- Verwijder ongewenste secties
- Real-time preview mogelijkheid

### 2. **Email Configuratie**
- Stel ontvanger email in voor contactformulieren
- Configureer email onderwerp
- Voeg CC adressen toe
- Stel reply-to adres in

### 3. **Styling Beheer**
- Overzicht van alle kleurenschema's per pagina:
  - **Sky Blue** (#0ea5e9) - Werkplekbeheer, Contact
  - **Indigo** (#6366f1) - Cloud & Microsoft 365, Branches
  - **Violet** (#8b5cf6) - Netwerk & Beveiliging, Partners
  - **Emerald** (#10b981) - IT-Support, Over Ons
  - **Pink** (#ec4899) - Vacatures

### 4. **Media Bibliotheek**
- Overzicht van gebruikte afbeeldingen
- In productie: Upload functionaliteit voor eigen media

### 5. **Data Beheer**
- **Exporteren**: Download alle content als JSON backup
- **Importeren**: Herstel data uit backup file
- **Reset**: Wis alle data en start opnieuw

---

## 🎯 Hoe te gebruiken

### Sectie Toevoegen

1. Selecteer een pagina uit de linker sidebar
2. Klik op "Sectie toevoegen" dropdown
3. Kies het type sectie:
   - **Hero**: Grote banner met titel en CTA
   - **Content**: Tekst en afbeelding sectie
   - **Stats**: Statistieken display
   - **Features**: Feature grid met icons
   - **CTA**: Call-to-action banner
   - **Form**: Formulier sectie

### Sectie Bewerken

1. Klik in een sectie om de velden te bewerken
2. Vul de content velden in
3. Voor Stats: gebruik JSON formaat, bijv:
   ```json
   [
     { "value": "99%", "label": "Uptime" },
     { "value": "24/7", "label": "Support" }
   ]
   ```
4. Klik op "Opslaan" bovenaan

### Preview Modus

- Klik op "Preview" knop om te zien hoe wijzigingen eruit zien
- Klik op "Bewerken" om terug te gaan naar edit modus

---

## 📧 Email Instellingen

De email functionaliteit is voorbereid maar in deze demo omgeving worden emails niet echt verzonden.

In een productie omgeving zou dit gekoppeld worden aan:
- SendGrid
- Mailgun
- AWS SES
- Of een andere email service

### Configuratie velden:

- **Ontvanger**: Hoofd email adres voor berichten
- **Onderwerp**: Standaard email onderwerp
- **Reply-to**: Waar antwoorden naartoe gaan
- **CC**: Extra adressen die mee ontvangen

---

## 💾 Data Opslag

Alle content wordt opgeslagen in **localStorage** van de browser:
- `cms_authenticated` - Inlog status
- `cms_pages_data` - Alle pagina content
- `cms_email_settings` - Email configuratie

### ⚠️ Belangrijk:
- Data blijft behouden na herladen
- Data wordt gewist bij browser cache wissen
- **Maak regelmatig backups** via Exporteer functie!

---

## 🔧 Troubleshooting

### Kan niet inloggen?
- Controleer wachtwoord: `Systeemlink2024!`
- Hoofdlettergevoelig
- Clear browser cache en probeer opnieuw

### Wijzigingen niet zichtbaar?
- Klik op "Opslaan" knop
- Herlaad de betreffende pagina
- Check browser console voor errors

### Data kwijt?
- Importeer laatste backup JSON file
- Of reset en begin opnieuw

---

## 🚀 Best Practices

1. **Maak regelmatig backups**
   - Download JSON export na belangrijke wijzigingen
   - Bewaar meerdere versies

2. **Test na wijzigingen**
   - Gebruik preview modus
   - Check op verschillende schermformaten

3. **Consistency**
   - Houd toon en stijl consistent
   - Gebruik dezelfde terminologie

4. **SEO**
   - Vul alle titel en beschrijving velden in
   - Gebruik relevante keywords

---

## 📱 Responsive Design

Alle content is automatisch responsive. Let op bij lange teksten:
- Titels: Max 60 karakters voor leesbaarheid
- Beschrijvingen: Max 160 karakters voor meta descriptions
- Button teksten: Kort en krachtig (max 25 karakters)

---

## 🎨 Kleur Gebruik

Elke pagina heeft een eigen kleurenschema. Bij het maken van nieuwe content, gebruik de juiste kleuren voor consistency:

| Pagina | Kleur | Hex Code |
|--------|-------|----------|
| Werkplekbeheer | Sky Blue | #0ea5e9 |
| Cloud & M365 | Indigo | #6366f1 |
| Netwerk & Security | Violet | #8b5cf6 |
| IT-Support | Emerald | #10b981 |
| Over Ons | Emerald | #10b981 |
| Partners | Violet | #8b5cf6 |
| Vacatures | Pink | #ec4899 |

---

## 🔐 Beveiliging

- CMS is alleen toegankelijk met wachtwoord
- Wachtwoord wordt lokaal gevalideerd
- Geen directe database connectie in demo
- In productie: Implement server-side authenticatie

---

## 📞 Support

Voor vragen over het CMS systeem:
- Email: support@systeemlink.nl
- Tel: +31 (0)20 123 4567

---

**Laatste update:** Oktober 2024
**Versie:** 1.0.0
