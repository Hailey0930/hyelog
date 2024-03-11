import { ICategoryList } from "@/app/types/Category.types";
import prisma from "../../../_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(): Promise<
  NextResponse<ICategoryList[]> | undefined
> {
  try {
    const categories = await prisma.category.findMany({
      include: {
        blogs: true,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    const category = await prisma.category.create({
      data: { name },
    });

    return NextResponse.json({
      message: "카테고리 생성 성공",
      categoryId: category.id,
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "카테고리 생성 실패" });
  }
}
