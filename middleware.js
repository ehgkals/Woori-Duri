import { NextResponse } from "next/server"

export function middleware(request) {
    const clientIP = request.headers.get('x-forwarded-for');

  console.log('Client IP:', clientIP);

  return new Response(null, { status: 204 });
}

export const config = {
  matcher: '/:path*',
};