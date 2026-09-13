/* Περιεχόμενο: κατάλογος ασκήσεων, πρότυπα προγραμμάτων, στόχοι,
   οδηγός και σταθερές διατροφής.

   Το πρόγραμμα δεν είναι πια σταθερό. Φτιάχνεται από τη buildProgram()
   στο τέλος του αρχείου, με βάση τις ρυθμίσεις του χρήστη: πόσες μέρες
   μπορεί, τι εξοπλισμό έχει και ποιος είναι ο στόχος του.

   ΣΗΜΑΝΤΙΚΟ: τα id του καταλόγου είναι μόνιμα. Το ιστορικό κάθε
   άσκησης δένεται σε αυτά (session.entries[id]), οπότε ο χρήστης
   αλλάζει πρόγραμμα χωρίς να χάνει ούτε ένα κιλό από όσα έχει
   καταγράψει. Ποτέ μην αλλάξεις ένα id — πρόσθεσε καινούριο. */

/* ---------- Κατάλογος ασκήσεων ----------
   role:  main = σύνθετη με βαριά φόρτιση, aux = δευτερεύουσα σύνθετη,
          iso  = μονωτική
   equip: gym = θέλει μηχάνημα ή μπάρα, db = φτάνουν αλτήρες,
          body = μόνο το σώμα σου
   Οι ομάδες είναι ίδιες με το WEEKLY_VOLUME πιο κάτω. */

export const CATALOG = {
  /* Πόδια */
  squat:     { name: 'Squat ή Leg press',            group: 'Πόδια',   role: 'main', equip: 'gym',  step: 2.5 },
  legpress:  { name: 'Leg press',                    group: 'Πόδια',   role: 'main', equip: 'gym',  step: 5 },
  gobsquat:  { name: 'Goblet squat',                 group: 'Πόδια',   role: 'main', equip: 'db',   step: 2.5 },
  rdl:       { name: 'Romanian deadlift',            group: 'Πόδια',   role: 'main', equip: 'db',   step: 2.5 },
  hipthrust: { name: 'Hip thrust',                   group: 'Πόδια',   role: 'main', equip: 'db',   step: 5 },
  bwsquat:   { name: 'Καθίσματα με το σώμα σου',     group: 'Πόδια',   role: 'main', equip: 'body', step: 1, bodyweight: true },
  bridge:    { name: 'Γέφυρα γλουτών στο πάτωμα',    group: 'Πόδια',   role: 'iso',  equip: 'body', step: 1, bodyweight: true },
  split:     { name: 'Bulgarian split squat',        group: 'Πόδια',   role: 'aux',  equip: 'db',   step: 2 },
  legcurl:   { name: 'Κάμψεις δικεφάλων μηρού',      group: 'Πόδια',   role: 'iso',  equip: 'gym',  step: 2.5 },
  legext:    { name: 'Εκτάσεις τετρακεφάλων',        group: 'Πόδια',   role: 'iso',  equip: 'gym',  step: 2.5 },

  /* Στήθος */
  bench:     { name: 'Πιέσεις στήθους',              group: 'Στήθος',  role: 'main', equip: 'gym',  step: 2.5 },
  incline:   { name: 'Πιέσεις στήθους με κλίση',     group: 'Στήθος',  role: 'aux',  equip: 'gym',  step: 2.5 },
  dbpress:   { name: 'Πιέσεις στήθους με αλτήρες',   group: 'Στήθος',  role: 'main', equip: 'db',   step: 2 },
  fly:       { name: 'Butterfly ή σταυροί',          group: 'Στήθος',  role: 'iso',  equip: 'gym',  step: 2.5 },
  pushup:    { name: 'Push-ups',                     group: 'Στήθος',  role: 'aux',  equip: 'body', step: 1, bodyweight: true },

  /* Πλάτη */
  row:       { name: 'Κωπηλατική τροχαλίας',         group: 'Πλάτη',   role: 'main', equip: 'gym',  step: 2.5 },
  dbrow:     { name: 'Κωπηλατική με αλτήρα',         group: 'Πλάτη',   role: 'main', equip: 'db',   step: 2.5 },
  pulldown:  { name: 'Έλξεις τροχαλίας (lat pulldown)', group: 'Πλάτη', role: 'main', equip: 'gym', step: 2.5 },
  pullup:    { name: 'Έλξεις (pull-ups)',            group: 'Πλάτη',   role: 'main', equip: 'body', step: 1, bodyweight: true },
  invrow:    { name: 'Ανάποδες κωπηλατικές (inverted rows)', group: 'Πλάτη', role: 'aux', equip: 'body', step: 1, bodyweight: true },
  pullover:  { name: 'Straight-arm pulldown',        group: 'Πλάτη',   role: 'iso',  equip: 'gym',  step: 2.5 },

  /* Ώμοι */
  ohp:       { name: 'Πιέσεις ώμων',                 group: 'Ώμοι',    role: 'aux',  equip: 'gym',  step: 2.5 },
  dbohp:     { name: 'Πιέσεις ώμων με αλτήρες',      group: 'Ώμοι',    role: 'aux',  equip: 'db',   step: 2 },
  pike:      { name: 'Pike push-ups',                group: 'Ώμοι',    role: 'aux',  equip: 'body', step: 1, bodyweight: true },
  lateral:   { name: 'Πλάγιες άρσεις',               group: 'Ώμοι',    role: 'iso',  equip: 'db',   step: 1, key: true },
  facepull:  { name: 'Face pulls',                   group: 'Ώμοι',    role: 'iso',  equip: 'gym',  step: 1 },
  reverfly:  { name: 'Ανοίγματα οπίσθιων δελτοειδών', group: 'Ώμοι',   role: 'iso',  equip: 'db',   step: 1 },

  /* Χέρια */
  curl:      { name: 'Δικέφαλα με αλτήρες',          group: 'Χέρια',   role: 'iso',  equip: 'db',   step: 1 },
  hammer:    { name: 'Σφυριά (hammer curls)',        group: 'Χέρια',   role: 'iso',  equip: 'db',   step: 1 },
  triceps:   { name: 'Τρικέφαλα τροχαλίας',          group: 'Χέρια',   role: 'iso',  equip: 'gym',  step: 1 },
  dips:      { name: 'Βυθίσεις (dips)',              group: 'Χέρια',   role: 'aux',  equip: 'body', step: 1, bodyweight: true },

  /* Γάμπες και κορμός */
  calves:    { name: 'Γάμπες',                       group: 'Γάμπες',  role: 'iso',  equip: 'db',   step: 2.5 },
  calvesbw:  { name: 'Γάμπες με το σώμα σου',        group: 'Γάμπες',  role: 'iso',  equip: 'body', step: 1, bodyweight: true },
  core:      { name: 'Κορμός (plank / leg raises)',  group: 'Κορμός',  role: 'iso',  equip: 'body', step: 1, bodyweight: true },
  pallof:    { name: 'Pallof press',                 group: 'Κορμός',  role: 'iso',  equip: 'gym',  step: 1 },
  birddog:   { name: 'Bird dog / dead bug',          group: 'Κορμός',  role: 'iso',  equip: 'body', step: 1, bodyweight: true }
};

