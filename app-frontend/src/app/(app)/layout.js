import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

export default function AppLayout({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
