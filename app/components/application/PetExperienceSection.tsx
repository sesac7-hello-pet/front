import { PetExperienceInfo } from "@/types/application";

interface Props {
    petExperienceInfo: PetExperienceInfo;
    setPetExperienceInfo: (info: PetExperienceInfo) => void;
}

export default function PetExperienceSection({ petExperienceInfo, setPetExperienceInfo }: Props) {
    const update = (key: keyof PetExperienceInfo, value: any) => {
        setPetExperienceInfo({
            ...petExperienceInfo,
            [key]: value,
        });
    };

    return (
        <div className="space-y-20">
            <h2 className="text-lg font-semibold text-center mb-8">반려동물 양육 경험</h2>

            <div className="space-y-3">
                <p className="font-medium text-sm">
                    현재 또는 과거에 반려동물을 양육한 경험이 있나요?
                </p>
                {["있음", "없음"].map((label) => (
                    <div key={label} className="space-y-3">
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="radio"
                                name="hasPetExperience"
                                checked={petExperienceInfo.hasPetExperience === (label === "있음")}
                                onChange={() => update("hasPetExperience", label === "있음")}
                                className="accent-amber-400"
                            />
                            {label}
                        </label>

                        {label === "있음" && petExperienceInfo.hasPetExperience && (
                            <textarea
                                value={petExperienceInfo.experienceDetails || ""}
                                onChange={(e) => update("experienceDetails", e.target.value)}
                                placeholder="예: 강아지(과거 5년 양육), 고양이(현재 2살)"
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
