import type { Animal } from '@/features/home/data/site-plan'

export function AnimalSprite({ animal }: { animal: Animal }) {
  return (
    <g data-animal={animal.id} style={{ opacity: 0 }}>
      <g data-animal-inner={animal.id}>
        {animal.type === 'rabbit' && <RabbitShape />}
        {animal.type === 'hedgehog' && <HedgehogShape />}
        {animal.type === 'bird' && <BirdShape />}
      </g>
    </g>
  )
}

function RabbitShape() {
  return (
    <g>
      <ellipse cx="0" cy="5" rx="8.5" ry="1.3" fill="black" opacity="0.18" />
      <ellipse
        cx="-5"
        cy="3"
        rx="2.8"
        ry="1.6"
        fill="oklch(0.92 0.012 80)"
        className="dark:fill-[oklch(0.78_0.02_75)]"
      />
      <circle cx="-8" cy="-1" r="1.9" fill="white" className="dark:fill-[oklch(0.92_0.01_85)]" />
      <ellipse cx="-1" cy="0" rx="6.5" ry="4" fill="oklch(0.97 0.012 80)" className="dark:fill-[oklch(0.85_0.02_80)]" />
      <circle cx="5.2" cy="-3" r="3.3" fill="oklch(0.97 0.012 80)" className="dark:fill-[oklch(0.85_0.02_80)]" />
      <ellipse
        cx="3.5"
        cy="-8"
        rx="1"
        ry="3.6"
        fill="oklch(0.93 0.015 75)"
        className="dark:fill-[oklch(0.8_0.02_75)]"
      />
      <ellipse
        cx="6.7"
        cy="-8.6"
        rx="1.1"
        ry="4"
        fill="oklch(0.97 0.012 80)"
        className="dark:fill-[oklch(0.85_0.02_80)]"
      />
      <ellipse cx="6.7" cy="-8" rx="0.5" ry="2.6" fill="oklch(0.82 0.06 25)" opacity="0.7" />
      <circle cx="6.7" cy="-2.9" r="0.55" fill="oklch(0.18 0.02 60)" />
      <circle cx="8.3" cy="-1.8" r="0.4" fill="oklch(0.5 0.1 25)" />
    </g>
  )
}

function HedgehogShape() {
  return (
    <g>
      <ellipse cx="0" cy="4.2" rx="9" ry="1.3" fill="black" opacity="0.18" />
      <path
        d="M -8 2 Q -9 -5 -3 -7 Q 4 -8 8 -3 Q 9 1 7 2 Z"
        fill="oklch(0.42 0.06 60)"
        className="dark:fill-[oklch(0.5_0.06_60)]"
      />
      <path
        d="M -6 -3 L -5 -6 M -3 -5 L -2 -7.5 M 0 -6 L 1 -8 M 3 -6 L 4 -7.5 M 5.5 -4 L 6.5 -5.5"
        stroke="oklch(0.28 0.05 60)"
        className="dark:stroke-[oklch(0.35_0.05_60)]"
        strokeWidth="0.55"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse
        cx="6.5"
        cy="0.6"
        rx="4"
        ry="2.5"
        fill="oklch(0.85 0.04 75)"
        className="dark:fill-[oklch(0.75_0.04_75)]"
      />
      <circle cx="10" cy="0.2" r="0.7" fill="oklch(0.18 0.02 60)" />
      <circle cx="7.5" cy="-1" r="0.5" fill="oklch(0.18 0.02 60)" />
      <ellipse cx="-3" cy="2.5" rx="1.4" ry="0.6" fill="oklch(0.28 0.04 60)" />
      <ellipse cx="3" cy="2.8" rx="1.4" ry="0.6" fill="oklch(0.28 0.04 60)" />
    </g>
  )
}

function BirdShape() {
  return (
    <g>
      <ellipse cx="0" cy="3.4" rx="5" ry="1" fill="black" opacity="0.18" />
      <ellipse cx="0" cy="0.4" rx="4.2" ry="3" fill="oklch(0.62 0.13 65)" />
      <path d="M -3.5 -0.4 L -6.5 -1.5 L -5.5 0.4 L -6.5 1.8 L -3.5 0.8 Z" fill="oklch(0.5 0.13 55)" />
      <ellipse cx="-0.8" cy="-0.2" rx="2.4" ry="1.6" fill="oklch(0.55 0.13 60)" opacity="0.55" />
      <circle cx="3.3" cy="-2" r="2.1" fill="oklch(0.66 0.13 70)" />
      <path d="M 5 -2 L 7.2 -1.6 L 5 -1.1 Z" fill="oklch(0.72 0.15 50)" />
      <circle cx="4" cy="-2.4" r="0.45" fill="oklch(0.15 0.02 60)" />
      <line x1="-0.8" y1="3.2" x2="-0.8" y2="4.6" stroke="oklch(0.5 0.1 50)" strokeWidth="0.55" strokeLinecap="round" />
      <line x1="0.9" y1="3.2" x2="0.9" y2="4.6" stroke="oklch(0.5 0.1 50)" strokeWidth="0.55" strokeLinecap="round" />
    </g>
  )
}
