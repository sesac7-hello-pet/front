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

//응답
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
  const [category, setCategory] = useState("전체")
  const [filter, setFilter] = useState("TOTAL");
  const [search, setSearch] = useState("")

  useEffect(() => {
    getBoard();
  }, []);

  async function getBoard() {
    try {
      const res = await api.get("/boards", payload);
      setBoards(res.data.boardList); // 배열만 저장
      console.log(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // 무조건 로딩 종료
    }
  }
  // 요청
  const payload = {
    category: ,
    searchType: filter,
    sortType: "CURRENT"
    keyword: "",
    page: 0,
    size: 10
  };


  if (loading) return <h1>Loading…</h1>;

  const categories = ["전체", "커뮤니티", "Q & A"];

  return (
    <>
        {/* 카테고리 바 */}
        <div className="flex gap-5 p-5">
        { categories.map((category) => (
          <button key={category}
          onClick = {() => setCategory(category) }>
            {category}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <select onChange={searchOption} value={filter}>
          <option>전체</option>
          <option>작성자</option>
          <option>제목</option>
          <option>내용</option>
        </select>
        <input placeholder="찾으시는 글이 있으신가요?" ></input>
        <button onClick={}>검색</button>
        <button>초기화</button>
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
