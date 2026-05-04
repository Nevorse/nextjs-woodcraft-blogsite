import { Suspense } from "react";
import AdminLayoutInner from "./AdminLayoutInner";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="bg-(--theme-primary) w-lvh h-lvh" />
      }
    >
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </Suspense>
  );
}
