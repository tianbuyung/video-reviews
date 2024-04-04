import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getUserMeLoader } from "@/data/services/get-user-me-loader";

export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader();
  const currentPath = request.nextUrl.pathname;

  // console.log("############## MIDDLEWARE ###################");
  // console.log(user);
  // console.log(currentPath);
  // console.log("############## MIDDLEWARE ###################");

  const protectedRoutes = ["/dashboard"];
  const excludedRoutesForLoggedInUsers = ["/signin", "/signup"];

  const shouldRedirectToSignIn = (path: string) =>
    protectedRoutes.some((route) => path.startsWith(route));

  if (shouldRedirectToSignIn(currentPath) && !user.ok) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (excludedRoutesForLoggedInUsers.includes(currentPath) && user.ok) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
