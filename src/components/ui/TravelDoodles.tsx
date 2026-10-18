'use client'

import React from 'react'

interface DoodleProps {
  className?: string
  color?: string
  opacity?: number
}

/**
 * Hand-drawn aesthetic Hot Air Balloon with basket, ropes, and fluffy clouds
 */
export function HotAirBalloonDoodle({
  className = 'w-16 h-20 text-accent',
  color = 'currentColor',
  opacity = 0.85,
}: DoodleProps) {
  return (
    <svg
      viewBox="0 0 100 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Balloon Envelope */}
      <path
        d="M50 10 C25 10 15 32 15 52 C15 72 32 88 42 96 L58 96 C68 88 85 72 85 52 C85 32 75 10 50 10 Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Balloon Vertical Curved Stripes */}
      <path
        d="M50 10 C38 24 32 50 42 96"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="1 0"
      />
      <path
        d="M50 10 C62 24 68 50 58 96"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M50 10 L50 96"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      {/* Balloon Horizontal Curved Ring */}
      <path
        d="M20 56 Q50 72 80 56"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Burner / Collar */}
      <path
        d="M40 96 L60 96 L58 102 L42 102 Z"
        stroke={color}
        strokeWidth="2"
        fill="currentColor"
        fillOpacity="0.1"
      />
      {/* Ropes to Basket */}
      <line x1="43" y1="102" x2="45" y2="112" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="57" y1="102" x2="55" y2="112" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="48" y1="102" x2="47" y2="112" stroke={color} strokeWidth="1.2" />
      <line x1="52" y1="102" x2="53" y2="112" stroke={color} strokeWidth="1.2" />
      {/* Wicker Basket */}
      <rect
        x="43"
        y="112"
        width="14"
        height="12"
        rx="2"
        stroke={color}
        strokeWidth="2.2"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.12"
      />
      {/* Basket Weave Details */}
      <line x1="44" y1="117" x2="56" y2="117" stroke={color} strokeWidth="1.2" />
      <line x1="50" y1="112" x2="50" y2="124" stroke={color} strokeWidth="1.2" />
      {/* Cloud Left */}
      <path
        d="M6 70 C4 66 8 62 13 63 C15 59 21 59 24 63 C27 61 31 64 30 68 C32 71 29 75 25 74 L8 74 C4 74 3 72 6 70 Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cloud Right */}
      <path
        d="M74 42 C72 39 75 36 78 37 C80 34 85 34 87 37 C89 36 93 38 92 41 C94 43 92 46 89 46 L75 46 C72 46 72 44 74 42 Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Birds */}
      <path d="M12 36 Q15 32 18 36 Q21 32 24 36" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M78 22 Q81 19 83 22 Q85 19 88 22" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

/**
 * Hand-drawn aesthetic Mountain Peaks with snow ridge and pine trees
 */
export function MountainPeaksDoodle({
  className = 'w-24 h-16 text-accent',
  color = 'currentColor',
  opacity = 0.85,
}: DoodleProps) {
  return (
    <svg
      viewBox="0 0 160 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Secondary Mountain (Back Left) */}
      <path
        d="M10 80 L52 24 L85 80"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Snow cap Back Left */}
      <path
        d="M45 34 L52 24 L60 36 L54 38 L50 35 L45 34 Z"
        stroke={color}
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.15"
      />

      {/* Main Mountain (Center Peak) */}
      <path
        d="M40 82 L90 12 L145 82"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center Peak Snow Ridge Line */}
      <path
        d="M90 12 Q88 38 92 58 Q95 72 100 82"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Snow cap Center */}
      <path
        d="M80 26 L90 12 L103 28 L98 31 L93 28 L88 32 L80 26 Z"
        stroke={color}
        strokeWidth="1.6"
        fill="currentColor"
        fillOpacity="0.2"
      />
      {/* Ridge shading hatched lines */}
      <line x1="91" y1="36" x2="104" y2="44" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="92" y1="46" x2="110" y2="56" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="94" y1="58" x2="118" y2="70" stroke={color} strokeWidth="1.2" strokeLinecap="round" />

      {/* Third Small Mountain (Right) */}
      <path
        d="M115 82 L138 48 L158 82"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Ground Horizon Contour */}
      <path
        d="M2 82 Q35 80 80 82 T158 82"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Sketched Pine Trees at Base */}
      <path d="M22 82 L22 72 M18 78 L22 72 L26 78 M19 75 L22 70 L25 75" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M32 82 L32 70 M27 77 L32 70 L37 77 M28 73 L32 68 L36 73" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M142 82 L142 72 M138 78 L142 72 L146 78 M139 74 L142 69 L145 74" stroke={color} strokeWidth="1.6" strokeLinecap="round" />

      {/* Sun / Moon behind mountain */}
      <path
        d="M108 26 A10 10 0 0 1 120 38"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="2 2"
      />
    </svg>
  )
}

/**
 * Hand-drawn aesthetic Palm Trees & Tropical Island vibe
 */
