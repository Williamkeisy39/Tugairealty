import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ADMIN_COOKIE, ADMIN_SESSION_MAX_AGE, createSessionValue, isValidLoginToken } from '@/lib/admin-auth';

interface LoginPageProps {
  searchParams?: { error?: string };
}

export default function AdminLoginPage({ searchParams }: LoginPageProps) {
  async function loginAction(formData: FormData) {
    'use server';

    const token = String(formData.get('token') || '');
    if (!isValidLoginToken(token)) {
      redirect('/admin/login?error=1');
    }

    // Persistent session: stays signed in across pages and browser restarts.
    cookies().set(ADMIN_COOKIE, await createSessionValue(), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: ADMIN_SESSION_MAX_AGE
    });
    redirect('/admin');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <form action={loginAction} className="w-full max-w-sm space-y-6 rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white text-lg font-bold">T</div>
          <h1 className="text-xl font-bold text-slate-900">Tugai Admin</h1>
          <p className="mt-1 text-sm text-slate-500">Enter your admin token to continue</p>
        </div>
        {searchParams?.error && <p className="text-sm text-center text-red-600">Invalid admin token.</p>}
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium text-slate-700">Admin Token</span>
          <Input name="token" type="password" required placeholder="Enter token..." />
        </label>
        <Button type="submit" className="w-full rounded-lg bg-slate-900 hover:bg-slate-800 text-white">
          Sign In
        </Button>
      </form>
    </div>
  );
}
