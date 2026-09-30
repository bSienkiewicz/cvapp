import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { ReactNode } from 'react';

type ResumeEditorCardProps = {
  title: string | null;
  idx: number;
  children: ReactNode;
}

const ResumeEditorCard = ({ title, idx, children }: ResumeEditorCardProps) => {
  return (
    <div className="bg-white px-2 py-1 border rounded-lg">
      <AccordionItem value={`item-${idx}`}>
        <AccordionTrigger className="text-md">{title}</AccordionTrigger>
        <AccordionContent>
          {children}
        </AccordionContent>
      </AccordionItem>
    </div >
  )
}

export default ResumeEditorCard