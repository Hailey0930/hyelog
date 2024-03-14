export const exportContentsHeader = (contents?: string) => {
  if (!contents) return [];

  const regex = /<h[1-4].*?>(.*?)<\/h[1-4]>/g;
  const matches = [];
  let match;
  let index = 0;

  // 정규표현식에 해당하는 모든 매치를 찾아 배열에 추가
  while ((match = regex.exec(contents))) {
    const id = match[1] + index;

    matches.push({ id, tag: match[0][2], content: match[1] });
    index++;
  }

  return matches;
};
