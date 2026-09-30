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
import type { ExperienceEntry, ResumeData, SummaryEntry } from "@/types/resume";

type ResumeContextValue = {
  resumeData: ResumeData;
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
  updateExperienceEntry: (sectionId: string, entryId: string, updates: Partial<ExperienceEntry>) => void;
  updateSummaryEntry: (sectionId: string, entryId: string, updates: Partial<SummaryEntry>) => void;
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
  const updateSummaryEntry: ResumeContextValue["updateSummaryEntry"] = (sectionId, entryId, updates) => {
    setResumeData((current) => ({
      ...current,
      sections: current.sections.map((section) => {
        if (section.sectionType !== "summary" || section.id !== sectionId) {
          return section;
        }

        const targetIndex = section.entries.findIndex((entry) => entry.id === entryId);
        const isActivatingEntry = updates.isVisible === true;
        const updatedAt = new Date().toISOString();

        return {
          ...section,
          entries: section.entries.map((entry, index) => {
            const isTarget = index === targetIndex;
            const nextIsVisible = isActivatingEntry
              ? isTarget
              : isTarget && updates.isVisible === false
                ? false
                : entry.isVisible;

            if (!isTarget && entry.isVisible === nextIsVisible) {
              return entry;
            }

            return {
              ...entry,
              ...(isTarget ? updates : {}),
              isVisible: nextIsVisible,
              updatedAt,
            };
          }),
        };
      }),
    }));
  };

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, updateExperienceEntry, updateSummaryEntry }}>
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