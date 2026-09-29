import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { removeHtmlTags } from '@/lib/utils';
import type { ResumeSection, SectionType } from '@/types/resume';

type ResumeEditorCardProps = {
  title: string | null;
  idx: number;
  type: SectionType;
  icon?: string | null;
  displayIcon?: boolean;
  entries: ResumeSection['entries'];
}

const ResumeEditorCard = ({ title, idx, type, icon, displayIcon, entries }: ResumeEditorCardProps) => {
  return (
    <div className="bg-white px-2 py-1 border rounded-lg">
      <AccordionItem value={`item-${idx}`}>
        <AccordionTrigger className="text-md">{title}</AccordionTrigger>
        <AccordionContent>
          {entries && entries.map((entry, i) => (
            <div key={i}>
              {entry.descriptionBlocks?.map((block, j) => (
                <div className="" key={j}>
                  {removeHtmlTags(block.content)}
                </div>
              ))}
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </div >
  )
}

export default ResumeEditorCard