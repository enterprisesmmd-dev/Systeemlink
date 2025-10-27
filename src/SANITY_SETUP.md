# Sanity.io CMS Setup voor Systeemlink

## Stap 1: Sanity Project Aanmaken

1. Ga naar [sanity.io](https://www.sanity.io) en maak een gratis account aan
2. Klik op "Create new project"
3. Geef je project een naam: "Systeemlink Website"
4. Kies een dataset naam: "production"
5. Kopieer je **Project ID** (deze heb je nodig!)

## Stap 2: Project ID Toevoegen

Open het bestand `/lib/sanity.ts` en vervang:
```typescript
projectId: 'YOUR_PROJECT_ID'
```
Door je eigen Project ID:
```typescript
projectId: 'jouw-project-id-hier'
```

## Stap 3: Sanity Studio Installeren

Sanity Studio is de admin interface waar je content kunt bewerken. Installeer dit in een aparte folder:

```bash
# Maak een nieuwe folder voor Sanity Studio
npm create sanity@latest -- --project jouw-project-id --dataset production

# Of via de Sanity CLI
npm install -g @sanity/cli
sanity init
```

Volg de instructies en kies:
- Project: Selecteer je "Systeemlink Website" project
- Dataset: production
- Output path: `systeemlink-studio` (of een andere naam)

## Stap 4: Schemas Importeren

Kopieer de schemas uit `/sanity-schemas/index.ts` naar je Sanity Studio project:

1. Open je Sanity Studio folder
2. Ga naar `schemas/` of `schemaTypes/`
3. Kopieer de schema definities uit `/sanity-schemas/index.ts`
4. Voeg ze toe aan je schema configuratie

In je Sanity Studio configuratie (meestal `sanity.config.ts` of `sanity.config.js`):

```typescript
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Systeemlink Website',
  projectId: 'jouw-project-id',
  dataset: 'production',
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
})
```

## Stap 5: Sanity Studio Starten

```bash
cd systeemlink-studio
npm run dev
```

De Studio wordt geopend op `http://localhost:3333`

## Stap 6: Content Toevoegen

1. Open Sanity Studio in je browser
2. Voeg je eerste content toe:
   - **Startpagina**: Vul de hero teksten in
   - **Vacatures**: Voeg vacatures toe
   - **Partners**: Upload partner logo's
   - **Contactinformatie**: Vul telefoonnummer, email, etc. in
   - **Over Ons**: Vul company informatie in

## Stap 7: CORS Instellingen (Belangrijk!)

Om data op te kunnen halen vanuit je website:

1. Ga naar [manage.sanity.io](https://manage.sanity.io)
2. Selecteer je project
3. Ga naar "API" → "CORS Origins"
4. Klik "Add CORS origin"
5. Voeg toe: `http://localhost:5173` (voor development)
6. Voor productie: voeg je live website URL toe

## Content Types die beschikbaar zijn:

### 1. Startpagina (homePage)
- Hero titel, ondertitel, beschrijving
- Button teksten

### 2. Vacatures (vacancy)
- Functietitel
- Locatie & afdeling
- Beschrijving
- Vereisten
- Verantwoordelijkheden
- Wat wij bieden

### 3. Partners & Certificeringen (partner)
- Naam
- Logo
- Beschrijving
- Categorie (Partner of Certificering)

### 4. Contactinformatie (contactInfo)
- Telefoonnummer
- E-mail
- Adres
- Openingstijden

### 5. Over Ons (aboutPage)
- Hero sectie
- Missie & Visie
- Teamleden met foto's

## Content Ophalen in React

Voorbeelden zie in de aangepaste pagina's zoals `VacanciesPage.tsx` en `PartnersPage.tsx`

## Tips

- **Development vs Production**: Gebruik 'development' dataset voor testen, 'production' voor live content
- **Images**: Upload afbeeldingen rechtstreeks in Sanity Studio - ze worden automatisch geoptimaliseerd
- **Real-time updates**: Content updates worden direct zichtbaar zonder rebuild
- **Gratis tier**: Geschikt voor de meeste websites (100k API requests/maand, 10GB bandwidth)

## Hulp nodig?

- [Sanity Documentatie](https://www.sanity.io/docs)
- [Sanity + React Guide](https://www.sanity.io/guides/sanity-nextjs-guide)
