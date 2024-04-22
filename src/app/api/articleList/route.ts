import { articleRepository } from "@/app/_repositories/articleRepository";
import { IArticle } from "@/app/types/Article.types";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(): Promise<NextResponse<IArticle[]> | undefined> {
  try {
    const blogs = await articleRepository.findAllArticles();

    return NextResponse.json(blogs);
  } catch (error) {
    console.log(error);
  }
}
