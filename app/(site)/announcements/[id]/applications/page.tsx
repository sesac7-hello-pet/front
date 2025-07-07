"use client";

import AnnouncementApplicationList from "@/app/components/announcementApplications/AnnouncementApplicationList";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function AnnouncementApplicationsPage() {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold text-center">공고별 신청 내역</h1>
            <p className="text-sm text-center text-gray-500">공고 ID: {id}</p>

            <AnnouncementApplicationList announcementId={Number(id)} />
        </div>
    );
}
