"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/lib/api";
import AnnouncementApplicationItem from "./AnnouncementApplicationItem";
import ConfirmModal from "@/app/components/ConfirmModal";

interface Props {
    announcementId: number;
}

interface Application {
    applicationId: number;
    userName: string;
    userPhoneNumber: string;
    userEmail: string;
}

export default function AnnouncementApplicationList({ announcementId }: Props) {
    const [applications, setApplications] = useState<Application[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [announcementCreatedAt, setAnnouncementCreatedAt] = useState<string>("");
    const [selectedAppId, setSelectedAppId] = useState<number | null>(null);

    const router = useRouter();

    useEffect(() => {
        fetchApplications(page);
    }, [page]);

    const fetchApplications = async (pageNum: number) => {
        try {
            const res = await api.get(
                `/announcements/${announcementId}/applications?page=${pageNum}&size=10`
            );
            setApplications(res.data.applications);
            setTotalPages(res.data.totalPages);
            setAnnouncementCreatedAt(res.data.announcementCreatedAt);
        } catch {
            alert("신청 내역을 불러오지 못했습니다.");
        }
    };

    const handleApprove = async () => {
        if (selectedAppId === null) return;
        try {
            await api.put(`/announcements/${announcementId}/applications/${selectedAppId}`);
            alert("신청이 승인되었습니다.");
            router.push(`/`);
        } catch (e: any) {
            alert("승인에 실패했습니다: " + (e.response?.data?.message || e.message));
        } finally {
            setSelectedAppId(null);
        }
    };

    return (
        <div className="space-y-4">
            {/* 상단 공고 정보 */}
            <div className="flex justify-between items-center border-b pb-2 text-lg">
                <span className="font-semibold text-gray-700">공고 번호</span>
                <span>{announcementId}</span>
                <span>
                    {announcementCreatedAt
                        ? new Date(announcementCreatedAt).toLocaleDateString()
                        : "-"}
                </span>
            </div>

            {/* 신청자 리스트 */}
            {applications.map((app) => (
                <AnnouncementApplicationItem
                    key={app.applicationId}
                    application={app}
                    onApprove={() => setSelectedAppId(app.applicationId)}
                />
            ))}

            {/* 페이지네이션 */}
            {totalPages > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                    {[...Array(totalPages)].map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setPage(idx)}
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

            {/* 승인 모달 */}
            {selectedAppId !== null && (
                <ConfirmModal
                    message="해당 신청서를 승인하시겠습니까?"
                    onConfirm={handleApprove}
                    onCancel={() => setSelectedAppId(null)}
                />
            )}
        </div>
    );
}
