import { Suspense } from "react";
import AdminLayoutInner from "./AdminLayoutInner";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="h-lvh w-lvw bg-(--theme-primary)" />
      }
    >
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </Suspense>
  );
}
