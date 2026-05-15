"use client";

import { useState } from "react";

type SettingsFormProps = {
  initial: {
    businessName: string;
    industry: string;
    jurisdiction: string;
    telegramLinked: boolean;
    telegramUserId: string | null;
  };
};

export function SettingsForm({ initial }: SettingsFormProps) {
  const [businessName, setBusinessName] = useState(initial.businessName);
  const [industry, setIndustry] = useState(initial.industry);
  const [jurisdiction, setJurisdiction] = useState(initial.jurisdiction);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    setMessage("");
    const response = await fetch("/api/account/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessName, industry, jurisdiction }),
    });
    setSaving(false);

    if (!response.ok) {
      const payload = (await response.json()) as { error?: string };
      setMessage(payload.error ?? "Could not update settings");
      return;
    }

    setMessage("Settings updated.");
  }

  return (
    <div className="space-y-5 rounded-xl border border-[#d1d5db] bg-white p-6">
      <div>
        <h2 className="text-lg font-medium text-[#111827]">Business settings</h2>
        <p className="text-sm text-[#6b7280]">These fields support dashboard context and future Hermes memory sync.</p>
      </div>

      <label className="block text-sm">
        Business name
        <input
          className="mt-1 w-full rounded-md border border-[#d1d5db] p-2"
          value={businessName}
          onChange={(event) => setBusinessName(event.target.value)}
        />
      </label>
      <label className="block text-sm">
        Industry
        <input
          className="mt-1 w-full rounded-md border border-[#d1d5db] p-2"
          value={industry}
          onChange={(event) => setIndustry(event.target.value)}
        />
      </label>
      <label className="block text-sm">
        Jurisdiction
        <input
          className="mt-1 w-full rounded-md border border-[#d1d5db] p-2"
          value={jurisdiction}
          onChange={(event) => setJurisdiction(event.target.value)}
        />
      </label>

      <button
        type="button"
        onClick={save}
        disabled={saving}
        className="rounded-md bg-[#1a4d2e] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save settings"}
      </button>

      <div className="rounded-md border border-[#d1d5db] bg-[#f9fafb] p-3 text-sm">
        <p>
          Telegram status:{" "}
          <strong className={initial.telegramLinked ? "text-[#166534]" : "text-[#b45309]"}>
            {initial.telegramLinked ? "Connected" : "Not connected"}
          </strong>
        </p>
        <p className="text-[#6b7280]">Telegram user: {initial.telegramUserId ?? "Not linked yet"}</p>
        <a className="mt-2 inline-block text-[#1a4d2e] underline" href="/onboarding">
          Relink Telegram
        </a>
      </div>

      {message ? <p className="text-sm text-[#4b5563]">{message}</p> : null}
    </div>
  );
}