/* Παλιά id από την πρώτη έκδοση. Χρησιμεύουν μόνο για να βρίσκει το
   ιστορικό ο καινούριος κατάλογος — δεν γράφεται ποτέ τίποτα σε αυτά. */
export const ALIASES = {
  lateral: ['lateral_a', 'lateral_b', 'lateral_c'],
  bench:   ['bench_c'],
  core:    ['core_a'],
  squat:   [],
  row:     [],
  rdl:     []
};

/* Εναλλακτικές αν δεν υπάρχει ο εξοπλισμός. Πρώτη που ταιριάζει κερδίζει. */
const FALLBACK = {
  squat:    ['gobsquat', 'split', 'bwsquat'],
  legpress: ['gobsquat', 'split'],
  rdl:      ['hipthrust', 'split', 'bridge'],
  hipthrust:['rdl', 'split', 'bridge'],
  legcurl:  ['rdl', 'split', 'bridge'],
  legext:   ['split', 'gobsquat', 'bwsquat'],
  bench:    ['dbpress', 'pushup'],
  incline:  ['dbpress', 'pushup'],
  fly:      ['dbpress', 'pushup'],
  row:      ['dbrow', 'invrow'],
  pulldown: ['pullup', 'dbrow', 'invrow'],
  pullover: ['dbrow', 'pullup'],
  ohp:      ['dbohp', 'pike'],
  facepull: ['reverfly'],
  triceps:  ['dips'],
  calves:   ['calvesbw'],
  pallof:   ['core', 'birddog'],
  dips:     ['pushup'],
  pushup:   ['dips'],
  split:    ['gobsquat', 'hipthrust', 'bwsquat'],
  gobsquat: ['split', 'bwsquat'],
  dbrow:    ['row', 'pullup', 'invrow'],
  pullup:   ['pulldown', 'dbrow'],
  dbpress:  ['pushup', 'bench'],
  dbohp:    ['ohp', 'pike'],
  reverfly: ['facepull'],
  lateral:  ['reverfly', 'pike'],
  curl:     ['hammer'],
  hammer:   ['curl'],
  core:     ['birddog'],
  birddog:  ['core']
};

/* ---------- Πρότυπα ανά αριθμό ημερών ----------
   Κάθε ημέρα είναι μια λίστα από id του καταλόγου. Η σειρά μετράει:
   πρώτα οι σύνθετες, μετά οι μονωτικές. */

