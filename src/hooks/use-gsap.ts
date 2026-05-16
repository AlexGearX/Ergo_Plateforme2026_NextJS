'use client'

import { useEffect, type DependencyList, type RefObject } from 'react'
import { gsap } from 'gsap'

export function useGsap(setup: () => void, scopeRef?: RefObject<HTMLElement | null>, deps: DependencyList = []): void {
  useEffect(() => {
    if (scopeRef && !scopeRef.current) return
    const ctx = gsap.context(setup, scopeRef?.current ?? undefined)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
