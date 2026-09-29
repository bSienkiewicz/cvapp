import { BaseSection } from '@/types/resume'

export type SkillEntry = {
  id: string;
  skillName: string;
  descriptionBlocks: { type: string; content: string }[] | null;
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
      {entry.descriptionBlocks?.map((block, i) => (
        <p key={i} className="text-gray-500" dangerouslySetInnerHTML={{ __html: block.content }} />
      ))}
      {entry.proficiencyLevel !== null && (
        <div className="bg-red-200 h-1 relative rounded-full overflow-hidden">
          <div className="bg-red-500 h-1" style={{ width: `${entry.proficiencyLevel / 5 * 100}%` }}></div>
        </div>
      )}
    </div>
  )
}

export default Skills