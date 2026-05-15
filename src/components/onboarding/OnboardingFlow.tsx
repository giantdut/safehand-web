"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type OnboardingFlowProps = {
  initial: {
    businessName: string;
    industry: string;
    jurisdiction: string;
    workerCount: number;
    telegramLinked: boolean;
  };
};

const INDUSTRIES = [
  "Construction",
  "Trades",
  "Agriculture",
  "Food Production",
  "Logistics",
  "Field Services",
  "Other",
];

export function OnboardingFlow({ initial }: OnboardingFlowProps) {
  const router = useRouter();
  const hasProfile =
    Boolean(initial.businessName && initial.industry && initial.jurisdiction) && initial.workerCount > 0;

  const [step, setStep] = useState<number>(initial.telegramLinked ? 3 : hasProfile ? 2 : 1);
  const [businessName, setBusinessName] = useState(initial.businessName);
  const [industry, setIndustry] = useState(initial.industry);
  const [jurisdiction, setJurisdiction] = useState(initial.jurisdiction);
  const [workerCount, setWorkerCount] = useState(initial.workerCount || 5);
  const [pairingCode, setPairingCode] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const isPolling = step === 2 && Boolean(pairingCode);

  useEffect(() => {
    if (step !== 2 || !pairingCode) return;

    const timeoutAt = Date.now() + 2 * 60_000;
    const interval = window.setInterval(async () => {
      const response = await fetch("/api/auth/telegram-status");
      const payload = (await response.json()) as { linked: boolean };
      if (payload.linked) {
        window.clearInterval(interval);
        setStep(3);
        router.push("/dashboard");
        return;
      }

      if (Date.now() > timeoutAt) {
        window.clearInterval(interval);
        setStatus("Timed out waiting for pairing. Regenerate a code and try again.");
      }
    }, 5000);

    return () => window.clearInterval(interval);
  }, [pairingCode, router, step]);

  const canSubmitProfile = useMemo(() => {
    return Boolean(businessName && industry && jurisdiction && workerCount > 0);
  }, [businessName, industry, jurisdiction, workerCount]);

  async function saveProfile() {
    if (!canSubmitProfile) return;
    setSaving(true);
    setStatus("");

    const response = await fetch("/api/onboarding/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        businessName,
        industry,
        jurisdiction,
        workerCount,
      }),
    });

    setSaving(false);
    if (!response.ok) {
      setStatus("Could not save profile. Please try again.");
      return;
    }

    await generatePairingCode();
    setStep(2);
  }

  async function generatePairingCode() {
    setStatus("");
    const response = await fetch("/api/auth/pairing-code", { method: "POST" });
    const payload = (await response.json()) as { code?: string; error?: string };

    if (!response.ok || !payload.code) {
      setStatus(payload.error ?? "Could not create a pairing code.");
      return;
    }

    setPairingCode(payload.code);
    setStatus("Send this code to the SafeHand Telegram bot using /start <code>.");
  }

  return (
    <main className="min-h-screen bg-[#f4f1ec] px-6 py-10">
      <div className="mx-auto max-w-2xl rounded-xl border border-[#d1d5db] bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-3xl text-[#0d2b1a]" style={{ fontFamily: "var(--font-dm-serif)" }}>
          Onboarding
        </h1>
        <p className="mb-6 text-sm text-[#4b5563]">Step {step} of 3</p>

        {step === 1 && (
          <div className="space-y-4">
            <label className="block text-sm">
              Business name
              <input
                className="mt-1 w-full rounded-md border border-[#d1d5db] p-2"
                value={businessName}
                onChange={(event) => setBusinessName(event.target.value)}
              />
            </label>

            <label className="block text-sm">
              Industry
              <select
                className="mt-1 w-full rounded-md border border-[#d1d5db] p-2"
                value={industry}
                onChange={(event) => setIndustry(event.target.value)}
              >
                <option value="">Select an industry</option>
                {INDUSTRIES.map((entry) => (
                  <option key={entry} value={entry}>
                    {entry}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm">
              Province/State
              <input
                className="mt-1 w-full rounded-md border border-[#d1d5db] p-2"
                value={jurisdiction}
                onChange={(event) => setJurisdiction(event.target.value)}
              />
            </label>

            <label className="block text-sm">
              Number of workers ({workerCount})
              <input
                type="range"
                className="mt-1 w-full"
                min={1}
                max={12}
                value={workerCount}
                onChange={(event) => setWorkerCount(Number(event.target.value))}
              />
            </label>

            <button
              type="button"
              onClick={saveProfile}
              disabled={!canSubmitProfile || saving}
              className="rounded-md bg-[#1a4d2e] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              {saving ? "Saving..." : "Continue to Telegram pairing"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm text-[#374151]">
              Open Telegram and send <code>/start {pairingCode ?? "------"}</code> to your SafeHand bot.
            </p>
            <div className="rounded-md border border-dashed border-[#1a4d2e] bg-[#edf7ef] p-4 text-center">
              <p className="text-xs text-[#4b5563]">Pairing code</p>
              <p className="text-3xl font-semibold tracking-[0.35rem] text-[#0d2b1a]">{pairingCode ?? "------"}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-md bg-[#1a4d2e] px-4 py-2 text-sm font-medium text-white"
                onClick={generatePairingCode}
              >
                Regenerate code
              </button>
              {isPolling ? <span className="text-sm text-[#4b5563]">Polling every 5s...</span> : null}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="rounded-md border border-[#86efac] bg-[#f0fdf4] p-4 text-sm text-[#14532d]">
            Telegram linked. Redirecting to dashboard...
          </div>
        )}

        {status ? <p className="mt-4 text-sm text-[#4b5563]">{status}</p> : null}
      </div>
    </main>
  );
}
