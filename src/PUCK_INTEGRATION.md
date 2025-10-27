# 🎨 Puck Editor Integratie

## ✅ Volledig Werkende Puck Editor Integratie

De Puck Editor is nu volledig geïntegreerd in het Systeemlink CMS systeem met een professionele workflow.

---

## 📖 Hoe te Gebruiken

### 1. **Open CMS Admin**
Ga naar: `/#/be-he-er-admin`  
Wachtwoord: `Systeemlink2024!`

### 2. **Selecteer een Pagina**
- Klik op het **"Pagina's"** tabblad
- Selecteer een pagina uit de lijst (bijv. "Home", "Werkplekbeheer", etc.)

### 3. **Open Page Builder**
- Klik op de **"Page Builder"** knop (blauw) in de pagina header
- De Puck Editor opent automatisch

### 4. **Bouw je Pagina**
- **Links**: Sleep componenten uit de bibliotheek
- **Midden**: Live preview van je pagina
- **Rechts**: Edit component eigenschappen

### 5. **Preview**
- Klik op **"Preview"** knop (rechts boven) om de pagina in een nieuw tabblad te openen
- Preview URL: `/#/preview/{pageId}`

### 6. **Opslaan**
- Klik op **"Publish"** in Puck (rechts boven, groen)
- Pagina wordt automatisch opgeslagen in localStorage
- Toast melding bevestigt het opslaan

---

## 🧩 Beschikbare Componenten

### **1. Hero Section** 🎯
Premium hero section met breadcrumbs en gradient backgrounds
- **Breadcrumb**: "Oplossingen / Werkplekbeheer"
- **Badge**: Accent badge (bijv. "Nieuw")
- **Titel**: Hoofdtitel
- **Beschrijving**: Ondertitel
- **Gradient**: 4 kleuropties (Sky Blue, Indigo Purple, Emerald Green, Orange Red)
- **Buttons**: Meerdere CTA buttons (Primary/Secondary)

### **2. Content Section** 📝
Flexibele content sectie met header
- **Badge**: Optioneel accent badge
- **Titel**: Sectie titel
- **Beschrijving**: Sectie beschrijving
- **Background**: Wit, Grijs, of Gradient
- **Centered**: Tekst centreren (Ja/Nee)

### **3. Grid Section** 🎨
Grid van items met icons
- **Items**: Onbeperkt aantal grid items
  - Icon (emoji of tekst)
  - Titel
  - Beschrijving
- **Kolommen**: 2, 3, of 4 kolommen
- **Variant**: Card, Minimal, of Bordered stijl

### **4. CTA Section** 🚀
Call-to-action sectie
- **Badge**: Optioneel accent
- **Titel**: CTA titel
- **Beschrijving**: CTA beschrijving
- **Variant**: Card, Gradient, of Minimal
- **Buttons**: Meerdere action buttons

### **5. Feature List** ✅
Lijst van features/voordelen
- **Items**: Feature items met icon, titel, beschrijving
- **Kolommen**: 2, 3, of 4 kolommen

### **6. Stats Bar** 📊
Statistieken balk
- **Stats**: Statistiek items (value + label)
- Perfect voor: "500+ klanten", "24/7 support", etc.

### **7. Page Hero** 🎪
Alternatieve hero voor inner pages
- Compacter dan Hero Section
- Goede SEO structuur
- Breadcrumb support

### **8. Spacer** ↕️
Verticale ruimte toevoegen
- **Height**: 0-200px instelbaar

---

## 🔧 Technische Details

### **Data Opslag**
- Puck data wordt opgeslagen in `localStorage`
- Key format: `puck_page_{pageId}`
- Automatische conversie van CMS → Puck format
- Backwards compatible met bestaande CMS data

### **File Structuur**
```
/components/cms/PuckEditor.tsx          - Puck Editor UI wrapper
/components/PuckPageRenderer.tsx        - Renders Puck pages
/components/pages/PuckPreviewPage.tsx   - Preview mode page
/lib/puck-config.tsx                    - Component configuratie
/lib/puck-data-converter.ts             - CMS ↔ Puck conversie
```

