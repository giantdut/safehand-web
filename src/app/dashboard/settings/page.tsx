import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SettingsForm } from "@/components/dashboard/SettingsForm";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const [user, account] = await Promise.all([
    currentUser(),
    prisma.account.findUnique({
      where: { clerkUserId: userId },
      select: {
        businessName: true,
        industry: true,
        jurisdiction: true,
        telegramLinked: true,
        telegramUserId: true,
      },
    }),
  ]);

  if (!account) {
    redirect("/onboarding");
  }

  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-2xl text-[#0d2b1a]" style={{ fontFamily: "var(--font-dm-serif)" }}>
          Settings
        </h2>
        <p className="text-sm text-[#6b7280]">Account email: {user?.primaryEmailAddress?.emailAddress ?? "Unknown"}</p>
      </header>
      <SettingsForm
        initial={{
          businessName: account.businessName,
          industry: account.industry,
          jurisdiction: account.jurisdiction,
          telegramLinked: account.telegramLinked,
          telegramUserId: account.telegramUserId,
        }}
      />
    </div>
  );
}
