import SignInForm from "./SignInForm";
import { Toaster } from "react-hot-toast";
import { redirect } from "next/navigation";
import Navbar from "@/components/main-layout/navbar";
import { getSiteSettings } from "@/lib/database/siteSettings";
import { getSession } from "@/lib/session";

export default async function AuthPageInner() {
  const session = await getSession();

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
