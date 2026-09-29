import { ResumeData } from '@/types/resume'

const PersonalDetailsBlock = ({ resumeData }: { resumeData: ResumeData }) => {
  const detailsSeparators = ["|", "•"]
  return (

    <header className="border-b-2 border-gray-200 pb-6">

      <h1 className="text-4xl font-bold tracking-tight">
        {resumeData.personalDetails.fullName}
      </h1>

      <p className="text-xl text-gray-500 mt-2">
        {resumeData.personalDetails.jobTitle}
      </p>

      <p className="text-md text-gray-500 mt-2">
        {resumeData.personalDetails.detailsOrder
          .map((detail) => resumeData.personalDetails[detail])
          .filter(Boolean)
          .map((value, index) => (
            <span key={index}>
              {index > 0 && (
                <span className="mx-2">
                  {detailsSeparators[1]}
                </span>
              )}
              {value}
            </span>
          ))}
      </p>
    </header>
  )
}

export default PersonalDetailsBlock