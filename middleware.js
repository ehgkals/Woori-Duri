import { NextResponse } from "next/server"

export function middleware(request) {
    const clientIP = request.headers.get('x-forwarded-for');

  console.log('Client IP:', clientIP);

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};