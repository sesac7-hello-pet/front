"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/app/lib/api";
import {
    ApplicationPayload,
    HousingInfo,
    FamilyInfo,
    CareInfo,
    FinancialInfo,
    PetExperienceInfo,
    FuturePlanInfo,
    Agreement,
} from "@/types/application";
import AgreementSection from "./AgreementSection";
import ApplicationInfoSection from "./ApplicationInfoSection";
import HousingSection from "./HousingSection";
import FamilySection from "./FamilySection";
import CareSection from "./CareSection";
import FinancialSection from "./FinancialSection";
import PetExperienceSection from "./PetExperienceSection";
import FuturePlanSection from "./FuturePlanSection";

export default function ApplicationForm() {
    const router = useRouter();
    const params = useParams();

    // id 추출 및 변환
    const id = Array.isArray(params.id) ? params.id[0] : params.id ?? "0";
    const announcementId = Number(id);

    const [reason, setReason] = useState("");
    const [housingInfo, setHousingInfo] = useState<HousingInfo>({
        housingType: "",
        residenceType: "",
        petAllowed: null,
        petLivingPlace: "",
        houseSizeRange: "",
    });
    const [familyInfo, setFamilyInfo] = useState<FamilyInfo>({
        numberOfHousehold: 0,
        hasChildUnder13: null,
        familyAgreement: "",
        hasPetAllergy: null,
    });
    const [careInfo, setCareInfo] = useState<CareInfo>({
        absenceTime: "",
        careTime: "",
    });
    const [financialInfo, setFinancialInfo] = useState<FinancialInfo>({
        monthlyBudget: "",
        hasEmergencyFund: null,
    });
    const [petExperienceInfo, setPetExperienceInfo] = useState<PetExperienceInfo>({
        hasPetExperience: null,
        experienceDetails: "",
    });
    const [futurePlanInfo, setFuturePlanInfo] = useState<FuturePlanInfo>({
        hasFuturePlan: null,
        planDetails: "",
    });
    const [agreement, setAgreement] = useState<Agreement>({
        agreedToAccuracy: false,
        agreedToCare: false,
        agreedToPrivacy: false,
    });

    const handleSubmit = async () => {
        if (!agreement.agreedToAccuracy || !agreement.agreedToCare || !agreement.agreedToPrivacy) {
            alert("모든 동의 항목에 체크해주세요.");
            return;
        }

        const payload: ApplicationPayload = {
            announcementId,
            reason,
            housingInfo,
            familyInfo,
            careInfo,
            financialInfo,
            petExperienceInfo,
            futurePlanInfo,
            agreement,
        };

        try {
            await api.post("/applications", payload);
            alert("입양 신청이 완료되었습니다.");
            router.push(`/announcements/${announcementId}`);
        } catch (error: any) {
            alert("신청에 실패했습니다: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-[#FFFDF0] shadow rounded-xl space-y-6 my-10">
            <h1 className="text-xl font-bold text-center mb-8">입양 신청서</h1>

            <ApplicationInfoSection reason={reason} setReason={setReason} />
            <HousingSection housingInfo={housingInfo} setHousingInfo={setHousingInfo} />
            <FamilySection familyInfo={familyInfo} setFamilyInfo={setFamilyInfo} />
            <CareSection careInfo={careInfo} setCareInfo={setCareInfo} />
            <FinancialSection financialInfo={financialInfo} setFinancialInfo={setFinancialInfo} />
            <PetExperienceSection
                petExperienceInfo={petExperienceInfo}
                setPetExperienceInfo={setPetExperienceInfo}
            />
            <FuturePlanSection
                futurePlanInfo={futurePlanInfo}
                setFuturePlanInfo={setFuturePlanInfo}
            />

            <AgreementSection agreement={agreement} setAgreement={setAgreement} />

            <button
                onClick={handleSubmit}
                className="bg-amber-400 text-white font-semibold py-1 px-5 rounded-xl hover:bg-amber-500 mx-auto block mt-20"
            >
                입양 신청
            </button>
        </div>
    );
}
