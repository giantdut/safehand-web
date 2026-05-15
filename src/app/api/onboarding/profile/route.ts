import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = (await request.json()) as {
    businessName?: string;
    industry?: string;
    jurisdiction?: string;
    workerCount?: number;
  };

  const businessName = payload.businessName?.trim() ?? "";
  const industry = payload.industry?.trim() ?? "";
  const jurisdiction = payload.jurisdiction?.trim() ?? "";
  const workerCount = Number(payload.workerCount ?? 0);

  if (!businessName || !industry || !jurisdiction || workerCount < 1 || workerCount > 12) {
    return NextResponse.json({ error: "Invalid profile fields" }, { status: 400 });
  }

  const account = await prisma.account.upsert({
    where: { clerkUserId: userId },
    create: {
      clerkUserId: userId,
      businessName,
      industry,
      jurisdiction,
      workerCount,
    },
    update: {
      businessName,
      industry,
      jurisdiction,
      workerCount,
    },
  });

  return NextResponse.json({ ok: true, accountId: account.id });
}
