import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ec] px-6 py-16">
      <div className="mx-auto max-w-md">
        <h1 className="mb-3 text-3xl text-[#0d2b1a]" style={{ fontFamily: "var(--font-dm-serif)" }}>
          Create your SafeHand account
        </h1>
        <p className="mb-8 text-sm text-[#4b5563]">
          Get started with onboarding and connect your Telegram bot.
        </p>
        <SignUp />
      </div>
    </main>
  );
}
