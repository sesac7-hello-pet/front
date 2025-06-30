"use client";
import { useEffect, useState } from "react";
import api from "../lib/api";

interface UserDetailData {
  username: string;
  nickname: string;
  phoneNumber: string;
  address: string;
}

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
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">내 정보</h2>
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
  );
}
