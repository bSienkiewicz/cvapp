import { config } from '@/lib/constants';
import ResumeSection from './ResumeSection';
import PersonalDetailsSectionDisplay from './PersonalDetailsSectionDisplay';
import { useResume } from '../ResumeContext';

type Props = {
  page: number;
  pages: number[];
  scale: number;
};

const ResumePage = ({ page, pages, scale }: Props) => {
  const { resumeData } = useResume();

  return (
    <div
      className="bg-white text-black shadow-2xl p-12 flex flex-col justify-between rounded-xl"
      style={{
        width: `${config.a4.width}px`,
        height: `${config.a4.height}px`,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
    >

      <PersonalDetailsSectionDisplay resumeData={resumeData} />

      <main className="flex-1 space-y-4 text-lg leading-relaxed flex flex-col gap-4 mt-4">
        {resumeData.sections.map((section) => (
          section.entries.filter((entry) => entry.isVisible).length > 0 && (
            <ResumeSection key={section.id} section={section} />
          )
        ))}
      </main>

      <footer className="border-t border-gray-200 pt-4 text-base text-gray-400 text-center">
        Page {page} of {pages.length}
      </footer>
    </div>
  )
}

export default ResumePage