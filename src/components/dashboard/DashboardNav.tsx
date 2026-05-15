import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const DASHBOARD_LINKS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/hazards", label: "Hazards" },
  { href: "/dashboard/training", label: "Training" },
  { href: "/dashboard/actions", label: "Actions" },
  { href: "/dashboard/sops", label: "SOPs" },
  { href: "/dashboard/reports", label: "Reports" },
  { href: "/dashboard/package", label: "Client Package" },
  { href: "/dashboard/settings", label: "Settings" },
];

export function DashboardNav() {
  return (
    <header className="border-b border-[#d1d5db] bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <div>
          <h1 className="text-xl text-[#0d2b1a]" style={{ fontFamily: "var(--font-dm-serif)" }}>
            SafeHand Dashboard
          </h1>
          <p className="text-xs text-[#6b7280]">Read-only view. Operate SafeHand through Telegram.</p>
        </div>
        <UserButton />
      </div>
      <nav className="mx-auto flex w-full max-w-6xl flex-wrap gap-2 px-6 py-3">
        {DASHBOARD_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-md border border-[#d1d5db] px-3 py-1.5 text-sm text-[#374151] hover:border-[#1a4d2e] hover:text-[#1a4d2e]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
