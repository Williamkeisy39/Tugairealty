// Shared admin session helpers. Uses Web Crypto so it works in both
// middleware (edge runtime) and server components/actions (node runtime).

export const ADMIN_COOKIE = 'admin_session';
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function getAdminToken() {
  return process.env.ADMIN_TOKEN || 'change-me';
}

// The cookie stores a hash derived from ADMIN_TOKEN, never the token itself.
// Changing ADMIN_TOKEN invalidates all existing sessions.
export async function createSessionValue() {
  const data = new TextEncoder().encode(`tugai-admin-session:${getAdminToken()}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function isValidSession(value?: string) {
  if (!value) return false;
  return value === (await createSessionValue());
}

export function isValidLoginToken(token: string) {
  return token === getAdminToken();
}
