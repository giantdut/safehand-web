import { userTypes } from "@/lib/data";
import { Icon } from "./icons";

export default function WhoItsFor() {
  return (
    <section id="who" className="bg-[#0d2b1a] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[1.2px] text-[rgba(255,255,255,0.45)] mb-3">
          Who It&apos;s For
        </p>
        <h2
          className="text-3xl text-white mb-4 max-w-2xl"
          style={{ fontFamily: "var(--font-dm-serif)" }}
        >
          Built for the businesses that existing safety tools left behind.
        </h2>
        <p className="text-[rgba(255,255,255,0.6)] text-base leading-relaxed mb-12 max-w-xl">
          5–12 employees. Construction, trades, agriculture, food production, logistics. High turnover.
          Seasonal workforce. Owner wearing every hat. SafeHand was built for this exact context.
        </p>

        <div className="grid md:grid-cols-3 gap-5">
          {userTypes.map((user) => (
            <div
              key={user.role}
              className="bg-[#14391f] border border-[rgba(255,255,255,0.08)] rounded-xl p-6"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.08)] flex items-center justify-center mb-5">
                <Icon name={user.icon} className="w-5 h-5 text-[#5db870]" />
              </div>

              {/* Role */}
              <div
                className="text-lg text-white mb-3"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                {user.role}
              </div>

              {/* Description */}
              <p className="text-sm text-[rgba(255,255,255,0.6)] leading-relaxed mb-5">
                {user.description}
              </p>

              {/* How Hermes helps */}
              <div className="border-t border-[rgba(255,255,255,0.08)] pt-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.8px] text-[rgba(255,255,255,0.35)] mb-2">
                  How Hermes serves this user
                </div>
                <p className="text-sm text-[rgba(255,255,255,0.75)] leading-relaxed">
                  {user.howHermesHelps}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Industry pills */}
        <div className="mt-12 flex flex-wrap gap-2">
          {[
            "Construction",
            "Trades",
            "Agriculture",
            "Food Production",
            "Logistics",
            "Field Services",
          ].map((industry) => (
            <span
              key={industry}
              className="text-xs font-medium px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.6)]"
            >
              {industry}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
