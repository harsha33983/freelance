"use client";

import { useAdminFetch } from "@/lib/useAdminFetch";
import StatCard from "@/components/admin/StatCard";
import { Users, Heart, Handshake, Newspaper, Globe, MessageSquare } from "lucide-react";
import Link from "next/link";

interface RegistrationStats {
  stats: {
    total: number;
    byType: Record<string, number>;
    byCountry: Record<string, number>;
  };
}

interface VolunteerList { length: number; }
interface PartnerList { length: number; }

export default function DashboardPage() {
  const { data: regData, loading: regLoading } = useAdminFetch<RegistrationStats>("/api/admin/registrations");
  const { data: volunteers, loading: volLoading } = useAdminFetch<unknown[]>("/api/admin/volunteers");
  const { data: partners, loading: partLoading } = useAdminFetch<unknown[]>("/api/admin/partnerships");
  const { data: articles, loading: newsLoading } = useAdminFetch<unknown[]>("/api/admin/news");
  const { data: contacts, loading: ctLoading } = useAdminFetch<unknown[]>("/api/admin/contacts");

  const loading = regLoading || volLoading || partLoading || newsLoading || ctLoading;

  const regStats = regData?.stats;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-semibold text-ink">Dashboard</h1>
        <p className="text-ink-muted text-sm font-sans mt-1">
          Bhagavad Gita Vishwa Mahotsav 2027 — Admin Overview
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        <StatCard
          title="Total Registrations"
          value={loading ? "…" : regStats?.total ?? 0}
          icon={Users}
          sub="All registration types"
        />
        <StatCard
          title="Volunteers"
          value={loading ? "…" : (volunteers as unknown[])?.length ?? 0}
          icon={Heart}
          sub="Applications received"
        />
        <StatCard
          title="Partnership Proposals"
          value={loading ? "…" : (partners as unknown[])?.length ?? 0}
          icon={Handshake}
          sub="Enquiries received"
        />
        <StatCard
          title="News Articles"
          value={loading ? "…" : (articles as unknown[])?.length ?? 0}
          icon={Newspaper}
          sub="Published articles"
        />
        <StatCard
          title="Contact Messages"
          value={loading ? "…" : (contacts as unknown[])?.length ?? 0}
          icon={MessageSquare}
          sub="Unread messages"
        />
        {regStats && (
          <StatCard
            title="Countries Represented"
            value={Object.keys(regStats.byCountry ?? {}).length}
            icon={Globe}
            sub="Unique countries in registrations"
          />
        )}
      </div>

      {/* Registration type breakdown */}
      {regStats && Object.keys(regStats.byType).length > 0 && (
        <div className="bg-white rounded-sm border border-gray-200 p-6 mb-8">
          <h2 className="font-serif text-lg font-semibold text-ink mb-4">Registrations by Type</h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(regStats.byType).map(([type, count]) => (
              <div key={type} className="flex items-center gap-2 px-4 py-2 bg-cream rounded-sm border border-gray-100">
                <span className="text-gold font-serif font-bold text-xl">{count}</span>
                <span className="text-ink-muted text-xs font-sans uppercase tracking-wider capitalize">{type}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top countries */}
      {regStats && Object.keys(regStats.byCountry).length > 0 && (
        <div className="bg-white rounded-sm border border-gray-200 p-6 mb-8">
          <h2 className="font-serif text-lg font-semibold text-ink mb-4">Top Countries</h2>
          <div className="space-y-2">
            {Object.entries(regStats.byCountry)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 10)
              .map(([country, count]) => (
                <div key={country} className="flex items-center gap-3">
                  <span className="text-ink-body text-sm font-sans w-32 flex-shrink-0">{country}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.round(
                          (count / (regStats.total || 1)) * 100
                        )}%`,
                      }}
                    />
                  </div>
                  <span className="text-gold font-semibold text-sm font-sans w-8 text-right">{count}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { href: "/admin/news/new", label: "New Article", icon: Newspaper },
          { href: "/admin/registrations", label: "View Registrations", icon: Users },
          { href: "/admin/gallery", label: "Upload Gallery", icon: Globe },
          { href: "/admin/press-kit", label: "Add Press File", icon: MessageSquare },
        ].map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 p-4 bg-white rounded-sm border border-gray-200 hover:border-gold hover:shadow-gold transition-all group"
          >
            <Icon size={16} className="text-gold" />
            <span className="text-sm font-sans font-medium text-ink group-hover:text-gold transition-colors">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
