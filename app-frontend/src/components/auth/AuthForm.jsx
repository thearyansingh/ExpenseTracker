"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { getApiErrorMessage, getFieldErrors } from "@/lib/utils";

export function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setFormError("");
    setLoading(true);
    try {
      await onSubmit(email, password);
    } catch (err) {
      setErrors(getFieldErrors(err));
      setFormError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        inputMode="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        required
      />
      {formError && (
        <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-200" role="alert">
          {formError}
        </p>
      )}
      <Button type="submit" loading={loading}>
        Sign in
      </Button>
      <p className="text-center text-sm text-emerald-100/55">
        <span className="text-emerald-100/45">Forgot password? (coming soon)</span>
      </p>
      <p className="text-center text-sm text-emerald-100/70">
        No account?{" "}
        <Link href="/register" className="font-semibold text-emerald-300">
          Register
        </Link>
      </p>
    </form>
  );
}

export function RegisterForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setFormError("");
    setLoading(true);
    try {
      await onSubmit(form);
    } catch (err) {
      setErrors(getFieldErrors(err));
      setFormError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Name"
        name="name"
        autoComplete="name"
        value={form.name}
        onChange={update("name")}
        error={errors.name}
        required
      />
      <Input
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        value={form.email}
        onChange={update("email")}
        error={errors.email}
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        value={form.password}
        onChange={update("password")}
        error={errors.password}
        required
      />
      <p className="text-xs text-emerald-100/50">
        8+ chars with upper, lower, number, and special (@$!%*?&)
      </p>
      <Input
        label="Confirm password"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        value={form.confirmPassword}
        onChange={update("confirmPassword")}
        error={errors.confirmPassword}
        required
      />
      {formError && (
        <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-200" role="alert">
          {formError}
        </p>
      )}
      <Button type="submit" loading={loading}>
        Create account
      </Button>
      <p className="text-center text-sm text-emerald-100/70">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-emerald-300">
          Sign in
        </Link>
      </p>
    </form>
  );
}
