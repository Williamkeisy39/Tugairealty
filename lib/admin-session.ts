import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE, isValidSession } from '@/lib/admin-auth';

// Server-only: use in admin pages and server actions.
export async function isAdmin() {
  return isValidSession(cookies().get(ADMIN_COOKIE)?.value);
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect('/admin/login');
}
