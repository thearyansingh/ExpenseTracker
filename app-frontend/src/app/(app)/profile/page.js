"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  applyTheme,
  getStoredCurrency,
  getStoredTheme,
  setStoredCurrency,
  setStoredTheme,
} from "@/lib/preferences";
import { formatMoney } from "@/lib/format";
import toast from "react-hot-toast";

const CURRENCIES = ["INR", "USD", "EUR", "GBP"];
const THEMES = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "system", label: "System" },
];

export default function ProfilePage() {
  const { user, logout, updateIncome } = useAuth();
  const [income, setIncome] = useState("");
  const [saving, setSaving] = useState(false);
  const [theme, setTheme] = useState("system");
  const [currency, setCurrency] = useState("INR");

  useEffect(() => {
    setIncome(String(user?.monthlyIncome ?? 0));
    setTheme(getStoredTheme());
    setCurrency(getStoredCurrency() || user?.currency || "INR");
    applyTheme(getStoredTheme());
  }, [user]);

  async function saveIncome(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await updateIncome(Number(income));
      toast.success("Monthly income updated");
    } catch {
      toast.error("Failed to update income");
    } finally {
      setSaving(false);
    }
  }

  function onThemeChange(value) {
    setTheme(value);
    setStoredTheme(value);
  }

  function onCurrencyChange(value) {
    setCurrency(value);
    setStoredCurrency(value);
    toast.success("Currency preference saved locally");
  }

  return (
    <div className="space-y-6 pb-4">
      <header>
        <h1 className="text-2xl font-bold text-emerald-50">Profile</h1>
        <p className="text-sm text-emerald-100/55">{user?.email}</p>
      </header>

      <section className="panel rounded-2xl p-4">
        <h2 className="font-semibold text-emerald-50">Monthly income</h2>
        <p className="mt-1 text-sm text-emerald-100/60">
          Current: {formatMoney(user?.monthlyIncome, currency)}
        </p>
        <form onSubmit={saveIncome} className="mt-3 space-y-3">
          <Input
            label="Amount"
            type="number"
            inputMode="decimal"
            min={0}
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
          <Button type="submit" loading={saving}>
            Save income
          </Button>
        </form>
      </section>

      <section className="panel rounded-2xl p-4">
        <h2 className="mb-3 font-semibold text-emerald-50">Theme</h2>
        <div className="flex flex-wrap gap-2">
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onThemeChange(t.id)}
              className={`min-h-[44px] rounded-xl border px-4 text-sm font-medium ${
                theme === t.id
                  ? "border-emerald-400/60 bg-emerald-500/15 text-emerald-200"
                  : "border-emerald-900/70 bg-[#112720] text-emerald-100/70"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      <section className="panel rounded-2xl p-4">
        <h2 className="mb-3 font-semibold text-emerald-50">Display currency</h2>
        <p className="mb-2 text-xs text-emerald-100/55">
          Stored on this device (backend user currency: {user?.currency})
        </p>
        <div className="flex flex-wrap gap-2">
          {CURRENCIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onCurrencyChange(c)}
              className={`min-h-[44px] rounded-xl border px-4 text-sm font-medium ${
                currency === c
                  ? "border-emerald-400/60 bg-emerald-500/15 text-emerald-200"
                  : "border-emerald-900/70 bg-[#112720] text-emerald-100/70"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <Button variant="danger" onClick={logout}>
        Sign out
      </Button>

      <p className="text-center text-xs text-emerald-100/45">
        Sign out clears your session. The refresh cookie may remain until it
        expires (no server logout endpoint).
      </p>
    </div>
  );
}
