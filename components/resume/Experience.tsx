import { ExperienceEntry } from '@/types/resume'
import React from 'react'

const Experience = ({ entry }: { entry: ExperienceEntry }) => {
    return (
        <div>
            <h3 className="text-xl font-semibold">
                {entry.jobTitle}
            </h3>
            <p className="text-gray-500">
                {entry.employer} | {entry.location}
            </p>
            <p className="text-gray-500">
                {entry.startDate} - {entry.endDate || "Present"}
            </p>
            <p>{entry.description}</p>
        </div>
    )
}

export default Experience