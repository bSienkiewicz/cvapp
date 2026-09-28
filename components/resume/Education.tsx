import { EducationEntry } from '@/types/resume'

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
            <p>{entry.description}</p>
        </div>
    )
}

export default Education