'use client'

import { useRef, type RefObject } from 'react'
import { gsap } from 'gsap'
import { useGsap } from '@/hooks/use-gsap'
import { ANIMALS } from '@/features/home/data/site-plan'

export function useSitePlanAnimation(): RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement | null>(null)

  useGsap(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.35 })

    tl.from('[data-anim="ground"]', { opacity: 0, duration: 0.6, ease: 'power2.out' })
      .from(
        '[data-anim="tree"]',
        {
          opacity: 0,
          scale: 0.5,
          transformOrigin: '50% 100%',
          duration: 0.55,
          stagger: 0.04,
          ease: 'back.out(1.6)',
        },
        '-=0.3',
      )
      .from('[data-anim="stockage-plot"]', { opacity: 0, scale: 0.5, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      .from(
        '[data-anim="house"]',
        {
          opacity: 0,
          scale: 0.55,
          y: 28,
          duration: 0.75,
          stagger: 0.09,
          ease: 'back.out(1.4)',
        },
        '-=0.5',
      )
      .from(
        '[data-anim="stockage"]',
        { opacity: 0, scale: 0.6, y: 18, duration: 0.85, ease: 'back.out(1.5)' },
        '-=0.55',
      )

    ANIMALS.forEach(animal => {
      const outerSel = `[data-animal="${animal.id}"]`
      const innerSel = `[data-animal-inner="${animal.id}"]`

      gsap.set(outerSel, { x: animal.path[0].x, y: animal.path[0].y })
      gsap.set(innerSel, { transformOrigin: '50% 50%', scaleX: 1 })
      gsap.to(outerSel, { opacity: 1, duration: 0.6, delay: 1.6 })

      const loop = gsap.timeline({ repeat: -1, delay: 1.7 })
      for (let i = 1; i < animal.path.length; i++) {
        const prev = animal.path[i - 1]
        const next = animal.path[i]
        const dir = next.x > prev.x ? 1 : next.x < prev.x ? -1 : 0
        if (dir !== 0) {
          loop.to(innerSel, { scaleX: dir, duration: 0.25, ease: 'power2.out' })
        }
        loop.to(outerSel, { x: next.x, y: next.y, duration: next.duration, ease: 'sine.inOut' }, '<+=0.1')
      }

      if (animal.hop) {
        gsap.to(innerSel, {
          y: -2.5,
          duration: 0.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 1.7,
        })
      }
    })
  }, ref)

  return ref
}
