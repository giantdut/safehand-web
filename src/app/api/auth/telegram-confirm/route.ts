import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const internalSecret = process.env.TELEGRAM_CONFIRM_SECRET;
  const incomingSecret = request.headers.get("x-safehand-secret");

  if (internalSecret && incomingSecret !== internalSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = (await request.json()) as {
    code?: string;
    telegramUserId?: string;
  };

  const code = payload.code?.trim();
  const telegramUserId = payload.telegramUserId?.trim();

  if (!code || !telegramUserId) {
    return NextResponse.json({ error: "Missing code or telegramUserId" }, { status: 400 });
  }

  const pairingCode = await prisma.pairingCode.findUnique({
    where: { code },
    include: { account: true },
  });

  if (!pairingCode) {
    return NextResponse.json({ error: "Pairing code not found" }, { status: 404 });
  }

  if (pairingCode.used || pairingCode.expiresAt < new Date()) {
    return NextResponse.json({ error: "Pairing code is invalid or expired" }, { status: 400 });
  }

  await prisma.$transaction([
    prisma.account.update({
      where: { id: pairingCode.accountId },
      data: {
        telegramUserId,
        telegramLinked: true,
      },
    }),
    prisma.pairingCode.update({
      where: { id: pairingCode.id },
      data: { used: true },
    }),
  ]);

  return NextResponse.json({ ok: true });
}
