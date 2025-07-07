// "use client";

// import Pagination from "@/app/components/Pagination";
// import api from "@/app/lib/api";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// interface BoardPage {
//   page: number;
//   size: number;
//   totalPages: number;
//   totalCount: number;
//   boardList: Board[];
// }

// //응답
// interface Board {
//   id: number;
//   nickname: string;
//   title: string;
//   content: string;
//   image_url: string;
//   likesCount: number;
//   viewsCount: number;
//   commentsCount: number;
//   createdAt: string;
//   updatedAt: string;
//   category: string;
//   petType: string;
// }

// export default function BoardListPage() {
//   const [boards, setBoards] = useState<Board[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [category, setCategory] = useState<string>("TOTAL");
//   const [option, setOption] = useState<string>("TOTAL");
//   const [keyword, setKeyword] = useState<string>("");
//   const [search, setSearch] = useState<boolean>(false);
//   const [sort, setSort] = useState<string>("CURRENT");

//   const router = useRouter();

//   const categories = [
//     { label: "전체", value: "TOTAL" },
//     { label: "커뮤니티", value: "FREE" },
//     { label: "Q & A", value: "QNA" },
//   ];

//   const petTypes = [
//     { label: "강아지", value: "DOG" },
//     { label: "고양이", value: "CAT" },
//     { label: "기타", value: "ETC" },
//   ];

//   const selectOptions = [
//     { label: "전체", value: "TOTAL" },
//     { label: "작성자", value: "USERNAME" },
//     { label: "제목", value: "TITLE" },
//     { label: "내용", value: "CONTENT" },
//   ];

//   const selectSort = [
//     { label: "최신 순", value: "CURRENT" },
//     { label: "좋아요 순", value: "LIKES" },
//     { label: "댓글 순", value: "COMMENTS" },
//     { label: "조회 순", value: "VIEWS" },
//   ];

//   useEffect(() => {
//     getBoard();
//   }, [category, search, sort]);

//   async function getBoard() {
//     // 요청
//     const payload = {
//       category: category,
//       searchType: option,
//       sortType: sort,
//       keyword: keyword,
//       page: 0,
//       size: 10,
//     };

//     try {
//       const res = await api.get("/boards", { params: payload });
//       setBoards(res.data.boardList); // 배열만 저장
//       console.log(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false); // 무조건 로딩 종료
//     }
//   }
//   if (loading) return <h1>Loading…</h1>;

//   function selectCategory(value: string) {
//     resetFilter();
//     setCategory(value);
//   }

//   function selectOption(e: React.ChangeEvent<HTMLSelectElement>) {
//     setOption(e.target.value);
//   }

//   function InputKeyword(e: React.ChangeEvent<HTMLInputElement>) {
//     setKeyword(e.target.value);
//   }

//   function searchKeyword(bool: boolean) {
//     setSearch(bool);
//     getBoard();
//   }

//   function checkSort(value: string) {
//     setSort(value);
//   }
//   function goCreate() {
//     router.push("/boards/new");
//   }

//   function resetFilter() {
//     setOption("TOTAL");
//     setKeyword("");
//     setBoards([]);
//     getBoard();
//   }

//   function changeResponse<T extends { label: string; value: string }>(
//     list: T[],
//     value: string
//   ) {
//     return list.find((item) => item.value == value)?.label;
//   }

//   return (
//     <>
//       {/* 카테고리 바 */}
//       <div className="flex gap-5 p-5">
//         {categories.map((category) => (
//           <button
//             key={category.value}
//             onClick={() => selectCategory(category.value)}
//           >
//             {category.label}
//           </button>
//         ))}
//       </div>
//       {/* 검색 필터링 */}
//       <div className="flex items-center gap-2">
//         <select onChange={selectOption} value={option}>
//           {selectOptions.map((op) => (
//             <option key={op.value} value={op.value}>
//               {op.label}
//             </option>
//           ))}
//         </select>
//         {/* 검색바 */}
//         <input
//           value={keyword}
//           onChange={InputKeyword}
//           placeholder="찾으시는 글이 있으신가요?"
//         ></input>
//         <button onClick={() => searchKeyword(true)}>검색</button>
//         <button onClick={resetFilter}>초기화</button>
//       </div>
//       {/* 정렬 */}
//       <div className="flex items-center gap-2">
//         {selectSort.map((option) => (
//           <label key={option.value}>
//             <input
//               type="radio"
//               key={option.value}
//               value={option.value}
//               checked={sort == option.value}
//               onChange={() => checkSort(option.value)}
//             />
//             {option.label}
//           </label>
//         ))}
//         <button onClick={goCreate}>새글쓰기</button>
//       </div>

//       <ul>
//         {boards.map((board) => (
//           <li key={board.id}>
//             {changeResponse(categories, board.category)}
//             {changeResponse(petTypes, board.petType)}
//             {board.title}
//             {board.content}
//             {board.nickname}
//             {board.viewsCount}|{board.likesCount}|{board.commentsCount}
//             {board.createdAt.split("T")[0]}{" "}
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }

// CSR
// "use client";
// import Pagination from "@/app/components/Pagination";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";

