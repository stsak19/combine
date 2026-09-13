/* Γέφυρα με την εφαρμογή κρατήσεων.
 *
 * Οι δύο εφαρμογές είναι στο ίδιο origin, οπότε μοιράζονται
 * localStorage: η σύνδεση του πελάτη γράφεται εκεί από το index.html
 * και τη διαβάζουμε από εδώ χωρίς δεύτερο login. Τους στόχους τους
 * κρατάει η βάση — τους ζητάμε με την ίδια RPC που καλεί και η
 * εφαρμογή κρατήσεων, ώστε να υπάρχει μία μόνο πηγή αλήθειας.
 *
 * Αν ο πελάτης δεν έχει συνδεθεί, όλα δουλεύουν κανονικά: απλώς
 * διαλέγει μόνος του στόχο στις Ρυθμίσεις.
 */

const SUPABASE_URL = 'https://sdddhzrbqkfayodyjnnz.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZGRoenJicWtmYXlvZHlqbm56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NjUwMzMsImV4cCI6MjEwNDQ0MTAzM30.Y0cQV6tJFltnl2hYKJXzhxzVb0XYOB9DK5xGCkUbEQg';

const SESSION_KEY = 'kinesis_session';

/* Η διεύθυνση της εφαρμογής κρατήσεων: ένας φάκελος πιο πάνω. */
export const CLIENT_URL = '../';

export function readClientSession() {
  let raw = null;
  try { raw = window.localStorage.getItem(SESSION_KEY); } catch (e) { /* αγνόησε */ }
  if (!raw) {
    try { raw = window.sessionStorage.getItem(SESSION_KEY); } catch (e) { /* αγνόησε */ }
  }
  if (!raw) return null;
  try {
    const s = JSON.parse(raw);
    return s && s.clientId ? s : null;
  } catch (e) {
    return null;
  }
}

export const clientName = (s) =>
  s ? [s.firstName, s.lastName].filter(Boolean).join(' ').trim() : '';

async function rpc(fn, args) {
  const res = await fetch(SUPABASE_URL + '/rest/v1/rpc/' + fn, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY,
      Authorization: 'Bearer ' + SUPABASE_ANON_KEY
    },
    body: JSON.stringify(args || {})
  });
  const text = await res.text();
  if (!res.ok) throw new Error(text || res.statusText);
  return text ? JSON.parse(text) : null;
}

/* Όνομα και λογότυπο όπως τα έχει ορίσει ο διαχειριστής.
 *
 * Είναι η ίδια δημόσια ρύθμιση που διαβάζει και η εφαρμογή κρατήσεων,
 * οπότε ό,τι αλλάξει εκεί φαίνεται κι εδώ χωρίς δεύτερη ρύθμιση.
 * Δεν χρειάζεται σύνδεση: το app_settings είναι ανοιχτό στον anon.
 *
 * Αν ο διακομιστής αργήσει πάνω από 4 δευτερόλεπτα, επιστρέφει null
 * και η εφαρμογή κρατάει το εφεδρικό όνομα αντί να περιμένει.
 */
export async function fetchBrand() {
  const timeout = new Promise((resolve) => setTimeout(() => resolve(null), 4000));
  const call = rpc('app_settings', {}).catch(() => null);
  const data = await Promise.race([call, timeout]);
  if (!data || typeof data !== 'object') return null;
  return {
    gym_name: data.gym_name || '',
    logo_url: data.logo_url || ''
  };
}

/* { goals: ['weight_loss', ...], other: 'κείμενο' } — ή null αν δεν
   έχει συνδεθεί κανείς. */
export async function fetchGoals() {
  const session = readClientSession();
  if (!session) return null;
  const data = await rpc('my_goals', { p_client_id: session.clientId });
  return {
    goals: Array.isArray(data && data.goals) ? data.goals : [],
    other: (data && data.other) || '',
    session
  };
}
