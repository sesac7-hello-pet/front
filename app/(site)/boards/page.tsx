"use client";

import api from "@/app/lib/api";
import { useEffect, useState } from "react";

enum Category {
  TOTAL = "전체",
  FREE = "커뮤니티",
  QNA = "Q & A",
}

enum petType {
  DOG = "강아지",
  CAT = "고양이",
  ETC = "기타",
}

interface BoardPage {
  page: number;
  size: number;
  totalPages: number;
  totalCount: number;
  boardList: Board[];
}

interface Board {
  id: number;
  nickname: string;
  title: string;
  content: string;
  image_url: string;
  likesCount: number;
  viewsCount: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
  category: string;
  petType: string;
}

export default function BoardListPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBoard();
  }, []);

  async function getBoard() {
    try {
      const res = await api.get("/boards");
      setBoards(res.data.boardList); // 배열만 저장
      console.log(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // 무조건 로딩 종료
    }
  }

  if (loading) return <h1>Loading…</h1>;

  return (
    <>
      <div>
        {/* 카테고리 바 */}
        <div className="flex gap-5 p-5"></div>
        <button>전체</button>
        <button>커뮤니티</button>
        <button>Q & A</button>
      </div>

      <div className="flex items-center gap-2">
        <select>
          <option>전체</option>
          <option>작성자</option>
          <option>제목</option>
          <option>내용</option>
        </select>
      </div>

      <ul>
        {boards.map((board) => (
          <li key={board.id}>
            {Category[board.category as keyof typeof Category]}
            {petType[board.petType as keyof typeof petType]}
            {board.title}
            {board.content}
            {board.nickname}
            {board.viewsCount}|{board.likesCount}|{board.commentsCount}
            {board.createdAt.split("T")[0]}{" "}
          </li>
        ))}
      </ul>
    </>
  );
}
