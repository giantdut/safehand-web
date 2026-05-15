import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const account = await prisma.account.findUnique({
    where: { clerkUserId: userId },
    select: {
      telegramLinked: true,
      telegramUserId: true,
    },
  });

  return NextResponse.json({
    linked: account?.telegramLinked ?? false,
    telegramUserId: account?.telegramUserId ?? null,
  });
}
