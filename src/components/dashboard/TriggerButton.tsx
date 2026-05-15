"use client";

import { useState } from "react";

type TriggerButtonProps = {
  action: "client-package" | "toolbox-talk" | "weekly-summary";
  label: string;
  successMessage: string;
};

export function TriggerButton({ action, label, successMessage }: TriggerButtonProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  async function trigger() {
    setLoading(true);
    setMessage("");

    const response = await fetch(`/api/trigger/${action}`, {
      method: "POST",
    });

    setLoading(false);
    if (!response.ok) {
      const payload = (await response.json()) as { error?: string };
      setMessage(payload.error ?? "Could not send trigger to Hermes.");
      return;
    }

    setMessage(successMessage);
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={trigger}
        disabled={loading}
        className="rounded-md bg-[#1a4d2e] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {loading ? "Sending..." : label}
      </button>
      {message ? <p className="text-sm text-[#4b5563]">{message}</p> : null}
    </div>
  );
}
