import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const account = await prisma.account.findUnique({
    where: { clerkUserId: userId },
  });

  if (!account) {
    return NextResponse.json({ error: "Complete profile first" }, { status: 400 });
  }

  await prisma.pairingCode.updateMany({
    where: {
      accountId: account.id,
      used: false,
    },
    data: {
      used: true,
    },
  });

  let code = "";
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const candidate = generateCode();
    const existing = await prisma.pairingCode.findUnique({
      where: { code: candidate },
      select: { id: true },
    });
    if (!existing) {
      code = candidate;
      break;
    }
  }

  if (!code) {
    return NextResponse.json({ error: "Failed to allocate unique code" }, { status: 500 });
  }

  await prisma.pairingCode.create({
    data: {
      code,
      accountId: account.id,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    },
  });

  return NextResponse.json({ code, expiresInSeconds: 600 });
}
