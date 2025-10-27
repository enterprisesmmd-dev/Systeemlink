# 🎨 Sanity CMS Integratie - Systeemlink Website

## ✅ Wat is er gebouwd?

Je website is nu volledig geïntegreerd met **Sanity.io**, een professionele headless CMS. Dit betekent dat je alle content kunt beheren via een mooie admin interface, zonder code aan te passen.

## 📁 Wat is er toegevoegd?

### 1. **CMS Configuratie**
- `/lib/sanity.ts` - Sanity client setup
- `/lib/sanity-types.ts` - TypeScript types voor content
- `/sanity-schemas/index.ts` - Content schemas voor Sanity Studio

### 2. **Custom Hooks**
- `/hooks/useSanityData.ts` - React hooks voor easy data fetching

### 3. **Aangepaste Pagina's**
- `VacanciesPage.tsx` - Haalt vacatures op uit Sanity
- `PartnersPage.tsx` - Haalt partners & certificeringen op uit Sanity

### 4. **Documentatie**
- `/SANITY_SETUP.md` - Volledige setup instructies
- `/CMS_README.md` - Dit bestand

## 🚀 Snelle Start (5 minuten)

### Stap 1: Maak een Sanity Account
1. Ga naar [sanity.io](https://www.sanity.io)
2. Klik op "Get started" en maak een gratis account
3. Klik op "Create new project"
4. Naam: "Systeemlink Website"
5. **Kopieer je Project ID** (bijvoorbeeld: `abc123xyz`)

### Stap 2: Voeg je Project ID toe
Open `/lib/sanity.ts` en vervang op regel 5:
```typescript
projectId: 'YOUR_PROJECT_ID',  // ← Vervang dit
```
Met:
```typescript
projectId: 'abc123xyz',  // ← Je eigen Project ID
```

### Stap 3: Installeer Sanity Studio (Lokaal)
Open een terminal in een **nieuwe folder** (niet in deze project folder):

```bash
npm create sanity@latest
```

Volg de wizard:
- **Select project**: Kies je "Systeemlink Website" project
- **Dataset**: `production`
- **Output path**: `systeemlink-studio`
- **Template**: "Clean project with no schema"

### Stap 4: Kopieer de Schemas
1. Open de folder `/sanity-schemas/index.ts` in deze repo
2. Kopieer alle schema definities
3. Ga naar je Sanity Studio folder: `systeemlink-studio/schemaTypes/`
4. Maak nieuwe bestanden aan voor elke schema (of voeg alles toe aan `index.ts`)
5. Zorg dat de schemas geïmporteerd worden in `sanity.config.ts`

Voorbeeld `sanity.config.ts`:
```typescript
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Systeemlink Website',
  projectId: 'abc123xyz', // Je Project ID
  dataset: 'production',
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
})
```

### Stap 5: Start Sanity Studio
```bash
cd systeemlink-studio
npm run dev
```

Studio opent op: `http://localhost:3333`

### Stap 6: Voeg Content Toe
1. Open Sanity Studio in je browser
2. Klik op een content type (bijv. "Vacatures")
3. Klik "Create new"
4. Vul de velden in
5. Klik "Publish"

### Stap 7: Configureer CORS (Belangrijk!)
1. Ga naar [manage.sanity.io](https://manage.sanity.io)
2. Selecteer je project
3. Ga naar **API** → **CORS Origins**
4. Klik **Add CORS origin**
5. Voeg toe: `http://localhost:5173` (voor development)
6. Allow credentials: ✅ Ja

### Stap 8: Test de Verbinding
Refresh je website en check de Vacatures of Partners pagina - je zou de content uit Sanity moeten zien!

## 📊 Beschikbare Content Types

| Content Type | Wat kun je beheren? |
|-------------|---------------------|
| **Vacatures** | Functietitel, locatie, type, beschrijving, vereisten |
| **Partners** | Partner naam, logo, beschrijving, categorie |
| **Certificeringen** | Naam, logo (als type "certificering") |
| **Startpagina** | Hero titel, beschrijving, button teksten |
| **Over Ons** | Missie, visie, teamleden |
| **Contactinfo** | Telefoon, email, adres, openingstijden |

## 🎯 Hoe gebruik je de CMS in je code?

### Optie 1: Custom Hook (Aanbevolen)
```typescript
import { useVacancies } from '../hooks/useSanityData';

function MyComponent() {
  const { data: vacancies, loading, error } = useVacancies();
  
  if (loading) return <p>Laden...</p>;
  if (error) return <p>Error!</p>;
  
  return (
    <div>
      {vacancies.map(v => <div key={v._id}>{v.title}</div>)}
    </div>
  );
}
```

### Optie 2: Direct Fetch
```typescript
import { sanityClient } from '../lib/sanity';

const data = await sanityClient.fetch(`*[_type == "vacancy"]`);
```

## 💡 Tips & Tricks

### Content Preview
Sanity heeft live preview - wijzigingen zijn **direct** zichtbaar zonder rebuild!

### Afbeeldingen
Upload afbeeldingen direct in Sanity Studio. Ze worden automatisch geoptimaliseerd en geserved via de Sanity CDN.

### GROQ Query Language
Sanity gebruikt GROQ voor queries. Voorbeelden:
```groq
// Alle vacatures, nieuwste eerst
*[_type == "vacancy"] | order(publishedAt desc)

// Specifieke vacature op slug
*[_type == "vacancy" && slug.current == "it-engineer"][0]

// Partners met logo
*[_type == "partner" && defined(logo)]
```

### Development vs Production
- Gebruik `development` dataset voor testen
- Gebruik `production` dataset voor live content
- Wissel eenvoudig in `/lib/sanity.ts`

## 📚 Handige Links

- [Sanity Documentatie](https://www.sanity.io/docs)
- [GROQ Cheat Sheet](https://www.sanity.io/docs/query-cheat-sheet)
- [React Integration](https://www.sanity.io/guides/sanity-nextjs-guide)
- [Sanity Studio](https://www.sanity.io/docs/sanity-studio)

## 🆘 Problemen?

### "Cannot read property of undefined"
→ Zorg dat je Project ID correct is ingevuld

### CORS Error
→ Voeg je localhost URL toe in Sanity dashboard (API → CORS)

### "No documents found"
→ Voeg eerst content toe via Sanity Studio

### Studio laadt niet
→ Check of schemas correct zijn geïmporteerd in `sanity.config.ts`

## 🎉 Klaar!

Je hebt nu een professionele CMS voor je Systeemlink website. Voeg content toe via Sanity Studio en zie het direct verschijnen op je website!

Veel succes! 🚀
