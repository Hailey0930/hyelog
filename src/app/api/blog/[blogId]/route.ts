import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../_lib/prisma";
import { IBlog, IBlogParams } from "@/app/types/Blog.types";

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

    await prisma.blog.delete({
      where: { id: blogId },
    });

    return NextResponse.json({ message: "삭제 성공", status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "삭제 실패" });
  }
}
