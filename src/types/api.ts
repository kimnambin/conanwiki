import {EpiTypes} from './component';

export interface ApiType {
  id: number;
  title: string;

  name: {
    korean: {
      name: string;
    };
    english: {
      anime: string;
    };
  };
  img: string;

  occupation: string;
  age: number;
  first_appearance: {
    anime: string;
  };
  aliases: string[];

  characterKey: CharacterState;

  man: string;
  man_url: string;
  women: string;
  women_url: string;

  quarter: string;
  intro: string;
}

export interface CharacherType {
  name: {
    korean: {
      name: string;
    };
    english: {
      anime: string;
    };
  };
  img: string;

  occupation: string;
  age: number;
  first_appearance: {
    anime: string;
  };
  aliases: string[];
}

export interface SeriesType {
  season: string;
  title: string;
}

export interface EpisodeTypes {
  quarter: string;
  intro: string;
  img: string;
  series: SeriesType[];
}

// Slice 관련 타입
export type CharacterState = {
  list: CharacherType[];
  coupleList: ApiType[];
  episodeList: EpiTypes[];
  select: ApiType[] | null;
  loading: boolean;
  error: string | null;
  searchList: CharacherType[];
  searchText: string;
};

export type EpisodeState = {
  list: EpisodeTypes[];
  error: string | null;
  loading: boolean;
};

export type MovieType = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  poster_path: string;
};

export type MovieState = {
  movieList: MovieType[];
  loading: boolean;
  error: string | null;
  filtermovieList: MovieType[];
  searchMovie: string;
  select: MovieType[] | ApiType[] | null;
};

export type ModalState = {
  isOpen: boolean;
  selectedSeries: EpisodeTypes[] | null;
};

// ========================================================

export interface ArrayType {
  movieKey: {
    filtermovieList: MovieType[];
  };
  characterKey: CharacterState;
  episodeKey: EpisodeState;
  modalKey: ModalState;
}
