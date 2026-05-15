import { demoSteps } from "@/lib/data";
import { IconMic, IconZap, IconShield } from "./icons";

const steps = [
  {
    number: "01",
    title: "You talk",
    description:
      "Send a voice note or text to Hermes on Telegram. No app to install, no portal to log into. Your existing phone is the interface.",
    icon: IconMic,
  },
  {
    number: "02",
    title: "Hermes acts",
    description:
      "The agent classifies the input, logs it to the correct register, generates outputs, and schedules follow-ups — all without being asked.",
    icon: IconZap,
  },
  {
    number: "03",
    title: "Your program builds",
    description:
      "Hazard registers, SOPs, training records, and inspection logs update automatically. Your compliance position strengthens with every conversation.",
    icon: IconShield,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[1.2px] text-[#6b7280] mb-3">
          How It Works
        </p>
        <h2
          className="text-3xl text-[#111827] mb-4 max-w-2xl"
          style={{ fontFamily: "var(--font-dm-serif)" }}
        >
          One input. Five outputs. No form filled.
        </h2>
        <p className="text-[#6b7280] text-base leading-relaxed mb-16 max-w-xl">
          SafeHand&apos;s core differentiator: an agent, not a SaaS. One message triggers a chain of
          structured outputs that would take hours to produce manually.
        </p>

        {/* Three-step flow */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, i) => {
            const StepIcon = step.icon;
            return (
              <div key={step.number} className="relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(100%_-_16px)] w-[calc(100%_-_32px)] h-px bg-[#e5e7eb] z-0" />
                )}
                <div className="relative z-10">
                  {/* Icon circle */}
                  <div className="w-12 h-12 rounded-full bg-[#edf7ef] border-2 border-[#1e5c2e] flex items-center justify-center mb-5">
                    <StepIcon className="w-5 h-5 text-[#1e5c2e]" />
                  </div>
                  <div className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-widest mb-2">
                    {step.number}
                  </div>
                  <div className="text-base font-semibold text-[#111827] mb-2">
                    {step.title}
                  </div>
                  <p className="text-sm text-[#6b7280] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Demo loop */}
        <div className="bg-[#f9fafb] rounded-2xl border border-[#e5e7eb] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#e5e7eb] flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#dc2626]" />
            <div className="w-2 h-2 rounded-full bg-[#d97706]" />
            <div className="w-2 h-2 rounded-full bg-[#1e5c2e]" />
            <span className="text-xs text-[#6b7280] ml-2 font-medium">
              90-second demo — forklift near-miss, loading bay
            </span>
          </div>
          <div className="divide-y divide-[#f3f4f6]">
            {demoSteps.map((step) => (
              <div key={step.step} className="px-6 py-4 flex gap-5 items-start">
                <span className="shrink-0 w-6 h-6 rounded-full bg-[#0d2b1a] text-white text-[11px] font-semibold flex items-center justify-center mt-0.5">
                  {step.step}
                </span>
                <div className="flex-1 grid md:grid-cols-2 gap-2">
                  <div className="text-sm text-[#374151] leading-relaxed">
                    {step.action}
                  </div>
                  <div className="text-sm text-[#1e5c2e] font-medium leading-relaxed flex items-start gap-2">
                    <span className="text-[#1e5c2e] shrink-0 mt-0.5">→</span>
                    {step.output}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 bg-[#edf7ef] border-t border-[#c8ecd0]">
            <p className="text-xs text-[#1e5c2e] font-medium">
              What this proves: voice → structured output · one input → five outputs · memory retained · cron scheduled · no form filled
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
