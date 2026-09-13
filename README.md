# combine

Δύο εφαρμογές, ένα site. Ο πελάτης ανοίγει τις **κρατήσεις**· με τον
διακόπτη στην κεφαλίδα περνάει στο **καρνέ προπόνησης** χωρίς να βγει
από την εφαρμογή.

Στατικό site, χωρίς build step. Ανεβαίνει ως έχει σε GitHub Pages.

## Δομή

```
index.html          ← ο πελάτης, κρατήσεις. Η πρώτη σελίδα.
admin.html          ← η διαχείριση
review.html         ← μόνο ο δημιουργός, κριτικές
manifest.json
sw.js               ← ένας service worker για όλα
icon-180.png  icon-192.png  icon-512.png  icon-maskable-512.png
workout/
  index.html        ← το καρνέ προπόνησης
  app.js  data.js  storage.js  charts.js  styles.css
```

Το `workout/` **πρέπει** να είναι υποφάκελος του ίδιου repo. Ίδιο
origin σημαίνει ένας service worker, ένα localStorage, μία εγκατάσταση
PWA. Σε ξεχωριστό repo ο διακόπτης γίνεται εξωτερικός σύνδεσμος και ο
πελάτης φεύγει από την εφαρμογή.

## Βάση

Και οι δύο εφαρμογές δείχνουν στο ίδιο project της Supabase:
`sdddhzrbqkfayodyjnnz`.

- `index.html`, `admin.html` και `review.html` ενημερώθηκαν ήδη.
- `workout/storage.js` έδειχνε ήδη εκεί, δεν άλλαξε.

## Ανέβασμα

```bash
git init
git add .
git commit -m "combine"
git branch -M main
git remote add origin https://github.com/USERNAME/combine.git
git push -u origin main
```

Μετά: **Settings → Pages → Deploy from a branch → main / root**.

## Σε κάθε αλλαγή αρχείου

Άλλαξε το `VERSION` στον `sw.js`. Τώρα είναι `combine-v1`. Χωρίς αυτό
οι πελάτες κρατάνε τα παλιά αρχεία στη μνήμη.

## Τι λείπει ακόμα

- Λογότυπο και κωδικός δημιουργού: ανεβαίνουν από το `admin.html`.
- Λογαριασμός διαχειριστή: φτιάχνεται από την αρχή στο νέο project.
