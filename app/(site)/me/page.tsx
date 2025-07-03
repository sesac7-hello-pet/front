"use client";

import RequireRole from "@/app/components/RequireRole";
import UserDetail from "@/app/components/UserDetail";
import UserList from "@/app/components/UserList";
import { useUserStore } from "@/app/store/UserStore";
import { useState } from "react";

export default function MyPage() {
  const user = useUserStore((s) => s.user);

  const [myPage, setMyPage] = useState(true);
  const [roleChangedBtn, setRoleChangedBtn] = useState(false);
  const [myBoard, setMyBoard] = useState(false);
  const [myComment, setMyComment] = useState(false);

  function showMyPage() {
    setMyPage(true);
    setRoleChangedBtn(false);
    setMyBoard(false);
    setMyComment(false);
  }

  function showRoleChangedBtn() {
    setMyPage(false);
    setRoleChangedBtn(true);
    setMyBoard(false);
    setMyComment(false);
  }

  function showMyBoard() {
    setMyPage(false);
    setRoleChangedBtn(false);
    setMyBoard(true);
    setMyComment(false);
  }

  function showMyComment() {
    setMyPage(false);
    setRoleChangedBtn(false);
    setMyBoard(false);
    setMyComment(true);
  }

  return (
    <RequireRole allow={["USER", "ADMIN", "SHELTER"]} fallback="/auth/login">
      <div className="flex flex-col items-center justify-start h-screen bg-gray-50 pt-[5vh]">
        <img
          src={user?.profileUrl}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover"
        />

        <div className="mt-6 text-center">
          <p className="text-xl font-semibold text-gray-800">
            {user?.nickname}
          </p>
          <p className="mt-1 text-sm text-gray-500">{user?.email}</p>
        </div>

        <div className="mt-12 flex w-full max-w-[960px] items-start">
          {/* ── 왼쪽 사이드 버튼 그룹 ── */}
          <nav className="flex flex-col space-y-5 p-4">
            <button
              onClick={showMyPage}
              className={`w-40 rounded-lg font-semibold py-2 shadow-sm transition ${
                myPage
                  ? "bg-amber-400 text-white"
                  : "bg-amber-50 text-amber-300 hover:bg-amber-100"
              }`}
            >
              개인정보수정
            </button>
            {user?.role === "ADMIN" ? (
              <button
                onClick={showRoleChangedBtn}
                className={`w-40 rounded-lg font-semibold py-2 shadow-sm transition ${
                  roleChangedBtn
                    ? "bg-amber-400 text-white"
                    : "bg-amber-50 text-amber-300 hover:bg-amber-100"
                }`}
              >
                유저목록
              </button>
            ) : user?.role === "SHELTER" ? (
              <button
                onClick={showRoleChangedBtn}
                className={`w-40 rounded-lg font-semibold py-2 shadow-sm transition ${
                  roleChangedBtn
                    ? "bg-amber-400 text-white"
                    : "bg-amber-50 text-amber-300 hover:bg-amber-100"
                }`}
              >
                공고내역
              </button>
            ) : (
              <button
                onClick={showRoleChangedBtn}
                className={`w-40 rounded-lg font-semibold py-2 shadow-sm transition ${
                  roleChangedBtn
                    ? "bg-amber-400 text-white"
                    : "bg-amber-50 text-amber-300 hover:bg-amber-100"
                }`}
              >
                입양신청내역
              </button>
            )}
            <button
              onClick={showMyBoard}
              className={`w-40 rounded-lg font-semibold py-2 shadow-sm transition ${
                myBoard
                  ? "bg-amber-400 text-white"
                  : "bg-amber-50 text-amber-300 hover:bg-amber-100"
              }`}
            >
              내가 쓴 게시글
            </button>
            <button
              onClick={showMyComment}
              className={`w-40 rounded-lg font-semibold py-2 shadow-sm transition ${
                myComment
                  ? "bg-amber-400 text-white"
                  : "bg-amber-50 text-amber-300 hover:bg-amber-100"
              }`}
            >
              내가 쓴 댓글
            </button>
          </nav>

          {/* ── 오른쪽 보드 영역 ── */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-[720px] h-[650px] border border-gray-300 bg-white">
              {/* 기존 보드 콘텐츠 */}
              {myPage ? <UserDetail /> : ""}
              {roleChangedBtn ? (
                user?.role === "ADMIN" ? (
                  <UserList />
                ) : user?.role === "SHELTER" ? (
                  <div>shelter</div>
                ) : (
                  <div>user</div>
                )
              ) : (
                ""
              )}
              {myBoard ? <h1>myBoard</h1> : ""}
              {myComment ? <h1>myComment</h1> : ""}
            </div>
          </div>
        </div>
      </div>
    </RequireRole>
  );
}
