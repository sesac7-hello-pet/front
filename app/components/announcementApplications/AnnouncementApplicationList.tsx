interface Props {
    announcementId: number;
}

export default function AnnouncementApplicationList({ announcementId }: Props) {
    return (
        <div className="space-y-4">
            <div className="text-gray-700 text-sm">
                <span>공고 번호: {announcementId}</span>
                {/* 나중에 공고 생성일 추가 가능 */}
            </div>

            <div className="border p-4 rounded shadow-sm">
                <p className="text-center text-gray-500">신청자 목록을 불러옵니다...</p>
            </div>
        </div>
    );
}
