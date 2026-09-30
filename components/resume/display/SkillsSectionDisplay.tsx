import type { SkillEntry } from '@/types/resume';

const SkillsSectionDisplay = ({ entry }: { entry: SkillEntry }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold">
        {entry.skillName}
      </h3>
      {entry.descriptionBlocks?.filter((block) => block.isVisible).map((block, i) =>
        block.type === 'bullet' ? (
          <ul key={i} className="text-gray-500"><li dangerouslySetInnerHTML={{ __html: block.content }} /></ul>
        ) : (
          <p key={i} className="text-gray-500" dangerouslySetInnerHTML={{ __html: block.content }} />
        ),
      )}
      {entry.proficiencyLevel !== null && (
        <div className="bg-red-200 h-1 relative rounded-full overflow-hidden">
          <div className="bg-red-500 h-1" style={{ width: `${entry.proficiencyLevel / 5 * 100}%` }}></div>
        </div>
      )}
    </div>
  )
}

export default SkillsSectionDisplay