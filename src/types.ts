export type TabKey = 
  | 'overview' 
  | 'stages' 
  | 'germ-layers' 
  | 'molecular' 
  | 'fate-simulator' 
  | 'clinical' 
  | 'quiz' 
  | 'chat';

export interface StageInfo {
  id: string;
  nameTh: string;
  nameEn: string;
  timeframe: string;
  cellCount: string;
  summary: string;
  description: string;
  keyEvents: string[];
  molecularDrivers: string[];
  diagramType: 'zygote' | 'cleavage' | 'morula' | 'blastocyst' | 'gastrula' | 'neurula' | 'organogenesis';
  color: string;
}

export interface GermLayer {
  id: 'ectoderm' | 'mesoderm' | 'endoderm';
  nameTh: string;
  nameEn: string;
  color: string;
  borderColor: string;
  bgLight: string;
  description: string;
  signalingMolecules: string[];
  organs: Array<{
    nameTh: string;
    nameEn: string;
    description: string;
    icon: string;
  }>;
}

export interface SignalingPathway {
  id: string;
  name: string;
  fullName: string;
  roleInDevelopment: string;
  keyMolecules: string[];
  targetGenes: string[];
  clinicalRelevance: string;
}

export interface CaseStudy {
  id: string;
  conditionNameTh: string;
  conditionNameEn: string;
  defectStage: string;
  molecularCause: string;
  symptoms: string[];
  preventativeOrTherapy: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  correctAnswerIndex?: number;
  explanation: string;
}

export type ChatMode = 'fast' | 'thinking' | 'search';

export type GlossaryCategory = 
  | 'stage' 
  | 'cellular_process' 
  | 'signaling' 
  | 'germ_layer' 
  | 'genetic' 
  | 'clinical';

export interface GlossaryItem {
  id: string;
  term: string;
  aliases?: string[];
  termTh: string;
  category: GlossaryCategory;
  categoryLabel: string;
  shortDefinition: string;
  detailedDefinition: string;
  keyMechanisms?: string[];
  keyMolecules?: string[];
  clinicalRelevance?: string;
  relatedTerms?: string[];
  suggestedSearchQuery?: string;
}

export interface GlossaryGroundedData {
  text: string;
  groundingSources?: Array<{ title?: string; uri?: string }>;
  searchQueries?: string[];
  modelUsed?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'model';
  text?: string;
  content?: string;
  timestamp: Date | string;
  mode?: ChatMode;
  modeUsed?: ChatMode;
  modelUsed?: string;
  groundingSources?: Array<{ title?: string; uri?: string }>;
  groundingChunks?: Array<{ web?: { uri?: string; title?: string } }>;
}
