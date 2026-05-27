"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const ICONS = ["💰", "🍔", "🚗", "🏠", "🛒", "💊", "🎮", "✈️", "📚", "🎁"];
const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

export function BudgetForm({ initial, onSubmit, onCancel, loading }) {
  const [name, setName] = useState("");
  const [limitAmount, setLimitAmount] = useState("");
  const [icon, setIcon] = useState("💰");
  const [color, setColor] = useState("#3B82F6");

  useEffect(() => {
    if (initial) {
      setName(initial.name || "");
      setLimitAmount(String(initial.limitAmount || ""));
      setIcon(initial.icon || "💰");
      setColor(initial.color || "#3B82F6");
    }
  }, [initial]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      name: name.trim(),
      limitAmount: Number(limitAmount),
      icon,
      color,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        maxLength={30}
      />
      <Input
        label="Monthly limit"
        type="number"
        inputMode="decimal"
        min={1}
        value={limitAmount}
        onChange={(e) => setLimitAmount(e.target.value)}
        required
      />
      <div>
        <p className="mb-2 text-sm font-medium">Icon</p>
        <div className="flex flex-wrap gap-2">
          {ICONS.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIcon(i)}
              className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${
                icon === i ? "ring-2 ring-emerald-500" : "bg-zinc-100 dark:bg-zinc-800"
              }`}
            >
              {i}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Color</p>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`h-11 w-11 rounded-full ${color === c ? "ring-2 ring-offset-2 ring-emerald-500" : ""}`}
              style={{ backgroundColor: c }}
              aria-label={`Color ${c}`}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {initial ? "Save" : "Create"}
        </Button>
      </div>
    </form>
  );
}
