"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { login, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) router.replace("/dashboard");
  }, [loading, isAuthenticated, router]);

  return (
  
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-emerald-50">Welcome back</h1>
        <p className="mt-1 text-emerald-100/55">Sign in to manage your money</p>
      </div>
      <LoginForm
        onSubmit={async (email, password) => {
          await login(email, password);
          router.push("/dashboard");
        }}
      />
    </div>
  );
}
