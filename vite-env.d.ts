// api 키 타입 지정
export interface EnvKey {
  VITE_APP_TMDB_API_KEY: string;
}

export interface EnvMeta {
  readonly env: EnvKey;
}
