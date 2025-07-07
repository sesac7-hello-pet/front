interface Props {
    application: {
        applicationId: number;
        announcementId: number;
        applicationStatusLabel: string;
        submittedAt: string;
        petImageUrl: string;
    };
    onClick: () => void;
}

const STATUS_LABEL_MAP: Record<string, string> = {
    APPROVED: "승인",
    PENDING: "대기",
    REJECTED: "거절",
    CANCELLED: "취소",
};

export default function ApplicationItem({ application, onClick }: Props) {
    return (
        <div
            className="flex justify-between items-center border p-3 rounded cursor-pointer hover:bg-amber-50"
            onClick={onClick}
        >
            <div>
                <div className="flex space-x-2 mb-1">
                    <span className="bg-amber-100 text-amber-800 text-xs px-2 rounded">입양</span>
                    <span className="bg-amber-400 text-white text-xs px-2 rounded">
                        {STATUS_LABEL_MAP[application.applicationStatusLabel] ||
                            application.applicationStatusLabel}
                    </span>
                </div>
                <div className="text-sm">신청 번호: {application.applicationId}</div>
                <div className="text-sm">공고 번호: {application.announcementId}</div>
                <div className="text-sm">
                    신청일: {new Date(application.submittedAt).toLocaleDateString()}
                </div>
            </div>
            <img
                src={application.petImageUrl}
                alt="동물 이미지"
                className="w-16 h-16 rounded object-cover"
            />
        </div>
    );
}
