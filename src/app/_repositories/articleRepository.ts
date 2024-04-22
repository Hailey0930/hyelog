import prisma from "../../_lib/prisma";
import { IArticle, IArticleWithCategory } from "../types/Article.types";
import { UploadApiResponse } from "cloudinary";

const findAllArticles = async (): Promise<IArticleWithCategory[]> => {
  return prisma.article.findMany({
    include: {
      Category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

const findOneArticle = async (
  articleId: string
): Promise<IArticleWithCategory | null> => {
  return prisma.article.findUnique({
    where: { id: articleId },
    include: {
      Category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

const createArticle = async (
  title: string,
  contents: string,
  categoryId: string,
  thumbnailUrl: UploadApiResponse | null
): Promise<IArticle> => {
  return prisma.article.create({
    data: {
      title,
      contents,
      categoryId,
      thumbnailUrl: thumbnailUrl?.secure_url,
      thumbnailId: thumbnailUrl?.public_id,
    },
  });
};

const deleteArticle = async (articleId: string): Promise<IArticle> => {
  return prisma.article.delete({
    where: { id: articleId },
  });
};

const updateArticle = async (
  articleId: string,
  title: string,
  contents: string,
  categoryId: string,
  thumbnailUrl: UploadApiResponse | null
): Promise<IArticle> => {
  return prisma.article.update({
    where: { id: articleId },
    data: {
      title,
      contents,
      categoryId,
      thumbnailUrl: thumbnailUrl?.secure_url,
      thumbnailId: thumbnailUrl?.public_id,
    },
  });
};

const countArticlesByCategory = async (categoryId: string): Promise<number> => {
  return prisma.article.count({
    where: { categoryId },
  });
};

export const articleRepository = {
  findAllArticles,
  findOneArticle,
  createArticle,
  deleteArticle,
  updateArticle,
  countArticlesByCategory,
};
