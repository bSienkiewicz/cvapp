import type { ResumeSection } from "@/types/resume";
import Education from "./Education";
import Experience from "./Experience";

type Props = {
	section: ResumeSection;
};

export default function ResumeSection({ section }: Props) {
	return (
		<div className="mt-6">
			<h2 className="text-2xl font-semibold tracking-tight">
				{section.displayName || section.defaultName}
			</h2>

			{section.sectionType === "experience" &&
				section.entries.map((entry) => (
					<div key={entry.id} className="mt-2">
						<Experience entry={entry} />
					</div>
				))}

			{section.sectionType === "education" &&
				section.entries.map((entry) => (
					<div key={entry.id} className="mt-2">
						<Education entry={entry} />
					</div>
				))}
		</div>
	);
}