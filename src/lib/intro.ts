import { prefersReducedMotion } from './motion';

const SEEN_KEY = 'intro-seen';

function seen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    // Private mode: the curtain simply plays again next time.
    return false;
  }
}

/** True on the first load of a session, when the curtain is about to play. */
export function introPlays() {
  return !prefersReducedMotion() && !seen();
}

export function markIntroSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    // ignore
  }
}
