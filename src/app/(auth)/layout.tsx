import { BottomNav } from "@/components/layout/bottom-nav";
import { Zap } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-20 md:pb-0">
      <header className="px-6 py-4 flex items-center justify-between border-b bg-white sticky top-0 z-50">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Zap className="text-accent h-6 w-6" />
          <span className="text-xl font-bold tracking-tight">ParkWise</span>
        </Link>
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/dashboard" className="hover:text-accent transition-colors">Dashboard</Link>
          <Link href="/map" className="hover:text-accent transition-colors">Find Parking</Link>
          <Link href="/predict" className="hover:text-accent transition-colors">AI Prediction</Link>
          <Link href="/admin" className="hover:text-accent transition-colors">Admin</Link>
        </div>
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">
          JD
        </div>
      </header>
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}