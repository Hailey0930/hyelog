import { ICategoryList } from "@/app/types/Category.types";
import prisma from "../../../_lib/prisma";
import { NextResponse } from "next/server";

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
