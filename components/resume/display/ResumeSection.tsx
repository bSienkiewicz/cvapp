import type { ResumeSection } from "@/types/resume";
import Education from "./EducationBlock";
import Experience from "./ExperienceBlock";
import Skills from "./SkillsBlock";

type Props = {
	section: ResumeSection;
};

export default function ResumeSection({ section }: Props) {
	return (
		<div className="mt-6">
			<h2 className="text-2xl font-semibold tracking-tight text-center underline">
				{section.displayName || section.defaultName}
			</h2>

			{section.sectionType === "experience" &&
				section.entries.filter((entry) => entry.isVisible).map((entry) => (
					<div key={entry.id} className="mt-2">
						<Experience entry={entry} />
					</div>
				))}

			{section.sectionType === "education" &&
				section.entries.filter((entry) => entry.isVisible).map((entry) => (
					<div key={entry.id} className="mt-2">
						<Education entry={entry} />
					</div>
				))}

			{section.sectionType === "skills" &&
				section.entries.filter((entry) => entry.isVisible).map((entry) => (
					<div key={entry.id} className="mt-2">
						<Skills entry={entry} />
					</div>
				))}
		</div>
	);
}