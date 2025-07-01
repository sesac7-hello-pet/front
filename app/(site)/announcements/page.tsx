"use client";

import api from "@/app/lib/api";
import { useEffect, useState } from "react";

interface Announcement {
  id: number;
  status: string;
  image: string;
  breed: string;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnnouncement();
  }, []);

  async function getAnnouncement() {
    try {
      const res = await api.get("/announcements");
      setAnnouncements(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // 무조건 로딩 종료
    }
  }

  if (loading) return <h1>Loading…</h1>;

  return (
    <ul className="grid grid-cols-4 gap-4">
      {announcements.map((announcement) => (
        <li
          key={announcement.id}
          className="flex flex-col items-center space-y-1 rounded-lg border p-2 shadow-sm"
        >
          <img src={announcement.image} />
          <p className="text-sm font-medium">breed: {announcement.breed}</p>
          <p className="text-xs text-gray-600">status: {announcement.status}</p>
        </li>
      ))}
    </ul>
  );
}
