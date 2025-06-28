"use client";
import Link from "next/link";
import { useUserStore } from "../store/UserStore";

export default function Navigator() {
  const user = useUserStore((s) => s.user);

  return (
    <nav className="flex items-center justify-between border-b border-gray-500 p-4">
      {/* 좌측 로고 + 사이트명 */}
      <Link href="/" className="flex items-center gap-2">
        <img
          src="https://item.kakaocdn.net/do/ac3baf24423e7cd3d3a96fa33a333ee5f604e7b0e6900f9ac53a43965300eb9a"
          alt="Home Logo"
          width={50}
          height={50}
          className="rounded-sm"
        />
        <span className="text-lg font-medium text-gray-700">Hello Pet</span>
      </Link>

      {/* ───────── 우측 영역: 로그인 vs 프로필 ───────── */}
      {user ? (
        /* 프로필 이미지를 클릭하면 마이페이지로 이동 (변경 가능) */
        <img
          src={user.profileUrl}
          alt="Profile"
          width={36}
          height={36}
          className="rounded-full object-cover"
        />
      ) : (
        <Link
          href="/auth/login"
          className="rounded border border-gray-300 px-4 py-2 text-sm"
        >
          Login
        </Link>
      )}
    </nav>
  );
}
