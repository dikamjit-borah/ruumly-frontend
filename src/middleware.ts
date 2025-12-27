import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public routes that don't require authentication
const publicRoutes = ['/', '/auth/signin', '/auth/signup'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if route is public
  const isPublicRoute = publicRoutes.includes(pathname);
  
  // Get auth token from cookies
  const token = request.cookies.get('auth_token')?.value;
  
  // If route is public, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }
  
  // If route is protected and no token, redirect to sign in
  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
