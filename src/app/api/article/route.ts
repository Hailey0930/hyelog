import { NextRequest, NextResponse } from "next/server";
import { fileUpload } from "@/app/_utils/fileUpload";
import { articleRepository } from "@/app/_repositories/articleRepository";
import { categoryRepository } from "@/app/_repositories/categoryRepository";
import { getNewCategoryId } from "@/app/_utils/getNewCategoryId";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const title = formData.get("title")?.toString() || "";
  const contents = formData.get("contents")?.toString() || "";
  const categoryId = formData.get("categoryId")?.toString() || "";
  const newCategory = formData.get("newCategory")?.toString() || "";

  const finalCategoryId = await getNewCategoryId(categoryId, newCategory);

  const thumbnail =
    formData.get("thumbnail") instanceof File
      ? (formData.get("thumbnail") as File)
      : null;

  const thumbnailUrl = await fileUpload(thumbnail);

  const result = await articleRepository.createArticle(
    title,
    contents,
    finalCategoryId,
    thumbnailUrl
  );

  return NextResponse.json({
    message: "작성 성공",
    articleId: result.id,
    status: 200,
  });
}
