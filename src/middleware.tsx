import { NextRequest, NextResponse } from 'next/server'

const isAppUnderDevelopment = true // Change to false when app is ready

export function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl

  console.log('Middleware executed for:', pathname) // Debugging log

  // Allow external domains
  if (
    req.url.startsWith('https://dfx-file-generations.vercel.app') ||
    req.url.startsWith('https://lumashape.com')
  ) {
    return NextResponse.next()
  }

  // Allow access to the root page, Next.js assets, API routes, images, and videos from the public folder
  if (
    isAppUnderDevelopment &&
    pathname !== '/' && // Allow only the root
    !pathname.startsWith('/_next/') && // Allow Next.js static assets
    !pathname.startsWith('/api/') && // Allow API routes
    !pathname.startsWith('/images/') &&
    !pathname.startsWith('/video/')
  ) {
    console.log(`Redirecting ${pathname} to /`)
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
