import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../_lib/prisma";
import { IBlog } from "@/app/types/Blog.types";

export async function GET(
  request: NextRequest
): Promise<NextResponse<IBlog | null> | undefined> {
  try {
    const blogId = request.nextUrl.searchParams.get("blogId") || "";

    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.log(error);
  }
}
