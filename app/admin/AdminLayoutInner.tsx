import { Toaster } from "react-hot-toast";
import { redirect } from "next/navigation";
import Navbar from "@/components/main-layout/navbar";
import { getSession } from "@/lib/session";

export default async function AdminLayoutInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

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
