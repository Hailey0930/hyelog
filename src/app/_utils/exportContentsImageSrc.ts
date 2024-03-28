export const exportContentsImageSources = (editorHtml: string) => {
  const imageTags = editorHtml.match(/<img.*?src="(.*?)"/g) || [];

  const imageSources = imageTags.map((tag) => {
    const match = tag.match(/src="(.*?)"/);

    return match ? match[1] : "";
  });

  return imageSources;
};
