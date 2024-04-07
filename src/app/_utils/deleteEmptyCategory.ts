import { blogRepository } from "../_repositories/blogRepository";
import { categoryRepository } from "../_repositories/categoryRepository";

export const deleteEmptyCategory = async (categoryId: string) => {
  const count = await blogRepository.countBlogsByCategory(categoryId);

  if (count === 0) {
    await categoryRepository.deleteCategory(categoryId);
  }
};
