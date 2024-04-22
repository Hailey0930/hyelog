import { NextRequest, NextResponse } from "next/server";
import { IArticle, IArticleParams } from "@/app/types/Article.types";
import { deleteEmptyCategory } from "@/app/_utils/deleteEmptyCategory";
import { deleteFile } from "@/app/_utils/fileDelete";
import { fileUpload } from "@/app/_utils/fileUpload";
import { articleRepository } from "@/app/_repositories/articleRepository";

export async function GET(
  request: NextRequest,
  { params }: IArticleParams
): Promise<NextResponse<IArticle | null> | undefined> {
  try {
    const articleId = params.articleId || "";

    const article = await articleRepository.findOneArticle(articleId);

    return NextResponse.json(article);
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(request: NextRequest, { params }: IArticleParams) {
  try {
    const articleId = params.articleId || "";

    const article = await articleRepository.findOneArticle(articleId);

    const categoryId = article?.categoryId;
    const thumbnailPublicId = article?.thumbnailId;

    await articleRepository.deleteArticle(articleId);

    // 블로그 삭제 시 해당 썸네일도 삭제
    if (thumbnailPublicId) await deleteFile(thumbnailPublicId);

    // 해당 블로그가 속한 카테고리에 블로그 글이 더이상 없으면 카테고리 같이 삭제
    if (categoryId) await deleteEmptyCategory(categoryId);

    return NextResponse.json({ message: "삭제 성공", status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "삭제 실패" });
  }
}

export async function PUT(request: NextRequest, { params }: IArticleParams) {
  try {
    const articleId = params.articleId || "";

    const formData = await request.formData();

    const title = formData.get("title")?.toString() || "";
    const contents = formData.get("contents")?.toString() || "";
    const categoryId = formData.get("categoryId")?.toString() || "";
    const thumbnail = formData.get("thumbnail") as File;

    const currentArticle = await articleRepository.findOneArticle(articleId);
    const oldCategoryId = currentArticle?.categoryId;

    const thumbnailUrl = await fileUpload(thumbnail);

    const result = await articleRepository.updateArticle(
      articleId,
      title,
      contents,
      categoryId,
      thumbnailUrl
    );

    // 카테고리 수정 후 이전 카테고리에 속한 블로그 글이 없는 경우 카테고리 삭제
    if (oldCategoryId && categoryId !== oldCategoryId) {
      await deleteEmptyCategory(oldCategoryId);
    }

    return NextResponse.json({
      message: "수정 성공",
      articleId: result.id,
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "수정 실패" });
  }
}
