"use client";
import { useEffect, useRef, useState } from "react";
import { ResumeData } from "../types/resume";
import ResumeJson from '@/data/resume/resumeData.json';
import ResumeSection from "@/components/resume/ResumeSection";

const A4_WIDTH = 800;
const A4_HEIGHT = A4_WIDTH * (297 / 210);

const PAGE_GAP = 12;
const EDITOR_PADDING = 32;


export default function Home() {
  const [scale, setScale] = useState(1);
  const [resumeData, setResumeData] = useState<ResumeData>(ResumeJson as ResumeData);
  const editorRef = useRef<HTMLDivElement>(null);
  const detailsSeparators = ["|", "•"]

  const pages = [1, 2];

  useEffect(() => {
    if (!editorRef.current) return;

    const updateScale = () => {
      const container = editorRef.current;

      if (!container) return;

      const { width } = container.getBoundingClientRect();

      const availableWidth = width - EDITOR_PADDING * 2;

      const scaleX = availableWidth / A4_WIDTH;

      // Width is the only thing that controls scaling.
      // Never scale above 100%.
      const newScale = Math.min(scaleX, 1);

      setScale(newScale);
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(editorRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-700">
      {/* NAVBAR */}
      <nav className="h-16 bg-gray-900 text-white flex items-center px-6">
        Navbar
      </nav>

      {/* APP */}
      <div className="flex h-[calc(100vh-4rem)] min-h-0">

        {/* LEFT CONTROLS */}
        <aside className="shrink-0 bg-gray-800 text-white flex-1">
          <div className="p-4">
            Controls
          </div>
        </aside>

        {/* EDITOR */}
        <main
          ref={editorRef}
          className="flex-1 min-w-0 min-h-0 overflow-y-auto overflow-x-hidden"
        >
          <div
            className="flex flex-col items-center"
            style={{
              padding: `${EDITOR_PADDING}px 0`,
              gap: `${PAGE_GAP * scale}px`,
            }}
          >
            {pages.map((page) => (
              <div
                key={page}
                style={{
                  width: `${A4_WIDTH * scale}px`,
                  height: `${A4_HEIGHT * scale}px`,
                  flexShrink: 0,
                }}
              >
                {/* ACTUAL A4 PAGE */}
                <div
                  className="bg-white text-black shadow-2xl p-12 flex flex-col justify-between"
                  style={{
                    width: `${A4_WIDTH}px`,
                    height: `${A4_HEIGHT}px`,
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
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
} 