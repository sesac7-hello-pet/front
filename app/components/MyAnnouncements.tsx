"use client";

import api from "@/app/lib/api";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AnnouncementListItem {
  id: number;
  breed: string;
  status: string;
  shelterName: string;
  createdAt: string;
  image: string | null;
}

interface AnnouncementPageResponse {
  page: number;
  size: number;
  totalPages: number;
  totalCount: number;
  announcements: AnnouncementListItem[];
}
const animalStatus: Record<"IN_PROGRESS" | "COMPLETED", string> = {
  IN_PROGRESS: "입양 중",
  COMPLETED: "입양완료",
};
export default function MyAnnouncementsPage() {
  const [myAnnouncements, setMyAnnouncements] = useState<
    AnnouncementListItem[]
  >([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchMyAnnouncements();
  }, []);

  async function fetchMyAnnouncements() {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await api.get<AnnouncementPageResponse>("/me/announcements", {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      setMyAnnouncements(res.data.announcements ?? []);
    } catch (err) {
      console.error("공고 불러오기 실패", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmed = confirm("정말 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("accessToken");
      await api.delete(`/announcements/${id}`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      alert("삭제 완료!");
      fetchMyAnnouncements(); // 삭제 후 다시 목록 로드
    } catch (err) {
      console.error("삭제 실패", err);
      alert("삭제 실패");
    }
  }

  if (loading) return <p className="text-center mt-20 text-lg">불러오는 중…</p>;

  return (
    <div className="min-h-screen bg-white-50 py-10 px-4">
      <h1 className="text-center text-yellow-600 text-3xl font-extrabold mb-10">
        내가 등록한 입양 공고
      </h1>
      <div className="text-center mb-10">
        <Link
          href="/announcements/create"
          className="inline-block rounded-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-2 transition"
        >
          입양 게시글 등록하기
        </Link>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {myAnnouncements.map((item) => (
          <li
            key={item.id}
            className="bg-yellow-100 p-5 rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            <Link
              href={`/announcements/${item.id}`}
              className="block group transition"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.breed}
                  className="w-full h-48 object-cover rounded-2xl mb-4 group-hover:opacity-90"
                />
              ) : (
                <div className="w-full h-48 bg-yellow-200 flex items-center justify-center rounded-2xl text-yellow-400 mb-4">
                  이미지 없음
                </div>
              )}
              <p className="text-orange-500 text-lg font-bold">{item.breed}</p>
              <p className="text-sm text-yellow-800">
                상태: {animalStatus[item.status]}
              </p>
              <p className="text-sm text-yellow-800">
                보호소: {item.shelterName}
              </p>
              <p className="text-sm text-yellow-700">
                등록일: {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </Link>

            {/* 버튼 영역 */}
            <div className="mt-5 flex justify-between gap-2">
              <button
                onClick={() => router.push(`/announcements/edit/${item.id}`)}
                className="w-1/3 px-2 py-2 text-sm bg-yellow-400 text-white rounded-full hover:bg-orange-500 transition text-center"
              >
                수정
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="w-1/3 px-2 py-2 text-sm bg-orange-400 text-white rounded-full hover:bg-red-500 transition text-center"
              >
                삭제
              </button>
              <button
                onClick={() =>
                  router.push(`/announcements/${item.id}/applications`)
                }
                className="w-1/3 px-2 py-2 text-sm bg-red-400 text-white rounded-full hover:bg-yellow-700 transition text-center"
              >
                신청 내역
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