export const TEMPLATES = {
  2: {
    label: 'Full body ×2',
    note: 'Δύο μέρες, όλο το σώμα κάθε φορά. Το ελάχιστο που φέρνει αποτέλεσμα.',
    days: [
      { letter: 'Α', name: 'Ημέρα Α', focus: 'Squat · Στήθος · Έλξεις',
        slots: ['squat', 'bench', 'pulldown', 'lateral', 'curl', 'core'] },
      { letter: 'Β', name: 'Ημέρα Β', focus: 'Οπίσθια αλυσίδα · Ώμοι · Κωπηλατική',
        slots: ['rdl', 'row', 'ohp', 'lateral', 'triceps', 'calves'] }
    ]
  },
  3: {
    label: 'Full body ×3',
    note: 'Η καλύτερη δομή για τον πρώτο χρόνο: κάθε μυς 3 φορές την εβδομάδα.',
    days: [
      { letter: 'Α', name: 'Ημέρα Α', focus: 'Squat · Στήθος · Κωπηλατική',
        slots: ['squat', 'bench', 'row', 'lateral', 'curl', 'core'] },
      { letter: 'Β', name: 'Ημέρα Β', focus: 'Οπίσθια αλυσίδα · Έλξεις · Ώμοι',
        slots: ['rdl', 'pulldown', 'ohp', 'incline', 'lateral', 'triceps'] },
      { letter: 'Γ', name: 'Ημέρα Γ', focus: 'Πόδια · Πλάτη · Οπίσθιοι δελτοειδείς',
        slots: ['legpress', 'dbrow', 'bench', 'facepull', 'lateral', 'calves'] }
    ]
  },
  4: {
    label: 'Άνω / Κάτω ×2',
    note: 'Περισσότερος χρόνος ανά μυϊκή ομάδα, με δύο μέρες άνω και δύο κάτω.',
    days: [
      { letter: 'Α', name: 'Άνω Α', focus: 'Στήθος · Πλάτη · Ώμοι',
        slots: ['bench', 'row', 'ohp', 'lateral', 'curl', 'triceps'] },
      { letter: 'Β', name: 'Κάτω Α', focus: 'Squat · Τετρακέφαλοι · Κορμός',
        slots: ['squat', 'split', 'legext', 'calves', 'core'] },
      { letter: 'Γ', name: 'Άνω Β', focus: 'Έλξεις · Κλίση · Οπίσθιοι δελτοειδείς',
        slots: ['pulldown', 'incline', 'dbrow', 'lateral', 'facepull', 'hammer'] },
      { letter: 'Δ', name: 'Κάτω Β', focus: 'Οπίσθια αλυσίδα · Γλουτοί',
        slots: ['rdl', 'hipthrust', 'legcurl', 'calves', 'pallof'] }
    ]
  },
  5: {
    label: 'Άνω / Κάτω / Push / Pull / Πόδια',
    note: 'Για όποιον προπονείται σταθερά και θέλει όγκο ανά μυϊκή ομάδα.',
    days: [
      { letter: 'Α', name: 'Άνω', focus: 'Στήθος · Πλάτη · Ώμοι',
        slots: ['bench', 'row', 'ohp', 'lateral', 'curl', 'triceps'] },
      { letter: 'Β', name: 'Κάτω', focus: 'Squat · Γάμπες',
        slots: ['squat', 'legcurl', 'legext', 'calves', 'core'] },
      { letter: 'Γ', name: 'Push', focus: 'Στήθος · Ώμοι · Τρικέφαλα',
        slots: ['incline', 'dbohp', 'fly', 'lateral', 'triceps'] },
      { letter: 'Δ', name: 'Pull', focus: 'Πλάτη · Οπίσθιοι δελτοειδείς · Δικέφαλα',
        slots: ['pulldown', 'dbrow', 'facepull', 'pullover', 'hammer'] },
      { letter: 'Ε', name: 'Πόδια', focus: 'Οπίσθια αλυσίδα · Γλουτοί',
        slots: ['rdl', 'hipthrust', 'split', 'calves', 'pallof'] }
    ]
  },
  6: {
    label: 'Push / Pull / Πόδια ×2',
    note: 'Μεγάλος όγκος, έξι μέρες. Μόνο αν ο ύπνος και η διατροφή είναι σταθερά.',
    days: [
      { letter: 'Α', name: 'Push Α', focus: 'Στήθος · Ώμοι · Τρικέφαλα',
        slots: ['bench', 'dbohp', 'fly', 'lateral', 'triceps'] },
      { letter: 'Β', name: 'Pull Α', focus: 'Πλάτη · Δικέφαλα',
        slots: ['pulldown', 'row', 'facepull', 'curl'] },
      { letter: 'Γ', name: 'Πόδια Α', focus: 'Squat · Τετρακέφαλοι',
        slots: ['squat', 'legext', 'calves', 'core'] },
      { letter: 'Δ', name: 'Push Β', focus: 'Κλίση · Ώμοι',
        slots: ['incline', 'ohp', 'pushup', 'lateral', 'triceps'] },
      { letter: 'Ε', name: 'Pull Β', focus: 'Έλξεις · Οπίσθιοι δελτοειδείς',
        slots: ['pullup', 'dbrow', 'reverfly', 'hammer'] },
      { letter: 'ΣΤ', name: 'Πόδια Β', focus: 'Οπίσθια αλυσίδα · Γλουτοί',
        slots: ['rdl', 'hipthrust', 'legcurl', 'calves', 'pallof'] }
    ]
  }
};

export const DAY_KEYS = ['A', 'B', 'C', 'D', 'E', 'F'];

/* Όγκος ανά μυϊκή ομάδα την εβδομάδα, για τον έλεγχο στην καρτέλα Πρόοδος. */
export const WEEKLY_VOLUME = [
  { group: 'Ώμοι',   target: '15–25', max: 25, note: 'Οι πλάγιοι δελτοειδείς είναι ο σημαντικότερος μυς για οπτικό πλάτος. Μικρός μυς — δεν σε κάνει ογκώδη.' },
  { group: 'Πλάτη',  target: '10–20', max: 20, note: 'Ο πλατύς ραχιαίος δίνει πλάτος και «σφηνώνει» το V.' },
  { group: 'Στήθος', target: '10–20', max: 20, note: 'Έμφαση στο άνω στήθος για γεμάτη εμφάνιση.' },
  { group: 'Πόδια',  target: '10–20', max: 20, note: 'Απαραίτητα για ισορροπία, χωρίς κυνήγι όγκου.' },
  { group: 'Χέρια',  target: '6–12',  max: 12, note: 'Δουλεύουν ήδη έμμεσα στις πιέσεις και τις έλξεις.' },
  { group: 'Γάμπες', target: '4–10',  max: 10, note: 'Δίνουν την τελική αθλητική λεπτομέρεια όταν πέσει το λίπος.' },
  { group: 'Κορμός', target: '4–10',  max: 10, note: 'Planks και leg raises. Όχι βαριές πλάγιες κάμψεις — πλαταίνουν τη μέση.' }
];

