import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../_lib/prisma";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import mime from "mime";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const title = formData.get("title") as string;
  const contents = formData.get("contents") as string;
  const categoryId = formData.get("categoryId") as string;
  const thumbnail = formData.get("thumbnail") as File;

  const buffer = Buffer.from(await thumbnail.arrayBuffer());
  const relativeUploadDir = `/images/thumbnail`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  // NOTE 해당 directory 유무 판별
  try {
    // 업로드 할 directory가 존재하는지 확인
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      // directory가 없으면 uploadDir 경로로 생성
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e
      );

      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  }

  // NOTE 고유한 파일명 생성 후 buffer로 파일 작성, 해당 파일 url api에 추가
  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${thumbnail.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${mime.getExtension(thumbnail.type)}`;

    await writeFile(`${uploadDir}/${filename}`, buffer);

    const fileUrl = `${relativeUploadDir}/${filename}`;

    // Save to database
    const result = await prisma.blog.create({
      data: {
        title,
        contents,
        categoryId,
        thumbnail: fileUrl,
      },
    });

    return NextResponse.json({
      message: "작성 성공",
      blogId: result.id,
      status: 200,
    });
  } catch (e) {
    console.log(e);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
