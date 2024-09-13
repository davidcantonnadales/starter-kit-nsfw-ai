//import { Footer } from "@/components/footer";
import Footer from "@/components/home/footer";
import { NavBar } from "@/components/navbar/navbar";
import Header from "@/components/home/header-2";
import { ReactNode } from "react";
import Header2 from "@/components/home/header-2";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen animate-in fade-in">
      <NavBar />

      {/* <Header /> */}
      <div className="flex flex-col grow h-full">{children}</div>
      {/* <Footer /> */}
      <Footer />
    </div>
  );
}
