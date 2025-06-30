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
    </div>
  );
}
