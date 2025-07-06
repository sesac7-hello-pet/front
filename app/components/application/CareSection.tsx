import { CareInfo } from "@/types/application";

interface Props {
    careInfo: CareInfo;
    setCareInfo?: (info: CareInfo) => void; // 작성 모드에서만 필요
    isReadOnly?: boolean;
}

export default function CareSection({ careInfo, setCareInfo, isReadOnly = false }: Props) {
    const update = (key: keyof CareInfo, value: string) => {
        if (setCareInfo) {
            setCareInfo({
                ...careInfo,
                [key]: value,
            });
        }
    };

    const renderField = (title: string, value: string) => (
        <div className="flex gap-2">
            <span className="font-medium text-sm">{title}:</span>
            <span className="text-sm text-gray-800">{value || "-"}</span>
        </div>
    );

    return (
        <div className="space-y-10">
            <h2 className="text-lg font-semibold text-center mb-8">돌봄 가능 시간</h2>

            {isReadOnly ? (
                <>
                    {renderField("하루 평균 집 비우는 시간", careInfo.absenceTime)}
                    {renderField("하루 평균 돌봄 시간", careInfo.careTime)}
                </>
            ) : (
                <>
                    {/* 집을 비우는 시간 */}
                    <div className="space-y-3">
                        <p className="font-medium text-sm">
                            평일 기준 하루 평균 집을 비우는 시간은 얼마나 되나요?
                        </p>
                        {["1 ~ 3시간", "4 ~ 6시간", "7 ~ 9시간", "10시간 이상"].map((label) => (
                            <label key={label} className="flex items-center gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="absenceTime"
                                    value={label}
                                    checked={careInfo.absenceTime === label}
                                    onChange={() => update("absenceTime", label)}
                                    className="accent-amber-400"
                                />
                                {label}
                            </label>
                        ))}
                    </div>

                    {/* 반려동물과 함께하는 시간 */}
                    <div className="space-y-3">
                        <p className="font-medium text-sm">
                            평일 기준 하루 평균 반려동물과 함께할 수 있는 시간은 얼마나 되나요?
                        </p>
                        {["1시간 이하", "2 ~ 3시간", "4시간 이상"].map((label) => (
                            <label key={label} className="flex items-center gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="careTime"
                                    value={label}
                                    checked={careInfo.careTime === label}
                                    onChange={() => update("careTime", label)}
                                    className="accent-amber-400"
                                />
                                {label}
                            </label>
                        ))}
                    </div>
                </>
            )}

            <hr className="border-gray-300 mt-4" />
        </div>
    );
}
