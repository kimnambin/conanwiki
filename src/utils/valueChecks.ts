const UNKNOWN_MARKERS = ['??', ''];

export const hasValue = (value: unknown): boolean => {
  if (value === null || value === undefined) return false;
  return !UNKNOWN_MARKERS.includes(String(value));
};