/* Οι μυϊκές ομάδες, όπως τις ξέρει και ο έλεγχος όγκου. */
export const GROUPS = WEEKLY_VOLUME.map((v) => v.group);

/* Έτοιμες εναλλακτικές ανά μυϊκή ομάδα, για την «Αλλαγή» πάνω σε κάθε άσκηση.
   Δεν είναι κλειστή λίστα — μπορείς πάντα να γράψεις ό,τι έχει το γυμναστήριό σου. */
export const ALTERNATIVES = {
  'Ώμοι': [
    'Πλάγιες άρσεις με αλτήρες',
    'Πλάγιες άρσεις τροχαλίας',
    'Πλάγιες άρσεις μηχανής',
    'Πιέσεις ώμων με αλτήρες',
    'Πιέσεις ώμων μηχανής',
    'Πιέσεις ώμων με μπάρα',
    'Arnold press',
    'Face pulls',
    'Ανοίγματα οπίσθιων δελτοειδών (reverse fly)'
  ],
  'Πλάτη': [
    'Έλξεις (pull-ups)',
    'Έλξεις με βοήθεια (assisted)',
    'Έλξεις τροχαλίας (lat pulldown)',
    'Έλξεις τροχαλίας με στενή λαβή',
    'Κωπηλατική τροχαλίας καθιστός',
    'Κωπηλατική με αλτήρα',
    'Κωπηλατική με μπάρα',
    'Κωπηλατική μηχανής',
    'T-bar row',
    'Straight-arm pulldown'
  ],
  'Στήθος': [
    'Πιέσεις στήθους με μπάρα',
    'Πιέσεις στήθους με αλτήρες',
    'Πιέσεις στήθους με κλίση',
    'Πιέσεις στήθους μηχανής',
    'Butterfly / pec deck',
    'Σταυροί τροχαλίας',
    'Push-ups'
  ],
  'Πόδια': [
    'Squat με μπάρα',
    'Goblet squat',
    'Hack squat',
    'Leg press',
    'Bulgarian split squat',
    'Προβολές (lunges)',
    'Romanian deadlift',
    'Hip thrust',
    'Εκτάσεις τετρακεφάλων',
    'Κάμψεις δικεφάλων μηρού'
  ],
  'Χέρια': [
    'Δικέφαλα με αλτήρες',
    'Σφυριά (hammer curls)',
    'Δικέφαλα με μπάρα EZ',
    'Δικέφαλα τροχαλίας',
    'Τρικέφαλα τροχαλίας',
    'Τρικέφαλα με σχοινί',
    'Γαλλικές πιέσεις',
    'Εκτάσεις πάνω από το κεφάλι',
    'Βυθίσεις (dips)'
  ],
  'Γάμπες': [
    'Γάμπες όρθιος',
    'Γάμπες καθιστός',
    'Γάμπες στο leg press'
  ],
  'Κορμός': [
    'Plank',
    'Leg raises',
    'Hanging knee raises',
    'Cable crunch',
    'Ab wheel',
    'Dead bug'
  ]
};

export const NUTRITION = {
  activity: [
    { id: 1.2,   label: 'Καθιστική ζωή, ελάχιστο περπάτημα' },
    { id: 1.375, label: 'Ελαφριά δραστηριότητα, 1–3 προπονήσεις' },
    { id: 1.55,  label: 'Μέτρια, 3–5 προπονήσεις + περπάτημα' },
    { id: 1.725, label: 'Υψηλή, χειρωνακτική δουλειά ή 6+ προπονήσεις' }
  ],
  goals: [
    { id: 'recomp', label: 'Recomposition', delta: -0.10, hint: 'Ελαφρύ έλλειμμα ~10%. Η ζυγαριά μένει σχεδόν σταθερή ενώ αλλάζει η σύσταση.' },
    { id: 'cut',    label: 'Γράμμωση',      delta: -0.18, hint: 'Στόχος ~0.5% του βάρους την εβδομάδα. Πιο γρήγορα σημαίνει απώλεια μυών.' },
    { id: 'bulk',   label: 'Lean bulk',     delta: 0.08,  hint: 'Ελαφρύ πλεόνασμα. Για όταν είσαι ήδη γύρω στο 12% και θέλεις περισσότερο μυ.' }
  ],
  proteinPerKg: 2.0,
  fatPerKg: 0.8,
  caloriesFloor: 1500
};

