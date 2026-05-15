import { coverageElements } from "@/lib/data";

const statusConfig = {
  active: {
    badge: "bg-[#edf7ef] text-[#1e5c2e]",
    bar: "bg-[#3a9e50]",
    num: "bg-[#c8ecd0] text-[#1a4f2a]",
    label: "Active",
  },
  building: {
    badge: "bg-[#fef3c7] text-[#92400e]",
    bar: "bg-[#d97706]",
    num: "bg-[#fef3c7] text-[#92400e]",
    label: "Building",
  },
  required: {
    badge: "bg-[#fee2e2] text-[#dc2626]",
    bar: "bg-[#dc2626]",
    num: "bg-[#fee2e2] text-[#dc2626]",
    label: "Required",
  },
};

export default function ProgramCoverage() {
  return (
    <section id="coverage" className="bg-[#f9fafb] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[1.2px] text-[#6b7280] mb-3">
          ISO 45001 Coverage
        </p>
        <h2
          className="text-3xl text-[#111827] mb-4 max-w-2xl"
          style={{ fontFamily: "var(--font-dm-serif)" }}
        >
          All nine management system elements — tracked and maintained automatically.
        </h2>
        <p className="text-[#6b7280] text-base leading-relaxed mb-3 max-w-xl">
          SafeHand maps every feature to one or more of the nine ISO 45001 elements. Hermes tracks
          coverage across all nine and surfaces gaps proactively.
        </p>
        <p className="text-xs text-[#6b7280] mb-12 italic">
          ISO 45001-aligned, not certified. SafeHand builds your compliance position — it does not certify your program.
        </p>

        <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          {/* Header */}
          <div className="grid grid-cols-[auto_1fr_200px_100px] gap-4 px-5 py-3 border-b border-[#e5e7eb] bg-[#f9fafb]">
            <div className="w-8 text-[11px] font-semibold uppercase tracking-[0.5px] text-[#6b7280]">#</div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#6b7280]">Element</div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#6b7280]">Coverage</div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#6b7280]">Status</div>
          </div>

          {coverageElements.map((el, i) => {
            const cfg = statusConfig[el.status];
            return (
              <div
                key={el.number}
                className={`grid grid-cols-[auto_1fr_200px_100px] gap-4 items-center px-5 py-4 hover:bg-[#f9fafb] transition-colors ${
                  i < coverageElements.length - 1 ? "border-b border-[#f3f4f6]" : ""
                }`}
              >
                {/* Number bubble */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${cfg.num}`}
                >
                  {el.number}
                </div>

                {/* Name + feature */}
                <div>
                  <div className="text-sm font-medium text-[#111827] leading-snug">
                    {el.name}
                  </div>
                  <div className="text-xs text-[#6b7280] mt-0.5">{el.primaryFeatures}</div>
                </div>

                {/* Coverage bar */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-[#f3f4f6] rounded-full overflow-hidden">
                    <div
                      className={`h-full coverage-bar ${cfg.bar}`}
                      style={{ width: `${el.coverage}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#6b7280] w-8 text-right shrink-0">
                    {el.coverage}%
                  </span>
                </div>

                {/* Status badge */}
                <div>
                  <span className={`text-[11px] font-semibold px-2 py-1 rounded-full ${cfg.badge}`}>
                    {cfg.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
