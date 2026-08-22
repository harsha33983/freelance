"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, Newspaper, Image, Package, Users, Handshake,
  MessageSquare, LogOut, Menu, X, ChevronRight,
} from "lucide-react";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/registrations", label: "Registrations", icon: Users },
  { href: "/admin/volunteers", label: "Volunteers", icon: Users },
  { href: "/admin/partnerships", label: "Partnerships", icon: Handshake },
  { href: "/admin/contacts", label: "Contact Messages", icon: MessageSquare },
  { href: "/admin/news", label: "News Articles", icon: Newspaper },
  { href: "/admin/gallery", label: "Gallery", icon: Image },
  { href: "/admin/press-kit", label: "Press Kit", icon: Package },
];

function useAdminAuth(pathname: string) {
  const [token, setToken] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    const t = localStorage.getItem("bgvm_admin_token");
    setToken(t);
    setChecked(true);
  }, [pathname]);
  return { token, checked };
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { token, checked } = useAdminAuth(pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login" || pathname === "/admin";

  useEffect(() => {
    if (!checked) return;
    const currentToken = localStorage.getItem("bgvm_admin_token");
    if (!currentToken && !isLoginPage) {
      router.replace("/admin/login");
    }
  }, [checked, pathname, isLoginPage, router]);

  const handleLogout = () => {
    localStorage.removeItem("bgvm_admin_token");
    router.replace("/admin/login");
  };

  // On login page - render children without shell
  if (isLoginPage) return <>{children}</>;

  // Not checked yet
  if (!checked || (!token && !isLoginPage)) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-gold font-serif text-2xl animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-footer text-white z-40 flex flex-col transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:h-auto`}
      >
        {/* Brand */}
        <div className="px-6 py-5 border-b border-white/10">
          <p className="font-serif text-gold font-semibold text-base leading-tight">Bhagavad Gita</p>
          <p className="font-sans text-gray-400 text-xs tracking-widest uppercase mt-0.5">Mahotsav Admin</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                  active
                    ? "bg-gold/10 text-gold border-r-2 border-gold"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-6 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-400 hover:text-red-400 text-sm transition-colors"
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-gray-500 hover:text-ink"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1 text-sm text-gray-500">
              <span className="text-gold font-semibold">Admin</span>
              {pathname !== "/admin/dashboard" && (
                <>
                  <ChevronRight size={14} />
                  <span className="text-ink font-medium capitalize">
                    {pathname.split("/").filter(Boolean).slice(1).join(" / ")}
                  </span>
                </>
              )}
            </nav>
          </div>
          <Link
            href="/"
            target="_blank"
            className="text-xs text-gold hover:underline font-semibold"
          >
            View Site &rarr;
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
