"use client";

import api from "@/app/lib/api";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Announcement {
  id: number;
  breed: string;
  status: string;
  shelterName: string;
  createdAt: string;
  image: string | null;
}

const ITEMS_PER_PAGE = 9;

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(announcements.length / ITEMS_PER_PAGE);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  async function fetchAnnouncements() {
    try {
      const res = await api.get("/announcements");
      setAnnouncements(res.data.announcements ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const currentPageItems = announcements.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  const goPrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const goNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  if (loading) return <h1 className="text-center mt-20 text-xl">Loading…</h1>;

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <h1 className="text-center text-yellow-500 font-semibold text-lg mb-6">
        입양게시판
      </h1>

      <ul className="grid grid-cols-3 gap-6 max-w-5xl mx-auto mb-6">
        {currentPageItems.map((item) => (
          <li key={item.id}>
            <Link
              href={`/announcements/${item.id}`}
              className="block flex flex-col items-center bg-white shadow-md rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.breed}
                  className="w-36 h-36 object-cover rounded-xl mb-2"
                />
              ) : (
                <div className="w-36 h-36 bg-gray-200 rounded-xl mb-2 flex items-center justify-center text-gray-400">
                  이미지 없음
                </div>
              )}
              <p className="text-xs text-gray-700 font-semibold">
                {item.breed}
              </p>
              <p className="text-xs text-gray-500">
                상태: {item.status} / 보호소: {item.shelterName}
              </p>
              <p className="text-xs text-gray-400">
                등록일: {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {/* 화살표 페이지네이션 */}
      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={goPrev}
          disabled={page === 0}
          className={`px-3 py-1 rounded ${
            page === 0
              ? "bg-gray-300 text-white cursor-not-allowed"
              : "bg-yellow-400 text-white hover:bg-yellow-500"
          }`}
        >
          ◀
        </button>

        <span className="text-sm text-gray-600">
          {page + 1} / {totalPages}
        </span>

        <button
          onClick={goNext}
          disabled={page >= totalPages - 1}
          className={`px-3 py-1 rounded ${
            page >= totalPages - 1
              ? "bg-gray-300 text-white cursor-not-allowed"
              : "bg-yellow-400 text-white hover:bg-yellow-500"
          }`}
        >
          ▶
        </button>
      </div>
    </div>
  );
}
