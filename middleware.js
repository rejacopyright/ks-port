// This function can be marked `async` if using `await` inside
import { NextResponse } from 'next/server'
export async function middleware(_req) {
  // const url = req.nextUrl.clone()

  // if (req.nextUrl.pathname.startsWith('/admin')) {
  //   return NextResponse.rewrite(new URL('/login', req.url))
  //   // return NextResponse.next()
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
