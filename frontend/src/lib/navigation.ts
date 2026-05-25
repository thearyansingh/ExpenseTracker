import {
  LayoutDashboard,
  Wallet,
  Receipt,
} from "lucide-react";

export const navLinks = [

  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },

  {
    title: "Budgets",
    path: "/budgets",
    icon: Wallet,
  },

  {
    title: "Expenses",
    path: "/expenses",
    icon: Receipt,
  },
];