### **Routes**
- **Admin**: `/#/be-he-er-admin` - CMS Admin panel
- **Preview**: `/#/preview/{pageId}` - Page preview

---

## 🎨 Breadcrumb Support

Alle hero componenten ondersteunen breadcrumbs:

### **Simpele Breadcrumb** (String)
```tsx
breadcrumb="Oplossingen / Werkplekbeheer"
```

### **Geavanceerde Breadcrumbs** (Links)
```tsx
breadcrumbs={[
  { label: "Home", path: "/" },
  { label: "Oplossingen", path: "/oplossingen" },
  { label: "Werkplekbeheer", path: "/oplossingen/werkplekbeheer" }
]}
```

---

## 💡 Tips & Best Practices

### **1. Component Volgorde**
Aanbevolen structuur:
1. Hero Section / Page Hero (bovenaan)
2. Content Section (intro)
3. Grid Section / Feature List (details)
4. Stats Bar (optioneel)
5. CTA Section (onderaan)

### **2. Gradient Kleuren**
Kies gradients die passen bij de pagina:
- **Sky Blue**: Workplace, Cloud, Algemeen
- **Indigo Purple**: Microsoft 365, Modern
- **Emerald Green**: Security, Betrouwbaar
- **Orange Red**: Urgent, Acties

### **3. Grid Kolommen**
- **2 kolommen**: Voor uitgebreide content
- **3 kolommen**: Balanced, meest gebruikt
- **4 kolommen**: Voor compacte items

### **4. Performance**
- Puck data is lightweight
- Geen database calls nodig
- Instant loading van localStorage

---

## 🚀 Advanced Features

### **Auto-convert van CMS Data**
Bij eerste keer openen wordt CMS data automatisch geconverteerd naar Puck format:
```typescript
// In CMSAdmin.tsx
const puckData = convertCMSToPuck(currentPageData);
PuckStorage.save(currentPage, puckData);
```

### **Preview Mode**
Preview heeft een speciale gele header bar:
- Geeft aan dat het preview is
- "Terug naar CMS" knop
- Geen Header/Footer (pure preview)

### **Data Persistentie**
Alle wijzigingen worden bewaard:
```typescript
// Opslaan
PuckStorage.save(pageId, data);

// Laden
const data = PuckStorage.load(pageId);

// Checken
const hasPuckData = PuckStorage.has(pageId);
```

---

## 🎯 Workflow Voorbeeld

1. **Login** → `/#/be-he-er-admin`
2. **Selecteer** → "Werkplekbeheer" pagina
3. **Open** → Page Builder knop
4. **Bouw**:
   - Hero Section met breadcrumb
   - Content Section met intro
   - Grid met 3 features
   - CTA Section
5. **Preview** → Test in nieuw tabblad
6. **Publish** → Opslaan
7. **Live** → Pagina is live!

---

## 🐛 Troubleshooting

### **Component verschijnt niet?**
- Check of Puck CSS is geladen (`@measured/puck/puck.css`)
- Refresh de browser
- Clear localStorage en probeer opnieuw

### **Preview werkt niet?**
- Check of pageId correct is in URL
- Bekijk browser console voor errors
- Verify dat data is opgeslagen in localStorage

### **Breadcrumb wordt niet getoond?**
- Gebruik `breadcrumb` prop (string) voor simpele breadcrumb
- Check HeroSection component implementatie
- Verify gradient en andere props zijn correct

---

## ✨ Features Samenvatting

✅ **Volledig werkende Puck Editor**  
✅ **8 professionele componenten**  
✅ **Breadcrumb support**  
✅ **Preview functionaliteit**  
✅ **Auto-save in localStorage**  
✅ **CMS data conversie**  
✅ **Responsive UI**  
✅ **Toast notificaties**  
✅ **Live component preview**  
✅ **Drag & drop interface**

---

## 📝 Volgende Stappen

De Puck Editor is **production-ready** en kan nu worden gebruikt voor:
- Nieuwe landing pages maken
- Bestaande pagina's visueel bewerken
- A/B testing van verschillende layouts
- Snelle prototypes bouwen
- Marketing campagne pages

**Veel plezier met bouwen!** 🎨✨
