export type SpeakerId = 'estudianteA' | 'estudianteB' | 'estudianteC';

export interface SpeakerInfo {
  id: SpeakerId;
  defaultName: string;
  role: string;
  color: string;
  badgeBg: string;
}

export interface DialogueLine {
  speakerId: SpeakerId;
  speakerRole?: string;
  text: string;
}

export interface BibliographicReference {
  id: string;
  authors: string;
  year: string;
  title: string;
  source: string;
  chapterOrContext?: string;
  quoteOrSummary: string;
  keyContributions: string[];
  linkText?: string;
}

export interface SlideData {
  id: number;
  slideNumber: number;
  totalSlides: number;
  category: string;
  title: string;
  subtitle?: string;
  timeRange: string;
  durationMin: string;
  keyPoints?: string[];
  contentDetails: any;
  script: DialogueLine[];
}
