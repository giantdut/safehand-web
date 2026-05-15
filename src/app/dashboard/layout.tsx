import { redirect } from "next/navigation";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { getAccountByClerkUserId, hasBusinessProfile, requireClerkUserId } from "@/lib/account";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = await requireClerkUserId();
  const account = await getAccountByClerkUserId(userId);

  if (!hasBusinessProfile(account) || !account?.telegramLinked) {
    redirect("/onboarding");
  }

  return (
    <div className="min-h-screen bg-[#f4f1ec]">
      <DashboardNav />
      <main className="mx-auto w-full max-w-6xl px-6 py-6">{children}</main>
    </div>
  );
}
