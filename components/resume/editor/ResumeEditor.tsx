import { useResume } from '../ResumeContext';
import ResumeEditorCard from './ResumeEditorCard';

const ResumeEditor = () => {
  const { resumeData, setResumeData } = useResume();

  return (
    <div className="flex flex-col gap-4">
    {resumeData.sections.map((section) => (
      <ResumeEditorCard
        key={section.id}
        title={section.displayName}
        type={section.sectionType}
        icon={section.iconKey}
        displayIcon={section.displayIcon}
        entries={section.entries}
      />
    ))}
    </div>
  )
}

export default ResumeEditor