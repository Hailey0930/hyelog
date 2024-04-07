import prisma from "../../_lib/prisma";
import { IBlog, IBlogWithCategory } from "../types/Blog.types";
import { UploadApiResponse } from "cloudinary";

const findAllBlogs = async (): Promise<IBlogWithCategory[]> => {
  return prisma.blog.findMany({
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

const findOneBlog = async (
  blogId: string
): Promise<IBlogWithCategory | null> => {
  return prisma.blog.findUnique({
    where: { id: blogId },
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

const createBlog = async (
  title: string,
  contents: string,
  categoryId: string,
  thumbnailUrl: UploadApiResponse | null
): Promise<IBlog> => {
  return prisma.blog.create({
    data: {
      title,
      contents,
      categoryId,
      thumbnailUrl: thumbnailUrl?.secure_url,
      thumbnailId: thumbnailUrl?.public_id,
    },
  });
};

const deleteBlog = async (blogId: string): Promise<IBlog> => {
  return prisma.blog.delete({
    where: { id: blogId },
  });
};

const updateBlog = async (
  blogId: string,
  title: string,
  contents: string,
  categoryId: string,
  thumbnailUrl: UploadApiResponse | null
): Promise<IBlog> => {
  return prisma.blog.update({
    where: { id: blogId },
    data: {
      title,
      contents,
      categoryId,
      thumbnailUrl: thumbnailUrl?.secure_url,
      thumbnailId: thumbnailUrl?.public_id,
    },
  });
};

const countBlogsByCategory = async (categoryId: string): Promise<number> => {
  return prisma.blog.count({
    where: { categoryId },
  });
};

export const blogRepository = {
  findAllBlogs,
  findOneBlog,
  createBlog,
  deleteBlog,
  updateBlog,
  countBlogsByCategory,
};
