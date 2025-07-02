"use client";

import api from "@/app/lib/api";
import { useEffect, useState } from "react";

interface Board {
  id: number;
  nickname: string;
  title: string;
  createdAt: string;
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
    <ul>
      {boards.map((board) => (
        <li key={board.id}>
          {board.nickname}, {board.title} | {board.createdAt}
        </li>
      ))}
    </ul>
  );
}
