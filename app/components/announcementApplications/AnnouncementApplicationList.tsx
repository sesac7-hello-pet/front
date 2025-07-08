"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/app/lib/api";
import AnnouncementApplicationItem from "./AnnouncementApplicationItem";
import ConfirmModal from "@/app/components/ConfirmModal";
import Pagination from "@/app/components/Pagination";

interface Props {
    announcementId: number;
}

interface Application {
    applicationId: number;
    applicationStatusLabel: string;
    userName: string;
    userPhoneNumber: string;
    userEmail: string;
}

export default function AnnouncementApplicationList({ announcementId }: Props) {
    const [applications, setApplications] = useState<Application[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [announcementCreatedAt, setAnnouncementCreatedAt] = useState<string>("");
    const [selectedAppId, setSelectedAppId] = useState<number | null>(null);

    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const fetchApplications = async (pageNum: number) => {
        try {
            const res = await api.get(
                `/announcements/${announcementId}/applications?page=${pageNum - 1}&size=10`
            );
            setApplications(res.data.applications);
            setTotalPages(res.data.totalPages);
            setAnnouncementCreatedAt(res.data.announcementCreatedAt);
        } catch {
            alert("신청 내역을 불러오지 못했습니다.");
        }
    };

    useEffect(() => {
        fetchApplications(currentPage);
    }, [currentPage]);

    const handleApprove = async () => {
        if (selectedAppId === null) return;
        try {
            await api.put(`/announcements/${announcementId}/applications/${selectedAppId}`);
            alert("신청이 승인되었습니다.");
            await fetchApplications(currentPage);
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
                        ? new Date(announcementCreatedAt).toISOString().slice(0, 10)
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
                <div className="mt-6">
                    <Pagination currentPage={currentPage} totalPages={totalPages} blockSize={5} />
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
