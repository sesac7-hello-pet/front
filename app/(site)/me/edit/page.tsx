"use client";
import api from "@/app/lib/api";
import { UserDetailData } from "@/app/store/UserStore";
import { useEffect, useState } from "react";

export default function EditPage() {
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
    <div className="flex flex-col min-h-screen items-center justify-center bg-white">
      <h1 className="mb-8 text-center text-3xl font-bold tracking-widest text-amber-400">
        회원 정보 수정
      </h1>

      <form className="space-y-4">
        {/* 이메일 */}
        <div className="flex items-center">
          <input
            value={user.email}
            type="email"
            disabled
            readOnly
            placeholder="이메일"
            className="flex-grow rounded-lg px-4 py-3 shadow placeholder-gray-400 focus:ring-2 focus:ring-amber-400 disabled:bg-gray-100 
      disabled:text-gray-500 
      disabled:cursor-not-allowed"
          />
        </div>

        {/* 비밀번호 */}
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full rounded-lg px-4 py-3 shadow placeholder-gray-400 focus:ring-2 focus:ring-amber-400"
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          className="w-full rounded-lg px-4 py-3 shadow placeholder-gray-400 focus:ring-2 focus:ring-amber-400"
        />

        {/* 이름 & 닉네임 */}
        <input
          value={user.username}
          type="text"
          placeholder="이름 (2~10자)"
          disabled
          readOnly
          className="w-full rounded-lg px-4 py-3 shadow placeholder-gray-400 focus:ring-2 focus:ring-amber-400 disabled:bg-gray-100 
      disabled:text-gray-500 
      disabled:cursor-not-allowed"
        />

        <div className="flex items-center">
          <input
            value={user.nickname}
            type="text"
            placeholder="닉네임"
            className="flex-grow rounded-lg px-4 py-3 shadow placeholder-gray-400 focus:ring-2 focus:ring-amber-400"
          />
          <button
            type="button"
            className="ml-3 flex-none whitespace-nowrap rounded-lg bg-amber-400 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            중복확인
          </button>
        </div>
        {/* 주소 */}
        <input
          value={user.address}
          type="text"
          placeholder="주소"
          className="w-full rounded-lg px-4 py-3 shadow placeholder-gray-400 focus:ring-2 focus:ring-amber-400"
        />
        {/* 프로필 URL */}
        <input
          value={user.profileUrl}
          type="url"
          placeholder="프로필 사진 URL"
          className="w-full rounded-lg px-4 py-3 shadow placeholder-gray-400 focus:ring-2 focus:ring-amber-400"
        />

        {/* 휴대폰 번호 */}
        <div className="flex items-center gap-3">
          <input
            value={user.phoneNumber}
            placeholder="휴대전화"
            disabled
            readOnly
            className="w-full rounded-lg px-4 py-3 shadow placeholder-gray-400 focus:ring-2 focus:ring-amber-400 disabled:bg-gray-100 
      disabled:text-gray-500 
      disabled:cursor-not-allowed"
          />
        </div>

        {/* 제출 */}
        <button
          type="submit"
          className="mt-4 w-full rounded-lg bg-amber-400 py-3 font-semibold text-white shadow-md transition 
                   hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          수정하기
        </button>
      </form>
    </div>
  );
}
