export interface ApprenticeProfile {
  name: string;
  documentType: 'CC' | 'TI' | 'CE' | 'PEP';
  documentNumber: string;
  ficha: string;
  programName: string;
  regional: string;
  center: string;
  email: string;
  avatar?: string;
}

export interface RegulationModule {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  normativeRef: string;
  estimatedMinutes: number;
  iconName: string;
  accentColor: string;
  summary: string;
  coreConcepts: {
    title: string;
    description: string;
    examples?: string[];
    articles?: string;
  }[];
  quickCheck: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface CaseDilemma {
  id: string;
  category: 'derechos' | 'deberes' | 'prohibiciones' | 'sanciones' | 'etapa_practica';
  categoryLabel: string;
  title: string;
  contextLocation: string;
  scenario: string;
  character: string;
  options: {
    text: string;
    isOptimal: boolean;
    xp: number;
    feedback: string;
    legalArticle: string;
  }[];
}

export interface QuizQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  legalBasis: string;
  explanation: string;
  points: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt?: string;
  unlocked: boolean;
}

export interface InductionProgress {
  profile: ApprenticeProfile;
  completedModuleIds: string[];
  completedCaseIds: string[];
  quizSubmitted: boolean;
  quizScore: number;
  quizTotal: number;
  xp: number;
  badges: Badge[];
  certificateId: string | null;
  certificateDate: string | null;
}
