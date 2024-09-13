import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 border-t pt-12 animate-in fade-in">
      {children}
    </div>
  );
}
