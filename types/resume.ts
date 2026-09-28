export type PersonalDetailKey =
    | "displayEmail"
    | "phone"
    | "address"
    | "website";


export type PersonalDetails = {
    age: number | null;
    phone: string | null;
    photo: {
        shape: "squareRounded" | "";
        imageId: string;
        originalWidth: number;
        originalHeight: number;
    } | null;
    social: {
        github: string | null;
    };
    address: string | null;
    website: string | null;
    birthday: {
        day: number | null;
        year: number | null;
        month: number | null
    };
    fullName: string | null;
    jobTitle: string | null;
    displayEmail: string | null;
    detailsOrder: PersonalDetailKey[]
}

export type SectionType =
    | "experience"
    | "education"
    | "skills"
    | "projects"
    | "certifications"
    | "languages"
    | "custom";

export type BaseSection = {
    id: string;
    sectionType: SectionType;
    displayName: string | null;
    defaultName: string;
    iconKey: string;
    entries: ExperienceEntry[];
}

// ========== EXPERIENCE ==========

export type ExperienceEntry = {
    id: string;
    jobTitle: string | null;
    employer: string | null;
    employerLink: string | null;
    startDate: string | null;
    endDate: string | null;
    description: string | null;
    location: string | null;
    isCurrent: boolean;
    isVisible: boolean;
    createdAt: string;
    updatedAt: string;
}

export type ExperienceSection = BaseSection & {
    sectionType: "experience";
    entries: ExperienceEntry[];
}

// ========== EDUCATION ==========

export type EducationEntry = {
    id: string;
    school: string | null;
    degree: string | null;
    field: string | null;
    startDate: string | null;
    endDate: string | null;
    description: string | null;
    location: string | null;
    createdAt: string;
    updatedAt: string;
    isVisible: boolean;
};

export type EducationSection = BaseSection & {
    sectionType: "education";
    entries: EducationEntry[];
};

export type ResumeSection =
    | ExperienceSection
    | EducationSection;

export type ResumeData = {
    personalDetails: PersonalDetails
    sections: ResumeSection[];
}