// //응답
// interface Board {
//   id: number;
//   nickname: string;
//   title: string;
//   content: string;
//   image_url: string;
//   likesCount: number;
//   viewsCount: number;
//   commentsCount: number;
//   createdAt: string;
//   updatedAt: string;
//   category: string;
//   petType: string;
// }

// interface Props {
//   boards: Board[];
//   currentPage: number;
//   totalPages: number;
//   filters: {
//     category: string;
//     searchType: string;
//     keyword: string;
//     sortType: string;
//   };
// }

// export default function BoardListPage({
//   boards,
//   currentPage,
//   totalPages,
//   filters,
// }: Props) {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [keyword, setKeyword] = useState<string>(filters.keyword);
//   const [searchType, setSearchType] = useState<string>(filters.searchType);
//   //const [loading, setLoading] = useState(false);

//   const updateQuery = (key: string, value: string) => {
//     //setLoading(true);
//     const params = new URLSearchParams(searchParams.toString());
//     params.set(key, value);
//     if (key !== "page") params.set("page", "1");
//     router.push(`?${params.toString()}`);
//   };

//   //if (loading) return <div>로딩 중입니다...</div>;

//   const categories = [
//     { label: "전체", value: "TOTAL" },
//     { label: "커뮤니티", value: "FREE" },
//     { label: "Q & A", value: "QNA" },
//   ];

//   const petTypes = [
//     { label: "강아지", value: "DOG" },
//     { label: "고양이", value: "CAT" },
//     { label: "기타", value: "ETC" },
//   ];

//   const selectOptions = [
//     { label: "전체", value: "TOTAL" },
//     { label: "작성자", value: "USERNAME" },
//     { label: "제목", value: "TITLE" },
//     { label: "내용", value: "CONTENT" },
//   ];

//   const selectSort = [
//     { label: "최신 순", value: "CURRENT" },
//     { label: "좋아요 순", value: "LIKES" },
//     { label: "댓글 순", value: "COMMENTS" },
//     { label: "조회 순", value: "VIEWS" },
//   ];
//   function goCreate() {
//     router.push("/boards/new");
//   }

//   function handleSearch() {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("searchType", searchType);
//     params.set("keyword", keyword);
//     params.set("page", "1");
//     router.push(`?${params.toString()}`);
//   }

//   function resetFilter() {
//     const params = new URLSearchParams();
//     params.set("category", "TOTAL");
//     params.set("searchType", "TOTAL");
//     params.set("keyword", "");
//     params.set("sortType", "CURRENT");
//     params.set("page", "1");
//     router.push(`?${params.toString()}`);
//     setKeyword("");
//     setSearchType("TOTAL");
//   }

//   function changeResponse<T extends { label: string; value: string }>(
//     list: T[],
//     value: string
//   ) {
//     return list.find((item) => item.value == value)?.label;
//   }

//   return (
//     <>
//       {/* 카테고리 바 */}
//       <div className="flex gap-5 p-5">
//         {categories.map((category) => (
//           <button
//             key={category.value}
//             onClick={() => updateQuery("category", category.value)}
//           >
//             {category.label}
//           </button>
//         ))}
//       </div>
//       {/* 검색 필터링 */}
//       <div className="flex items-center gap-2">
//         <select
//           value={searchType}
//           onChange={(e) => setSearchType(e.target.value)}
//         >
//           {selectOptions.map((op) => (
//             <option key={op.value} value={op.value}>
//               {op.label}
//             </option>
//           ))}
//         </select>
//         {/* 검색바 */}
//         <input
//           value={keyword}
//           onChange={(e) => setKeyword(e.target.value)}
//           placeholder="찾으시는 글이 있으신가요?"
//         ></input>
//         <button onClick={handleSearch}>검색</button>
//         <button onClick={resetFilter}>초기화</button>
//       </div>
//       {/* 정렬 */}
//       <div className="flex items-center gap-2">
//         {selectSort.map((option) => (
//           <label key={option.value}>
//             <input
//               type="radio"
//               key={option.value}
//               value={option.value}
//               checked={filters.sortType == option.value}
//               onChange={() => updateQuery("sortType", option.value)}
//             />
//             {option.label}
//           </label>
//         ))}
//         <button onClick={goCreate}>새글쓰기</button>
//       </div>

//       <ul>
//         {boards.map((board) => (
//           <li key={board.id}>
//             {changeResponse(categories, board.category)}
//             {changeResponse(petTypes, board.petType)}
//             {board.title}
//             {board.content}
//             {board.nickname}
//             {board.viewsCount}|{board.likesCount}|{board.commentsCount}
//             {board.createdAt.split("T")[0]}{" "}
//           </li>
//         ))}
//       </ul>
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         blockSize={5}
//       />
//     </>
//   );
// }

"use client";
import Pagination from "@/app/components/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

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

interface Props {
  boards: Board[];
  currentPage: number;
  totalPages: number;
  filters: {
    category: string;
    searchType: string;
    keyword: string;
    sortType: string;
  };
}

