import type { SVGProps } from 'react'

export function PhotoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.6" fill="currentColor" stroke="none" />
      <path d="M2.5 16.5l5.5-5 4 3.5 3.5-3 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