export const GUIDE = [
  {
    id: 'structure',
    title: 'Δομή προγράμματος',
    body: [
      'Ως αρχάριος το βέλτιστο είναι full-body 3 φορές την εβδομάδα, με μία μέρα ξεκούρασης ανάμεσα. Κάθε μυς δουλεύει 2–3 φορές την εβδομάδα, που είναι το σημείο όπου η έρευνα δείχνει τα καλύτερα αποτελέσματα.',
      'Το κλασικό push/pull/legs 3 ημερών προπονεί κάθε μυ μόνο μία φορά την εβδομάδα και υστερεί σε αυτή τη φάση. Το full-body σου δίνει και περισσότερες επαναλήψεις εξάσκησης στην τεχνική, που είναι κρίσιμο τους πρώτους μήνες.',
      'Διάρκεια 60–75 λεπτά. Ξεκούραση 2–3 λεπτά στις σύνθετες, 1–2 στις μονωτικές.'
    ]
  },
  {
    id: 'vtaper',
    title: 'Γιατί αυτές οι ασκήσεις',
    body: [
      'Η αθλητική εμφάνιση χωρίς όγκο καθορίζεται από τον λόγο ώμων προς μέση. Μεγαλώνεις τον αριθμητή και κρατάς τη μέση στενή.',
      'Πλάγιοι δελτοειδείς: ο σημαντικότερος μυς για οπτικό πλάτος. Γι\' αυτό υπάρχουν πλάγιες άρσεις και στις τρεις ημέρες.',
      'Πλατύς ραχιαίος: έλξεις και κωπηλατικές για πλάτος πλάτης.',
      'Μέτρο στον άνω τραπεζοειδή — υπερβολικός όγκος «κλείνει» τον λαιμό και μειώνει οπτικά το πλάτος των ώμων. Απόφυγε βαριές πλάγιες κάμψεις με αλτήρα: πλαταίνουν τη μέση.'
    ]
  },
  {
    id: 'progress',
    title: 'Πώς ανεβάζεις βάρη',
    body: [
      'Κράτα 1–3 επαναλήψεις στο ρεζερβουάρ. Η έρευνα δείχνει ελάχιστο πλεονέκτημα στο να πηγαίνεις μέχρι την αποτυχία, με πολύ μεγαλύτερη κόπωση.',
      'Διπλή προοδευτικότητα: μείνε στο ίδιο βάρος και πρόσθετε επαναλήψεις. Όταν πιάσεις το πάνω όριο του εύρους σε όλα τα σετ, ανέβασε στο μικρότερο δυνατό βήμα και ξαναρχίζεις από κάτω.',
      'Η εφαρμογή το παρακολουθεί για σένα: όταν κλειδώσεις όλα τα σετ στο πάνω όριο, η άσκηση σου προτείνει το επόμενο βάρος.',
      'Μείνε στο ίδιο πρόγραμμα τουλάχιστον 8–12 εβδομάδες. Ελαφριά εβδομάδα κάθε 8–12 εβδομάδες ή όποτε νιώσεις επίμονη κόπωση.'
    ]
  },
  {
    id: 'nutrition',
    title: 'Διατροφή',
    body: [
      'Είσαι αρχάριος με λίγο λίπος, άρα ιδανικός υποψήφιος για recomposition: χτίζεις μυ και χάνεις λίπος ταυτόχρονα. Δεν χρειάζεσαι ούτε επιθετικό bulk ούτε ακραίο cut.',
      'Πρωτεΐνη 1.6–2.2 γραμμάρια ανά κιλό, μοιρασμένη σε 3–5 γεύματα των 20–40 γραμμαρίων.',
      'Λιπαρά 0.6–1 g/kg για ορμονική υγεία. Οι υπόλοιπες θερμίδες σε υδατάνθρακες — είναι το καύσιμο της προπόνησης.',
      'Το «αναβολικό παράθυρο» είναι υπερεκτιμημένο. Ένα γεύμα με πρωτεΐνη λίγες ώρες πριν ή μετά αρκεί.',
      'Καμία τροφή δεν είναι απαγορευμένη. Η ισορροπία και η συνέπεια νικούν κάθε ακραία δίαιτα.'
    ]
  },
  {
    id: 'cardio',
    title: 'Καρδιο και ανάρρωση',
    body: [
      'Βάση: 8.000–10.000 βήματα την ημέρα. Είναι ο πιο ανώδυνος τρόπος να αυξήσεις τη δαπάνη.',
      'Ένα έως τρία LISS των 20–40 λεπτών. Ποδήλατο αντί για τρέξιμο — λιγότερη παρεμβολή στα πόδια.',
      'Αν συνδυάσεις στην ίδια συνεδρία, πρώτα τα βάρη.',
      'Ύπνος 7–9 ώρες. Είναι το πιο υποτιμημένο κομμάτι — η έλλειψή του μειώνει τη μυϊκή σύνθεση και ανεβάζει την κορτιζόλη.',
      'Ο μυϊκός πόνος δεν είναι δείκτης καλής προπόνησης. Ο δείκτης είναι τα νούμερα στο ημερολόγιο.'
    ]
  },
  {
    id: 'supps',
    title: 'Συμπληρώματα',
    body: [
      'Αξίζουν: κρεατίνη μονοϋδρική 3–5 g την ημέρα, πρωτεΐνη σε σκόνη ως εργαλείο ευκολίας, καφεΐνη 3–6 mg/kg πριν την προπόνηση, βιταμίνη D μόνο αν έχεις έλλειψη — κάνε πρώτα εξέταση.',
      'Δεν αξίζουν: BCAA και EAA αν πιάνεις τη συνολική πρωτεΐνη, λιποδιαλύτες, «testosterone boosters», εξωτικές μορφές κρεατίνης.'
    ]
  },
  {
    id: 'timeline',
    title: 'Ρεαλιστικό χρονοδιάγραμμα',
    body: [
      'Ρυθμός: ρεαλιστικά 0.5–1 κιλό μυός τον μήνα τον πρώτο χρόνο. Ο ρυθμός περίπου υποδιπλασιάζεται κάθε επόμενο χρόνο.',
      'Δύναμη και αίσθηση βελτιώνονται σε 2–4 εβδομάδες. Ορατές αλλαγές στον καθρέφτη σε 8–12 εβδομάδες. Σαφές πλάτος ώμων στους 3–6 μήνες.',
      'Physique σαν της φωτογραφίας: ρεαλιστικά 1.5–3 χρόνια συνεπούς δουλειάς.',
      'Πολλά physiques στα κοινωνικά δίκτυα οφείλονται σε φωτισμό, pump, γωνία λήψης και χρόνια προπόνησης. Σύγκρινε τον εαυτό σου με τον χθεσινό σου εαυτό.'
    ]
  },
  {
    id: 'mistakes',
    title: 'Συνήθη λάθη',
    body: [
      'Ασυνέπεια. Ένα μέτριο πρόγραμμα για δύο χρόνια νικάει το τέλειο για δύο μήνες.',
      'Αλλαγή προγράμματος κάθε δύο εβδομάδες — δεν προλαβαίνεις να δεις πρόοδο.',
      'Βαριά βάρη με χαλασμένη τεχνική: λιγότερη ανάπτυξη και τραυματισμοί.',
      'Πρωτεΐνη κάτω από 1.6 g/kg υπονομεύει όλη την προσπάθεια.',
      'Πολύ επιθετικό έλλειμμα: χάνεις μυς, πεινάς, και επιστρέφεις πίσω.',
      'Παραμέληση πλάγιων δελτοειδών και πλάτης — πολλοί κάνουν μόνο στήθος και δικέφαλα.'
    ]
  }
];

