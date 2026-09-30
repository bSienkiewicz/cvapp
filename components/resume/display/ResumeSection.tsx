import type { ResumeSection } from "@/types/resume";
import EducationSectionDisplay from "./EducationSectionDisplay";
import ExperienceSectionDisplay from "./ExperienceSectionDisplay";
import SkillsSectionDisplay from "./SkillsSectionDisplay";
import ProfessionalSummarySectionDisplay from "./ProfessionalSummarySectionDisplay";

type Props = {
	section: ResumeSection;
};

export default function ResumeSection({ section }: Props) {
	return (
		<div>
			{section.displayTitle && (
				<h2 className="text-2xl font-semibold tracking-tight text-center underline">
					{section.displayName || section.defaultName}
				</h2>
			)}

			{section.sectionType === "summary" && (
				section.entries.filter((entry) => entry.isVisible).map((entry) => (
					<div key={entry.id} className="mt-2">
						<ProfessionalSummarySectionDisplay entry={entry} />
					</div>
				)))
}

			{section.sectionType === "experience" &&
				section.entries.filter((entry) => entry.isVisible).map((entry) => (
					<div key={entry.id} className="mt-2">
						<ExperienceSectionDisplay entry={entry} />
					</div>
				))}

			{section.sectionType === "education" &&
				section.entries.filter((entry) => entry.isVisible).map((entry) => (
					<div key={entry.id} className="mt-2">
						<EducationSectionDisplay entry={entry} />
					</div>
				))}

			{section.sectionType === "skills" &&
				section.entries.filter((entry) => entry.isVisible).map((entry) => (
					<div key={entry.id} className="mt-2">
						<SkillsSectionDisplay entry={entry} />
					</div>
				))}
		</div>
	);
}