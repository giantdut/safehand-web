import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = (await request.json()) as {
    businessName?: string;
    industry?: string;
    jurisdiction?: string;
  };

  const businessName = payload.businessName?.trim() ?? "";
  const industry = payload.industry?.trim() ?? "";
  const jurisdiction = payload.jurisdiction?.trim() ?? "";

  if (!businessName || !industry || !jurisdiction) {
    return NextResponse.json({ error: "Invalid settings payload" }, { status: 400 });
  }

  await prisma.account.update({
    where: { clerkUserId: userId },
    data: {
      businessName,
      industry,
      jurisdiction,
    },
  });

  return NextResponse.json({ ok: true });
}
