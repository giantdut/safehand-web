import { readActionItems } from "@/lib/safety-data";

const PRIORITY_ORDER = ["high", "medium", "low"] as const;

export default async function ActionsPage() {
  const actions = await readActionItems();

  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-2xl text-[#0d2b1a]" style={{ fontFamily: "var(--font-dm-serif)" }}>
          Action items
        </h2>
        <p className="text-sm text-[#6b7280]">Read-only. Mark completion by telling SafeHand in Telegram.</p>
      </header>

      {actions.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#d1d5db] bg-white p-6 text-sm text-[#4b5563]">
          No action items tracked yet.
        </div>
      ) : (
        PRIORITY_ORDER.map((priority) => {
          const bucket = actions.filter((entry) => (entry.priority ?? "low") === priority);
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
