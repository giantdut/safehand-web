import { competitors } from "@/lib/data";

export default function CompetitiveTable() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[1.2px] text-[#6b7280] mb-3">
          Why Not Just Use&hellip;
        </p>
        <h2
          className="text-3xl text-[#111827] mb-4 max-w-2xl"
          style={{ fontFamily: "var(--font-dm-serif)" }}
        >
          Every existing tool digitizes the paperwork. SafeHand eliminates it.
        </h2>
        <p className="text-[#6b7280] text-base leading-relaxed mb-12 max-w-xl">
          The wedge isn&apos;t feature count — it&apos;s the fundamental difference between a tool that
          adds administrative work and an agent that removes it.
        </p>

        <div className="rounded-xl border border-[#e5e7eb] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          {/* Header */}
          <div className="grid grid-cols-[1fr_1fr_1.5fr_1.5fr] bg-[#f9fafb] border-b border-[#e5e7eb]">
            {["Competitor", "Type", "Why It Falls Short", "SafeHand's Approach"].map((h) => (
              <div
                key={h}
                className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.5px] text-[#6b7280]"
              >
                {h}
              </div>
            ))}
          </div>

          {competitors.map((row, i) => (
            <div
              key={row.name}
              className={`grid grid-cols-[1fr_1fr_1.5fr_1.5fr] hover:bg-[#f9fafb] transition-colors ${
                i < competitors.length - 1 ? "border-b border-[#f3f4f6]" : ""
              }`}
            >
              <div className="px-4 py-4 text-sm font-medium text-[#111827]">{row.name}</div>
              <div className="px-4 py-4">
                <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-[#f3f4f6] text-[#374151]">
                  {row.type}
                </span>
              </div>
              <div className="px-4 py-4 text-sm text-[#6b7280] leading-relaxed flex items-start gap-1.5">
                <span className="text-[#dc2626] shrink-0 mt-0.5 text-xs">✕</span>
                {row.weakness}
              </div>
              <div className="px-4 py-4 text-sm text-[#374151] leading-relaxed flex items-start gap-1.5">
                <span className="text-[#1e5c2e] shrink-0 mt-0.5 text-xs">✓</span>
                {row.safHandEdge}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div className="mt-8 p-5 rounded-xl bg-[#edf7ef] border border-[#c8ecd0]">
          <p className="text-sm text-[#1a4f2a] leading-relaxed">
            <strong>SafeHand&apos;s defensible position:</strong> The only OH&amp;S solution where the
            management system builds itself from real operations, runs scheduled maintenance autonomously,
            and requires no dedicated safety expertise to operate — delivered through Telegram, the channel
            the Owner already uses.
          </p>
        </div>
      </div>
    </section>
  );
}
