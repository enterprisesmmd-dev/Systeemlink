# 🚀 Moderne Web Technologieën - Systeemlink Website

Deze website maakt gebruik van de nieuwste web technologieën voor optimale performance en gebruikerservaring.

## 📊 Performance Monitoring

### Web Vitals Tracking
De website monitort automatisch de belangrijkste performance metrics:
- **LCP (Largest Contentful Paint)** - Laadsnelheid van hoofdcontent
- **FID (First Input Delay)** - Responsiviteit bij eerste interactie  
- **CLS (Cumulative Layout Shift)** - Visuele stabiliteit

Deze metrics worden gelogd in de browser console en kunnen eenvoudig gekoppeld worden aan analytics services.

**Bestand:** `/hooks/useWebVitals.ts`

## 🎯 Intersection Observer API

### Scroll-geactiveerde Animaties
Met de moderne Intersection Observer API worden elementen alleen geanimeerd wanneer ze in beeld komen:

```tsx
import { AnimatedSection } from './components/AnimatedSection';

<AnimatedSection animation="fade-up" delay={0.2}>
  <div>Content die smooth inslide</div>
</AnimatedSection>
```

**Beschikbare animaties:**
- `fade-up` - Van onder naar boven met fade
- `fade-in` - Simpele fade-in
- `slide-left` - Van links naar rechts
- `slide-right` - Van rechts naar links  
- `scale` - Zoom-in effect

**Bestanden:** 
- `/hooks/useIntersectionObserver.ts`
- `/components/AnimatedSection.tsx`

## 🖼️ Lazy Loading Images

### Intelligente Image Loading
Images worden pas geladen wanneer ze bijna in beeld komen (100px van tevoren):

```tsx
import { LazyImage } from './components/LazyImage';

<LazyImage 
  src="/path/to/image.jpg"
  alt="Beschrijving"
  aspectRatio="16/9"
  priority={false} // true voor above-the-fold images
/>
```

**Voordelen:**
- ⚡ Snellere initiële pagina load
- 📉 Minder data gebruik
- 🎨 Smooth skeleton loading
- 🔍 SEO-vriendelijk met native lazy loading

**Bestand:** `/components/LazyImage.tsx`

## 🚄 Link Prefetching

### Instant Page Navigation
Belangrijke pagina's worden vooraf geladen voor instant navigatie:

```tsx
import { PrefetchLink } from './components/PrefetchLink';

<PrefetchLink to="/contact">
  Contact
</PrefetchLink>
```

**Werking:**
- Bij hover over link wordt de pagina vooraf geladen
- Bij klik voelt de navigatie instant
- Automatische prefetch van kritische pagina's bij page load

**Bestanden:**
- `/hooks/usePrefetch.ts`  
- `/components/PrefetchLink.tsx`

**Vooraf geladen pagina's:**
- Homepage (/)
- IT-check (/it-check)
- Oplossingen (/oplossingen)
- Branches (/branches)
- Contact (/bedrijfsinformatie/contact)

## 📡 Online/Offline Detection

### Network Status Monitoring
De website toont automatisch een melding wanneer de internetverbinding wegvalt:

```tsx
<PerformanceMonitor />
```

**Features:**
- 🔌 Automatische detectie van online/offline status
- 📢 User-friendly melding bij verbindingsverlies
- 📊 Performance logging in console

**Bestand:** `/components/PerformanceMonitor.tsx`

## ⬆️ Scroll Behavior

### Auto Scroll to Top
Bij elke page navigatie scrollt de website automatisch naar boven:

**Bestand:** `/components/ScrollToTop.tsx`

### Back to Top Button
Na 500px scrollen verschijnt een floating button om terug naar boven te gaan:

**Bestand:** `/components/BackToTop.tsx`

## 🍪 Cookie Consent

### GDPR-Compliant Cookie Banner
Moderne, user-friendly cookie consent met localStorage:

**Features:**
- ⏱️ 1 seconde delay voor betere UX
- 💾 LocalStorage voor persistent consent
- 🎨 Smooth animaties met Motion
- 📱 Responsive design

**Bestand:** `/components/CookieConsent.tsx`

## 🎬 Motion Animations

De website gebruikt Motion (voorheen Framer Motion) voor vloeiende animaties:

```tsx
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

## 🎨 Modern CSS Features

### Tailwind CSS v4.0
- CSS Variables voor theming
- Container queries support
- Modern color palette
- Grain overlay texture (30% opacity)

### Custom Typography
Montserrat font geïmplementeerd met optimale load performance.

## 📱 Progressive Enhancement

De website werkt op alle moderne browsers en degraded gracefully op oudere browsers:

- ✅ Modern browsers: Alle features
- ✅ Oudere browsers: Core functionaliteit blijft werken
- ✅ JavaScript disabled: Basis content toegankelijk

## 🔧 Development Tools

### Performance Debugging
Open browser console om performance metrics te zien:
- Page load times
- Web Vitals scores
- Network status changes

### Browser DevTools
Alle features zijn zichtbaar in:
- Network tab (prefetching)
- Performance tab (animations)
- Application tab (localStorage, offline status)

## 🚀 Future Enhancements

Mogelijke toevoegingen:
- Service Worker voor offline support
- Push notifications
- Background sync
- Web Share API
- Geolocation API voor dichtstbijzijnde vestiging

---

**Built with ❤️ using the latest web technologies**
