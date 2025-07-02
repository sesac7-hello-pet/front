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
  const role = useUserStore((s) => s.user)?.role;
  const router = useRouter();

  const isLoading = role === undefined;

  const isBlocked =
    !isLoading && // 로딩 끝난 뒤에만 검사
    ((role && notAllow.includes(role)) || // 로그인 상태 + notAllow
      (allow.length > 0 && !allow.includes(role))); // allow 지정 but 미포함

  useEffect(() => {
    if (isBlocked) router.replace(fallback);
  }, [isBlocked]);

  // UI flashes를 최소화하려면 loading 스피너 등을 넣어도 OK
  if (isLoading) return <div className="p-4">Loading…</div>; // ⏳
  if (isBlocked) return null;

  return <>{children}</>;
}
