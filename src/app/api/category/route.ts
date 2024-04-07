import { categoryRepository } from "@/app/_repositories/categoryRepository";
import { ICategoryList } from "@/app/types/Category.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(): Promise<
  NextResponse<ICategoryList[]> | undefined
> {
  try {
    const categories = await categoryRepository.findAllCategories();

    return NextResponse.json(categories);
  } catch (error) {
    console.log(error);
  }
}
