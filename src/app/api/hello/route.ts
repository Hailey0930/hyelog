import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../_lib/prisma";

export async function GET(request: NextRequest, response: NextResponse) {
  // findMany - all User records
  const user = await prisma.user.findMany();

  return Response.json({ message: "ok", status: 200, data: user });
}
