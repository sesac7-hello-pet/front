import Pagination from "@/app/components/Pagination";
import BoardListClient from "./BoardListClient";

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

// 백엔드 응답 구조
interface BoardPageResponse {
  boardList: Board[];
  page: number;
  size: number;
  totalPages: number;
  totalCount: number;
}

interface Filters {
  category: string;
  searchType: string;
  keyword: string;
  sortType: string;
  page: string;
}

// 클라이언트 컴포넌트에 넘겨주는 모든 데이터 타입
interface Props {
  boards: Board[];
  currentPage: number;
  totalPages: number;
  filters: Filters;
}

function getQureyParam(
  searchParams: { [key: string]: string | string[] | undefined },
  key: string,
  defaultValue: string
) {
  const raw = searchParams[key];
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value ?? defaultValue;
}

export default async function BoardListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = getQureyParam(searchParams, "category", "TOTAL");
  const searchType = getQureyParam(searchParams, "searchType", "TOTAL");
  const keyword = getQureyParam(searchParams, "keyword", "");
  const sortType = getQureyParam(searchParams, "sortType", "CURRENT");
  const pageStr = getQureyParam(searchParams, "page", "1");
  const page = parseInt(pageStr);

  const res = await fetch(
    `http://localhost:2222/api/v1/boards?category=${category}&searchType=${searchType}&keyword=${keyword}&sortType=${sortType}&page=${
      page - 1
    }&size=10`,
    { cache: "no-store" }
  );
  const data: BoardPageResponse = await res.json();
  const filters: Filters = {
    category,
    searchType,
    keyword,
    sortType,
    page: pageStr,
  };

  return (
    <>
      <BoardListClient
        boards={data.boardList}
        currentPage={data.page + 1}
        totalPages={data.totalPages}
        filters={filters}
      />
    </>
  );
}
