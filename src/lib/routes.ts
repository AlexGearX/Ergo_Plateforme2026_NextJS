/**
 * Application routes
 * Centralized route definitions to avoid hardcoded strings throughout the app
 */

export const ROUTES = {
  HOME: '/',
} as const

/**
 * Public routes - accessible without authentication
 * Used by middleware to determine which routes don't require auth
 */
export const PUBLIC_ROUTES: string[] = [ROUTES.HOME]
