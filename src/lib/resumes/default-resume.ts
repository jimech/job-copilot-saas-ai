import type { ResumeContent } from "@/types/resume";

export function createDefaultResumeContent(): ResumeContent {
  return {
    basics: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      github: "",
      summary: "",
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
  };
}
