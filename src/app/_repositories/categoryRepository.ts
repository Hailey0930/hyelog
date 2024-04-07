import prisma from "../../_lib/prisma";
import { ICategoryList } from "../types/Category.types";

const findAllCategories = async (): Promise<ICategoryList[]> => {
  return await prisma.category.findMany({
    include: {
      blogs: true,
    },
  });
};

const createCategory = async (
  newCategory: string
): Promise<{
  id: string;
  name: string;
}> => {
  return await prisma.category.create({
    data: { name: newCategory },
  });
};

const deleteCategory = async (
  categoryId: string
): Promise<{
  id: string;
  name: string;
}> => {
  return await prisma.category.delete({
    where: { id: categoryId },
  });
};

export const categoryRepository = {
  findAllCategories,
  createCategory,
  deleteCategory,
};
