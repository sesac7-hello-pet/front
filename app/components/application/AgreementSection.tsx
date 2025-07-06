import { Agreement } from "@/types/application";

interface Props {
    agreement: Agreement;
    setAgreement: (val: Agreement) => void;
}

export default function AgreementSection({ agreement, setAgreement }: Props) {
    const update = (key: keyof Agreement, value: boolean) => {
        setAgreement({
            ...agreement,
            [key]: value,
        });
    };

    return (
        <div>
            <h2 className="text-lg font-semibold text-center mb-8">최종 확인 및 동의</h2>

            <p className="text-sm text-gray-700 font-semibold mb-5">
                제출 전 아래 내용을 확인하고 동의해주세요.
            </p>

            <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={agreement.agreedToAccuracy}
                        onChange={(e) => update("agreedToAccuracy", e.target.checked)}
                        className="accent-amber-400"
                    />
                    위 항목은 사실에 근거하여 작성하였습니다.
                </label>

                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={agreement.agreedToCare}
                        onChange={(e) => update("agreedToCare", e.target.checked)}
                        className="accent-amber-400"
                    />
                    입양 후 반려동물을 책임감 있게 돌볼 것을 약속합니다.
                </label>

                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={agreement.agreedToPrivacy}
                        onChange={(e) => update("agreedToPrivacy", e.target.checked)}
                        className="accent-amber-400"
                    />
                    개인정보 수집 및 활용에 동의합니다.
                </label>
            </div>
        </div>
    );
}
