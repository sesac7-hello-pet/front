"use client";

import api from "@/app/lib/api";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BoardResponse, Comment } from "@/app/lib/boardTypes";
import { categories, petTypes } from "@/app/lib/boardConstants";
import { changeResponse } from "@/app/lib/boardUtils";
import { useUserStore } from "@/app/store/UserStore";

export default function BoardDetail() {
  const router = useRouter();
  const { id } = useParams();
  const user = useUserStore((s) => s.user);
  const [board, setBoard] = useState<BoardResponse | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [likecounts, setLikecounts] = useState<number>(0);
  const [liked, setLiked] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBoardDetail();
  }, [id]);

  useEffect(() => {
    if (board) {
      setLikecounts(board?.likesCount);
    }
  }, [board]);

  async function getBoardDetail() {
    if (!id) return;
    try {
      setLoading(true);
      const res = await api.get(`/boards/${id}`);
      console.log("res data", res.data);
      setBoard(res.data.boardResponse ?? null);
      setComments(res.data.commentList ?? []);
      console.log("comment", res.data.commentList);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>로딩중...</div>;
  if (!id) return <div>게시글을 찾을 수 없습니다.</div>;

  async function handleLike() {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikecounts((prev) => prev + (!newLiked ? +1 : -1));
    try {
      await api.put(`/boards/${id}/like`);
    } catch (err) {
      console.error("좋아요 실패", err);
      setLikecounts((prev) => prev + (!newLiked ? +1 : -1));
    }
  }

  return (
    <>
      <div>
        {board && (
          <div>
            {changeResponse(categories, board?.category)}
            {changeResponse(petTypes, board?.petType)}
          </div>
        )}
      </div>
      <div>
        {board ? board.title : "게시글 정보가 없습니다."}
        {board?.title}
        {board?.viewsCount}
        {board?.createdAt.split("T")[0]}
        {board?.updatedAt && board?.updatedAt != board?.createdAt && "(수정됨)"}
        {board?.nickname}
      </div>
      <button onClick={handleLike}>❤️</button>
      <span>{likecounts}</span>
      <div>
        {board?.content}
        {board?.image_url && <img src={board?.image_url} alt="게시글 이미지" />}
      </div>
      {board?.email === user?.email && (
        <div>
          <button>수정</button>
          <button>삭제</button>
        </div>
      )}
      <div>댓글 수</div>
      <div>
        {comments.length > 0
          ? comments.map((com) => com.content)
          : "댓글이 없습니다."}
      </div>
    </>
  );
}
