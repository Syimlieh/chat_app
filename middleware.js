import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const auth = request.cookies.get("next-auth.session-token");
  if (request.nextUrl.pathname.includes("/auth/login")) {
    if (auth) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return;
  }
  if (request.nextUrl.pathname == "/") {
    if (!auth) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/"],
// };
