import { NextResponse } from "next/server";

export function middleware(request) {
  const accept = request.headers.get("accept");
  const clientIP = request.headers.get("x-forwarded-for");

  // 브라우저가 HTML 페이지를 요청할 때만 로그 출력
  if (accept && accept.includes("text/html")) {
    console.log("Client IP:", clientIP);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};

// 192.168.219.104
