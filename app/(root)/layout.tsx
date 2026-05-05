import Footer from "@/components/main-layout/footer";
import NavbarSkeleton from "@/components/main-layout/navbar/NavbarSkeleton";
import NavbarWrapper from "@/components/main-layout/navbar/NavbarWrapper";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh flex flex-col bg-(--theme-primary) overflow-x-hidden">

      <Suspense fallback={<NavbarSkeleton />}>
        <NavbarWrapper />
      </Suspense>
      {/* <NavbarSkeleton /> */}
      
      <Toaster position="top-right" />
      {children}
      <Footer />
    </div>
  );
}
