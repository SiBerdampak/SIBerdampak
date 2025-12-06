import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  
  // Cek apakah user datang dari halaman donasi
  const referer = request.headers.get('referer')
  const hasDonasiSession = request.cookies.get('donasi_completed')
  
  if (url.pathname === '/donasi/terimakasih') {
    // Jika tidak ada cookie/session atau tidak dari halaman donasi
    if (!hasDonasiSession && !referer?.includes('/donasi')) {
      url.pathname = '/donasi'
      return NextResponse.redirect(url)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/donasi/terimakasih'
}