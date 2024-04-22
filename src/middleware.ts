import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "./app/_utils/cookie";

export function middleware(request: NextRequest) {
  const login = request.cookies.get("login");

  if (!login) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/write", "/:articleId/edit"],
};
