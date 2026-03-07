import Footer from "@/components/main-layout/footer";
import Navbar from "@/components/main-layout/navbar";
import { Toaster } from "react-hot-toast";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-(--theme-primary)">
      <Navbar />
      <Toaster position="top-right" />
      {children}
      <Footer />
    </div>
  );
}
