export type KalimatSearchRequest = {
  query: string;
  exactMatchesOnly?: number;
  numResults?: number;
};

export type KalimatSearchResultFeedbackRequest = {
  query: string;
  result: string;
  feedbackScore: number;
};

export type SearchRequest = {
  query: string;
  filterLanguages?: string;
  filterTranslations?: string;
  size?: number;
  page?: number;
};

export type AdvancedCopyRequest = {
  from: string;
  to: string;
  footnote: boolean;
  translatorName: boolean;
  translations?: string;
  mushaf?: number;
  fields?: string;
  raw: boolean;
};

export type PagesLookUpRequest = {
  chapterNumber?: number;
  juzNumber?: number;
  pageNumber?: number;
  manzilNumber?: number;
  rubElHizbNumber?: number;
  hizbNumber?: number;
  rukuNumber?: number;
  mushaf?: number;
  from?: number | string;
  to?: number | string;
};
