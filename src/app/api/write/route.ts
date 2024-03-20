import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../_lib/prisma";
import { fileUpload } from "@/app/_utils/fileUpload";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const title = formData.get("title")?.toString() || "";
  const contents = formData.get("contents")?.toString() || "";
  const categoryId = formData.get("categoryId")?.toString() || "";

  const thumbnail = formData.get("thumbnail") as File;

  // formData.get("thumbnail") instanceof File
  //   ? (formData.get("thumbnail") as File)
  //   : null;

  const thumbnailUrl = await fileUpload(thumbnail);

  const result = await prisma.blog.create({
    data: {
      title,
      contents,
      categoryId,
      thumbnail: thumbnailUrl?.secure_url,
    },
  });

  return NextResponse.json({
    message: "작성 성공",
    blogId: result.id,
    status: 200,
  });
}
