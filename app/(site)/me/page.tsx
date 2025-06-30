"use client";

import { useUserStore } from "@/app/store/UserStore";

export default function MyPage() {
  const user = useUserStore((s) => s.user);

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-gray-50 pt-[5vh]">
      <img
        src={user?.profileUrl}
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover"
      />

      <div className="mt-6 text-center">
        <p className="text-xl font-semibold text-gray-800">{user?.nickname}</p>
        <p className="mt-1 text-sm text-gray-500">{user?.email}</p>
      </div>

      <div className="mt-12 flex w-full max-w-[960px] items-start">
        {/* ── 왼쪽 사이드 버튼 그룹 ── */}
        <nav className="flex flex-col space-y-5 p-4">
          <button className="w-40 rounded-lg bg-amber-50 text-amber-300 font-semibold py-2 shadow-sm hover:bg-amber-100">
            개인정보수정
          </button>
          <button className="w-40 rounded-lg bg-amber-50 text-amber-300 font-semibold py-2 shadow-sm hover:bg-amber-100">
            입양신청내역
          </button>
          <button className="w-40 rounded-lg bg-amber-50 text-amber-300 font-semibold py-2 shadow-sm hover:bg-amber-100">
            내가 쓴 게시글
          </button>
          <button className="w-40 rounded-lg bg-amber-50 text-amber-300 font-semibold py-2 shadow-sm hover:bg-amber-100">
            내가 쓴 댓글
          </button>
        </nav>

        {/* ── 오른쪽 보드 영역 ── */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-[720px] h-[650px] border border-gray-300 bg-white">
            {/* 기존 보드 콘텐츠 */}
          </div>
        </div>
      </div>
    </div>
  );
}