export default function BoardListPage({
  boards,
  currentPage,
  totalPages,
  filters,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState<string>(filters.keyword);
  const [searchType, setSearchType] = useState<string>(filters.searchType);

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    if (key !== "page") params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

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

  function goCreate() {
    router.push("/boards/new");
  }

  function handleSearch() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("searchType", searchType);
    params.set("keyword", keyword);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  }

  function resetFilter() {
    const params = new URLSearchParams();
    params.set("category", "TOTAL");
    params.set("searchType", "TOTAL");
    params.set("keyword", "");
    params.set("sortType", "CURRENT");
    params.set("page", "1");
    setKeyword("");
    setSearchType("TOTAL");
    router.push(`?${params.toString()}`);
  }

  function changeResponse<T extends { label: string; value: string }>(
    list: T[],
    value: string
  ) {
    return list.find((item) => item.value === value)?.label;
  }

  return (
    <div className="w-full border-b border-yellow-300 bg-white">
      {/* 카테고리 탭 */}
      <div className="max-w-4xl mx-auto flex justify-center gap-40 p-4">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => updateQuery("category", category.value)}
            className={`text-lg font-semibold transition-colors duration-200 ${
              filters.category === category.value
                ? "text-[#F5C044]"
                : "text-gray-500 hover:text-yellow-400"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <hr className="border-t border-gray-400" />
      {/* 검색 필터 영역 */}
      <div className="flex items-center justify-start gap-6 px-5 py-10 w-full max-w-4xl mx-auto">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="border border-[#F5C044] rounded-md px-2 py-3 text-sm focus:outline-yellow-400 bg-white"
        >
          {selectOptions.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>

        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="찾으시는 글이 있으신가요?"
          className="border border-[#F5C044] rounded-md px-4 py-3 text-sm w-full max-w-[700px] focus:outline-yellow-400 bg-white"
        />
        <button
          onClick={handleSearch}
          className="bg-[#FFF5C4] hover:bg-[#F5C044] text-gray-700 rounded-xl px-3 py-2 text-sm border border-[#F5C044] whitespace-nowrap"
        >
          검색
        </button>

        <button
          onClick={resetFilter}
          className="bg-[#FFF5C4] hover:bg-[#F5C044] text-gray-700 rounded-xl px-3 py-2 text-sm border border-[#F5C044] whitespace-nowrap"
        >
          초기화
        </button>
      </div>

      {/* 정렬 */}
      <div className="flex items-center gap-4 px-5 py-4 max-w-4xl mx-auto">
        {selectSort.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-1 text-sm text-gray-700"
          >
            <input
              type="radio"
              value={option.value}
              checked={filters.sortType === option.value}
              onChange={() => updateQuery("sortType", option.value)}
              className="accent-yellow-400"
            />
            {option.label}
          </label>
        ))}

        <button
          onClick={goCreate}
          className="ml-auto bg-[#F3AD61] hover:bg-[#C57F34] text-black rounded-xl px-4 py-3 text-sm border border-black"
        >
          새글쓰기🐾
        </button>
      </div>

      <hr className="border-t border-gray-400 mb-6" />

      {/* 게시글 리스트 */}
      {boards.length === 0 ? (
        <div className="text-center text-gray-500 py-20 text-lg">
          검색 결과가 없습니다.
        </div>
      ) : (
        <ul className="px-7 max-w-5xl mx-auto divide-y divide-gray-300">
          {boards.map((board) => (
            <li
              key={board.id}
              className="flex justify-between items-start py-4"
            >
              {/* 본문 */}
              <div className="flex-1 flex flex-col justify-between pr-4">
                {/* 라벨 */}
                <div className="flex gap-4 mb-1">
                  <span
                    className="text-xs px-2 py-1 text-yellow-800 rounded-full"
                    style={{ backgroundColor: "#FFDEA7" }}
                  >
                    {changeResponse(categories, board.category)}
                  </span>
                  <span
                    className="text-xs px-2 py-1 text-yellow-800 rounded-full"
                    style={{ backgroundColor: "#FFF5C4" }}
                  >
                    {changeResponse(petTypes, board.petType)}
                  </span>
                </div>

                <div className="font-semibold text-base text-gray-800">
                  {board.title}
                </div>
                <div className="text-sm text-gray-500">{board.content}</div>
                <div className="flex items-center text-xs text-gray-400 mt-2 gap-5">
                  <span>{board.nickname}</span>
                  <span>👁 {board.viewsCount}</span>
                  <span>❤️ {board.likesCount}</span>
                  <span>💬 {board.commentsCount}</span>
                  <span>{board.createdAt.split("T")[0]}</span>
                </div>
              </div>

              {/* 이미지 */}
              {board.image_url && (
                <img
                  src={board.image_url}
                  alt="게시물 이미지"
                  className="w-24 h-24 object-cover rounded-xl"
                />
              )}
            </li>
          ))}
        </ul>
      )}
      <hr className="border-t border-gray-400 my-6" />

      {/* 페이지네이션 */}
      <div className="mt-4 mb-12 px-5 max-w-4xl mx-auto">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          blockSize={5}
        />
      </div>
    </div>
  );
}
