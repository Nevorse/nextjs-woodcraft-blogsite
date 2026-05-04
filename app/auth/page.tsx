import { Suspense } from "react";
import AuthPageInner from "./AuthPageInner";

export default function AuthPage() {
  return (
    <Suspense>
      <AuthPageInner />
    </Suspense>
  );
}
