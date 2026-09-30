import type { EducationEntry, EducationSection } from '@/types/resume';
import { useResume } from '../../ResumeContext';
import VisibilityRow from './VisibilityRow';
import DescriptionBlocksEditor from './DescriptionBlocksEditor';
import EntryVisibilityHeader from './EntryVisibilityHeader';

type Props = {
  section: EducationSection;
};

export default function EducationSectionEditor({ section }: Props) {
  const { updateEducationEntry } = useResume();
  const toggleFieldVisibility = (
    entry: EducationEntry,
    field: 'degree' | 'location' | 'dates',
  ) => {
    const fieldVisibility = entry.fieldVisibility ?? {};
    updateEducationEntry(section.id, entry.id, {
      fieldVisibility: { ...fieldVisibility, [field]: !(fieldVisibility[field] ?? true) },
    });
  };

  return (
    <div className="space-y-4">
      {section.entries.map((entry) => (
        <article key={entry.id} className={entry.isVisible ? '' : 'opacity-60'}>
          <EntryVisibilityHeader
            label="education entry"
            title={entry.school || 'School name'}
            visible={entry.isVisible}
            onToggle={() => updateEducationEntry(section.id, entry.id, { isVisible: !entry.isVisible })}
          />

          <div className="ml-4 space-y-1 text-sm">
            {entry.degree && (
              <VisibilityRow
                label="degree"
                visible={entry.fieldVisibility?.degree ?? true}
                onToggle={() => toggleFieldVisibility(entry, 'degree')}
              >
                {entry.degree}
              </VisibilityRow>
            )}
            {entry.location && (
              <VisibilityRow
                label="location"
                visible={entry.fieldVisibility?.location ?? true}
                onToggle={() => toggleFieldVisibility(entry, 'location')}
              >
                {entry.location}
              </VisibilityRow>
            )}
            {(entry.startDate || entry.endDate || entry.isCurrent) && (
              <VisibilityRow
                label="dates"
                visible={entry.fieldVisibility?.dates ?? true}
                onToggle={() => toggleFieldVisibility(entry, 'dates')}
              >
                {entry.startDate || ''}
                {entry.startDate && ' - '}
                {entry.isCurrent ? 'Present' : entry.endDate || ''}
              </VisibilityRow>
            )}

            <DescriptionBlocksEditor
              blocks={entry.descriptionBlocks}
              onChange={(descriptionBlocks) => updateEducationEntry(section.id, entry.id, { descriptionBlocks })}
            />
          </div>
        </article>
      ))}
    </div>
  );
}