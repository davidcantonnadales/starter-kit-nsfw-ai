"use client";

import { AuthCard } from "@/components/auth-card";
import { ProviderLoginButtons } from "@/components/auth/provider-login-buttons";
import { OrSeparator } from "@/components/ui/or-separator";
import { logCustomEvent } from "@/lib/analytics";
import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    logCustomEvent("Login Page Loaded", {});
  });

  return (
    <div className="grow flex flex-col items-center justify-center sm:px-6 lg:px-8">
      <section className="w-full max-w-md space-y-4">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl m-6">
          Login
        </h1>
        <AuthCard />
        <OrSeparator />
        <div className="m-6">
          <ProviderLoginButtons />
        </div>
      </section>
    </div>
  );
}
