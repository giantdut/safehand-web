import Image from "next/image";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0d2b1a] border-t border-[rgba(255,255,255,0.08)]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white rounded-lg p-1">
                <Image
                  src="/logo.jpg"
                  alt="SafeHand logo"
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
              </div>
              <div>
                <div
                  className="text-xl text-white"
                  style={{ fontFamily: "var(--font-dm-serif)" }}
                >
                  SafeHand
                </div>
                <div className="text-xs text-[rgba(255,255,255,0.45)]">
                  OH&amp;S Co-Pilot for Small Employers
                </div>
              </div>
            </div>
            <p className="text-sm text-[rgba(255,255,255,0.55)] leading-relaxed max-w-sm">
              SafeHand builds your OH&amp;S management system passively from real work conversations —
              no forms, no templates, no dedicated setup time.
            </p>
          </div>

          {/* Get Early Access column */}
          <div>
            <div
              className="text-lg text-white mb-3"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              Get Early Access
            </div>
            <p className="text-sm text-[rgba(255,255,255,0.55)] leading-relaxed mb-5">
              SafeHand is in active development. If you&apos;re a small employer who&apos;s lost a contract
              over OH&amp;S documentation — or who&apos;s been through a WorkSafe investigation — we want
              to hear from you.
            </p>
            <a
              href="mailto:aryowirastomo@gmail.com"
              className="inline-flex items-center gap-2 bg-[#1e5c2e] hover:bg-[#2a7a3b] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              Contact the team
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[rgba(255,255,255,0.08)] pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="text-xs text-[rgba(255,255,255,0.35)]">
              © 2026 SafeHand &middot; Built on Hermes &middot; Agenthon 2026 Submission
            </div>
            <div className="text-xs text-[rgba(255,255,255,0.35)] italic">
              SafeHand is ISO 45001-aligned, not certified. This documentation supports your compliance
              position — it does not constitute certification.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
