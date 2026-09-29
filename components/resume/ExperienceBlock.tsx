import { BaseSection } from '@/types/resume'

export type ExperienceEntry = {
    id: string;
    jobTitle: string | null;
    employer: string | null;
    employerLink: string | null;
    startDate: string | null;
    endDate: string | null;
    description: {
        type: "richText" | "richBulletedList";
        content: string | string[];
    }
    location: string | null;
    isCurrent: boolean;
    isVisible: boolean;
    createdAt: string;
    updatedAt: string;
}

export type ExperienceSection = BaseSection<ExperienceEntry> & {
    sectionType: "experience";
}

const Experience = ({ entry }: { entry: ExperienceEntry }) => {
    return (
        <div>
            <h3 className="text-xl font-semibold">
                {entry.jobTitle}
            </h3>
            <p className="text-gray-500">
                {entry.employer} | {entry.location}
            </p>
            <p className="text-gray-500">
                {entry.startDate} - {entry.endDate || "Present"}
            </p>
            {entry.description.type === "richText" && (
                <p dangerouslySetInnerHTML={{ __html: entry.description.content }} />
            )}
            {entry.description.type === "richBulletedList" && typeof entry.description.content === "object" && (
                <ul>
                    {entry.description.content.map((item, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Experience