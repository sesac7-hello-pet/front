import { useUserStore } from "@/app/store/UserStore";
import { useParams } from "next/navigation";

interface Props {
    reason: string;
    setReason: (value: string) => void;
}

export default function ApplicationInfoSection({ reason, setReason }: Props) {
    const user = useUserStore((s) => s.user);
    const params = useParams();

    const id = Array.isArray(params.id) ? params.id[0] : params.id ?? "0";

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

                <div className="space-y-4 ml-15">
                    <div className="text-gray-800">{id}</div>
                    <div className="text-gray-800">입양</div>
                    <div className="text-gray-800">{user?.username || "-"}</div>
                    <div className="text-gray-800">{user?.phoneNumber || "-"}</div>
                    <div className="text-gray-800">{user?.email || "-"}</div>
                </div>
            </div>

            <hr className="border-gray-300 my-6" />

            {/* 신청 희망 사유 */}
            <div className="space-y-1">
                <p className="font-medium font-semibold text-gray-600 mb-2">신청 희망 사유</p>
                <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="입양을 결심하신 이유와 계획, 기대를 자유롭게 적어주세요."
                    className="w-full min-h-[100px] rounded-md p-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-[rgba(197,197,197,0.2)]"
                />
            </div>
        </div>
    );
}
