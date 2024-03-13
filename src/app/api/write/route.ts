import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../_lib/prisma";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, contents, categoryId, thumbnail } = body;

  let thumbnailUrl = null;

  if (thumbnail) {
    const blob = await put("test", thumbnail, {
      access: "public",
    });
    thumbnailUrl = blob.url;
  }

  const result = await prisma.blog.create({
    data: {
      title,
      contents,
      categoryId,
      thumbnail: thumbnailUrl,
    },
  });

  return NextResponse.json({
    message: "작성 성공",
    blogId: result.id,
    status: 200,
  });
}
