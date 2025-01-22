export const epicodefetch = async () => {
  const res = await fetch('/conanwiki/episodes.json');

  const data = await res.json();
  return data;
};
