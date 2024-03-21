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

export const categoryWriteAPI = async (...args: (string | FormData)[]) => {
  const name = args[0];
  return fetch("/api/category", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
};

export const blogDetailAPI = async (...args: (string | FormData)[]) => {
  const id = args[0];
  const response = await fetch(`/api/blog/${id}`);
  return response.json();
};

export const blogWriteAPI = async (
  ...args: (string | FormData)[]
): Promise<Response> => {
  const data = args[0];
  return fetch("/api/write", {
    method: "POST",
    body: data,
  });
};

export const blogEditAPI = (id: string, data: FormData) => {
  return fetch(`/api/blog/${id}`, {
    method: "PUT",
    body: data,
  });
};

export const blogDeleteAPI = (id: string) => {
  return fetch(`/api/blog/${id}`, {
    method: "DELETE",
  });
};
