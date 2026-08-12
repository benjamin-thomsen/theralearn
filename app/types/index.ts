export interface Pensum {
  id: number;
  slug: string;
  titel: string;
  kategori: string;
  beskrivelse: string;
  laesetid: string;
}

export interface QuizQuestion {
  id: number;
  slug: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Resultat {
  id: number;
  titel: string;
  beskrivelse: string;
  farve: string;
}

export interface OmSektion {
  id: number;
  titel: string;
  indhold: string;
}