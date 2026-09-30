import { removeHtmlTags } from '@/lib/utils';
import type { SummarySection } from '@/types/resume';
import { useResume } from '../../ResumeContext';
import VisibilityRow from './VisibilityRow';

type Props = {
  section: SummarySection;
};

export default function ProfessionalSummarySectionEditor({ section }: Props) {
  const { updateSummaryEntry } = useResume();

  return (
    <div className="space-y-4">
      {section.entries.map((entry) => (
        <VisibilityRow
          key={entry.id}
          label="summary"
          visible={entry.isVisible}
          onToggle={() => updateSummaryEntry(section.id, entry.id, { isVisible: !entry.isVisible })}
        >
          <p className="">{removeHtmlTags(entry.summary)}</p>
        </VisibilityRow>
      ))}
    </div>
  );
}
