export const blogListAPI = () => {
  return fetch("/api/blogList");
};

export const categoryListAPI = () => {
  return fetch("/api/category");
};

export const blogDetailAPI = (id: string) => {
  return fetch(`/api/blogDetail/${id}`);
};

export const blogWriteAPI = (
  title: string,
  contents: string,
  thumbnail: string
) => {
  return fetch("/api/write", {
    method: "POST",
    body: JSON.stringify({
      title,
      contents,
      thumbnail,
    }),
  });
};

export const blogEditAPI = (
  id: string,
  title: string,
  contents: string,
  thumbnail: string
) => {
  return fetch(`/api/write/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      contents,
      thumbnail,
    }),
  });
};

export const blogDeleteAPI = (id: string) => {
  return fetch(`/api/delete/${id}`, {
    method: "DELETE",
  });
};
