"use client";

import api from "@/app/lib/api";
import { get } from "http";
import { useEffect, useState } from "react";

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
  const [category, setCategory] = useState<string>("TOTAL");
  const [option, setOption] = useState<string>("TOTAL");
  const [keyword, setKeyword] = useState<string>("");
  const [search, setSearch] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("CURRENT");

  const categories = [
    { label: "전체", value: "TOTAL" },
    { label: "커뮤니티", value: "FREE" },
    { label: "Q & A", value: "QNA" },
  ];

  const petTypes = [
    { label: "강아지", value: "DOG" },
    { label: "고양이", value: "CAT" },
    { label: "기타", value: "ETC" },
  ];

  const selectOptions = [
    { label: "전체", value: "TOTAL" },
    { label: "작성자", value: "USERNAME" },
    { label: "제목", value: "TITLE" },
    { label: "내용", value: "CONTENT" },
  ];

  const selectSort = [
    { label: "최신 순", value: "CURRENT" },
    { label: "좋아요 순", value: "LIKES" },
    { label: "댓글 순", value: "COMMENTS" },
    { label: "조회 순", value: "VIEWS" },
  ];

  useEffect(() => {
    getBoard();
  }, [category, search, sort]);

  async function getBoard() {
    // 요청
    const payload = {
      category: category,
      searchType: option,
      sortType: sort,
      keyword: keyword,
      page: 0,
      size: 10,
    };

    try {
      const res = await api.get("/boards", { params: payload });
      setBoards(res.data.boardList); // 배열만 저장
      console.log(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // 무조건 로딩 종료
    }
  }
  if (loading) return <h1>Loading…</h1>;

  function selectCategory(value: string) {
    resetFilter();
    setCategory(value);
  }

  function selectOption(e: React.ChangeEvent<HTMLSelectElement>) {
    setOption(e.target.value);
  }

  function InputKeyword(e: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value);
  }

  function searchKeyword(bool: boolean) {
    setSearch(bool);
    getBoard();
  }

  function checkSort(value: string) {
    setSort(value);
  }

  function resetFilter() {
    setOption("TOTAL");
    setKeyword("");
    setBoards([]);
    getBoard();
  }

  function changeResponse<T extends { label: string; value: string }>(
    list: T[],
    value: string
  ) {
    return list.find((item) => item.value == value)?.label;
  }

  return (
    <>
      {/* 카테고리 바 */}
      <div className="flex gap-5 p-5">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => selectCategory(category.value)}
          >
            {category.label}
          </button>
        ))}
      </div>
      {/* 검색 필터링 */}
      <div className="flex items-center gap-2">
        <select onChange={selectOption} value={option}>
          {selectOptions.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
        {/* 검색바 */}
        <input
          value={keyword}
          onChange={InputKeyword}
          placeholder="찾으시는 글이 있으신가요?"
        ></input>
        <button onClick={() => searchKeyword(true)}>검색</button>
        <button onClick={resetFilter}>초기화</button>
      </div>
      {/* 정렬 */}
      <div className="flex items-center gap-2">
        {selectSort.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              key={option.value}
              value={option.value}
              checked={sort == option.value}
              onChange={() => checkSort(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>

      <ul>
        {boards.map((board) => (
          <li key={board.id}>
            {changeResponse(categories, board.category)}
            {changeResponse(petTypes, board.petType)}
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
