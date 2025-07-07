"use client";

import api from "@/app/lib/api";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface BoardDetail {
  board: BoardResponse;
  comment: Comment[];
}

interface BoardResponse {
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

interface Comment {
  id: number;
  nickname: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  boardId: number;
}

export default function BoardDetail() {
  const router = useRouter();
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBoardDetail();
  }, [boardId]);

  async function getBoardDetail() {
    if (!boardId) return;
    try {
      setLoading(true);
      const res = await api.get(`/boards/${boardId}`);
      setBoard(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>로딩중...</div>;
  if (!boardId) return <div>게시글을 찾을 수 없습니다.</div>;
}
