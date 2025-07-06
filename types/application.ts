export interface HousingInfo {
    housingType: string;
    residenceType: string;
    petAllowed: boolean | null;
    petLivingPlace: string;
    houseSizeRange: string;
}

export interface FamilyInfo {
    numberOfHousehold: number;
    hasChildUnder13: boolean | null;
    familyAgreement: string;
    hasPetAllergy: boolean | null;
}

export interface CareInfo {
    absenceTime: string;
    careTime: string;
}

export interface FinancialInfo {
    monthlyBudget: string;
    hasEmergencyFund: boolean | null;
}

export interface PetExperienceInfo {
    hasPetExperience: boolean | null;
    experienceDetails?: string;
}

export interface FuturePlanInfo {
    hasFuturePlan: boolean | null;
    planDetails?: string;
}

export interface Agreement {
    agreedToAccuracy: boolean;
    agreedToCare: boolean;
    agreedToPrivacy: boolean;
}

export interface ApplicationPayload {
    announcementId: number;
    reason: string;
    housingInfo: HousingInfo;
    familyInfo: FamilyInfo;
    careInfo: CareInfo;
    financialInfo: FinancialInfo;
    petExperienceInfo: PetExperienceInfo;
    futurePlanInfo: FuturePlanInfo;
    agreement: Agreement;
}
