import Link from "next/link";
import { getRepoLastSync } from "@/lib/github";
import { readHazards } from "@/lib/safety-data";

type HazardsPageProps = {
  searchParams: Promise<{
    severity?: string;
    status?: string;
    from?: string;
    to?: string;
  }>;
};

function isInDateRange(dateValue: string, from?: string, to?: string) {
  if (!dateValue) return false;
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return false;
  if (from) {
    const min = new Date(from);
    if (!Number.isNaN(min.getTime()) && date < min) return false;
  }
  if (to) {
    const max = new Date(to);
    if (!Number.isNaN(max.getTime()) && date > max) return false;
  }
  return true;
}

export default async function HazardsPage({ searchParams }: HazardsPageProps) {
  const params = await searchParams;
  const severity = params.severity?.toLowerCase() ?? "";
  const status = params.status?.toLowerCase() ?? "";
  const from = params.from;
  const to = params.to;

  const [hazards, lastSync] = await Promise.all([readHazards(), getRepoLastSync()]);
  const filtered = hazards.filter((hazard) => {
    const matchesSeverity = severity ? (hazard.severity ?? "").toLowerCase() === severity : true;
    const matchesStatus = status ? (hazard.status ?? "open").toLowerCase() === status : true;
    const matchesDate = from || to ? isInDateRange(hazard.date, from, to) : true;
    return matchesSeverity && matchesStatus && matchesDate;
  });

  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-2xl text-[#0d2b1a]" style={{ fontFamily: "var(--font-dm-serif)" }}>
          Hazard register
        </h2>
        <p className="text-sm text-[#6b7280]">Read-only. Report hazards through Telegram voice notes.</p>
        <p className="text-xs text-[#9ca3af]">
          Last synced: {lastSync ? new Date(lastSync).toLocaleString() : "Unknown"}
        </p>
      </header>

      <form className="grid gap-3 rounded-xl border border-[#d1d5db] bg-white p-4 text-sm md:grid-cols-4">
        <label className="space-y-1">
          <span className="text-[#6b7280]">Severity</span>
          <select name="severity" defaultValue={params.severity ?? ""} className="w-full rounded-md border p-2">
            <option value="">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-[#6b7280]">Status</span>
          <select name="status" defaultValue={params.status ?? ""} className="w-full rounded-md border p-2">
            <option value="">All</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-[#6b7280]">From</span>
          <input type="date" name="from" defaultValue={from ?? ""} className="w-full rounded-md border p-2" />
        </label>
        <label className="space-y-1">
          <span className="text-[#6b7280]">To</span>
          <input type="date" name="to" defaultValue={to ?? ""} className="w-full rounded-md border p-2" />
        </label>
        <div className="md:col-span-4 flex items-center gap-2">
          <button type="submit" className="rounded-md bg-[#1a4d2e] px-3 py-2 text-white">
            Apply filters
          </button>
          <Link href="/dashboard/hazards" className="rounded-md border px-3 py-2 text-[#374151]">
            Reset
          </Link>
          <span className="text-xs text-[#6b7280]">{filtered.length} hazard(s) shown</span>
        </div>
      </form>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#d1d5db] bg-white p-6 text-sm text-[#4b5563]">
          No hazard records match the current filters.
        </div>
      ) : (
        <div className="overflow-auto rounded-xl border border-[#d1d5db] bg-white">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-[#f9fafb] text-left text-[#6b7280]">
              <tr>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">Severity</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((hazard) => (
                <tr key={hazard.id} className="border-t border-[#e5e7eb]">
                  <td className="px-3 py-2">{hazard.date}</td>
                  <td className="px-3 py-2">{hazard.type}</td>
                  <td className="px-3 py-2">{hazard.severity ?? "n/a"}</td>
                  <td className="px-3 py-2">{hazard.status ?? "open"}</td>
                  <td className="px-3 py-2">
                    <details>
                      <summary className="cursor-pointer">{hazard.description}</summary>
                      <div className="mt-2 text-xs text-[#4b5563]">
                        <p>Location: {hazard.location ?? "n/a"}</p>
                        <p>
                          Controls: {Array.isArray(hazard.controls) && hazard.controls.length > 0
                            ? hazard.controls.join(", ")
                            : "n/a"}
                        </p>
                      </div>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
