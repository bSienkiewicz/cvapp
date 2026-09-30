"use client";

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import ResumeJson from "@/data/resume/resumeData.json";
import type { ExperienceEntry, ResumeData } from "@/types/resume";

type ResumeContextValue = {
  resumeData: ResumeData;
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
  updateExperienceEntry: (sectionId: string, entryId: string, updates: Partial<ExperienceEntry>) => void;
};

const ResumeContext = createContext<ResumeContextValue | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(ResumeJson as ResumeData);
  const updateExperienceEntry: ResumeContextValue["updateExperienceEntry"] = (sectionId, entryId, updates) => {
    setResumeData((current) => ({
      ...current,
      sections: current.sections.map((section) => {
        if (section.sectionType !== "experience" || section.id !== sectionId) {
          return section;
        }

        return {
          ...section,
          entries: section.entries.map((entry) =>
            entry.id === entryId
              ? { ...entry, ...updates, updatedAt: new Date().toISOString() }
              : entry
          ),
        };
      }),
    }));
  };

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, updateExperienceEntry }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);

  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }

  return context;
}