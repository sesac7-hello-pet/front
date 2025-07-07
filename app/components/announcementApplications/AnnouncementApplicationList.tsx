"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/api";
import AnnouncementApplicationItem from "./AnnouncementApplicationItem";
import ConfirmModal from "@/components/ConfirmModal";

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
        } catch (e) {
            alert("신청 내역을 불러오지 못했습니다.");
        }
    };

    return (
        <div className="space-y-4">
            <div className="text-gray-700 text-sm">
                <span>공고 번호: {announcementId}</span>{" "}
                <span>
                    생성일:{" "}
                    {announcementCreatedAt
                        ? new Date(announcementCreatedAt).toLocaleDateString()
                        : "-"}
                </span>
            </div>

            {applications.map((app) => (
                <AnnouncementApplicationItem
                    key={app.applicationId}
                    application={app}
                    onApprove={() => setSelectedAppId(app.applicationId)}
                />
            ))}

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

            {/* 승인 모달은 다음 단계에서 handleApprove와 연결 */}
            {selectedAppId !== null && (
                <ConfirmModal
                    message="해당 신청서를 승인하시겠습니까?"
                    onConfirm={() => {
                        /* 승인 로직 다음 단계 */
                    }}
                    onCancel={() => setSelectedAppId(null)}
                />
            )}
        </div>
    );
}
