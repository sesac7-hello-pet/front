"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "../store/UserStore";

interface Props {
  allow: string[];
  notAllow: string[];
  fallback?: string;
  children: ReactNode;
}

export default function RequireRole({
  allow,
  notAllow,
  fallback = "/403",
  children,
}: Props) {
  const role = useUserStore((s) => s.user)?.role;
  const router = useRouter();

  useEffect(() => {
    if (!role || !allow.includes(role) || notAllow.includes(role)) {
      router.replace(fallback);
    }
  }, [role]);

  // UI flashes를 최소화하려면 loading 스피너 등을 넣어도 OK
  if (!role || !allow.includes(role) || notAllow.includes(role)) return null;

  return <>{children}</>;
}
