"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RegisterForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
  const { register, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) router.replace("/dashboard");
  }, [loading, isAuthenticated, router]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-emerald-50">Create account</h1>
        <p className="mt-1 text-emerald-100/55">Start tracking expenses today</p>
      </div>
      <RegisterForm
        onSubmit={async (payload) => {
          await register(payload);
          router.push("/dashboard");
        }}
      />
    </div>
  );
}
