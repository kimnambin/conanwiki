export const FALLBACK_IMG = '/conanwiki/fallback.webp';

export const fallbackOnError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget;
  if (img.src.endsWith(FALLBACK_IMG)) return;
  img.onerror = null;
  img.srcset = '';
  img.src = FALLBACK_IMG;
};
