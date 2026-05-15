import { features } from "@/lib/data";
import { Icon } from "./icons";

export default function FeaturesGrid() {
  return (
    <section id="features" className="bg-[#f9fafb] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[1.2px] text-[#6b7280] mb-3">
          What SafeHand Does
        </p>
        <h2
          className="text-3xl text-[#111827] mb-4 max-w-2xl"
          style={{ fontFamily: "var(--font-dm-serif)" }}
        >
          Nine capabilities. One conversation channel. No new software to learn.
        </h2>
        <p className="text-[#6b7280] text-base leading-relaxed mb-12 max-w-xl">
          Every feature below is triggered by natural language — voice notes or text via Telegram.
          No dashboards to navigate, no forms to fill.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-xl border border-[#e5e7eb] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow"
            >
              {/* Icon */}
              <div className="w-9 h-9 rounded-lg bg-[#edf7ef] flex items-center justify-center mb-4">
                <Icon name={feature.icon} className="w-4 h-4 text-[#1e5c2e]" />
              </div>

              {/* Name */}
              <div className="text-sm font-semibold text-[#111827] mb-2 leading-snug">
                {feature.name}
              </div>

              {/* Description */}
              <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
                {feature.description}
              </p>

              {/* Trigger phrases */}
              <div className="flex flex-wrap gap-1.5">
                {feature.triggerPhrases.map((phrase) => (
                  <span
                    key={phrase}
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#edf7ef] text-[#1e5c2e]"
                  >
                    &ldquo;{phrase}&rdquo;
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
