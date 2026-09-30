import type { ExperienceEntry, ExperienceSection } from '@/types/resume';
import { useResume } from '../../ResumeContext';
import VisibilityRow from './VisibilityRow';
import DescriptionBlocksEditor from './DescriptionBlocksEditor';
import EntryVisibilityHeader from './EntryVisibilityHeader';
import { removeHtmlTags } from '@/lib/utils';

type Props = {
  section: ExperienceSection;
};

export default function ExperienceSectionEditor({ section }: Props) {
  const { updateExperienceEntry } = useResume();
  const toggleFieldVisibility = (
    entry: ExperienceEntry,
    field: 'jobTitle' | 'jobDescription' | 'location' | 'dates',
  ) => {
    const fieldVisibility = entry.fieldVisibility ?? {};
    updateExperienceEntry(section.id, entry.id, {
      fieldVisibility: { ...fieldVisibility, [field]: !(fieldVisibility[field] ?? true) },
    });
  };

  return (
    <div className="space-y-4">
      {section.entries.map((entry) => (
        <article key={entry.id} className={entry.isVisible ? '' : 'opacity-60'}>
          <EntryVisibilityHeader
            label="job entry"
            title={entry.employer || 'Company name'}
            visible={entry.isVisible}
            onToggle={() => updateExperienceEntry(section.id, entry.id, { isVisible: !entry.isVisible })}
          />

          <div className="ml-4 space-y-1 text-sm">
            {entry.jobTitle && (
              <VisibilityRow
                label="position"
                visible={entry.fieldVisibility?.jobTitle ?? true}
                onToggle={() => toggleFieldVisibility(entry, 'jobTitle')}
              >
                {entry.jobTitle}
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

            {entry.jobDescription && (
              <VisibilityRow
                label="company description"
                visible={entry.fieldVisibility?.jobDescription ?? true}
                onToggle={() => toggleFieldVisibility(entry, 'jobDescription')}
              >
                {removeHtmlTags(entry.jobDescription)}
              </VisibilityRow>
            )}

            <DescriptionBlocksEditor
              blocks={entry.descriptionBlocks}
              onChange={(descriptionBlocks) => updateExperienceEntry(section.id, entry.id, { descriptionBlocks })}
            />
          </div>
        </article>
      ))}
    </div>
  );
}