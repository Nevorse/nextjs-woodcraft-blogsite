import { Toaster } from "react-hot-toast";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/main-layout/navbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/auth");
  }
  return (
    <>
      <div className="min-h-svh flex flex-col bg-(--theme-primary)">
        <Navbar />
        <Toaster position="top-right" />
        {children}
      </div>
    </>
  );
}
