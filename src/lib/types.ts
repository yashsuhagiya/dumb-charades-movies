export type Difficulty = "easy" | "medium" | "hard";

export interface Movie {
  id: string;
  title: string;
  language: string;
  industry: string;
  year: number;
  difficulty: Difficulty;
  genres: string[];
  hint?: string;
}

export interface FilterCriteria {
  /** Selected difficulties — empty array means "all". */
  difficulties: Difficulty[];
  /** Selected genres — empty array means "all". */
  genres: string[];
  /** Selected languages — empty array means "all". */
  languages: string[];
  /** Free-text search against title; case-insensitive substring match. */
  search: string;
}

export const EMPTY_CRITERIA: FilterCriteria = {
  difficulties: [],
  genres: [],
  languages: [],
  search: "",
};