/* ---------- Έτοιμα προγράμματα ----------
   Ο στόχος δεν αλλάζει τόσο τις ασκήσεις όσο το πόσα σετ, σε πόσες
   επαναλήψεις και με πόση ξεκούραση τις κάνεις — και, κυρίως, τη
   διατροφή. Γι' αυτό το πρότυπο (πόσες μέρες) και το preset (στόχος)
   είναι δύο ξεχωριστά πράγματα που συνδυάζονται. */

export const PRESETS = {
  recomp: {
    label: 'Recomposition',
    tagline: 'Χάνεις λίπος και χτίζεις μυ ταυτόχρονα. Η ζυγαριά μένει σχεδόν σταθερή.',
    nutrition: 'recomp',
    days: 3,
    sets: { main: 3, aux: 3, iso: 3 },
    reps: { main: [6, 10], aux: [8, 12], iso: [12, 20] },
    rest: { main: 165, aux: 120, iso: 60 },
    rir:  { main: '1–3', aux: '1–3', iso: '0–2' }
  },
  cut: {
    label: 'Γράμμωση',
    tagline: 'Έλλειμμα θερμίδων με βαριά κιλά, ώστε το σώμα να κρατήσει τον μυ.',
    nutrition: 'cut',
    days: 3,
    sets: { main: 3, aux: 3, iso: 2 },
    reps: { main: [5, 8], aux: [8, 12], iso: [12, 20] },
    rest: { main: 180, aux: 120, iso: 45 },
    rir:  { main: '1–2', aux: '1–3', iso: '0–2' },
    note: 'Στο έλλειμμα δεν κυνηγάς νέα ρεκόρ. Στόχος είναι να κρατήσεις τα κιλά που ήδη σηκώνεις.'
  },
  bulk: {
    label: 'Lean bulk',
    tagline: 'Ελαφρύ πλεόνασμα και περισσότερος όγκος προπόνησης για καθαρή μυϊκή μάζα.',
    nutrition: 'bulk',
    days: 4,
    sets: { main: 4, aux: 3, iso: 3 },
    reps: { main: [6, 10], aux: [8, 12], iso: [10, 15] },
    rest: { main: 180, aux: 135, iso: 75 },
    rir:  { main: '1–2', aux: '1–3', iso: '0–2' }
  },
  strength: {
    label: 'Δύναμη',
    tagline: 'Λίγες επαναλήψεις, βαριά κιλά, μεγάλη ξεκούραση στις σύνθετες.',
    nutrition: 'recomp',
    days: 3,
    sets: { main: 4, aux: 3, iso: 2 },
    reps: { main: [3, 6], aux: [6, 10], iso: [10, 15] },
    rest: { main: 210, aux: 150, iso: 60 },
    rir:  { main: '2–3', aux: '1–3', iso: '0–2' }
  },
  endurance: {
    label: 'Αντοχή',
    tagline: 'Περισσότερες επαναλήψεις, μικρά διαλείμματα, ελαφρύτερα κιλά.',
    nutrition: 'recomp',
    days: 3,
    sets: { main: 3, aux: 3, iso: 3 },
    reps: { main: [10, 15], aux: [12, 15], iso: [15, 25] },
    rest: { main: 90, aux: 75, iso: 45 },
    rir:  { main: '2–3', aux: '1–3', iso: '0–2' }
  },
  maintain: {
    label: 'Διατήρηση',
    tagline: 'Σταθερή ρουτίνα χωρίς πίεση. Κρατάς ό,τι έχεις με τον λιγότερο κόπο.',
    nutrition: 'recomp',
    days: 2,
    sets: { main: 3, aux: 2, iso: 2 },
    reps: { main: [6, 10], aux: [8, 12], iso: [12, 20] },
    rest: { main: 150, aux: 120, iso: 60 },
    rir:  { main: '2–3', aux: '2–3', iso: '1–2' }
  },
  rehab: {
    label: 'Επιστροφή μετά από τραυματισμό',
    tagline: 'Ελεγχόμενα φορτία, μεγάλα εύρη, τίποτα κοντά στην αποτυχία.',
    nutrition: 'recomp',
    days: 2,
    sets: { main: 2, aux: 2, iso: 2 },
    reps: { main: [10, 15], aux: [10, 15], iso: [12, 20] },
    rest: { main: 150, aux: 120, iso: 60 },
    rir:  { main: '3–4', aux: '3–4', iso: '2–3' },
    note: 'Αν κάτι πονάει, σταμάτα την κίνηση. Πρώτα ο γιατρός ή ο φυσικοθεραπευτής, μετά η εφαρμογή.'
  }
};

/* ---------- Έμφαση ----------
   Μικρές προσθήκες πάνω στο πρότυπο, από τους δευτερεύοντες στόχους. */

