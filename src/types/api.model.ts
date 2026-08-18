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
  overview: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  poster_path: string;
  name: string;
  key: number;
};

