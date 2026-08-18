import {CharacherType, CoupleType} from './api.model';

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

export type CoupleModalType = {
  open: boolean;
  close: () => void;
  couple: CoupleType | null;
};

// 다른 에피소드/작품과의 연계 관계. 키가 "극장판", "TVA", "이전", "다음" 등으로 다양해 map으로 둔다.
export type EpiRelation = Record<string, string>;

export interface EpiSeries {
  order: number;
  title: string;
  TVA: string;
  img?: string;
  namu_url?: string;
  is_key?: boolean;
  characters?: string[];
  연계?: EpiRelation;
  비고?: string;
  복귀_방식?: string;
}
export interface EpiMovies {
  title: string;
  type?: string;
  season: string;
  note?: string;
  img?: string;
  namu_url?: string;
  is_key?: boolean;
  characters?: string[];
  연계?: EpiRelation;
  비고?: string;
  복귀_방식?: string;
}

export interface EpiTypes {
  quarter: string;
  img: string;
  title1: string;
  title2: string;
  kidcases?: EpiSeries[];
  kidmovies?: EpiMovies[];
  cases?: EpiSeries[];
  movies?: EpiMovies[];
}

// 에피소드 모달(Ep_characher)에 전달되는 캐릭터 에피소드 데이터 모양
export type EpiCharacterModalPayload = Pick<
  EpiTypes,
  'kidcases' | 'kidmovies' | 'cases' | 'movies'
>;
