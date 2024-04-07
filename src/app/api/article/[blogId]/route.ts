import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../_lib/prisma";
import { IBlog, IBlogParams } from "@/app/types/Blog.types";
import { deleteEmptyCategory } from "@/app/_utils/deleteEmptyCategory";
import { deleteFile } from "@/app/_utils/fileDelete";
import { fileUpload } from "@/app/_utils/fileUpload";

export async function GET(
  request: NextRequest,
  { params }: IBlogParams
): Promise<NextResponse<IBlog | null> | undefined> {
  try {
    const blogId = params.blogId || "";

    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(request: NextRequest, { params }: IBlogParams) {
  try {
    const blogId = params.blogId || "";

    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    const categoryId = blog?.categoryId;
    const thumbnailPublicId = blog?.thumbnailId;

    await prisma.blog.delete({
      where: { id: blogId },
    });

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

export async function PUT(request: NextRequest, { params }: IBlogParams) {
  try {
    const blogId = params.blogId || "";

    const formData = await request.formData();

    const title = formData.get("title")?.toString() || "";
    const contents = formData.get("contents")?.toString() || "";
    const categoryId = formData.get("categoryId")?.toString() || "";
    const thumbnail = formData.get("thumbnail") as File;

    const currentBlog = await prisma.blog.findUnique({
      where: { id: blogId },
    });
    const oldCategoryId = currentBlog?.categoryId;

    const thumbnailUrl = await fileUpload(thumbnail);

    const result = await prisma.blog.update({
      where: { id: blogId },
      data: {
        title,
        contents,
        categoryId,
        thumbnailUrl: thumbnailUrl?.secure_url,
        thumbnailId: thumbnailUrl?.public_id,
      },
    });

    // 카테고리 수정 후 이전 카테고리에 속한 블로그 글이 없는 경우 카테고리 삭제
    if (oldCategoryId && categoryId !== oldCategoryId) {
      await deleteEmptyCategory(oldCategoryId);
    }

    return NextResponse.json({
      message: "수정 성공",
      blogId: result.id,
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "수정 실패" });
  }
}
