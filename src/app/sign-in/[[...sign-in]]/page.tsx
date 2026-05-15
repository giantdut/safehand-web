import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ec] px-6 py-16">
      <div className="mx-auto max-w-md">
        <h1 className="mb-3 text-3xl text-[#0d2b1a]" style={{ fontFamily: "var(--font-dm-serif)" }}>
          Welcome back to SafeHand
        </h1>
        <p className="mb-8 text-sm text-[#4b5563]">Sign in to continue your onboarding and dashboard.</p>
        <SignIn />
      </div>
    </main>
  );
}
