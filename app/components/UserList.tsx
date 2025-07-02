"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  email: string;
  role: string;
  nickname: string;
  username: string;
  phoneNumber: string;
}

const SEARCH_TYPES = ["TOTAL", "USERNAME", "EMAIL", "NICKNAME"] as const;
const SORT_TYPES = [
  "ID",
  "ROLE",
  "USERNAME",
  "EMAIL",
  "NICKNAME",
  "PHONENUMBER",
] as const;
const ORDER_TYPES = ["ASC", "DESC"] as const;

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();

  /* 검색·정렬 조건 ----------------------- */
  const [searchType, setSearchType] =
    useState<(typeof SEARCH_TYPES)[number]>("TOTAL");
  const [sortType, setSortType] = useState<(typeof SORT_TYPES)[number]>("ID");
  const [orderType, setOrderType] =
    useState<(typeof ORDER_TYPES)[number]>("ASC");

  /* 키워드: 입력용 / 확정용 분리 ---------- */
  const [keywordInput, setKeywordInput] = useState(""); // 입력창에 표시되는 값
  const [keyword, setKeyword] = useState(""); // 실제 쿼리에 쓰는 값

  const pageSize = 10;
  const maxPageButtons = 5;

  /* 페이지 또는 검색 조건(확정된 keyword) 바뀔 때만 fetch */
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, searchType, sortType, orderType, keyword]);

  async function fetchUsers(page: number) {
    const res = await api.get("/users", {
      params: {
        page: page - 1,
        size: pageSize,
        userSearchType: searchType,
        userSortType: sortType,
        userAscDesc: orderType,
        keyword, // ← 확정된 키워드
      },
    });
    setUsers(res.data.adminUserList);
    setTotalPages(res.data.totalPages);
  }

  async function handleDeactivate(userId: number) {
    if (window.confirm("정말로 이 사용자를 비활성화하시겠습니까?")) {
      try {
        await api.post("/auth/deactivate", { id: userId });
        alert("사용자가 비활성화되었습니다.");
        router.refresh();
      } catch (err) {
        alert("비활성화 실패: " + (err as Error).message);
      }
    }
  }

  function goTo(page: number) {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  }

  /* 페이지 버튼 계산 */
  const startPage =
    Math.floor((currentPage - 1) / maxPageButtons) * maxPageButtons + 1;
  const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  /* 검색 버튼 누르면 keyword 확정 */
  function handleSearch() {
    setKeyword(keywordInput); // ← 여기서만 keyword 업데이트
    setCurrentPage(1); // 검색 시 1페이지부터
  }

  /* 초기화 */
  function resetSearch() {
    setKeywordInput("");
    setKeyword("");
    setSearchType("TOTAL");
    setCurrentPage(1);
  }

  return (
    <div className="space-y-6">
      {/* ----------- 정렬 옵션 ----------- */}
      <div className="flex items-center justify-between">
        {/* 왼쪽: 정렬 기준 */}
        <div className="flex items-center gap-2">
          <label>정렬 기준:</label>
          <select
            value={sortType}
            onChange={(e) => {
              setSortType(e.target.value as (typeof SORT_TYPES)[number]);
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1"
          >
            {SORT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* 오른쪽: 오름/내림 */}
        <div className="flex items-center gap-2">
          <label>정렬 방향:</label>
          <select
            value={orderType}
            onChange={(e) => {
              setOrderType(e.target.value as (typeof ORDER_TYPES)[number]);
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1"
          >
            {ORDER_TYPES.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ----------- 검색 바 ----------- */}
      <div className="flex items-center gap-3">
        <select
          value={searchType}
          onChange={(e) =>
            setSearchType(e.target.value as (typeof SEARCH_TYPES)[number])
          }
          className="border rounded px-2 py-1"
        >
          {SEARCH_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <input
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          placeholder="검색어"
          className="border rounded px-3 py-1 flex-1"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
        >
          검색
        </button>

        <button
          onClick={resetSearch}
          className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
        >
          초기화
        </button>
      </div>

      {/* ----------- 리스트 ----------- */}
      <ul className="space-y-1">
        {users.map((u) => (
          <li key={u.id}>
            <span>
              {u.role} / {u.username} / {u.email} / {u.nickname} /
              {u.phoneNumber}
            </span>
            <button
              onClick={() => handleDeactivate(u.id)}
              className="bg-red-500 text-white text-sm font-bold py-1 px-3 rounded hover:bg-red-700 transition-colors"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      {/* ----------- 페이지 네비게이션 ----------- */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <button onClick={() => goTo(1)} disabled={currentPage === 1}>
          {"<<"}
        </button>
        <button
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>

        {pageNumbers.map((p) => (
          <button
            key={p}
            onClick={() => goTo(p)}
            className={p === currentPage ? "font-bold underline" : ""}
          >
            {p}
          </button>
        ))}

        {endPage < totalPages && <span>…</span>}

        <button
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
        <button
          onClick={() => goTo(totalPages)}
          disabled={currentPage === totalPages}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
}
