import { removeHtmlTags } from '@/lib/utils';
import type { DescriptionBlock, ExperienceEntry, ExperienceSection } from '@/types/resume';
import { useResume } from '../../ResumeContext';
import VisibilityRow from './VisibilityRow';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

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
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={entry.isVisible ? 'Hide job from resume' : 'Show job on resume'}
              title={entry.isVisible ? 'Hide job from resume' : 'Show job on resume'}
              onClick={() => updateExperienceEntry(section.id, entry.id, { isVisible: !entry.isVisible })}
            >
              {entry.isVisible ? <Eye /> : <EyeOff />}
            </Button>
            <h3 className="text-sm font-semibold">
              {entry.employer || 'Company name'}
            </h3>
          </div>

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

            {entry.descriptionBlocks.length > 0 && (
              <div className="pl-4">
                <div className="space-y-1">
                  {entry.descriptionBlocks.map((block, blockIndex) => (
              <DescriptionBlockEditor
                key={`${entry.id}-${blockIndex}`}
                block={block}
                onChange={(updates) => {
                  const descriptionBlocks = entry.descriptionBlocks.map((currentBlock, currentIndex) =>
                    currentIndex === blockIndex ? { ...currentBlock, ...updates } : currentBlock,
                  );
                  updateExperienceEntry(section.id, entry.id, { descriptionBlocks });
                }}
              />
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

function DescriptionBlockEditor({
  block,
  onChange,
}: {
  block: DescriptionBlock;
  onChange: (updates: Partial<DescriptionBlock>) => void;
}) {
  return (
    <VisibilityRow
      label="description block"
      visible={block.isVisible}
      onToggle={() => onChange({ isVisible: !block.isVisible })}
    >
      <p className="min-w-0 flex-1">{removeHtmlTags(block.content)}</p>
    </VisibilityRow>
  );
}