import SignInForm from "./SignInForm";
import { Toaster } from "react-hot-toast";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/main-layout/navbar";
import { getSiteSettings } from "@/lib/database/siteSettings";

export default async function AuthPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect("/admin");
  }
  const siteSettings = await getSiteSettings({ isRegistrationOpen: true });

  return (
    <div className="min-h-svh flex flex-col bg-(--theme-primary)">
      <Toaster position="top-right" />
      <Navbar />
      <div className="flex flex-1 items-center justify-center py-10 mb-16">
        <SignInForm isRegistrationOpen={siteSettings?.isRegistrationOpen} />
      </div>
    </div>
  );
}