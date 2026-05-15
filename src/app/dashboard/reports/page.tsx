import { getRepoDirectory, getRepoFile } from "@/lib/github";

export default async function ReportsPage() {
  const files = await getRepoDirectory("weekly-summaries");
  const sorted = [...files]
    .filter((entry) => entry.type === "file")
    .sort((left, right) => right.name.localeCompare(left.name));
  const latest = sorted[0];
  const latestContents = latest ? await getRepoFile(latest.path) : null;

  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-2xl text-[#0d2b1a]" style={{ fontFamily: "var(--font-dm-serif)" }}>
          Weekly reports
        </h2>
        <p className="text-sm text-[#6b7280]">Read-only summaries generated weekly by Hermes.</p>
      </header>

      {sorted.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#d1d5db] bg-white p-6 text-sm text-[#4b5563]">
          No weekly summaries available yet.
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-xl border border-[#d1d5db] bg-white p-4">
            <h3 className="mb-2 text-sm font-medium text-[#111827]">Available reports</h3>
            <ul className="space-y-1 text-sm text-[#374151]">
              {sorted.map((file) => (
                <li key={file.path}>{file.name}</li>
              ))}
            </ul>
          </aside>
          <article className="rounded-xl border border-[#d1d5db] bg-white p-4">
            <h3 className="mb-2 text-sm font-medium text-[#111827]">{latest?.name}</h3>
            <pre className="overflow-auto whitespace-pre-wrap text-xs text-[#374151]">
              {latestContents ?? "No report content to preview."}
            </pre>
          </article>
        </div>
      )}
    </div>
  );
}
