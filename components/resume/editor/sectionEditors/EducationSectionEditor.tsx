import { removeHtmlTags } from '@/lib/utils';
import type { DescriptionBlock, EducationEntry, EducationSection } from '@/types/resume';
import { useResume } from '../../ResumeContext';
import VisibilityRow from './VisibilityRow';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

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
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={entry.isVisible ? 'Hide education entry from resume' : 'Show education entry on resume'}
              title={entry.isVisible ? 'Hide education entry from resume' : 'Show education entry on resume'}
              onClick={() => updateEducationEntry(section.id, entry.id, { isVisible: !entry.isVisible })}
            >
              {entry.isVisible ? <Eye /> : <EyeOff />}
            </Button>
            <h3 className="text-sm font-semibold">
              {entry.school || 'School name'}
            </h3>
          </div>

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
                  updateEducationEntry(section.id, entry.id, { descriptionBlocks });
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