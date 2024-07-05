import { categoryRepository } from "../_repositories/categoryRepository";

export const getNewCategoryId = async (
  categoryId: string,
  newCategory: string
) => {
  let finalCategoryId = categoryId;

  if (newCategory) {
    const category = await categoryRepository.createCategory(newCategory);

    finalCategoryId = category.id;
  }

  return finalCategoryId;
};
