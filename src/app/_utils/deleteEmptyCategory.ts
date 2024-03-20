import prisma from "../../_lib/prisma";

export const deleteEmptyCategory = async (categoryId: string) => {
  const count = await prisma.blog.count({
    where: {
      categoryId,
    },
  });

  if (count === 0) {
    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
  }
};
