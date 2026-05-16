import type { MaisonWithPiecesCount } from '@/features/maisons/types'

export const VIEW_W = 1100
export const VIEW_H = 520

export const STOCKAGE_POS = { x: 550, y: 295 }

export const LAYOUT: Record<string, { x: number; y: number }> = {
  'maison-1': { x: 110, y: 450 },
  'maison-2': { x: 160, y: 270 },
  'maison-3': { x: 320, y: 128 },
  'maison-4': { x: 550, y: 88 },
  'maison-5': { x: 780, y: 128 },
  'maison-6': { x: 940, y: 270 },
  'maison-7': { x: 990, y: 450 },
}

export type MaisonMarker = MaisonWithPiecesCount & { x: number; y: number }

export type Tree = { x: number; y: number; size: number; variant: 'leaf' | 'pine' | 'bush' }

export const TREES: Tree[] = [
  { x: 70, y: 300, size: 11, variant: 'leaf' },
  { x: 240, y: 380, size: 10, variant: 'pine' },
  { x: 270, y: 200, size: 9, variant: 'leaf' },
  { x: 400, y: 240, size: 8, variant: 'bush' },
  { x: 470, y: 180, size: 9, variant: 'leaf' },
  { x: 620, y: 180, size: 9, variant: 'pine' },
  { x: 700, y: 240, size: 8, variant: 'bush' },
  { x: 830, y: 200, size: 9, variant: 'leaf' },
  { x: 860, y: 380, size: 10, variant: 'pine' },
  { x: 1030, y: 300, size: 11, variant: 'leaf' },
  { x: 430, y: 450, size: 9, variant: 'pine' },
  { x: 670, y: 460, size: 10, variant: 'leaf' },
  { x: 550, y: 430, size: 8, variant: 'bush' },
  { x: 350, y: 500, size: 9, variant: 'leaf' },
  { x: 760, y: 500, size: 9, variant: 'pine' },
]

export type Flower = { x: number; y: number; tone: 'yellow' | 'white' | 'pink' }

export const FLOWERS: Flower[] = [
  { x: 280, y: 510, tone: 'yellow' },
  { x: 295, y: 504, tone: 'white' },
  { x: 308, y: 512, tone: 'yellow' },
  { x: 470, y: 506, tone: 'white' },
  { x: 485, y: 511, tone: 'pink' },
  { x: 500, y: 504, tone: 'white' },
  { x: 700, y: 510, tone: 'yellow' },
  { x: 715, y: 504, tone: 'pink' },
  { x: 245, y: 60, tone: 'white' },
  { x: 260, y: 50, tone: 'yellow' },
  { x: 870, y: 55, tone: 'pink' },
  { x: 885, y: 64, tone: 'white' },
  { x: 35, y: 380, tone: 'yellow' },
  { x: 50, y: 395, tone: 'white' },
  { x: 1075, y: 380, tone: 'white' },
  { x: 1060, y: 395, tone: 'yellow' },
  { x: 410, y: 100, tone: 'yellow' },
  { x: 660, y: 110, tone: 'pink' },
]

export type Animal = {
  id: string
  type: 'rabbit' | 'hedgehog' | 'bird'
  hop: boolean
  path: Array<{ x: number; y: number; duration: number }>
}

export const ANIMALS: Animal[] = [
  {
    id: 'rabbit-1',
    type: 'rabbit',
    hop: true,
    path: [
      { x: 220, y: 488, duration: 0 },
      { x: 320, y: 498, duration: 4.5 },
      { x: 450, y: 482, duration: 4 },
      { x: 320, y: 502, duration: 4.5 },
      { x: 220, y: 488, duration: 4.5 },
    ],
  },
  {
    id: 'hedgehog-1',
    type: 'hedgehog',
    hop: false,
    path: [
      { x: 880, y: 498, duration: 0 },
      { x: 800, y: 506, duration: 7 },
      { x: 720, y: 492, duration: 6 },
      { x: 800, y: 506, duration: 6 },
      { x: 880, y: 498, duration: 7 },
    ],
  },
  {
    id: 'bird-1',
    type: 'bird',
    hop: true,
    path: [
      { x: 540, y: 506, duration: 0 },
      { x: 595, y: 500, duration: 3 },
      { x: 640, y: 508, duration: 3 },
      { x: 595, y: 500, duration: 3 },
      { x: 540, y: 506, duration: 3 },
    ],
  },
]

export function pctX(px: number) {
  return (px / VIEW_W) * 100
}
export function pctY(px: number) {
  return (px / VIEW_H) * 100
}
