import type { EducationEntry } from '@/types/resume';

const EducationSectionDisplay = ({ entry }: { entry: EducationEntry }) => {
  const dateRange = [entry.startDate, entry.isCurrent ? 'Present' : entry.endDate]
    .filter(Boolean)
    .join(' - ');

  return (
    <div>
      {entry.fieldVisibility?.degree !== false && entry.degree && (
        <h3 className="text-xl font-semibold">{entry.degree}</h3>
      )}
      <p className="text-gray-500">
        {entry.school}
        {entry.fieldVisibility?.location !== false && entry.location ? ` | ${entry.location}` : ''}
      </p>
      {entry.fieldVisibility?.dates !== false && dateRange && (
        <p className="text-gray-500">{dateRange}</p>
      )}
      {entry.descriptionBlocks?.filter((block) => block.isVisible).map((block, index) =>
        <ul key={index}><li dangerouslySetInnerHTML={{ __html: block.content }} /></ul>
      )}
    </div>
  )
}

export default EducationSectionDisplay