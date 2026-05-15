import { Button } from "@/components/ui/button";
import { demoSteps } from "@/lib/data";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#0d2b1a] text-white">
      <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            {/* Pill badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["ISO 45001-aligned", "Telegram-first", "No forms. No setup."].map((pill) => (
                <span
                  key={pill}
                  className="text-xs font-medium px-3 py-1 rounded-full border border-[rgba(255,255,255,0.2)] text-[rgba(255,255,255,0.75)]"
                >
                  {pill}
                </span>
              ))}
            </div>

            {/* Headline */}
            <h1
              className="text-4xl lg:text-5xl text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              Your safety program builds itself — from real conversations.
            </h1>

            <p className="text-[rgba(255,255,255,0.7)] text-lg leading-relaxed mb-8 max-w-lg">
              Small employers carry identical legal liability to large corporations — but operate with no
              safety officer, no compliance budget, and no time. SafeHand changes that. Talk to Hermes like
              you&apos;d talk to a colleague. Your OH&amp;S program builds passively in the background.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link href="/sign-up">
                <Button
                  className="bg-[#1e5c2e] hover:bg-[#2a7a3b] text-white border-0 px-6 h-11 text-sm font-medium"
                >
                  Start onboarding
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="border-[rgba(255,255,255,0.3)] text-white hover:bg-[rgba(255,255,255,0.08)] bg-transparent px-6 h-11 text-sm"
                >
                  Sign in
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: demo chat bubbles */}
          <div className="hidden lg:block">
            <div className="bg-[#14391f] rounded-2xl p-6 space-y-3">
              <div className="text-xs text-[rgba(255,255,255,0.4)] mb-4 uppercase tracking-widest font-medium">
                Live demo — loading bay near-miss
              </div>

              {/* User message */}
              <div className="chat-bubble-anim flex justify-end">
                <div className="bg-[#1e5c2e] text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[85%] leading-relaxed">
                  🎤 &ldquo;One of my guys almost got hit by a forklift in the loading bay.&rdquo;
                </div>
              </div>

              {demoSteps.slice(0, 4).map((step) => (
                <div key={step.step} className="chat-bubble-anim flex justify-start">
                  <div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] text-white text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm max-w-[90%]">
                    <div className="text-[rgba(255,255,255,0.5)] text-[11px] mb-1 font-medium uppercase tracking-wide">
                      Hermes
                    </div>
                    <div className="text-[rgba(255,255,255,0.9)] leading-relaxed">
                      {step.output}
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-2 border-t border-[rgba(255,255,255,0.08)]">
                <p className="text-[11px] text-[rgba(255,255,255,0.35)] text-center">
                  1 voice note → 5 outputs · No form filled · No dashboard opened
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
