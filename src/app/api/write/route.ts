import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../_lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, contents, categoryId, thumbnail } = body;

    const blog = await prisma.blog.create({
      data: {
        title,
        contents,
        categoryId,
        thumbnail,
      },
    });

    return NextResponse.json({
      message: "작성 성공",
      blogId: blog.id,
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "작성 실패" });
  }
}
