import { articleRepository } from "../_repositories/articleRepository";
import { categoryRepository } from "../_repositories/categoryRepository";

export const deleteEmptyCategory = async (categoryId: string) => {
  const count = await articleRepository.countArticlesByCategory(categoryId);

  if (count === 0) {
    await categoryRepository.deleteCategory(categoryId);
  }
};
