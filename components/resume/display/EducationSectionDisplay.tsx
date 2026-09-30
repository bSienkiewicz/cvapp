import type { EducationEntry } from '@/types/resume';

const EducationSectionDisplay = ({ entry }: { entry: EducationEntry }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold">
        {entry.degree} in {entry.field}
      </h3>
      <p className="text-gray-500">
        {entry.school} | {entry.location}
      </p>
      <p className="text-gray-500">
        {entry.startDate} - {entry.endDate || "Present"}
      </p>
      {entry.descriptionBlocks?.filter((block) => block.isVisible).map((block, index) =>
        block.type === 'bullet' ? (
          <ul key={index}><li dangerouslySetInnerHTML={{ __html: block.content }} /></ul>
        ) : (
          <p key={index} dangerouslySetInnerHTML={{ __html: block.content }} />
        ),
      )}
    </div>
  )
}

export default EducationSectionDisplay