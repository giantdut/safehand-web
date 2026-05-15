import { getRepoLastSync } from "@/lib/github";
import { readTrainingMatrix } from "@/lib/safety-data";

function statusClass(status: string | undefined) {
  const normalized = (status ?? "").toLowerCase();
  if (normalized.includes("expired")) return "bg-[#fee2e2] text-[#991b1b]";
  if (normalized.includes("expir")) return "bg-[#fef3c7] text-[#92400e]";
  if (normalized.includes("current")) return "bg-[#dcfce7] text-[#166534]";
  return "bg-[#e5e7eb] text-[#374151]";
}

export default async function TrainingPage() {
  const [rows, lastSync] = await Promise.all([readTrainingMatrix(), getRepoLastSync()]);
  const hasAlerts = rows.some((row) =>
    (row.certifications ?? []).some((cert) => {
      const normalized = (cert.status ?? "").toLowerCase();
      return normalized.includes("expired") || normalized.includes("expir");
    }),
  );

  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-2xl text-[#0d2b1a]" style={{ fontFamily: "var(--font-dm-serif)" }}>
          Training matrix
        </h2>
        <p className="text-sm text-[#6b7280]">Read-only. Update training events through Telegram.</p>
        <p className="text-xs text-[#9ca3af]">
          Last synced: {lastSync ? new Date(lastSync).toLocaleString() : "Unknown"}
        </p>
      </header>

      {hasAlerts ? (
        <div className="rounded-xl border border-[#f59e0b] bg-[#fffbeb] p-3 text-sm text-[#92400e]">
          Expired or expiring certifications detected. Resolve in Telegram.
        </div>
      ) : null}

      {rows.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#d1d5db] bg-white p-6 text-sm text-[#4b5563]">
          No worker training records found yet.
        </div>
      ) : (
        <div className="space-y-3">
          {rows.map((row) => (
            <article key={row.worker_id} className="rounded-xl border border-[#d1d5db] bg-white p-4">
              <h3 className="font-medium text-[#111827]">{row.name}</h3>
              <ul className="mt-2 space-y-1 text-sm text-[#4b5563]">
                {(row.certifications ?? []).map((cert) => (
                  <li key={`${row.worker_id}-${cert.name}`} className="flex items-center justify-between gap-3">
                    <span>{cert.name}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${statusClass(cert.status)}`}>
                      {cert.status ?? "unknown"} {cert.expires ? `(expires ${cert.expires})` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
