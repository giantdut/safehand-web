import Link from "next/link";
import { getRepoLastSync } from "@/lib/github";
import { readActionItems } from "@/lib/safety-data";

const PRIORITY_ORDER = ["high", "medium", "low"] as const;

type ActionsPageProps = {
  searchParams: Promise<{
    priority?: string;
    status?: string;
  }>;
};

export default async function ActionsPage({ searchParams }: ActionsPageProps) {
  const params = await searchParams;
  const [actions, lastSync] = await Promise.all([readActionItems(), getRepoLastSync()]);
  const filtered = actions.filter((entry) => {
    const matchesPriority = params.priority ? (entry.priority ?? "low") === params.priority : true;
    const matchesStatus = params.status ? (entry.status ?? "open") === params.status : true;
    return matchesPriority && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-2xl text-[#0d2b1a]" style={{ fontFamily: "var(--font-dm-serif)" }}>
          Action items
        </h2>
        <p className="text-sm text-[#6b7280]">Read-only. Mark completion by telling SafeHand in Telegram.</p>
        <p className="text-xs text-[#9ca3af]">
          Last synced: {lastSync ? new Date(lastSync).toLocaleString() : "Unknown"}
        </p>
      </header>

      <form className="flex flex-wrap items-end gap-3 rounded-xl border border-[#d1d5db] bg-white p-4 text-sm">
        <label className="space-y-1">
          <span className="text-[#6b7280]">Priority</span>
          <select name="priority" defaultValue={params.priority ?? ""} className="rounded-md border p-2">
            <option value="">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-[#6b7280]">Status</span>
          <select name="status" defaultValue={params.status ?? ""} className="rounded-md border p-2">
            <option value="">All</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </label>
        <button type="submit" className="rounded-md bg-[#1a4d2e] px-3 py-2 text-white">
          Apply filters
        </button>
        <Link href="/dashboard/actions" className="rounded-md border px-3 py-2 text-[#374151]">
          Reset
        </Link>
        <span className="text-xs text-[#6b7280]">{filtered.length} action(s) shown</span>
      </form>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#d1d5db] bg-white p-6 text-sm text-[#4b5563]">
          No action items match the current filters.
        </div>
      ) : (
        PRIORITY_ORDER.map((priority) => {
          const bucket = filtered.filter((entry) => (entry.priority ?? "low") === priority);
          if (bucket.length === 0) return null;
          return (
            <section key={priority} className="space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-[#6b7280]">{priority}</h3>
              {bucket.map((item) => (
                <article key={item.id} className="rounded-xl border border-[#d1d5db] bg-white p-4 text-sm">
                  <p className="font-medium text-[#111827]">{item.description}</p>
                  <p className="mt-1 text-[#6b7280]">
                    Due {item.due_date ?? "n/a"} · Status {item.status ?? "open"} · Source {item.source ?? "n/a"}
                  </p>
                </article>
              ))}
            </section>
          );
        })
      )}
    </div>
  );
}
