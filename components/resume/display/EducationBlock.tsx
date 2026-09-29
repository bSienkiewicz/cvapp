import { BaseSection } from '@/types/resume'

export type EducationEntry = {
  id: string;
  school: string | null;
  degree: string | null;
  field: string | null;
  startDate: string | null;
  endDate: string | null;
  descriptionBlocks: {
    type: "text" | "bullet";
    content: string;
  }[] | null;
  location: string | null;
  createdAt: string;
  updatedAt: string;
  isVisible: boolean;
};

export type EducationSection = BaseSection<EducationEntry> & {
  sectionType: "education";
};

const Education = ({ entry }: { entry: EducationEntry }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold">
        {entry.degree} in {entry.field}
      </h3>
      <p className="text-gray-500">
        {entry.school} | {entry.location}
      </p>
      <p className="text-gray-500">
        {entry.startDate} - {entry.endDate || "Present"}
      </p>  
      {entry.descriptionBlocks?.map((block, index) => {
        if (block.type === "text") {
          return <p key={index} dangerouslySetInnerHTML={{ __html: block.content }} />;
        } else if (block.type === "bullet") {
          return <ul key={index}><li dangerouslySetInnerHTML={{ __html: block.content }} /></ul>;
        }
      })}
    </div>
  )
}

export default Education