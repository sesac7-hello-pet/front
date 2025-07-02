"use client";
import { useEffect, useState } from "react";
import api from "../lib/api";
import Link from "next/link";
import { UserDetailData } from "../store/UserStore";
import RequireRole from "./RequireRole";

export default function UserDetail() {
  const [user, setUser] = useState<UserDetailData | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserDetail();
  }, []);

  async function getUserDetail() {
    try {
      const res = await api.get<UserDetailData>("/me");
      setUser(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="p-4 text-center">로딩 중...</div>;
  }

  if (!user) {
    return (
      <div className="p-4 text-center text-red-500">
        유저 정보를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <RequireRole allow={["USER", "ADMIN", "SHELTER"]} fallback="/auth/login">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">내 정보</h2>
          <Link
            href="/auth/edit"
            className="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 transition"
          >
            내 정보 수정
          </Link>
        </div>
        <div className="space-y-3">
          <p>
            <span className="font-semibold text-gray-700">이름:</span>{" "}
            {user.username}
          </p>
          <p>
            <span className="font-semibold text-gray-700">닉네임:</span>{" "}
            {user.nickname}
          </p>
          <p>
            <span className="font-semibold text-gray-700">전화번호:</span>{" "}
            {user.phoneNumber}
          </p>
          <p>
            <span className="font-semibold text-gray-700">주소:</span>{" "}
            {user.address}
          </p>
        </div>
      </div>
    </RequireRole>
  );
}
