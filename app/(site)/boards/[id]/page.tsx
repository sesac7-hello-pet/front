"use client";

import api from "@/app/lib/api";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BoardResponse, Comment } from "@/app/lib/boardTypes";
import { categories, petTypes } from "@/app/lib/boardConstants";
import { changeResponse } from "@/app/lib/boardUtils";
import { useUserStore } from "@/app/store/UserStore";
import Pagination from "@/app/components/Pagination";

export default function BoardDetail() {
  const router = useRouter();
  const { id } = useParams();
  const user = useUserStore((s) => s.user);
  const [board, setBoard] = useState<BoardResponse | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [likecounts, setLikecounts] = useState<number>(0);
  const [liked, setLiked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  //   const [isEdit, setIsEdit] = useState(false);
  //   const [revise, setRevise] = useState("");

  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");

  //////////////
  const searchParams = useSearchParams();
  const pageStr = searchParams.get("page") ?? "1";
  const currentPage = parseInt(pageStr, 10);

  // 한 페이지에 보여줄 댓글 수
  const commentsPerPage = 5;

  // 총 페이지 수 계산
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  // 현재 페이지에 보여줄 댓글들만 추출
  const pagedComments = comments.slice(
    (currentPage - 1) * commentsPerPage,
    currentPage * commentsPerPage
  );

  ///////
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
      // 여기서 댓글을 createdAt 기준으로 정렬해서 setComments
      const sortedComments = (res.data.commentList ?? []).sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setComments(sortedComments);
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

  async function handleComment(value: string) {
    setValue(value);
    try {
      await api.post(`/boards/${id}/comments`, { content: value });
      setValue("");
      getBoardDetail();
    } catch (err) {
      console.error("댓글이 정상적으로 등록되지 않았습니다.", err);
    }
  }

  async function boardUpdate() {
    try {
      router.push(`/boards/${id}`);
      //await api.put(`/boards/${id}`);
    } catch (err) {
      console.log(err);
    }
  }
  async function boardDelete() {
    const confirmed = window.confirm("게시글을 삭제하시겠습니까?");
    if (!confirmed) return;
    try {
      await api.delete(`/boards/${id}`);
      router.push("/boards");
    } catch (err) {
      console.log(err);
    }
  }

  async function commentUpdate(commentId: number) {
    try {
      await api.put(`/boards/${id}/comments/${commentId}`, {
        content: editContent,
      });
      setEditCommentId(null);
      setEditContent("");
      getBoardDetail();
    } catch (err) {
      console.log(err);
    }
  }

  async function commentDelete(commentId: number) {
    const confirmed = window.confirm("댓글을 삭제하시겠습니까?");
    if (!confirmed) return;
    try {
      await api.delete(`/boards/${id}/comments/${commentId}`);
      getBoardDetail();
    } catch (err) {
      console.log(err);
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
          <button onClick={boardUpdate}>수정</button>
          <button onClick={boardDelete}>삭제</button>
        </div>
      )}
      <div>
        <input
          value={value}
          placeholder="댓글을 입력해주세요."
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={() => handleComment(value)}>등록</button>
        <div>{comments.length}</div>
        <div>
          {pagedComments.length > 0 ? (
            pagedComments.map((com, index) => (
              <div key={com.id ?? index}>
                <div>닉네임 : {com.nickname}</div>
                {editCommentId == com.id ? (
                  <>
                    <input
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    ></input>
                    <button onClick={() => commentUpdate(com.id)}>저장</button>
                    <button
                      onClick={() => {
                        setEditCommentId(null);
                        setEditContent("");
                      }}
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <div>댓글 : {com.content}</div>
                )}

                <div>{com.createdAt.split("T")[0]}</div>
                {com.updatedAt && <div>수정됨</div>}

                {com?.email === user?.email && editCommentId !== com.id && (
                  <div>
                    <button
                      onClick={() => {
                        setEditCommentId(com.id);
                        setEditContent(com.content);
                      }}
                    >
                      수정
                    </button>
                    <button onClick={() => commentDelete(com.id)}>삭제</button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>댓글이 없습니다.</div>
          )}
        </div>
        {/* 페이지네이션 */}
        <div className="mt-4 mb-12 px-5 max-w-4xl mx-auto">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            blockSize={5}
          />
        </div>
      </div>
    </>
  );
}
