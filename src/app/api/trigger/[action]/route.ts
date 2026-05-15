import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

const ALLOWED_ACTIONS = ["client-package", "toolbox-talk", "weekly-summary"] as const;

export async function POST(_: Request, { params }: { params: Promise<{ action: string }> }) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { action } = await params;

  if (!ALLOWED_ACTIONS.includes(action as (typeof ALLOWED_ACTIONS)[number])) {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }

  const account = await prisma.account.findUnique({
    where: { clerkUserId: userId },
    select: { telegramUserId: true, telegramLinked: true },
  });

  if (!account?.telegramLinked || !account.telegramUserId) {
    return NextResponse.json({ error: "Telegram not linked" }, { status: 400 });
  }

  const triggerUrl = process.env.VPS_TRIGGER_URL;
  const triggerSecret = process.env.DASHBOARD_TRIGGER_SECRET;

  if (!triggerUrl || !triggerSecret) {
    return NextResponse.json({ error: "Trigger service is not configured" }, { status: 500 });
  }

  const response = await fetch(`${triggerUrl.replace(/\/$/, "")}/trigger`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: triggerSecret,
      telegram_user_id: account.telegramUserId,
      action,
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to call trigger service" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
