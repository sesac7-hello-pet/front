// app/(auth)/signup/page.tsx
"use client";

import Link from "next/link";
import React from "react";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      {/* 카드 */}
      <div className="w-full max-w-md rounded-2xl shadow-[0_0_0_4px_rgba(253,224,71,0.25)] p-10">
        {/* 제목 */}
        <h1 className="mb-2 text-center text-3xl font-bold tracking-widest text-amber-400">
          보호소
        </h1>
        <h2 className="mb-10 text-center text-3xl font-bold tracking-widest text-amber-400">
          회원가입
        </h2>

        <form className="space-y-5">
          {/* 이메일 + 중복확인 */}
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="이메일을 입력하세요."
              className="flex-grow rounded-lg px-4 py-3 shadow placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="button"
              className="whitespace-nowrap rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-amber-500"
            >
              중복확인
            </button>
          </div>

          {/* 비밀번호 */}
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            className="w-full rounded-lg px-4 py-3 shadow placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          {/* 비밀번호 확인 */}
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="w-full rounded-lg px-4 py-3 shadow placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          {/* 이름 */}
          <input
            type="text"
            placeholder="이름입력"
            className="w-full rounded-lg px-4 py-3 shadow placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          {/* 닉네임 + 중복확인 */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="닉네임"
              className="flex-grow rounded-lg px-4 py-3 shadow placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="button"
              className="whitespace-nowrap rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-amber-500"
            >
              중복확인
            </button>
          </div>

          {/* 프로필 사진 URL */}
          <input
            type="url"
            placeholder="프로필 사진 주소"
            className="w-full rounded-lg px-4 py-3 shadow placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          {/* 휴대폰 번호 3-분할 + 중복확인 */}
          <div className="flex items-center gap-3">
            <input
              type="tel"
              defaultValue="010"
              className="w-1/4 rounded-lg px-2 py-3 text-center shadow focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <input
              type="tel"
              className="w-1/4 rounded-lg px-2 py-3 text-center shadow focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <input
              type="tel"
              className="w-1/4 rounded-lg px-2 py-3 text-center shadow focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="button"
              className="whitespace-nowrap rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-amber-500"
            >
              중복확인
            </button>
          </div>

          {/* 최종 제출 */}
          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-amber-400 py-3 font-semibold text-white shadow-md transition hover:bg-amber-500"
          >
            가입하기
          </button>
        </form>

        {/* 로그인 링크 (선택) */}
        <div className="mt-6 text-center">
          <Link
            href="/auth/login"
            className="text-sm text-amber-400 hover:underline"
          >
            이미 계정이 있으신가요? 로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
