"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/api";
import ApplicationItem from "@/components/ApplicationItem";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";

interface Application {
    applicationId: number;
    announcementId: number;
    applicationStatusLabel: string;
    submittedAt: string;
    petImageUrl: string;
}

export default function ApplicationList() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        fetchApplications(page);
    }, [page]);

    const fetchApplications = async (pageNum: number) => {
        try {
            const res = await api.get(`/me/applications?page=${pageNum}&size=10`);
            setApplications(res.data.applications);
            setTotalPages(res.data.totalPages);
        } catch (e) {
            alert("신청 내역을 불러오지 못했습니다.");
        }
    };

    const handleDelete = async () => {
        if (selectedId === null) return;
        try {
            await api.delete(`/applications/${selectedId}`);
            alert("신청서가 삭제되었습니다.");
            setSelectedId(null);
            fetchApplications(page); // 최신 데이터로 갱신
        } catch (e) {
            alert("신청서 삭제에 실패했습니다.");
        }
    };

    return (
        <div className="space-y-4">
            {applications.map((app) => (
                <ApplicationItem
                    key={app.applicationId}
                    application={app}
                    onClick={() => setSelectedId(app.applicationId)}
                />
            ))}

            {totalPages > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                    {[...Array(totalPages)].map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                if (page !== idx) setPage(idx);
                            }}
                            className={`px-3 py-1 rounded border ${
                                page === idx
                                    ? "bg-amber-200 text-amber-800 font-bold"
                                    : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
            )}

            {selectedId !== null && (
                <DeleteConfirmModal onConfirm={handleDelete} onCancel={() => setSelectedId(null)} />
            )}
        </div>
    );
}
