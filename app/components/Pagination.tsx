"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

interface PagenationProps {
  currentPage: number;
  totalPages: number;
  blockSize: 5; // 한블록 몇 페이지 보여줄지
}

export default function Pagination({
  currentPage,
  totalPages,
  blockSize,
}: PagenationProps) {
  const router = useRouter();
  const searchParams = useSearchParams(); // 쿼리파라미터 가져오기

  const currentBlock = useMemo(
    () => Math.ceil(currentPage / blockSize),
    [currentPage, blockSize]
  );

  const startPage = (currentBlock - 1) * blockSize + 1;
  const endPage = Math.min(startPage + currentBlock - 1, totalPages);
  const totalBlocks = Math.ceil(totalPages / blockSize);

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page != currentPage) {
      router.push(createPageUrl(page));
    }
  };

  const goToBlock = (block: number) => {
    const page = (block - 1) * blockSize + 1;
    goToPage(page);
  };

  return (
    <div>
      <button onClick={() => goToBlock(1)} disabled={currentBlock == 1}>
        «
      </button>
      <button
        onClick={() => goToBlock(currentBlock - 1)}
        disabled={currentBlock == 1}
      >
        &lt;
      </button>
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
        const page = startPage + i;
        return (
          <button
            key={page}
            onClick={() => goToPage(page)}
            disabled={page == currentPage}
          >
            {page}
          </button>
        );
      })}
      ;
      <button
        onClick={() => goToBlock(currentBlock + 1)}
        disabled={totalBlocks == 1}
      >
        &gt;
      </button>
      <button
        onClick={() => goToBlock(totalBlocks)}
        disabled={totalBlocks == 1}
      >
        »
      </button>
    </div>
  );
}
