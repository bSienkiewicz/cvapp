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
	| "summary"
	| "custom";

export type DescriptionBullet = {
	isVisible: boolean;
	content: string;
};

export type DescriptionBlock = {
	type: "text" | "bullet";
	isVisible: boolean;
	content: string;
};

export type ExperienceEntry = {
	id: string;
	jobTitle: string | null;
	employer: string | null;
	jobDescription?: string | null;
	fieldVisibility?: {
		jobTitle?: boolean;
		jobDescription?: boolean;
		location?: boolean;
		dates?: boolean;
	};
	employerLink: string | null;
	startDate: string | null;
	endDate: string | null;
	descriptionBullets: DescriptionBullet[];
	location: string | null;
	isCurrent: boolean;
	isVisible: boolean;
	createdAt: string;
	updatedAt: string;
};

export type EducationEntry = {
	id: string;
	school: string | null;
	degree: string | null;
	field: string | null;
	startDate: string | null;
	endDate: string | null;
	descriptionBlocks: DescriptionBlock[];
	location: string | null;
	createdAt: string;
	updatedAt: string;
	isVisible: boolean;
};

export type SkillEntry = {
	id: string;
	skillName: string;
	descriptionBlocks: DescriptionBlock[];
	isVisible: boolean;
	proficiencyLevel: number | null;
	createdAt: string;
	updatedAt: string;
};

export type SummaryEntry = {
	id: string;
	summary: string;
	isVisible: boolean;
	createdAt: string;
	updatedAt: string;
};

export type BaseSection<TType extends SectionType, TEntry> = {
	id: string;
	sectionType: TType;
	displayName: string | null;
	defaultName: string;
	iconKey: string;
	displayIcon: boolean;
	displayTitle: boolean;
	entries: TEntry[];
};

export type ExperienceSection = BaseSection<"experience", ExperienceEntry>;
export type EducationSection = BaseSection<"education", EducationEntry>;
export type SkillsSection = BaseSection<"skills", SkillEntry>;
export type SummarySection = BaseSection<"summary", SummaryEntry>;

export type ResumeSection =
	| ExperienceSection
	| EducationSection
	| SkillsSection
	| SummarySection;

export type ResumeData = {
	personalDetails: PersonalDetails
	sections: ResumeSection[];
}