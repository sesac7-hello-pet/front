import { useParams } from "next/navigation";

interface Props {
    id?: number | string; // 상세 조회 데이터의 공고 번호
    name?: string; // 신청자 이름
    phoneNumber?: string; // 신청자 연락처
    email?: string; // 신청자 이메일
    reason: string; // 신청 사유
    isReadOnly?: boolean; // 읽기 전용 여부
    setReason?: (value: string) => void; // 작성 모드일 때만 필요
}

export default function ApplicationInfoSection({
    id,
    name,
    phoneNumber,
    email,
    reason,
    isReadOnly = false,
    setReason,
}: Props) {
    const params = useParams();
    const displayId = id ?? (Array.isArray(params.id) ? params.id[0] : params.id ?? "-");

    return (
        <div className="space-y-6 border-b border-gray-300 pb-6 text-sm">
            <div className="flex gap-6">
                <div className="space-y-4">
                    <div className="text-gray-600 font-medium">공고 번호</div>
                    <div className="text-gray-600 font-medium">신청 종류</div>
                    <div className="text-gray-600 font-medium">신청자 이름</div>
                    <div className="text-gray-600 font-medium">신청자 연락처</div>
                    <div className="text-gray-600 font-medium">신청자 이메일</div>
                </div>

                <div className="space-y-4 ml-10">
                    <div className="text-gray-800">{displayId}</div>
                    <div className="text-gray-800">입양</div>
                    <div className="text-gray-800">{name || "-"}</div>
                    <div className="text-gray-800">{phoneNumber || "-"}</div>
                    <div className="text-gray-800">{email || "-"}</div>
                </div>
            </div>

            <hr className="border-gray-300 my-6" />

            <div className="space-y-1">
                <p className="font-medium text-gray-600 mb-2">신청 희망 사유</p>
                {isReadOnly ? (
                    <div className="w-full min-h-[100px] rounded-md p-2 text-sm bg-[rgba(197,197,197,0.2)]">
                        {reason || "-"}
                    </div>
                ) : (
                    <textarea
                        value={reason}
                        onChange={(e) => setReason && setReason(e.target.value)}
                        placeholder="입양을 결심하신 이유와 계획, 기대를 자유롭게 적어주세요."
                        className="w-full min-h-[100px] rounded-md p-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-[rgba(197,197,197,0.2)]"
                    />
                )}
            </div>
        </div>
    );
}
