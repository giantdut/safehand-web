import { TriggerButton } from "@/components/dashboard/TriggerButton";
import { computeProgramHealthScore } from "@/lib/program-health";
import { getRepoLastSync } from "@/lib/github";
import { readActionItems, readHazards, readTrainingMatrix } from "@/lib/safety-data";

export default async function DashboardHomePage() {
  const [health, lastSync, hazards, trainingRows, actions] = await Promise.all([
    computeProgramHealthScore(),
    getRepoLastSync(),
    readHazards(),
    readTrainingMatrix(),
    readActionItems(),
  ]);

  const upcomingExpiries = trainingRows.flatMap((row) => row.certifications ?? []).filter((cert) => {
    const status = cert.status?.toLowerCase() ?? "";
    return status.includes("expir") && !status.includes("expired");
  });

  const openActions = actions.filter((action) => (action.status ?? "open") === "open");

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border border-[#d1d5db] bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-[#6b7280]">Program health score</p>
          <p className="mt-2 text-4xl font-semibold text-[#0d2b1a]">{health.score}/100</p>
        </article>
        <article className="rounded-xl border border-[#d1d5db] bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-[#6b7280]">Hazard register</p>
          <p className="mt-2 text-4xl font-semibold text-[#0d2b1a]">{hazards.length}</p>
        </article>
        <article className="rounded-xl border border-[#d1d5db] bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-[#6b7280]">Workers tracked</p>
          <p className="mt-2 text-4xl font-semibold text-[#0d2b1a]">{trainingRows.length}</p>
        </article>
        <article className="rounded-xl border border-[#d1d5db] bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-[#6b7280]">Open action items</p>
          <p className="mt-2 text-4xl font-semibold text-[#0d2b1a]">{openActions.length}</p>
        </article>
      </section>

      <section className="rounded-xl border border-[#d1d5db] bg-white p-5">
        <h2 className="text-lg font-medium text-[#111827]">Quick actions</h2>
        <p className="mt-1 text-sm text-[#6b7280]">
          Trigger Hermes via Telegram. Generated files are delivered in Telegram, not the dashboard.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <TriggerButton
            action="toolbox-talk"
            label="Generate toolbox talk"
            successMessage="SafeHand will send the toolbox talk in Telegram shortly."
          />
          <TriggerButton
            action="client-package"
            label="Generate client package"
            successMessage="SafeHand is generating your client package in Telegram."
          />
        </div>
      </section>

      <section className="rounded-xl border border-[#d1d5db] bg-white p-5">
        <h2 className="text-lg font-medium text-[#111827]">Status and freshness</h2>
        <ul className="mt-2 space-y-1 text-sm text-[#4b5563]">
          <li>Upcoming certification expiries (30 days): {upcomingExpiries.length}</li>
          <li>Last GitHub sync: {lastSync ? new Date(lastSync).toLocaleString() : "Unknown"}</li>
        </ul>
      </section>
    </div>
  );
}
