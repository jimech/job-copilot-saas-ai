export type ResumeBasics = {
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary?: string;
};

export type ResumeExperience = {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  bullets: string[];
};

export type ResumeEducation = {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  startDate?: string;
  endDate?: string;
};

export type ResumeProject = {
  id: string;
  name: string;
  description?: string;
  bullets: string[];
  technologies?: string[];
  url?: string;
};

export type ResumeCertification = {
  id: string;
  name: string;
  issuer?: string;
  date?: string;
};

export type ResumeLanguage = {
  id: string;
  language: string;
  proficiency: string;
};

export type ResumeContent = {
  basics: ResumeBasics;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: string[];
  projects: ResumeProject[];
  certifications: ResumeCertification[];
  languages: ResumeLanguage[];
};
