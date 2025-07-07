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
    <div className="min-h-screen bg-white py-10 px-4">
      <h1 className="text-center text-yellow-500 text-2xl font-bold mb-8">
        내가 등록한 입양 공고
      </h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {myAnnouncements.map((item) => (
          <li key={item.id} className="bg-yellow-50 p-4 rounded-xl shadow">
            <Link
              href={`/announcements/${item.id}`}
              className="block hover:bg-yellow-100 transition rounded-xl"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.breed}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg text-gray-400 mb-3">
                  이미지 없음
                </div>
              )}
              <p className="text-yellow-700 font-semibold">{item.breed}</p>
              <p className="text-sm text-gray-600">상태: {item.status}</p>
              <p className="text-sm text-gray-600">
                보호소: {item.shelterName}
              </p>
              <p className="text-sm text-gray-500">
                등록일: {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </Link>

            {/* 버튼 영역 */}
            <div className="mt-4 flex justify-between gap-2">
              <button
                onClick={() => router.push(`/announcements/edit/${item.id}`)}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                수정
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                삭제
              </button>
              <button
                onClick={() => router.push(`/applications/${item.id}`)}
                className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                신청내역
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
