import { redirect } from "next/navigation";
import { getAccountByClerkUserId, requireClerkUserId } from "@/lib/account";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";

export default async function OnboardingPage() {
  const clerkUserId = await requireClerkUserId();
  const account = await getAccountByClerkUserId(clerkUserId);

  if (account?.telegramLinked) {
    redirect("/dashboard");
  }

  return (
    <OnboardingFlow
      initial={{
        businessName: account?.businessName ?? "",
        industry: account?.industry ?? "",
        jurisdiction: account?.jurisdiction ?? "",
        workerCount: account?.workerCount ?? 5,
        telegramLinked: account?.telegramLinked ?? false,
      }}
    />
  );
}
