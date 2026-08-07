import {EpiTypes} from './component.model';

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
  age: number | string;
  first_appearance: {
    anime: string;
  };
  aliases: string;

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
  age: number | string;
  first_appearance: {
    anime: string;
  };
  aliases: string;
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
  name: string;
  key: number;
};

export type MovieState = {
  movieList: MovieType[];
  loading: boolean;
  error: string | null;
  filtermovieList: MovieType[];
  searchMovie: string;
  select: MovieType[] | ApiType[] | null;
};

export interface MovieResult {
  results: MovieState[];
}

// 모달은 에피소드(SeriesType[])와 캐릭터(kidcases/kidmovies/cases/movies 객체)
// 두 가지 서로 다른 데이터 모양을 함께 담기 때문에 unknown으로 두고,
// 각 소비처에서 실제 모양에 맞게 좁혀서 사용한다.
export type ModalState = {
  isOpen: boolean;
  selectedSeries: unknown;
};
