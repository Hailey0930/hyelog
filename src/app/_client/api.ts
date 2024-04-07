import { IBlog } from "../types/Blog.types";
import { ICategoryList } from "../types/Category.types";

const getArticleList = async (): Promise<IBlog[]> => {
  const response = await fetch("/api/articleList");
  return response.json();
};

const getArticle = async (...args: (string | FormData)[]) => {
  const id = args[0];
  const response = await fetch(`/api/article/${id}`);
  return response.json();
};

const writeArticle = async (
  ...args: (string | FormData)[]
): Promise<Response> => {
  const data = args[0];
  return fetch("/api/article", {
    method: "POST",
    body: data,
  });
};

const editArticle = (id: string, data: FormData) => {
  return fetch(`/api/article/${id}`, {
    method: "PUT",
    body: data,
  });
};

const deleteArticle = (id: string) => {
  return fetch(`/api/article/${id}`, {
    method: "DELETE",
  });
};

const getCategoryList = async (): Promise<ICategoryList[]> => {
  const response = await fetch("/api/category");
  return response.json();
};

const uploadFile = async (data: FormData) => {
  const fileUpload = await fetch("/api/fileUpload", {
    method: "POST",
    body: data,
  });

  return fileUpload.json();
};

export const api = {
  getArticleList,
  getArticle,
  writeArticle,
  editArticle,
  deleteArticle,
  getCategoryList,
  uploadFile,
};
