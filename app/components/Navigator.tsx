"use client";
import Link from "next/link";
import { useUserStore } from "../store/UserStore";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Navigator() {
  const { user, clearUser } = useUserStore();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /* ── 바깥 클릭 시 닫기 ── */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [open]);

  /* ── 로그아웃 ── */
  const logout = () => {
    clearUser();
    setOpen(false);
  };

  return (
    <nav className="flex items-center justify-between border-b border-gray-500 pt-0.5 pb-0.5 pr-4 pl-4">
      {/* 좌측 로고 + 사이트명 */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/img3.png"
          alt="Home Logo"
          width={58}
          height={58}
          className="rounded-sm"
        />
        <span className="text-lg font-medium text-gray-700">Hello Pet</span>
      </Link>

      {/* 우측: 로그인 or 아바타 */}
      {user ? (
        <div className="relative" ref={menuRef}>
          <button onClick={() => setOpen(!open)}>
            <img
              src={user.profileUrl}
              alt="Profile"
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
          </button>

          {/* ───── 드롭다운 모달 ───── */}
          {open && (
            <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
              <div className="flex flex-col items-center gap-2">
                <img
                  src={user.profileUrl}
                  alt="profile"
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
                <p className="text-base font-semibold">{user.nickname}</p>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                {/* 마이페이지(껍데기) */}
                <Link
                  href="/me"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-4 py-2 text-center text-sm hover:bg-gray-100"
                >
                  마이페이지
                </Link>

                {/* 로그아웃 */}
                <button
                  onClick={logout}
                  className="rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                >
                  로그아웃
                </button>
              </div>
            </div>
          )}
        </div>
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
