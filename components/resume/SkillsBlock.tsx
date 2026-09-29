import { BaseSection } from '@/types/resume'

export type SkillEntry = {
    id: string;
    skillName: string;
    skillDescription: string | null;
    isVisible: boolean;
    proficiencyLevel: number | null;
}

export type SkillsSection = BaseSection<SkillEntry> & {
    sectionType: "skills";
};

const Skills = ({ entry }: { entry: SkillEntry }) => {
    return (
        <div>
            <h3 className="text-xl font-semibold">
                {entry.skillName}
            </h3>
            <p className="text-gray-500" dangerouslySetInnerHTML={{ __html: entry.skillDescription || "" }} />
            {entry.proficiencyLevel !== null && (
                <div className="bg-red-200 h-1 relative rounded-full overflow-hidden">
                    <div className="bg-red-500 h-1" style={{ width: `${entry.proficiencyLevel / 5 * 100}%` }}></div>
                </div>
            )}
        </div>
    )
}

export default Skills