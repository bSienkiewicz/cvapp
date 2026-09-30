import { Accordion } from '@/components/ui/accordion';
import { removeHtmlTags } from '@/lib/utils';
import type { ResumeSection } from '@/types/resume';
import { useResume } from '../ResumeContext';
import ResumeEditorCard from './ResumeEditorCard';
import ExperienceSectionEditor from './ExperienceSectionEditor';

function SectionEditorFields({ section }: { section: ResumeSection }) {
  switch (section.sectionType) {
    case 'experience':
      return <ExperienceSectionEditor section={section} />;
    case 'education':
    case 'skills':
      return (
        <div className="space-y-2">
          {section.entries.map((entry) => (
            <div key={entry.id}>
              {entry.descriptionBlocks?.map((block, index) => (
                <p key={index}>{removeHtmlTags(block.content)}</p>
              ))}
            </div>
          ))}
        </div>
      );
  }
}

const ResumeEditor = () => {
  const { resumeData } = useResume();

  return (
    <Accordion defaultValue={["item-0"]} className="flex flex-col gap-2">
      <ResumeEditorCard idx={0} title="Personal Information">
        siemaneczko
      </ResumeEditorCard>

      {resumeData.sections.map((section, idx) => (
        <ResumeEditorCard
          key={section.id}
          idx={idx + 1}
          title={section.displayName || section.defaultName}
        >
          <SectionEditorFields section={section} />
        </ResumeEditorCard>
      ))}
    </Accordion>
  )
}

export default ResumeEditor