import { readTrainingMatrix } from "@/lib/safety-data";

export default async function TrainingPage() {
  const rows = await readTrainingMatrix();

  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-2xl text-[#0d2b1a]" style={{ fontFamily: "var(--font-dm-serif)" }}>
          Training matrix
        </h2>
        <p className="text-sm text-[#6b7280]">Read-only. Update training events through Telegram.</p>
      </header>

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
                  <li key={`${row.worker_id}-${cert.name}`}>
                    {cert.name} - {cert.status ?? "unknown"} {cert.expires ? `(expires ${cert.expires})` : ""}
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
