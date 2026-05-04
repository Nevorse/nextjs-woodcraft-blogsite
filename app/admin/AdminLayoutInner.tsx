import { Toaster } from "react-hot-toast";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/main-layout/navbar";
import { connection } from "next/server";

export default async function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  await connection();
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/auth");
  }
  return (
    <>
      <div className="min-h-svh flex flex-col bg-(--theme-primary) overflow-x-hidden">
        <Navbar />
        <Toaster position="top-right" />
        {children}
      </div>
    </>
  );
}
