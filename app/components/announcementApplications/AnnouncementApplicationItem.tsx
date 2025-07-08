"use client";

import { formatPhoneNumber } from "@/app/lib/formatPhoneNumber";
import { useRouter } from "next/navigation";

interface Props {
    application: {
        applicationId: number;
        userName: string;
        userPhoneNumber: string;
        userEmail: string;
    };
    onApprove: () => void;
}

export default function AnnouncementApplicationItem({ application, onApprove }: Props) {
    const router = useRouter();

    return (
        <div className="flex justify-between items-center border-b border-gray-300 py-2">
            <div className="flex-1 flex space-x-20 text-base">
                <span className="w-24">{application.userName}</span>
                <span className="w-32">{formatPhoneNumber(application.userPhoneNumber)}</span>
                <span className="w-48">{application.userEmail}</span>
            </div>
            <div className="flex space-x-3">
                <button
                    onClick={() => router.push(`/applications/${application.applicationId}`)}
                    className="bg-amber-400 text-white text-sm px-3 py-1 rounded-xl hover:bg-amber-500"
                >
                    신청서
                </button>
                <button
                    onClick={onApprove}
                    className="bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded-xl hover:bg-amber-200"
                >
                    승인
                </button>
            </div>
        </div>
    );
}
