"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "../store/UserStore";

interface Props {
  allow?: string[];
  notAllow?: string[];
  fallback?: string;
  children: ReactNode;
}

export default function RequireRole({
  allow = [],
  notAllow = [],
  fallback = "/403",
  children,
}: Props) {
  const user = useUserStore((s) => s.user); // ✔️ user 객체 자체를 가져옴
  const role = user ? user.role : null; // null = 게스트
  const router = useRouter();

  /* 1) 스토어가 아직 초기화되지 않았으면 로딩 */
  const isLoading = user === undefined; // user === undefined ⟹ fetch 전

  let isBlocked = false;

  if (!isLoading) {
    if (role && notAllow.includes(role)) isBlocked = true;
    else if (allow.length > 0 && (!role || !allow.includes(role)))
      isBlocked = true;
  }

  useEffect(() => {
    if (isBlocked) router.replace(fallback);
  }, [isBlocked]);

  /* 3) 렌더링 */
  if (isLoading) return <div className="p-4">Loading…</div>;
  if (isBlocked) return null;
  return <>{children}</>;
}
