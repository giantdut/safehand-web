import { problemStats } from "@/lib/data";

const accentMap = {
  red: { border: "border-l-[#dc2626]", value: "text-[#dc2626]" },
  amber: { border: "border-l-[#d97706]", value: "text-[#d97706]" },
  green: { border: "border-l-[#1e5c2e]", value: "text-[#1e5c2e]" },
  blue: { border: "border-l-[#1d4ed8]", value: "text-[#1d4ed8]" },
};

const painPoints = [
  {
    problem: "No dedicated safety officer or compliance budget",
    fix: "Hermes is your always-on safety officer — available on Telegram, 24/7",
  },
  {
    problem: "Safety knowledge walks out with every departing worker",
    fix: "Every conversation is logged. Knowledge stays in the system regardless of turnover.",
  },
  {
    problem: "Existing tools digitize the paperwork — they don't eliminate it",
    fix: "SafeHand eliminates the paperwork by extracting structure from normal conversations.",
  },
  {
    problem: "Losing contracts because you can't prove an OH&S program exists",
    fix: "Client documentation package compiled on demand in under five minutes.",
  },
];

export default function ProblemSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <p className="text-[11px] font-semibold uppercase tracking-[1.2px] text-[#6b7280] mb-3">
          The Problem
        </p>
        <h2
          className="text-3xl text-[#111827] mb-4 max-w-2xl"
          style={{ fontFamily: "var(--font-dm-serif)" }}
        >
          Small employers carry identical legal exposure to large corporations — with none of the infrastructure.
        </h2>
        <p className="text-[#6b7280] text-base leading-relaxed mb-12 max-w-xl">
          Canada Bill C-45, OSHA, WorkSafeBC — the regulatory framework doesn&apos;t care about your headcount.
          One serious incident triggers the same investigation, fines, and personal liability whether you have
          8 workers or 800.
        </p>

        {/* Stat cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {problemStats.map((stat) => {
            const accent = accentMap[stat.accent];
            return (
              <div
                key={stat.label}
                className={`bg-white border border-[#e5e7eb] rounded-xl p-6 border-l-4 ${accent.border} shadow-sm`}
              >
                <div
                  className={`text-3xl font-light mb-2 ${accent.value}`}
                  style={{ fontFamily: "var(--font-dm-serif)" }}
                >
                  {stat.value}
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.8px] text-[#6b7280] mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-[#6b7280] leading-relaxed">{stat.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Pain points table */}
        <div className="rounded-xl border border-[#e5e7eb] overflow-hidden">
          <div className="grid grid-cols-2 bg-[#f9fafb] border-b border-[#e5e7eb]">
            <div className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.5px] text-[#6b7280]">
              Without SafeHand
            </div>
            <div className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.5px] text-[#6b7280] border-l border-[#e5e7eb]">
              With SafeHand
            </div>
          </div>
          {painPoints.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-2 border-b border-[#f3f4f6] last:border-b-0 hover:bg-[#f9fafb] transition-colors"
            >
              <div className="px-5 py-4 text-sm text-[#374151] flex items-start gap-2">
                <span className="text-[#dc2626] mt-0.5 shrink-0">✕</span>
                {row.problem}
              </div>
              <div className="px-5 py-4 text-sm text-[#374151] border-l border-[#f3f4f6] flex items-start gap-2">
                <span className="text-[#1e5c2e] mt-0.5 shrink-0">✓</span>
                {row.fix}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