const EMPHASIS = {
  vtaper:  { label: 'Ώμοι και πλάτη',  add: ['lateral', 'facepull'] },
  posture: { label: 'Στάση σώματος',   add: ['facepull', 'reverfly', 'birddog'] },
  core:    { label: 'Κορμός',          add: ['pallof', 'core'] },
  glutes:  { label: 'Γλουτοί',         add: ['hipthrust'] },
  arms:    { label: 'Χέρια',           add: ['hammer', 'triceps'] }
};

export const EMPHASIS_LIST = Object.keys(EMPHASIS).map((id) => ({ id, label: EMPHASIS[id].label }));

/* ---------- Οι στόχοι από την εφαρμογή κρατήσεων ----------
   Τα κλειδιά είναι ακριβώς τα ίδια με το GOAL_GROUPS στο index.html
   και τη goal_keys() στη βάση. Αν προστεθεί στόχος εκεί, πρόσθεσέ τον
   και εδώ — αλλιώς απλώς αγνοείται. */

export const GOAL_LABELS = {
  weight_loss: 'Απώλεια βάρους',
  muscle_gain: 'Αύξηση μυϊκής μάζας',
  toning: 'Γράμμωση / σύσφιξη',
  maintain: 'Διατήρηση της φόρμας',
  strength: 'Αύξηση δύναμης',
  endurance: 'Καλύτερη αντοχή',
  flexibility: 'Ευλυγισία και κινητικότητα',
  core: 'Ισορροπία και σταθερότητα κορμού',
  event_prep: 'Προετοιμασία για αγώνα',
  posture: 'Καλύτερη στάση σώματος',
  pain_relief: 'Λιγότεροι πόνοι στη μέση ή τον αυχένα',
  injury_recovery: 'Επιστροφή μετά από τραυματισμό',
  stress: 'Λιγότερο άγχος',
  sleep: 'Καλύτερος ύπνος',
  energy: 'Ενέργεια για την καθημερινότητα',
  routine: 'Σταθερή ρουτίνα άσκησης'
};

export const GOAL_MAP = {
  weight_loss:     { preset: 'cut',       rank: 10 },
  muscle_gain:     { preset: 'bulk',      rank: 10 },
  toning:          { preset: 'recomp',    rank: 9 },
  maintain:        { preset: 'maintain',  rank: 4 },
  strength:        { preset: 'strength',  rank: 8 },
  endurance:       { preset: 'endurance', rank: 7, cardio: true },
  flexibility:     { emphasis: 'posture', rank: 1 },
  core:            { emphasis: 'core',    rank: 2 },
  event_prep:      { preset: 'strength',  rank: 6 },
  posture:         { emphasis: 'posture', rank: 2 },
  pain_relief:     { emphasis: 'posture', rank: 3 },
  injury_recovery: { preset: 'rehab',     rank: 12 },
  stress:          { preset: 'maintain',  rank: 1 },
  sleep:           { preset: 'maintain',  rank: 1 },
  energy:          { preset: 'maintain',  rank: 1 },
  routine:         { preset: 'maintain',  rank: 1 }
};

/* Από τη λίστα στόχων του πελάτη βγάζει μία πρόταση ρυθμίσεων.
   Κερδίζει ο στόχος με το μεγαλύτερο rank· η ασφάλεια (rehab) πάνω
   απ' όλα. Οι υπόλοιποι στόχοι γίνονται έμφαση. */
export function configFromGoals(goals) {
  const list = (goals || []).filter((g) => GOAL_MAP[g]);
  let preset = null;
  let best = -1;
  const emphasis = [];
  list.forEach((g) => {
    const m = GOAL_MAP[g];
    if (m.preset && m.rank > best) { best = m.rank; preset = m.preset; }
    if (m.emphasis && !emphasis.includes(m.emphasis)) emphasis.push(m.emphasis);
  });
  return {
    preset: preset || 'recomp',
    emphasis,
    cardio: list.some((g) => GOAL_MAP[g].cardio),
    matched: list
  };
}

/* ---------- Η γεννήτρια ----------
   config: { preset, days, equipment: 'gym'|'db'|'body', emphasis: [] } */

const EQUIP_RANK = { body: 0, db: 1, gym: 2 };

function pickAvailable(id, equipment, seen) {
  const level = EQUIP_RANK[equipment] == null ? 2 : EQUIP_RANK[equipment];
  const taken = seen || new Set();
  const fits = (x) => CATALOG[x] && EQUIP_RANK[CATALOG[x].equip] <= level && !taken.has(x);
  if (fits(id)) return id;
  /* Δύο γύροι: πρώτα οι άμεσες εναλλακτικές, μετά οι εναλλακτικές τους. */
  const first = FALLBACK[id] || [];
  const hit = first.find(fits);
  if (hit) return hit;
  for (const a of first) {
    const deep = (FALLBACK[a] || []).find(fits);
    if (deep) return deep;
  }
  /* Τελευταία λύση: ό,τι υπάρχει στην ίδια μυϊκή ομάδα και στον ίδιο ρόλο. */
  const base = CATALOG[id];
  if (!base) return null;
  const same = Object.keys(CATALOG).filter(
    (x) => CATALOG[x].group === base.group && CATALOG[x].role === base.role && fits(x)
  );
  return same[0] || null;
}

export function defaultConfig() {
  return { preset: 'recomp', days: 3, equipment: 'gym', emphasis: [], cardio: 'none', source: 'default' };
}

