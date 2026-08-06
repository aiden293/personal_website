import type { SVGProps } from 'react'

// Simple, original geometric marks (not traced from any brand's official
// logo file) that read as "TypeScript / React / etc." at a glance.

export function TypeScriptIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.6" />
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="currentColor"
        fontFamily="inherit"
      >
        TS
      </text>
    </svg>
  )
}

export function ReactIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </svg>
  )
}

export function NodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" {...props}>
      <path
        d="M12 2 21 7v10l-9 5-9-5V7z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PythonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="currentColor"
        fontFamily="inherit"
      >
        Py
      </text>
      <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

export function DatabaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" {...props}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" strokeLinecap="round" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" strokeLinecap="round" />
    </svg>
  )
}

export function ContainerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" {...props}>
      <rect x="3" y="9" width="6" height="6" rx="1" />
      <rect x="9.5" y="9" width="6" height="6" rx="1" />
      <rect x="16" y="9" width="6" height="6" rx="1" />
      <path d="M2 19h20" strokeLinecap="round" />
    </svg>
  )
}

export function CloudIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" {...props}>
      <path
        d="M7 18h11a4 4 0 0 0 0-8 5.5 5.5 0 0 0-10.6-1.7A4.2 4.2 0 0 0 7 18z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function GitBranchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" {...props}>
      <circle cx="6" cy="5" r="2.2" />
      <circle cx="6" cy="19" r="2.2" />
      <circle cx="18" cy="12" r="2.2" />
      <path d="M6 7.2V16.8" strokeLinecap="round" />
      <path d="M6 9c0 4 3 5 8 5" strokeLinecap="round" />
    </svg>
  )
}
