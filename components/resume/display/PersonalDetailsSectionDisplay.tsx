import type { ResumeData } from '@/types/resume';

const PersonalDetailsSectionDisplay = ({ resumeData }: { resumeData: ResumeData }) => {
  const { personalDetails } = resumeData;
  const visibleDetails = personalDetails.detailsOrder
    .filter((detail) => personalDetails.fieldVisibility?.[detail] !== false)
    .map((detail) => personalDetails[detail])
    .filter((value): value is string => Boolean(value));

  return (
    <header className="border-b-2 border-gray-200 pb-6">
      {personalDetails.fieldVisibility?.fullName !== false && personalDetails.fullName && (
        <h1 className="text-4xl font-bold tracking-tight">{personalDetails.fullName}</h1>
      )}
      {personalDetails.fieldVisibility?.jobTitle !== false && personalDetails.jobTitle && (
        <p className="text-xl text-gray-500 mt-2">{personalDetails.jobTitle}</p>
      )}
      {visibleDetails.length > 0 && (
        <p className="text-md text-gray-500 mt-2">
          {visibleDetails.map((value, index) => (
            <span key={`${index}-${value}`}>
              {index > 0 && <span className="mx-2">•</span>}
              {value}
            </span>
          ))}
        </p>
      )}
    </header>
  )
}

export default PersonalDetailsSectionDisplay