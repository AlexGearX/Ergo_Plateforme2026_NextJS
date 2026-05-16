'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={() => setDark(d => !d)}
      aria-label={dark ? 'Passer en mode clair' : 'Passer en mode sombre'}
    >
      {dark ? <Sun /> : <Moon />}
    </Button>
  )
}
