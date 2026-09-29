"use client";
import { useEffect, useRef, useState } from "react";
import { ResumeData } from "../types/resume";
import ResumeJson from '@/data/resume/resumeData.json';
import ResumeSection from "@/components/resume/ResumeSection";
import { config } from "@/lib/constants";
import ResumePage from "@/components/resume/ResumePage";


const PAGE_GAP = 12;


export default function Home() {
  const [scale, setScale] = useState(1);
  const [resumeData, setResumeData] = useState<ResumeData>(ResumeJson as ResumeData);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const pages = [1, 2];

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
              padding: `${config.editor.padding}px 0`,
              gap: `${PAGE_GAP * scale}px`,
            }}
          >
            {pages.map((page) => (
              <div
                key={page}
                style={{
                  width: `${config.a4.width * scale}px`,
                  height: `${config.a4.height * scale}px`,
                  flexShrink: 0,
                }}
              >
                {/* ACTUAL A4 PAGE */}
                <ResumePage editorRef={editorRef} resumeData={resumeData} page={page} pages={pages} />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
} 