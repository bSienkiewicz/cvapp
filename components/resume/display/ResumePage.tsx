import { config } from '@/lib/constants';
import ResumeSection from './ResumeSection';
import PersonalDetailsBlock from './PersonalDetailsBlock';
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

      <PersonalDetailsBlock resumeData={resumeData} />

      <main className="flex-1 my-8 space-y-4 text-lg leading-relaxed">
        {resumeData.sections.map((section) => (
          <ResumeSection key={section.id} section={section} />
        ))}
      </main>

      <footer className="border-t border-gray-200 pt-4 text-base text-gray-400 text-center">
        Page {page} of {pages.length}
      </footer>
    </div>
  )
}

export default ResumePage