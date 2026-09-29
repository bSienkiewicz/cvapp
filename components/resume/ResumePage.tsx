import { config } from '@/lib/constants';
import React, { useEffect } from 'react'
import ResumeSection from './ResumeSection';
import { ResumeData } from '@/types/resume';

type Props = {
    editorRef: React.RefObject<HTMLDivElement | null>;
    resumeData: ResumeData;
    page: number;
    pages: number[];
};

const ResumePage = ({editorRef, resumeData, page, pages} : Props) => {
    const [scale, setScale] = React.useState<number>(1);

    const detailsSeparators = ["|", "•"]

    useEffect(() => {
        if (!editorRef.current) return;
        const updateScale = () => {
            const container = editorRef.current;
            if (!container) return;
            const { width } = container.getBoundingClientRect();
            const availableWidth = width - config.editor.padding * 2;
            const scaleX = availableWidth / config.a4.width;
            // Never scale above 100% Width.
            const newScale = Math.min(scaleX, 1);

            setScale(newScale);
        };
        updateScale();
        const observer = new ResizeObserver(updateScale);
        observer.observe(editorRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            className="bg-white text-black shadow-2xl p-12 flex flex-col justify-between"
            style={{
                width: `${config.a4.width}px`,
                height: `${config.a4.height}px`,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
            }}
        >
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