import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  sub?: string;
  color?: string;
}

export default function StatCard({ title, value, icon: Icon, sub, color = "text-gold" }: StatCardProps) {
  return (
    <div className="bg-white rounded-sm border border-gray-200 p-6 flex items-start gap-4 hover:shadow-gold transition-shadow">
      <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
        <Icon size={22} className={color} />
      </div>
      <div>
        <p className="text-ink-muted text-xs font-sans font-semibold tracking-wider uppercase mb-1">{title}</p>
        <p className="font-serif text-3xl font-bold text-ink leading-none">{value}</p>
        {sub && <p className="text-ink-muted text-xs font-sans mt-1">{sub}</p>}
      </div>
    </div>
  );
}
