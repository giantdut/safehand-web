import { readHazards } from "@/lib/safety-data";

export default async function HazardsPage() {
  const hazards = await readHazards();

  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-2xl text-[#0d2b1a]" style={{ fontFamily: "var(--font-dm-serif)" }}>
          Hazard register
        </h2>
        <p className="text-sm text-[#6b7280]">Read-only. Report hazards through Telegram voice notes.</p>
      </header>

      {hazards.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#d1d5db] bg-white p-6 text-sm text-[#4b5563]">
          No hazard records found yet.
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
              {hazards.map((hazard) => (
                <tr key={hazard.id} className="border-t border-[#e5e7eb]">
                  <td className="px-3 py-2">{hazard.date}</td>
                  <td className="px-3 py-2">{hazard.type}</td>
                  <td className="px-3 py-2">{hazard.severity ?? "n/a"}</td>
                  <td className="px-3 py-2">{hazard.status ?? "open"}</td>
                  <td className="px-3 py-2">{hazard.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
