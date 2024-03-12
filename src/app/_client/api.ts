import { IBlog } from "../types/Blog.types";
import { ICategoryList } from "../types/Category.types";

export const blogListAPI = async (): Promise<IBlog[]> => {
  const response = await fetch("/api/blogList");
  return response.json();
};

export const categoryListAPI = async (): Promise<ICategoryList[]> => {
  const response = await fetch("/api/category");
  return response.json();
};

export const categoryWriteAPI = async (name: string) => {
  return fetch("/api/category", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
};

export const blogDetailAPI = async (id: string) => {
  const response = await fetch(`/api/blog/${id}`);
  return response.json();
};

export const blogWriteAPI = (formData: FormData) => {
  return fetch("/api/write", {
    method: "POST",
    body: formData,
  });
};

export const blogEditAPI = (
  id: string,
  title: string,
  contents: string,
  thumbnail: string
) => {
  return fetch(`/api/blog/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      contents,
      thumbnail,
    }),
  });
};

export const blogDeleteAPI = (id: string) => {
  return fetch(`/api/blog/${id}`, {
    method: "DELETE",
  });
};
