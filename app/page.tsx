"use client";
import { useEffect, useRef, useState } from "react";
import { config } from "@/lib/constants";
import { ResumeProvider } from "@/components/resume/ResumeContext";
import ResumePage from "@/components/resume/display/ResumePage";
import ResumeEditor from "@/components/resume/editor/ResumeEditor";

export default function Home() {
  const [scale, setScale] = useState(1);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const pages = [1, 2];

  useEffect(() => {
    const container = editorRef.current;
    if (!container) return;

    const updateScale = () => {
      const availableWidth = container.clientWidth - (config.display.padding.x * 2);
      setScale(Math.max(0, Math.min(availableWidth / config.a4.width, 1)));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden">
      {/* NAVBAR */}
      <nav className="h-16 flex items-center px-6 border-b">
        Navbar
      </nav>

      {/* APP */}
      <ResumeProvider>
        <div className="grid grid-cols-[640px_minmax(0,1fr)] h-[calc(100vh-4rem)] min-h-0">

          {/* LEFT EDITOR */}
          <aside className="shrink-0 flex-1 p-4 border-r  overflow-auto">
            <ResumeEditor />
          </aside>

          {/* DISPLAY */}
          <main
            ref={editorRef}
            className="flex-1 min-w-0 min-h-0 overflow-y-auto overflow-x-hidden bg-amber-50"
          >
            <div
              className="flex flex-col items-center"
              style={{
                padding: `${config.display.padding.y}px`,
                gap: `${config.display.pageGap * scale}px`,
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
                  <ResumePage page={page} pages={pages} scale={scale} />
                </div>
              ))}
            </div>
          </main>
        </div>
      </ResumeProvider>
    </div>
  );
} 