"use client";

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
    return (
        <div className="border-b border-gray-300 p-4 flex justify-between items-center">
            <div className="space-y-1 text-sm">
                <div>이름: {application.userName}</div>
                <div>전화번호: {application.userPhoneNumber}</div>
                <div>이메일: {application.userEmail}</div>
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={() => {
                        window.location.href = `/applications/${application.applicationId}`;
                    }}
                    className="bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded-lg hover:bg-amber-200"
                >
                    신청서
                </button>
                <button
                    onClick={onApprove}
                    className="bg-amber-400 text-white text-sm px-3 py-1 rounded-lg hover:bg-amber-500"
                >
                    승인
                </button>
            </div>
        </div>
    );
}
