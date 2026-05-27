"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  useBudgets,
  useCreateBudget,
  useUpdateBudget,
  useDeleteBudget,
} from "@/hooks/useBudgets";
import { useBudgetSpentMap } from "@/hooks/useBudgetSpent";
import { useAuth } from "@/hooks/useAuth";
import { BudgetCard } from "@/components/budgets/BudgetCard";
import { BudgetForm } from "@/components/budgets/BudgetForm";
import { Modal } from "@/components/ui/Modal";
import { Skeleton } from "@/components/ui/Skeleton";
import { getStoredCurrency } from "@/lib/preferences";

export default function BudgetsPage() {
  const { user } = useAuth();
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const currency = getStoredCurrency() || user?.currency || "INR";

  const { data: budgets, isLoading, isError, refetch } = useBudgets();
  const { spentMap } = useBudgetSpentMap(month, year);
  const createBudget = useCreateBudget();
  const updateBudget = useUpdateBudget();
  const deleteBudget = useDeleteBudget();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(budget) {
    setEditing(budget);
    setModalOpen(true);
  }

  async function handleSubmit(payload) {
    if (editing) {
      await updateBudget.mutateAsync({ id: editing._id, ...payload });
    } else {
      await createBudget.mutateAsync(payload);
    }
    setModalOpen(false);
    setEditing(null);
  }

  return (
    <div className="space-y-4 pb-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-emerald-50">Budgets</h1>
        <button
          type="button"
          onClick={openCreate}
          className="neon-ring flex h-12 items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-4 text-sm font-semibold text-emerald-200"
        >
          <Plus className="h-5 w-5" />
          Add
        </button>
      </header>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
      )}

      {isError && (
        <div className="rounded-xl bg-red-50 p-4 text-center dark:bg-red-950">
          <button
            type="button"
            onClick={() => refetch()}
            className="min-h-[44px] rounded-lg bg-red-600 px-4 text-sm font-semibold text-white"
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && budgets?.length === 0 && (
        <p className="panel rounded-xl border border-dashed p-8 text-center text-emerald-100/65">
          No budgets yet. Tap Add to create your first category.
        </p>
      )}

      <ul className="space-y-3">
        {budgets?.map((b) => (
          <li key={b._id}>
            <BudgetCard
              budget={b}
              spent={spentMap[b._id] || 0}
              currency={currency}
              onEdit={openEdit}
              onDelete={setDeleteTarget}
            />
          </li>
        ))}
      </ul>

      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        title={editing ? "Edit budget" : "New budget"}
      >
        <BudgetForm
          initial={editing}
          onSubmit={handleSubmit}
          onCancel={() => {
            setModalOpen(false);
            setEditing(null);
          }}
          loading={createBudget.isPending || updateBudget.isPending}
        />
      </Modal>

      <Modal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Delete budget?"
      >
        <p className="mb-4 text-sm text-emerald-100/70">
          Delete &quot;{deleteTarget?.name}&quot;? Expenses linked to it may
          remain in history.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setDeleteTarget(null)}
            className="min-h-[44px] flex-1 rounded-xl border border-emerald-900/70 bg-[#112720] font-semibold text-emerald-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={async () => {
              await deleteBudget.mutateAsync(deleteTarget._id);
              setDeleteTarget(null);
            }}
            className="min-h-[44px] flex-1 rounded-xl bg-red-600 font-semibold text-white"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
