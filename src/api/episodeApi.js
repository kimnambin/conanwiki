export const epicodefetch = async () => {
  const res = await fetch('/conanwiki/episodes.json');

  const data = await res.json();
  // console.log('잘 가져오니??', data);
  return data;
};
