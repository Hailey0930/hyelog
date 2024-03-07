export const blogListAPI = () => {
  return fetch("/api/blogList");
};

export const categoryListAPI = () => {
  return fetch("/api/category");
};

export const blogDetailAPI = () => {
  return fetch("/api/blogDetail");
};
