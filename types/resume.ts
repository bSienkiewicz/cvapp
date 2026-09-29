import { EducationEntry, EducationSection } from "@/components/resume/display/EducationBlock";
import { ExperienceEntry, ExperienceSection } from "@/components/resume/display/ExperienceBlock";
import { SkillsSection } from "@/components/resume/display/SkillsBlock";

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

export type BaseSection<TEntry> = {
	id: string;
	sectionType: SectionType;
	displayName: string | null;
	defaultName: string;
	iconKey: string;
	displayIcon: boolean;
	entries: TEntry[];
}

export type ResumeSection =
	| ExperienceSection
	| EducationSection
	| SkillsSection;

export type ResumeData = {
	personalDetails: PersonalDetails
	sections: ResumeSection[];
}