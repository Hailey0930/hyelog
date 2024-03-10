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
