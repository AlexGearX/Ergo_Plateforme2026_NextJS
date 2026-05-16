export const ROUTES = {
  HOME: '/',
  SIGN_IN: '/auth/connexion',
  AUTH_CALLBACK: '/auth/callback',
  MATERIELS: '/materiels',
  MATERIEL_NEW: '/materiels/nouveau',
  PERSONNES: '/personnes',
  PERSONNE_NEW: '/personnes/nouveau',
} as const

export const PUBLIC_ROUTES: readonly string[] = [ROUTES.SIGN_IN, ROUTES.AUTH_CALLBACK]

export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(p => pathname === p || pathname.startsWith(`${p}/`))
}
