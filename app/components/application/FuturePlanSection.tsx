import { FuturePlanInfo } from "@/types/application";

interface Props {
    futurePlanInfo: FuturePlanInfo;
    setFuturePlanInfo: (info: FuturePlanInfo) => void;
}

export default function FuturePlanSection({ futurePlanInfo, setFuturePlanInfo }: Props) {
    const update = (key: keyof FuturePlanInfo, value: any) => {
        setFuturePlanInfo({
            ...futurePlanInfo,
            [key]: value,
        });
    };

    return (
        <div className="space-y-20">
            <h2 className="text-lg font-semibold text-center mb-8">향후 계획</h2>

            <div className="space-y-3">
                <p className="font-medium text-sm">
                    향후 1년 이내 이사, 출산, 유학, 군입대 등의 계획이 있나요?
                </p>

                {["있음", "없음"].map((label) => (
                    <div key={label} className="space-y-3">
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="radio"
                                name="hasFuturePlan"
                                checked={futurePlanInfo.hasFuturePlan === (label === "있음")}
                                onChange={() => update("hasFuturePlan", label === "있음")}
                                className="accent-amber-400"
                            />
                            {label}
                        </label>

                        {label === "있음" && futurePlanInfo.hasFuturePlan && (
                            <textarea
                                value={futurePlanInfo.planDetails || ""}
                                onChange={(e) => update("planDetails", e.target.value)}
                                placeholder="예: 3개월 뒤 이사 예정"
                                className="w-full rounded-md p-2 text-sm placeholder-gray-400 focus:ring-2 focus:ring-amber-400 bg-[rgba(197,197,197,0.2)]"
                                rows={2}
                            />
                        )}
                    </div>
                ))}
            </div>
            <hr className="border-gray-300 mt-4" />
        </div>
    );
}
