import Link from "next/link";
import { getRepoDirectory, getRepoFile, getRepoLastSync } from "@/lib/github";

type ReportsPageProps = {
  searchParams: Promise<{
    file?: string;
  }>;
};

export default async function ReportsPage({ searchParams }: ReportsPageProps) {
  const params = await searchParams;
  const [files, lastSync] = await Promise.all([getRepoDirectory("weekly-summaries"), getRepoLastSync()]);
  const sorted = [...files]
    .filter((entry) => entry.type === "file")
    .sort((left, right) => right.name.localeCompare(left.name));
  const selected = sorted.find((file) => file.path === params.file) ?? sorted[0];
  const selectedContents = selected ? await getRepoFile(selected.path) : null;

  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-2xl text-[#0d2b1a]" style={{ fontFamily: "var(--font-dm-serif)" }}>
          Weekly reports
        </h2>
        <p className="text-sm text-[#6b7280]">Read-only summaries generated weekly by Hermes.</p>
        <p className="text-xs text-[#9ca3af]">
          Last synced: {lastSync ? new Date(lastSync).toLocaleString() : "Unknown"}
        </p>
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
                <li key={file.path}>
                  <Link
                    href={`/dashboard/reports?file=${encodeURIComponent(file.path)}`}
                    className={
                      selected?.path === file.path ? "font-medium text-[#0d2b1a] underline" : "text-[#374151]"
                    }
                  >
                    {file.name}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
          <article className="rounded-xl border border-[#d1d5db] bg-white p-4">
            <h3 className="mb-2 text-sm font-medium text-[#111827]">{selected?.name}</h3>
            <pre className="overflow-auto whitespace-pre-wrap text-xs text-[#374151]">
              {selectedContents ?? "No report content to preview."}
            </pre>
          </article>
        </div>
      )}
    </div>
  );
}
