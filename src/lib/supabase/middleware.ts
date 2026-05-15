import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { ROUTES, isPublicRoute } from '@/lib/routes'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    return supabaseResponse
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
      },
    },
  })

  // IMPORTANT: this actually triggers the session refresh.
  // Without it the proxy is a no-op and tokens never get refreshed.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname
  const onPublicRoute = isPublicRoute(pathname)

  if (!user && !onPublicRoute) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = ROUTES.SIGN_IN
    redirectUrl.search = ''
    if (pathname !== ROUTES.HOME && !pathname.startsWith('/auth/')) {
      redirectUrl.searchParams.set('next', pathname + request.nextUrl.search)
    }
    return NextResponse.redirect(redirectUrl)
  }

  if (user && pathname === ROUTES.SIGN_IN) {
    const next = request.nextUrl.searchParams.get('next')
    const target = next && !next.startsWith('/auth/') ? next : ROUTES.HOME
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = target
    redirectUrl.search = ''
    return NextResponse.redirect(redirectUrl)
  }

  return supabaseResponse
}
