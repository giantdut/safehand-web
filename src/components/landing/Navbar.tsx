import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#e5e7eb]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo lockup */}
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-lg p-1 flex items-center justify-center">
            <Image
              src="/logo.jpg"
              alt="SafeHand logo"
              width={36}
              height={36}
              className="rounded-lg"
              priority
            />
          </div>
          <div>
            <span
              className="text-[#0d2b1a] text-lg leading-none block"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              SafeHand
            </span>
            <span className="text-[11px] text-[#6b7280] leading-none tracking-wide">
              OH&amp;S Co-Pilot for Small Employers
            </span>
          </div>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-[#374151]">
          <a href="#features" className="hover:text-[#1e5c2e] transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-[#1e5c2e] transition-colors">How It Works</a>
          <a href="#coverage" className="hover:text-[#1e5c2e] transition-colors">Coverage</a>
          <a href="#who" className="hover:text-[#1e5c2e] transition-colors">Who It&apos;s For</a>
        </div>

        {/* CTA */}
        <Link href="/sign-up">
          <Button
            variant="outline"
            className="border-[#1e5c2e] text-[#1e5c2e] hover:bg-[#edf7ef] text-sm"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
}
