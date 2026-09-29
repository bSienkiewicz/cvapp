import { removeHtmlTags } from '@/lib/utils';
import type { ResumeSection, SectionType } from '@/types/resume';

type ResumeEditorCardProps = {
  title: string | null;
  type: SectionType;
  icon: string | null;
  displayIcon: boolean;
  entries: ResumeSection['entries'];
}

const ResumeEditorCard = ({ title, type, icon, displayIcon, entries }: ResumeEditorCardProps) => {
  return (
    <div className="bg-white p-4 border rounded-lg">
      <h1>{title}</h1>
      <p>Type: {type}</p>
      {entries && entries.map((entry, i) => (
        <div key={i}>
          {entry.descriptionBlocks?.map((block, j) => (
            <div className="" key={j}>
              {removeHtmlTags(block.content)}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default ResumeEditorCard