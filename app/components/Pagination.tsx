// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { useMemo } from "react";

// interface PagenationProps {
//   currentPage: number;
//   totalPages: number;
//   blockSize: 5; // 한블록 몇 페이지 보여줄지
// }

// export default function Pagination({
//   currentPage,
//   totalPages,
//   blockSize,
// }: PagenationProps) {
//   const router = useRouter();
//   const searchParams = useSearchParams(); // 쿼리파라미터 가져오기

//   const currentBlock = useMemo(
//     () => Math.ceil(currentPage / blockSize),
//     [currentPage, blockSize]
//   );

//   const startPage = (currentBlock - 1) * blockSize + 1;
//   const endPage = Math.min(startPage + blockSize - 1, totalPages);
//   const totalBlocks = Math.ceil(totalPages / blockSize);

//   const createPageUrl = (page: number) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("page", page.toString());
//     return `?${params.toString()}`;
//   };
//   const goToPage = (page: number) => {
//     if (page >= 1 && page <= totalPages && page != currentPage) {
//       router.push(createPageUrl(page));
//     }
//   };

//   const goToBlock = (block: number) => {
//     const page = (block - 1) * blockSize + 1;
//     goToPage(page);
//   };

//   return (
//     <div>
//       <button onClick={() => goToBlock(1)} disabled={currentBlock == 1}>
//         «
//       </button>
//       <button
//         onClick={() => goToBlock(currentBlock - 1)}
//         disabled={currentBlock == 1}
//       >
//         &lt;
//       </button>
//       {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
//         const page = startPage + i;
//         return (
//           <button
//             key={page}
//             onClick={() => goToPage(page)}
//             disabled={page == currentPage}
//           >
//             {page}
//           </button>
//         );
//       })}
//       <button
//         onClick={() => goToBlock(currentBlock + 1)}
//         disabled={currentBlock == totalBlocks}
//       >
//         &gt;
//       </button>
//       <button
//         onClick={() => goToBlock(totalBlocks)}
//         disabled={currentBlock == totalBlocks}
//       >
//         »
//       </button>
//     </div>
//   );
// }

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  blockSize: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  blockSize,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentBlock = useMemo(
    () => Math.ceil(currentPage / blockSize),
    [currentPage, blockSize]
  );

  const startPage = (currentBlock - 1) * blockSize + 1;
  const endPage = Math.min(startPage + blockSize - 1, totalPages);
  const totalBlocks = Math.ceil(totalPages / blockSize);

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      router.push(createPageUrl(page));
    }
  };

  const goToBlock = (block: number) => {
    const page = (block - 1) * blockSize + 1;
    goToPage(page);
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      {/* 처음 */}
      <button
        onClick={() => goToBlock(1)}
        disabled={currentBlock === 1}
        className={`px-2 text-sm ${
          currentBlock === 1
            ? "text-gray-300 cursor-not-allowed"
            : "text-yellow-600 hover:text-yellow-800"
        }`}
      >
        «
      </button>

      {/* 이전 블록 */}
      <button
        onClick={() => goToBlock(currentBlock - 1)}
        disabled={currentBlock === 1}
        className={`px-2 text-sm ${
          currentBlock === 1
            ? "text-gray-300 cursor-not-allowed"
            : "text-yellow-600 hover:text-yellow-800"
        }`}
      >
        &lt;
      </button>

      {/* 페이지 번호 */}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
        const page = startPage + i;
        const isCurrent = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => goToPage(page)}
            disabled={isCurrent}
            className={`px-3 py-1 text-sm transition ${
              isCurrent
                ? "rounded-full bg-[#F5C044]  text-white cursor-not-allowed"
                : "text-yellow-700 hover:text-yellow-900"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* 다음 블록 */}
      <button
        onClick={() => goToBlock(currentBlock + 1)}
        disabled={currentBlock === totalBlocks}
        className={`px-2 text-sm ${
          currentBlock === totalBlocks
            ? "text-gray-300 cursor-not-allowed"
            : "text-yellow-600 hover:text-yellow-800"
        }`}
      >
        &gt;
      </button>

      {/* 마지막 */}
      <button
        onClick={() => goToBlock(totalBlocks)}
        disabled={currentBlock === totalBlocks}
        className={`px-2 text-sm ${
          currentBlock === totalBlocks
            ? "text-gray-300 cursor-not-allowed"
            : "text-yellow-600 hover:text-yellow-800"
        }`}
      >
        »
      </button>
    </div>
  );
}
