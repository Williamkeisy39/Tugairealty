import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LoginPageProps {
  searchParams?: { error?: string };
}

export default function AdminLoginPage({ searchParams }: LoginPageProps) {
  async function loginAction(formData: FormData) {
    'use server';

    const token = String(formData.get('token') || '');
    const expectedToken = process.env.ADMIN_TOKEN || 'change-me';

    if (token !== expectedToken) {
      redirect('/admin/login?error=1');
    }

    cookies().set('admin_session', '1', { httpOnly: true, sameSite: 'lax', path: '/' });
    cookies().set('admin_token', token, { httpOnly: true, sameSite: 'lax', path: '/' });
    redirect('/admin');
  }

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <form action={loginAction} className="card-surface space-y-5 p-8">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ink-600">Admin</p>
          <h1 className="mt-2 text-3xl text-ink-950">Dashboard Sign In</h1>
        </div>
        {searchParams?.error && <p className="text-sm text-red-600">Invalid admin token.</p>}
        <label className="space-y-2 text-sm block">
          <span>Admin Token</span>
          <Input name="token" type="password" required />
        </label>
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </div>
  );
}
