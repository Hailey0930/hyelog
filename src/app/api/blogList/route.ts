import prisma from "../../../_lib/prisma";
import { IBlog } from "@/app/types/Blog.types";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(): Promise<NextResponse<IBlog[]> | undefined> {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        Category: true,
      },
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.log(error);
  }
}