/* ---------- Περπάτημα και καρντιό ----------
   Δεν μπαίνουν στα σετ: δεν έχουν κιλά και επαναλήψεις να
   καταγράψεις. Μπαίνουν ως οδηγία κάτω από τις ασκήσεις της ημέρας,
   γιατί εκεί τα βλέπεις τη στιγμή που τα χρειάζεσαι. */
export const CARDIO_OPTIONS = [
  { id: 'none', label: 'Τίποτα — μόνο βάρη' },
  { id: 'walk', label: 'Περπάτημα' },
  { id: 'liss', label: 'Καρντιό (ποδήλατο, ελλειπτικό)' },
  { id: 'both', label: 'Περπάτημα και καρντιό' }
];

export const CARDIO = {
  walk: {
    title: 'Περπάτημα',
    lines: [
      '8.000–10.000 βήματα την ημέρα, όποτε σου βολεύει.',
      'Είναι ο πιο ανώδυνος τρόπος να κάψεις παραπάνω: δεν κουράζει τα πόδια για την επόμενη προπόνηση.'
    ]
  },
  liss: {
    title: 'Καρντιό',
    lines: [
      '20–40 λεπτά, μία έως τρεις φορές την εβδομάδα, σε ρυθμό που σου επιτρέπει να μιλάς.',
      'Ποδήλατο ή ελλειπτικό αντί για τρέξιμο — κουράζει λιγότερο τα πόδια.',
      'Αν το κάνεις την ίδια μέρα με τα βάρη, πρώτα τα βάρη.'
    ]
  },
  both: {
    title: 'Περπάτημα και καρντιό',
    lines: [
      '8.000–10.000 βήματα την ημέρα ως βάση.',
      'Συν 20–40 λεπτά ποδήλατο ή ελλειπτικό, μία έως τρεις φορές την εβδομάδα.',
      'Αν το κάνεις την ίδια μέρα με τα βάρη, πρώτα τα βάρη.'
    ]
  }
};

/* Η άσκηση όπως θα τη δει ο χρήστης: κατάλογος + το preset από πάνω. */
function shape(id, preset) {
  const base = CATALOG[id];
  const reps = preset.reps[base.role];
  return {
    id,
    name: base.name,
    group: base.group,
    sets: preset.sets[base.role],
    repMin: reps[0],
    repMax: reps[1],
    rest: preset.rest[base.role],
    rir: base.bodyweight ? '—' : preset.rir[base.role],
    step: base.step,
    key: !!base.key,
    bodyweight: !!base.bodyweight
  };
}

export function buildProgram(raw) {
  const cfg = { ...defaultConfig(), ...(raw || {}) };
  const preset = PRESETS[cfg.preset] || PRESETS.recomp;
  const days = Math.min(6, Math.max(2, Number(cfg.days) || preset.days));
  const tpl = TEMPLATES[days] || TEMPLATES[3];

  /* Οι ασκήσεις της έμφασης μπαίνουν στο τέλος της ημέρας που έχει
     ήδη τις λιγότερες — και μόνο αν δεν υπάρχουν ήδη εκεί. */
  const plan = tpl.days.map((d) => ({ ...d, slots: [...d.slots] }));
  (cfg.emphasis || []).forEach((e) => {
    const extra = (EMPHASIS[e] && EMPHASIS[e].add) || [];
    extra.forEach((id) => {
      const group = CATALOG[id] && CATALOG[id].group;
      const free = plan.filter((d) => !d.slots.includes(id) && d.slots.length < 8);
      if (!free.length) return;
      /* Προτίμησε μέρα που ήδη δουλεύει την ίδια περιοχή: το Pallof
         press δεν έχει νόημα να προσγειωθεί σε μέρα ποδιών επειδή
         έτυχε να είναι η πιο μικρή. */
      const fitting = free.filter((d) =>
        d.slots.some((s) => CATALOG[s] && CATALOG[s].group === group)
      );
      const pool = fitting.length ? fitting : free;
      pool.sort((a, b) => a.slots.length - b.slots.length)[0].slots.push(id);
    });
  });

  const program = {};
  const order = [];

  plan.forEach((d, i) => {
    const key = DAY_KEYS[i];
    order.push(key);
    const seen = new Set();
    const exercises = [];

    d.slots.forEach((slot) => {
      const id = pickAvailable(slot, cfg.equipment, seen);
      if (!id) return;
      seen.add(id);
      exercises.push(shape(id, preset));
    });

    /* Καμία μέρα δεν φεύγει με λιγότερες από τέσσερις ασκήσεις. Αν ο
       εξοπλισμός έκοψε πολλά, γεμίζουμε από ό,τι μένει διαθέσιμο. */
    if (exercises.length < 4) {
      const level = EQUIP_RANK[cfg.equipment] == null ? 2 : EQUIP_RANK[cfg.equipment];
      const covered = new Set(exercises.map((e) => e.group));
      Object.keys(CATALOG)
        .filter((x) => !seen.has(x) && EQUIP_RANK[CATALOG[x].equip] <= level)
        .sort((a, b) => (covered.has(CATALOG[a].group) ? 1 : 0) - (covered.has(CATALOG[b].group) ? 1 : 0))
        .slice(0, 4 - exercises.length)
        .forEach((id) => {
          seen.add(id);
          covered.add(CATALOG[id].group);
          exercises.push(shape(id, preset));
        });
    }

    program[key] = {
      letter: d.letter,
      name: d.name,
      focus: d.focus,
      exercises
    };
  });

  return {
    program,
    order,
    days,
    preset: cfg.preset,
    label: `${preset.label} · ${tpl.label}`,
    note: preset.note || tpl.note,
    cardio: CARDIO[cfg.cardio] || null,
    nutritionGoal: preset.nutrition
  };
}
