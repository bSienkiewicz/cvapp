import type { ExperienceEntry } from '@/types/resume';

const ExperienceSectionDisplay = ({ entry }: { entry: ExperienceEntry }) => {
  const dateRange = [entry.startDate, entry.isCurrent ? 'Present' : entry.endDate]
    .filter(Boolean)
    .join(' - ');

  return (
    <div>
      {entry.fieldVisibility?.jobTitle !== false && (
        <h3 className="text-xl font-semibold">{entry.jobTitle}</h3>
      )}
      <p className="text-gray-500">
        {entry.employer}
        {entry.fieldVisibility?.location !== false && entry.location ? ` | ${entry.location}` : ''}
      </p>
      {entry.fieldVisibility?.dates !== false && dateRange && (
        <p className="text-gray-500">{dateRange}</p>
      )}
      {entry.jobDescription && entry.fieldVisibility?.jobDescription !== false && (
        <p dangerouslySetInnerHTML={{ __html: entry.jobDescription }} />
      )}
      {entry.descriptionBullets?.filter((bullet) => bullet.isVisible).map((bullet, index) => {
        {
          return <ul key={index}><li dangerouslySetInnerHTML={{ __html: bullet.content }} /></ul>;
        }
      })}
    </div>
  )
}

export default ExperienceSectionDisplay