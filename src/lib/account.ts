import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export type AccountProfile = {
  id: string;
  clerkUserId: string;
  businessName: string;
  industry: string;
  jurisdiction: string;
  workerCount: number;
  telegramUserId: string | null;
  telegramLinked: boolean;
};

export async function requireClerkUserId() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  return userId;
}

export async function getAccountByClerkUserId(clerkUserId: string) {
  return prisma.account.findUnique({
    where: { clerkUserId },
  });
}

export function hasBusinessProfile(account: AccountProfile | null | undefined) {
  if (!account) return false;
  return Boolean(
    account.businessName &&
      account.industry &&
      account.jurisdiction &&
      Number.isFinite(account.workerCount) &&
      account.workerCount > 0,
  );
}

export function isOnboardingComplete(account: AccountProfile | null | undefined) {
  return hasBusinessProfile(account) && Boolean(account?.telegramLinked);
}
