// app/auth/layout.tsx
import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* ───────── 헤더 ───────── */}
      <header className="flex items-center gap-2 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          {/* 🔽 원하는 로고 URL로 교체 */}
          <img
            src="https://item.kakaocdn.net/do/ac3baf24423e7cd3d3a96fa33a333ee5f604e7b0e6900f9ac53a43965300eb9a"
            alt="Home Logo"
            width={50}
            height={50}
            className="rounded-sm"
          />
          <span className="text-lg font-medium text-gray-700">Hello Pet</span>
        </Link>
      </header>

      {/* ───────── 본문 ───────── */}
      <main className="flex flex-grow items-center justify-center">
        {children}
      </main>
    </div>
  );
}
