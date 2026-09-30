import type { EducationEntry, SummaryEntry } from '@/types/resume';

const ProfessionalSummarySectionDisplay = ({ entry }: { entry: SummaryEntry }) => {
  return (
    <div>
      <p dangerouslySetInnerHTML={{ __html: entry.summary }} />
    </div>
  )
}

export default ProfessionalSummarySectionDisplay