import prisma from "../../../_lib/prisma";
import { IBlog } from "@/app/types/Blog.types";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<IBlog[]> | undefined> {
  try {
    const blogs = await prisma.blog.findMany();

    return NextResponse.json(blogs);
  } catch (error) {
    console.log(error);
  }
}