export function PalmTreeDoodle({
  className = 'w-16 h-18 text-accent',
  color = 'currentColor',
  opacity = 0.85,
}: DoodleProps) {
  return (
    <svg
      viewBox="0 0 90 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Curved Trunk */}
      <path
        d="M48 94 C46 68 38 48 42 28 C43 25 44 24 45 23"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Trunk Ring Ridges */}
      <line x1="44" y1="84" x2="49" y2="85" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="42" y1="72" x2="47" y2="73" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="40" y1="60" x2="45" y2="61" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="39" y1="48" x2="44" y2="49" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="40" y1="36" x2="44" y2="37" stroke={color} strokeWidth="1.5" strokeLinecap="round" />

      {/* Palm Frond 1 (Top Left) */}
      <path
        d="M45 24 C38 12 24 10 10 16 C18 20 28 22 45 24 Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.1"
      />
      {/* Palm Frond 2 (Top Arch) */}
      <path
        d="M45 24 C44 8 52 4 64 6 C58 12 55 18 45 24 Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.1"
      />
      {/* Palm Frond 3 (Right) */}
      <path
        d="M45 24 C58 18 72 20 84 28 C74 30 62 29 45 24 Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.1"
      />
      {/* Palm Frond 4 (Far Left Low) */}
      <path
        d="M45 24 C30 24 16 30 6 42 C16 38 28 34 45 24 Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.1"
      />
      {/* Palm Frond 5 (Right Low) */}
      <path
        d="M45 24 C60 30 70 38 78 52 C70 42 58 34 45 24 Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.1"
      />

      {/* Coconuts */}
      <circle cx="42" cy="27" r="3.2" stroke={color} strokeWidth="1.5" fill="currentColor" fillOpacity="0.25" />
      <circle cx="47" cy="28" r="3" stroke={color} strokeWidth="1.5" fill="currentColor" fillOpacity="0.25" />
      <circle cx="44" cy="31" r="2.8" stroke={color} strokeWidth="1.5" fill="currentColor" fillOpacity="0.25" />

      {/* Sand mound / waves at base */}
      <path d="M26 95 Q48 90 70 95" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M34 98 Q50 95 64 98" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/**
 * Hand-drawn Airplane with dotted flight loop & clouds
 */
export function AirplaneLoopDoodle({
  className = 'w-24 h-16 text-accent',
  color = 'currentColor',
  opacity = 0.85,
}: DoodleProps) {
  return (
    <svg
      viewBox="0 0 150 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Loop trail */}
      <path
        d="M10 65 Q45 80 75 60 C105 40 100 10 75 18 C50 26 55 58 95 50 Q120 45 136 32"
        stroke={color}
        strokeWidth="1.8"
        strokeDasharray="4 4"
        strokeLinecap="round"
      />

      {/* Paper / Sketched Jet Airplane */}
      <g transform="translate(126, 20) rotate(-22)">
        <path
          d="M0 8 L18 0 L14 16 L8 12 L4 18 L3 11 Z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="currentColor"
          fillOpacity="0.15"
        />
        <line x1="18" y1="0" x2="8" y2="12" stroke={color} strokeWidth="1.5" />
      </g>

      {/* Mini twinkle stars */}
      <path d="M30 20 L32 25 L37 27 L32 29 L30 34 L28 29 L23 27 L28 25 Z" fill={color} fillOpacity="0.6" />
      <path d="M125 65 L126 68 L129 69 L126 70 L125 73 L124 70 L121 69 L124 68 Z" fill={color} fillOpacity="0.5" />
    </svg>
  )
}

/**
 * Hand-drawn Wanderlust Compass Rose
 */
export function CompassDoodle({
  className = 'w-16 h-16 text-accent',
  color = 'currentColor',
  opacity = 0.85,
}: DoodleProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Outer hand-sketched circle */}
      <circle cx="40" cy="40" r="34" stroke={color} strokeWidth="2" strokeDasharray="1 0" />
      <circle cx="40" cy="40" r="28" stroke={color} strokeWidth="1.2" strokeDasharray="3 3" />

      {/* Cardinal Axis Markers */}
      <line x1="40" y1="2" x2="40" y2="78" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="40" x2="78" y2="40" stroke={color} strokeWidth="1.5" strokeLinecap="round" />

      {/* Diagonal Markers */}
      <line x1="15" y1="15" x2="65" y2="65" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2" />
      <line x1="15" y1="65" x2="65" y2="15" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2" />

      {/* North Arrow Pointer (Filled Dark/Accent) */}
      <polygon points="40,12 45,38 40,34" fill={color} />
      <polygon points="40,12 35,38 40,34" stroke={color} strokeWidth="1.2" fill="none" />

      {/* South Arrow Pointer */}
      <polygon points="40,68 35,42 40,46" fill={color} fillOpacity="0.25" />
      <polygon points="40,68 45,42 40,46" stroke={color} strokeWidth="1.2" fill="none" />

      {/* East Arrow Pointer */}
      <polygon points="68,40 42,45 46,40" fill={color} fillOpacity="0.25" />
      <polygon points="68,40 42,35 46,40" stroke={color} strokeWidth="1.2" fill="none" />

      {/* West Arrow Pointer */}
      <polygon points="12,40 38,35 34,40" fill={color} fillOpacity="0.25" />
      <polygon points="12,40 38,45 34,40" stroke={color} strokeWidth="1.2" fill="none" />

      {/* Center Pivot */}
      <circle cx="40" cy="40" r="3.5" stroke={color} strokeWidth="2" fill="white" />
      <circle cx="40" cy="40" r="1.5" fill={color} />

      {/* North 'N' letter doodle */}
      <text
        x="40"
        y="10"
        textAnchor="middle"
        fontSize="8"
        fontWeight="bold"
        fill={color}
        fontFamily="sans-serif"
      >
        N
      </text>
    </svg>
  )
}

