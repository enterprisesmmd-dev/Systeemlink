# 🔧 Render.com SPA Routing Fix

## Probleem
Direct navigeren naar `/oplossingen` of andere routes geeft een **404 Not Found** error.

## Oorzaak
Render.com probeert een bestand `/oplossingen` te vinden, maar dit bestaat niet. In een React SPA moet alles door `index.html` gaan zodat React Router het kan afhandelen.

---

## ✅ Oplossing 1: Via render.yaml (AANBEVOLEN)

De `render.yaml` file in de root directory van dit project configuratie is al compleet. Je hoeft alleen te **redeploy**en:

### Stappen:

1. **Check of render.yaml in de root staat**
   - ✅ File bestaat al in de repository root

2. **Commit en push naar Git** (als je wijzigingen hebt gemaakt)
   ```bash
   git add .
   git commit -m "Add render.yaml for SPA routing"
   git push
   ```

3. **Trigger een nieuwe deploy op Render.com**
   - Ga naar je Static Site dashboard
   - Klik op "Manual Deploy" → "Deploy latest commit"
   - Of wacht tot automatische deploy triggert

4. **Test de routes**
   ```
   https://jouw-site.onrender.com/oplossingen
   https://jouw-site.onrender.com/branches
   https://jouw-site.onrender.com/it-check
   ```

**Als het nog niet werkt, probeer Oplossing 2 hieronder.**

---

## ✅ Oplossing 2: Handmatig Rewrite Rule toevoegen

Als de render.yaml niet wordt opgepikt, voeg handmatig een rewrite rule toe:

### Stappen:

1. **Login bij Render Dashboard**
   - Ga naar [dashboard.render.com](https://dashboard.render.com)

2. **Open je Static Site**
   - Klik op je "systeemlink" site

3. **Ga naar Settings**
   - Scroll naar "Redirects/Rewrites" sectie

4. **Voeg een Rewrite Rule toe**
   - Klik op **"Add Rule"**
   
   **Vul in:**
   ```
   Source:      /*
   Destination: /index.html
   Action:      Rewrite
   ```
   
   ⚠️ **BELANGRIJK:** 
   - Kies "Rewrite" NIET "Redirect"
   - Source moet `/*` zijn (met slash en sterretje)
   - Destination moet `/index.html` zijn (met slash)

5. **Save Changes**
   - Klik op "Save Changes"
   - Render deployt automatisch opnieuw

6. **Wacht 1-2 minuten**
   - De deploy duurt even

7. **Test opnieuw**
   ```
   https://jouw-site.onrender.com/oplossingen
   ```

---

## ✅ Oplossing 3: Build Command verifiëren

Controleer of de build correct is geconfigureerd:

### In Render Dashboard → Settings → Build & Deploy:

```
Build Command:      npm install && npm run build
Publish Directory:  dist
```

**Root Directory:** Leeg laten (tenzij je code in een subfolder staat)

---

## 🧪 Test Checklist

Na het toepassen van de fix, test deze URLs **direct** (typ in de browser, geen klikken):

- [ ] `https://jouw-site.onrender.com/`
- [ ] `https://jouw-site.onrender.com/oplossingen`
- [ ] `https://jouw-site.onrender.com/branches`
- [ ] `https://jouw-site.onrender.com/branches/zorg-en-onderwijs`
- [ ] `https://jouw-site.onrender.com/it-check`
- [ ] `https://jouw-site.onrender.com/bedrijfsinformatie/contact`

**Allemaal groen?** ✅ Perfect!  
**Nog steeds 404?** ⬇️ Zie troubleshooting hieronder.

---

## 🐛 Troubleshooting

### "404 Not Found" blijft bestaan

**Check 1: Is de Rewrite rule correct?**
- Ga naar Render Dashboard → je site → Settings
- Scroll naar "Redirects/Rewrites"
- Moet er staan: `/* → /index.html` (Rewrite)

**Check 2: Build Logs bekijken**
```
Dashboard → je site → Events → klik op laatste deploy → View Logs
```

Zoek naar:
- ❌ Errors tijdens `npm install` of `npm run build`
- ✅ "Build successful" aan het eind
- ✅ Files in `dist` directory

**Check 3: Published Files**
Na de build moet `dist/` deze bestanden bevatten:
- `index.html` ✅
- `assets/` folder met JS/CSS ✅
- `vite.svg` of andere assets ✅

**Check 4: Render.yaml syntax**
Open `render.yaml` en verifieer:
```yaml
routes:
  - type: rewrite
    source: /*
    destination: /index.html
```

Geen tabs gebruiken, alleen spaces (2 spaces per level)!

### "Build Failed"

**Common issues:**

1. **Node version mismatch**
   ```yaml
   # In render.yaml, zet:
   envVars:
     - key: NODE_VERSION
       value: 18
   ```

2. **Dependencies niet geïnstalleerd**
   ```
   Build Command: npm install && npm run build
   ```

3. **Out of memory**
   - Upgrade naar een betaald plan
   - Of optimaliseer je build (minder dependencies)

### Routes werken, maar pagina is leeg

**Check Browser Console (F12):**
- Kijk naar errors
- Vaak: "Failed to load resource" → verkeerde `base` in Vite config

**Fix:**
```ts
// vite.config.ts
export default defineConfig({
  base: '/', // Moet '/' zijn voor root deployment
  // ...
})
```

### Assets (CSS/JS) laden niet

**Check Network tab (F12):**
- Rode bestanden = 404
- Meestal verkeerde paths

**Fix in index.html:**
```html
<!-- Moet zo zijn: -->
<script type="module" src="/assets/index.js"></script>

<!-- NIET zo: -->
<script type="module" src="assets/index.js"></script>
```

---

## 📞 Nog steeds problemen?

1. **Check Render Status**
   - [status.render.com](https://status.render.com)
   - Misschien platform issues?

2. **Verwijder en hermaak de Static Site**
   - Soms helpt een verse start
   - Settings → Danger Zone → Delete Service
   - Maak opnieuw aan met correcte settings

3. **Test lokaal**
   ```bash
   npm run build
   npm run preview
   ```
   - Werkt het lokaal op http://localhost:4173/oplossingen?
   - Zo niet: probleem in de code
   - Zo wel: probleem in Render configuratie

4. **Contact Render Support**
   - Via dashboard → Support
   - Of community forum: [community.render.com](https://community.render.com)

---

## ✨ Best Practices

Na het fixen:

1. **Enable Auto-Deploy**
   - Settings → Build & Deploy
   - "Auto-Deploy" = Yes
   - Nu deploy elke Git push automatisch

2. **Custom Domain instellen**
   - Settings → Custom Domains
   - Voeg `systeemlink.nl` toe
   - Update DNS records bij je domain provider

3. **HTTPS/SSL**
   - Render geeft gratis SSL
   - Wordt automatisch geconfigureerd
   - Check: slotje in browser ✅

4. **Environment Variables** (indien nodig)
   - Settings → Environment
   - Voeg API keys etc. toe
   - NOOIT hardcoded in code!

---

## 📚 Meer Info

- [Render Docs: SPAs & Client-side Routing](https://render.com/docs/deploy-create-react-app#using-client-side-routing)
- [Render Docs: Redirects & Rewrites](https://render.com/docs/redirects-rewrites)
- [Render.yaml Reference](https://render.com/docs/yaml-spec)

Succes! 🚀
