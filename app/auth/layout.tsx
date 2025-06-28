// app/auth/layout.tsx
import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* ───────── 헤더 ───────── */}
      <header className="flex items-center gap-2 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-medium text-gray-700">Home</span>
        </Link>
      </header>

      {/* ───────── 본문 ───────── */}
      <main className="flex flex-grow items-center justify-center">
        {children}
      </main>
    </div>
  );
}
