import { removeHtmlTags } from '@/lib/utils';
import type { ExperienceSection } from '@/types/resume';
import { useResume } from '../ResumeContext';
import { Button } from '@/components/ui/button';
import { LucideTrash2 } from 'lucide-react';

type Props = {
  section: ExperienceSection;
};

const inputClassName = 'mt-1 w-full rounded-md border px-3 py-2 text-sm';

export default function ExperienceSectionEditor({ section }: Props) {
  const { updateExperienceEntry } = useResume();

  return (
    <div className="space-y-4">
      {section.entries.map((entry, index) => (
        <></>
      ))}
    </div>
  );
}