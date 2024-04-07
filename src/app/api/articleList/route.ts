import { blogRepository } from "@/app/_repositories/blogRepository";
import { IBlog } from "@/app/types/Blog.types";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(): Promise<NextResponse<IBlog[]> | undefined> {
  try {
    const blogs = await blogRepository.findAllBlogs();

    return NextResponse.json(blogs);
  } catch (error) {
    console.log(error);
  }
}