/**
 * Hand-drawn Vintage Travel Suitcase with Luggage Tags
 */
export function SuitcaseDoodle({
  className = 'w-16 h-14 text-accent',
  color = 'currentColor',
  opacity = 0.85,
}: DoodleProps) {
  return (
    <svg
      viewBox="0 0 90 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Handle */}
      <path
        d="M34 18 C34 10 56 10 56 18"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Handle Anchors */}
      <rect x="32" y="16" width="4" height="4" rx="1" fill={color} />
      <rect x="54" y="16" width="4" height="4" rx="1" fill={color} />

      {/* Suitcase Main Body */}
      <rect
        x="10"
        y="18"
        width="70"
        height="50"
        rx="7"
        stroke={color}
        strokeWidth="2.5"
        fill="currentColor"
        fillOpacity="0.06"
      />

      {/* Center Dividing Zipper / Seam */}
      <line x1="10" y1="43" x2="80" y2="43" stroke={color} strokeWidth="1.8" strokeDasharray="3 2" />

      {/* Leather Straps */}
      <line x1="26" y1="18" x2="26" y2="68" stroke={color} strokeWidth="2" />
      <line x1="64" y1="18" x2="64" y2="68" stroke={color} strokeWidth="2" />

      {/* Strap Buckles */}
      <rect x="24" y="40" width="4" height="6" stroke={color} strokeWidth="1.2" fill="white" />
      <rect x="62" y="40" width="4" height="6" stroke={color} strokeWidth="1.2" fill="white" />

      {/* Reinforced Corner Guards */}
      <path d="M10 26 C15 26 18 23 18 18" stroke={color} strokeWidth="1.8" />
      <path d="M80 26 C75 26 72 23 72 18" stroke={color} strokeWidth="1.8" />
      <path d="M10 60 C15 60 18 63 18 68" stroke={color} strokeWidth="1.8" />
      <path d="M80 60 C75 60 72 63 72 68" stroke={color} strokeWidth="1.8" />

      {/* Travel Stamp Sticker */}
      <circle cx="45" cy="31" r="7" stroke={color} strokeWidth="1.4" strokeDasharray="2 1" />
      <path d="M41 31 L49 31 M45 27 L45 35" stroke={color} strokeWidth="1.2" />

      {/* Dangling Luggage Tag */}
      <path d="M58 20 L66 28 L62 33 L54 25 Z" stroke={color} strokeWidth="1.4" fill="white" />
      <line x1="56" y1="18" x2="60" y2="24" stroke={color} strokeWidth="1.2" />
    </svg>
  )
}

/**
 * Hand-drawn Passport Stamp / Postmark Doodle
 */
export function PassportStampDoodle({
  className = 'w-16 h-16 text-accent',
  color = 'currentColor',
  opacity = 0.85,
}: DoodleProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Double Stamp Circle */}
      <circle cx="40" cy="40" r="35" stroke={color} strokeWidth="2" strokeDasharray="5 3" />
      <circle cx="40" cy="40" r="30" stroke={color} strokeWidth="1.2" />

      {/* Airplane in center */}
      <path
        d="M32 40 L40 34 L48 40 L44 43 L40 41 L36 43 Z"
        fill={color}
        fillOpacity="0.8"
      />
      <line x1="40" y1="34" x2="40" y2="46" stroke={color} strokeWidth="1.8" />
      <line x1="33" y1="40" x2="47" y2="40" stroke={color} strokeWidth="1.8" />

      {/* Wavy cancellation bars */}
      <path d="M12 25 Q20 20 28 25 T44 25" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M36 55 Q44 50 52 55 T68 55" stroke={color} strokeWidth="1.2" strokeLinecap="round" />

      {/* Text arc representation */}
      <text
        x="40"
        y="22"
        textAnchor="middle"
        fontSize="6"
        fontWeight="bold"
        fill={color}
        letterSpacing="2"
      >
        ONE WORLD
      </text>
      <text
        x="40"
        y="62"
        textAnchor="middle"
        fontSize="5"
        fontWeight="600"
        fill={color}
        letterSpacing="1.5"
      >
        VERIFIED TOUR
      </text>
    </svg>
  )
}
