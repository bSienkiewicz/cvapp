import { removeHtmlTags } from '@/lib/utils';
import type { ReactNode } from 'react';
import type { DescriptionBullet, ExperienceEntry, ExperienceSection } from '@/types/resume';
import { useResume } from '../ResumeContext';
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
                label="Hide position from resume"
                visible={entry.fieldVisibility?.jobTitle ?? true}
                onToggle={() => toggleFieldVisibility(entry, 'jobTitle')}
              >
                {entry.jobTitle}
              </VisibilityRow>
            )}
            {entry.location && (
              <VisibilityRow
                label="Hide location from resume"
                visible={entry.fieldVisibility?.location ?? true}
                onToggle={() => toggleFieldVisibility(entry, 'location')}
              >
                {entry.location}
              </VisibilityRow>
            )}
            {(entry.startDate || entry.endDate || entry.isCurrent) && (
              <VisibilityRow
                label="Hide dates from resume"
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
                label="Hide company description from resume"
                visible={entry.fieldVisibility?.jobDescription ?? true}
                onToggle={() => toggleFieldVisibility(entry, 'jobDescription')}
              >
                {removeHtmlTags(entry.jobDescription)}
              </VisibilityRow>
            )}

            {entry.descriptionBullets.length > 0 && (
              <div className="pl-4">
                <div className="space-y-1">
                  {entry.descriptionBullets.map((bullet, bulletIndex) => (
              <DescriptionBulletEditor
                key={`${entry.id}-${bulletIndex}`}
                block={bullet}
                onChange={(updates) => {
                  const descriptionBullets = entry.descriptionBullets.map((currentBullet, currentIndex) =>
                    currentIndex === bulletIndex ? { ...currentBullet, ...updates } : currentBullet,
                  );
                  updateExperienceEntry(section.id, entry.id, { descriptionBullets });
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

function VisibilityRow({
  visible,
  label,
  onToggle,
  children,
}: {
  visible: boolean;
  label: string;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className={`flex items-center gap-1 ${visible ? '' : 'opacity-60'}`}>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label={visible ? label : label.replace('Hide', 'Show')}
        title={visible ? label : label.replace('Hide', 'Show')}
        onClick={onToggle}
      >
        {visible ? <Eye /> : <EyeOff />}
      </Button>
      <span>{children}</span>
    </div>
  );
}

function DescriptionBulletEditor({
  block,
  onChange,
}: {
  block: DescriptionBullet;
  onChange: (updates: Partial<DescriptionBullet>) => void;
}) {
  return (
    <div className={`flex items-start gap-1 ${block.isVisible ? '' : 'opacity-60'}`}>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label={block.isVisible ? 'Hide description from resume' : 'Show description on resume'}
        title={block.isVisible ? 'Hide description from resume' : 'Show description on resume'}
        onClick={() => onChange({ isVisible: !block.isVisible })}
      >
        {block.isVisible ? <Eye /> : <EyeOff />}
      </Button>
      {<span aria-hidden="true">•</span>}
      <p className="min-w-0 flex-1">{removeHtmlTags(block.content)}</p>
    </div>
  );
}