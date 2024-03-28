import { fileUpload } from "@/app/_utils/fileUpload";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const image =
    formData.get("image") instanceof File
      ? (formData.get("image") as File)
      : null;

  const imageData = await fileUpload(image);

  return NextResponse.json({
    message: "파일 업로드 성공",
    file: imageData,
    status: 200,
  });
}
