export interface CharacherType {
  name: {
    korean: {
      name: string;
    };
    english: {
      anime: string;
    };
    japanese?: {
      kanji: string;
      romanized: string;
    };
  };
  img: string;

  occupation: string;
  age: number | string;
  first_appearance: {
    anime: string;
  };
  aliases: string;
  gender?: string;
  date_of_birth?: string;
  drama_actor?: string;
  voice?: {
    korean: string;
    japanese: string;
  }[];
  namuwikiUrl?: string;
  affiliation?: string[];
  status?: string;
}

export interface CoupleEpisode {
  title: string;
  source: string;
  description: string;
}

export interface CoupleMovie {
  number: string;
  title: string;
  note: string;
}

export interface CoupleType {
  man: string;
  man_url: string;
  man_job?: string;
  women: string;
  women_url: string;
  women_job?: string;
  couple_nickname?: string;
  status?: string;
  relationship_type?: string;
  description?: string;
  episodes?: CoupleEpisode[];
  movies?: CoupleMovie[];
}

export interface SeriesType {
  season: string;
  title: string;
  namu_url?: string;
  비고?: string;
}

export interface EpisodeTypes {
  quarter: string;
  intro: string;
  img: string;
  series: SeriesType[];
}

export type MovieType = {
  id: number;
  title: string;
  original_title?: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count?: number;
  popularity: number;
  poster_path: string;
  backdrop_path?: string | null;
  genre_ids?: number[];
  name: string;
  key: number;
};

export interface MovieCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MovieProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

export interface MovieDetailInfo {
  runtime: number | null;
  tagline: string;
  genres: {id: number; name: string}[];
  director: string | null;
  cast: MovieCastMember[];
  certification: string | null;
  watchProviders: MovieProvider[];
  watchLink: string | null;
  videos: {key: string; name: string}[];
}

