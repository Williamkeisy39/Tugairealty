import Link from 'next/link';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import {
  Home,
  Building2,
  Video,
  FileText,
  BedDouble,
  Mail,
  LogOut,
  LayoutDashboard,
  Key,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Properties', href: '/admin/properties/new', icon: Building2, group: 'Listings' },
  { label: 'Rentals', href: '/admin/rentals', icon: Key },
  { label: 'Bnbs', href: '/admin/bnbs', icon: BedDouble },
  { label: 'Videos', href: '/admin/project-videos', icon: Video, group: 'Content' },
  { label: 'Blogs', href: '/admin/blogs', icon: FileText },
  { label: 'Sell Requests', href: '/admin/sell-requests', icon: Home, group: 'Inbox' },
  { label: 'Contact Messages', href: '/admin/contact-messages', icon: Mail },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const token = cookies().get('admin_token')?.value;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      {token && (
        <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-slate-200 bg-slate-900">
          <div className="flex h-16 items-center gap-2 border-b border-slate-700 px-5">
            <Building2 size={22} className="text-emerald-400" />
            <span className="text-sm font-bold tracking-wide text-white">TUGAI ADMIN</span>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {navItems.map((item, i) => {
              const Icon = item.icon;
              const showGroup =
                item.group && (i === 0 || navItems[i - 1]?.group !== item.group);
              return (
                <div key={item.href}>
                  {showGroup && (
                    <p className="mb-1 mt-4 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {item.group}
                    </p>
                  )}
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="border-t border-slate-700 p-3">
            <Link
              href="/api/admin/logout"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 transition hover:bg-red-900/30 hover:text-red-300"
            >
              <LogOut size={18} />
              Logout
            </Link>
          </div>
        </aside>
      )}

      {/* Main content */}
      <div className={token ? 'ml-60 flex-1' : 'flex-1'}>
        {/* Top bar */}
        {token && (
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-700">Admin Panel</h2>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                className="text-xs text-slate-500 hover:text-emerald-600 transition"
              >
                View Site &rarr;
              </Link>
            </div>
          </header>
        )}

        <main className={token ? 'p-6' : ''}>
          {children}
        </main>
      </div>
    </div>
  );
}
