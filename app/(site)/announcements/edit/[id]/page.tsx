"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/app/lib/api";

interface AnnouncementForm {
  breed: string;
  gender: string;
  health: string;
  personality: string;
  age: number;
  announcementPeriod: number;
  image: string;
}

export default function EditAnnouncementPage() {
  const params = useParams();
  const id = params?.id as string;
  const [form, setForm] = useState<AnnouncementForm>({
    breed: "",
    gender: "",
    health: "",
    personality: "",
    age: 0,
    announcementPeriod: 0,
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/announcements/${id}`);
        const data = res.data;

        setForm({
          breed: data.breed ?? "",
          gender: data.gender ?? "",
          health: data.health ?? "",
          personality: data.personality ?? "",
          age: data.age ?? 0,
          announcementPeriod: data.announcementPeriod ?? 0,
          image: data.image ?? "",
        });
      } catch (err: any) {
        console.error(
          "수정 데이터 불러오기 실패",
          err.response ?? err.message ?? err
        );
        setError("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "age" || name === "announcementPeriod" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");
      await api.put(`/announcements/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("수정 완료!");
      router.push("/me");
    } catch (err) {
      console.error("수정 실패", err);
      setError("수정에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-yellow-600">
        입양 공고 수정
      </h1>

      {loading && <p className="mb-4 text-center text-gray-500">로딩 중...</p>}
      {error && (
        <p className="mb-4 text-center text-red-500 font-semibold">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="breed"
          value={form.breed ?? ""}
          onChange={handleChange}
          placeholder="품종"
          className="border p-2 w-full"
          disabled={loading}
        />
        <input
          name="gender"
          value={form.gender ?? ""}
          onChange={handleChange}
          placeholder="성별"
          className="border p-2 w-full"
          disabled={loading}
        />
        <input
          name="health"
          value={form.health ?? ""}
          onChange={handleChange}
          placeholder="건강 상태"
          className="border p-2 w-full"
          disabled={loading}
        />
        <input
          name="personality"
          value={form.personality ?? ""}
          onChange={handleChange}
          placeholder="성격"
          className="border p-2 w-full"
          disabled={loading}
        />
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          placeholder="나이"
          className="border p-2 w-full"
          disabled={loading}
        />
        <input
          type="number"
          name="announcementPeriod"
          value={form.announcementPeriod}
          onChange={handleChange}
          placeholder="공고 기간(일)"
          className="border p-2 w-full"
          disabled={loading}
        />
        <input
          name="image"
          value={form.image ?? ""}
          onChange={handleChange}
          placeholder="이미지 URL"
          className="border p-2 w-full"
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-yellow-300"
        >
          수정 완료
        </button>
      </form>
    </div>
  );
}
