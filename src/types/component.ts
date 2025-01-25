import {CharacherType, EpisodeTypes, ApiType} from './api';

export type ReadmeType = {
  openReadme: boolean;
  openRead: () => void;
  closeRead: () => void;
};

export type ModalType = {
  open: boolean;
  close: () => void;
  character: CharacherType | null;
};

export type ScrollType = {
  scrollTop: () => void;
  scrollBottom: () => void;
};

export type Conan = {
  id: string;
};

export interface EpiType {
  isOpen: boolean;
  selectedSeries: string | null;
  episodeList: EpisodeTypes[];
  intro: string | null;
  quarter: string | null;
  click: boolean | null;
  title1: string | null;
  title2: string | null;
  isModal: boolean | null;
}

export interface EpiSeries {
  order: number;
  title: string;
  TVA: string;
}
export interface EpiMovies {
  title: string;
  type: string;
  season: string;
}

export interface EpiTypes {
  quarter: string;
  img: string;
  title1: string;
  title2: string;
  kidcases: EpiSeries[];
  kidmovies: EpiMovies[];
  cases: EpiSeries[];
  movies: EpiMovies[];
}
