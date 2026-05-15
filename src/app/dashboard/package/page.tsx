import { TriggerButton } from "@/components/dashboard/TriggerButton";

export default function PackagePage() {
  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-2xl text-[#0d2b1a]" style={{ fontFamily: "var(--font-dm-serif)" }}>
          Client package generator
        </h2>
        <p className="text-sm text-[#6b7280]">
          Triggers Hermes to compile your package. Delivery happens in Telegram within a few minutes.
        </p>
      </header>

      <section className="rounded-xl border border-[#d1d5db] bg-white p-5">
        <ul className="list-disc space-y-1 pl-5 text-sm text-[#374151]">
          <li>Hazard register summary</li>
          <li>Training matrix snapshot</li>
          <li>Recent inspections and incident references</li>
          <li>SOP and policy artifacts from the safety repo</li>
        </ul>
        <div className="mt-4">
          <TriggerButton
            action="client-package"
            label="Generate package"
            successMessage="SafeHand is generating your package and will send it to Telegram."
          />
        </div>
      </section>
    </div>
  );
}
