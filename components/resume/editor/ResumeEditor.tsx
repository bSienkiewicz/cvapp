import { Accordion } from '@/components/ui/accordion';
import { useResume } from '../ResumeContext';
import ResumeEditorCard from './ResumeEditorCard';

const ResumeEditor = () => {
  const { resumeData, setResumeData } = useResume();

  return (
      <Accordion defaultValue={["item-0"]} className="flex flex-col gap-2">
        {resumeData.sections.map((section, idx) => (
          <ResumeEditorCard
            key={section.id}
            idx={idx}
            title={section.displayName}
            type={section.sectionType}
            icon={section.iconKey}
            displayIcon={section.displayIcon}
            entries={section.entries}
          />  
        ))}
      </Accordion>
  )
}

export default ResumeEditor