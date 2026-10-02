import React from 'react';
import { LogoConfig, COLOR_THEMES } from '../types';

interface StaticLogoProps {
  config: LogoConfig;
  size?: number;
  showBackground?: boolean;
  className?: string;
  id?: string;
}

export const StaticLogo: React.FC<StaticLogoProps> = ({
  config,
  size = 600,
  showBackground = true,
  className = '',
  id = 'moonrp-static-svg',
}) => {
  const theme = COLOR_THEMES[config.theme] || COLOR_THEMES.classic_vapor;
  const primary = config.primaryColor || theme.primary;
  const secondary = config.secondaryColor || theme.secondary;
  const accent = config.accentColor || theme.accent;
  const gridCol = config.gridColor || theme.grid;
  const bgCol = config.backgroundColor || theme.bg;

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        id={id}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 800"
        width={size}
        height={size}
        className="w-full h-auto max-w-full drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Background Gradient */}
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#05010d" />
            <stop offset="45%" stopColor={bgCol} />
            <stop offset="100%" stopColor="#1e0836" />
          </linearGradient>

          {/* Moon Gradient */}
          <linearGradient id="moonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={accent} />
            <stop offset="40%" stopColor={primary} />
            <stop offset="85%" stopColor={secondary} />
            <stop offset="100%" stopColor="#3b0764" />
          </linearGradient>

          {/* Chrome Text Gradient */}
          <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#e2e8f0" />
            <stop offset="48%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="52%" stopColor="#38bdf8" />
            <stop offset="75%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          {/* Neon Glow Pink */}
          <filter id="neonGlowPink" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={4 * config.glowIntensity} result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation={12 * config.glowIntensity} result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Neon Glow Cyan */}
          <filter id="neonGlowCyan" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={3 * config.glowIntensity} result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation={9 * config.glowIntensity} result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Metallic 3D bevel effect */}
          <filter id="chromeBevel" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.8" />
            <feDropShadow dx="-2" dy="-2" stdDeviation="3" floodColor={primary} floodOpacity="0.6" />
          </filter>

          {/* Grid Horizon Fade Mask */}
          <linearGradient id="gridFade" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <mask id="gridMask">
            <rect x="0" y="440" width="800" height="360" fill="url(#gridFade)" />
          </mask>

          {/* Striped Sun/Moon Mask */}
          <mask id="stripedMoonMask">
            <rect x="0" y="0" width="800" height="800" fill="#ffffff" />
            <rect x="150" y="320" width="500" height="6" fill="#000000" />
            <rect x="150" y="335" width="500" height="9" fill="#000000" />
            <rect x="150" y="355" width="500" height="13" fill="#000000" />
            <rect x="150" y="380" width="500" height="18" fill="#000000" />
            <rect x="150" y="410" width="500" height="24" fill="#000000" />
          </mask>
        </defs>

        {/* 1. Optional Canvas Background */}
        {showBackground && (
          <g id="background-layer">
            <rect width="800" height="800" rx="36" fill="url(#bgGrad)" />
            {/* Outer neon border */}
            <rect
              x="12"
              y="12"
              width="776"
              height="776"
              rx="28"
              fill="none"
              stroke={primary}
              strokeWidth="2"
              strokeOpacity="0.4"
            />
            <rect
              x="20"
              y="20"
              width="760"
              height="760"
              rx="22"
              fill="none"
              stroke={secondary}
              strokeWidth="1"
              strokeOpacity="0.3"
            />
          </g>
        )}

        {/* 2. Starfield & Cosmic Dust */}
        {config.showStars && (
          <g id="stars-layer" opacity="0.85">
            {/* Ambient Stars */}
            <circle cx="120" cy="110" r="1.5" fill="#ffffff" opacity="0.9" />
            <circle cx="210" cy="180" r="2" fill={secondary} opacity="0.8" />
            <circle cx="680" cy="140" r="1.8" fill="#ffffff" opacity="0.9" />
            <circle cx="720" cy="240" r="2.5" fill={primary} opacity="0.7" />
            <circle cx="160" cy="300" r="1.2" fill="#ffffff" opacity="0.6" />
            <circle cx="640" cy="320" r="1.5" fill={secondary} opacity="0.8" />
            <circle cx="280" cy="90" r="1" fill="#ffffff" opacity="0.7" />
            <circle cx="520" cy="80" r="2.2" fill={accent} opacity="0.8" />
            <circle cx="400" cy="60" r="1.5" fill="#ffffff" opacity="0.8" />

            {/* Glowing 4-point Retro Cross Stars */}
            <g transform="translate(180, 130) scale(0.7)">
              <path d="M0,-15 L3,-3 L15,0 L3,3 L0,15 L-3,3 L-15,0 L-3,-3 Z" fill={secondary} filter="url(#neonGlowCyan)" />
            </g>
            <g transform="translate(660, 110) scale(0.9)">
              <path d="M0,-15 L3,-3 L15,0 L3,3 L0,15 L-3,3 L-15,0 L-3,-3 Z" fill={accent} filter="url(#neonGlowPink)" />
            </g>
            <g transform="translate(110, 260) scale(0.5)">
              <path d="M0,-15 L3,-3 L15,0 L3,3 L0,15 L-3,3 L-15,0 L-3,-3 Z" fill={primary} />
            </g>

            {/* Shooting Comet Trail */}
            <path
              d="M130,50 L260,110"
              stroke="url(#moonGrad)"
              strokeWidth="1.5"
              strokeDasharray="1, 8"
              opacity="0.6"
            />
          </g>
        )}

        {/* 3. Synthwave Perspective 3D Grid Floor */}
        {config.showGrid && (
          <g id="grid-layer" mask="url(#gridMask)">
            {/* Horizon Glow Line */}
            <line
              x1="50"
              y1="440"
              x2="750"
              y2="440"
              stroke={secondary}
              strokeWidth="3"
              filter="url(#neonGlowCyan)"
            />

            {/* Horizontal Grid Lines (exponential spacing for perspective depth) */}
            <line x1="100" y1="446" x2="700" y2="446" stroke={gridCol} strokeWidth="1" opacity="0.4" />
            <line x1="80" y1="456" x2="720" y2="456" stroke={gridCol} strokeWidth="1" opacity="0.5" />
            <line x1="60" y1="470" x2="740" y2="470" stroke={gridCol} strokeWidth="1.2" opacity="0.6" />
            <line x1="40" y1="490" x2="760" y2="490" stroke={gridCol} strokeWidth="1.5" opacity="0.7" />
            <line x1="20" y1="518" x2="780" y2="518" stroke={gridCol} strokeWidth="1.8" opacity="0.8" />
            <line x1="0" y1="555" x2="800" y2="555" stroke={gridCol} strokeWidth="2" opacity="0.9" />
            <line x1="0" y1="605" x2="800" y2="605" stroke={gridCol} strokeWidth="2.5" opacity="1" />
            <line x1="0" y1="675" x2="800" y2="675" stroke={gridCol} strokeWidth="3" opacity="1" />
            <line x1="0" y1="765" x2="800" y2="765" stroke={gridCol} strokeWidth="3.5" opacity="1" />

            {/* Vanishing Point Perspective Vertical Lines */}
            {[-350, -280, -210, -150, -90, -40, 0, 40, 90, 150, 210, 280, 350].map((offset, i) => (
              <line
                key={`vgrid-${i}`}
                x1={400 + offset * 0.15}
                y1="440"
                x2={400 + offset * 2.2}
                y2="800"
                stroke={gridCol}
                strokeWidth={offset === 0 ? "2.5" : "1.8"}
                opacity={Math.abs(offset) > 200 ? "0.6" : "0.85"}
              />
            ))}
          </g>
        )}

        {/* 4. Retro Mountains / Wireframe Pyramids */}
        {config.showMountains && (
          <g id="mountains-layer" opacity="0.7">
            {/* Dark Low-Poly Silhouette Mountains */}
            <polygon
              points="100,440 220,360 310,410 400,340 490,400 580,350 700,440"
              fill="#18072b"
              stroke={primary}
              strokeWidth="1.5"
            />
            <polyline
              points="220,360 220,440 310,410 310,440 400,340 400,440 580,350 580,440"
              stroke={secondary}
              strokeWidth="0.8"
              strokeDasharray="2, 4"
              opacity="0.5"
            />
          </g>
        )}

        {/* 5. The Vaporwave Moon / Sun Centerpiece */}
        <g
          id="moon-layer"
          transform={`translate(400, 310) scale(${config.moonSize}) translate(-400, -310)`}
        >
          {/* Outer Sun Glow Ring */}
          <circle
            cx="400"
            cy="300"
            r="170"
            fill="none"
            stroke={primary}
            strokeWidth="3"
            strokeOpacity="0.4"
            filter="url(#neonGlowPink)"
          />
          <circle
            cx="400"
            cy="300"
            r="160"
            fill="none"
            stroke={secondary}
            strokeWidth="2"
            strokeOpacity="0.3"
          />

          {config.moonShape === 'crescent' ? (
            /* Crescent Moon Emblem with GMod Aesthetics */
            <g id="crescent-moon">
              {/* Crescent Path */}
              <path
                d="M380,140 C468,140 540,212 540,300 C540,388 468,460 380,460 C330,460 286,437 258,402 C300,415 350,405 385,370 C428,327 428,257 385,214 C350,179 300,169 258,182 C286,155 330,140 380,140 Z"
                fill="url(#moonGrad)"
                filter="url(#neonGlowPink)"
              />
              {/* Inner glowing edge highlight */}
              <path
                d="M380,148 C462,148 528,216 528,300 C528,384 462,452 380,452"
                fill="none"
                stroke="#ffffff"
                strokeWidth="3"
                strokeOpacity="0.7"
              />
              {/* Retro Moon Slices / Craters */}
              <circle cx="460" cy="240" r="14" fill="#ffffff" fillOpacity="0.15" stroke={primary} strokeWidth="1.5" />
              <circle cx="490" cy="310" r="22" fill="#ffffff" fillOpacity="0.12" stroke={secondary} strokeWidth="1.5" />
              <circle cx="440" cy="380" r="18" fill="#ffffff" fillOpacity="0.15" stroke={accent} strokeWidth="1.5" />
            </g>
          ) : (
            /* Striped Synthwave Sunset Sun */
            <g id="striped-sun" mask="url(#stripedMoonMask)">
              <circle cx="400" cy="300" r="150" fill="url(#moonGrad)" filter="url(#neonGlowPink)" />
            </g>
          )}

          {/* Garry's Mod Physics Gun Energy Aura Arcs */}
          {config.showPhysgunBeam && (
            <g id="physgun-arcs">
              <ellipse
                cx="400"
                cy="300"
                rx="195"
                ry="75"
                fill="none"
                stroke={secondary}
                strokeWidth="3"
                transform="rotate(-25 400 300)"
                filter="url(#neonGlowCyan)"
                strokeDasharray="40 18 10 25"
              />
              <ellipse
                cx="400"
                cy="300"
                rx="190"
                ry="65"
                fill="none"
                stroke={accent}
                strokeWidth="2"
                transform="rotate(35 400 300)"
                strokeDasharray="60 30 15 20"
                opacity="0.8"
              />
            </g>
          )}

          {/* Garry's Mod Iconic "g" Glyph in Center */}
          {config.showGmodIcon && (
            <g id="gmod-glyph" transform="translate(345, 235)">
              <rect
                x="-10"
                y="-10"
                width="120"
                height="120"
                rx="24"
                fill="#000000"
                fillOpacity="0.6"
                stroke={secondary}
                strokeWidth="2.5"
                filter="url(#neonGlowCyan)"
              />
              {/* Stylized Garry's Mod lowercase "g" */}
              <text
                x="50"
                y="82"
                textAnchor="middle"
                fontFamily="'Righteous', 'Orbitron', sans-serif"
                fontSize="86"
                fontWeight="900"
                fill="#ffffff"
                stroke={primary}
                strokeWidth="2"
                style={{ filter: 'drop-shadow(0 0 10px #00f0ff)' }}
              >
                g
              </text>
            </g>
          )}
        </g>

        {/* 6. Vaporwave Palm Trees */}
        {config.showPalms && (
          <g id="palms-layer" fill="#090214" stroke={primary} strokeWidth="1.2">
            {/* Left Palm Tree */}
            <g transform="translate(100, 240) scale(0.85)">
              {/* Trunk */}
              <path d="M70,250 Q60,150 90,80 Q105,150 85,250 Z" />
              {/* Fronds */}
              <path d="M90,80 Q50,40 10,65 Q45,75 90,80" />
              <path d="M90,80 Q60,15 25,25 Q55,45 90,80" />
              <path d="M90,80 Q100,10 130,20 Q110,45 90,80" />
              <path d="M90,80 Q140,40 170,70 Q130,75 90,80" />
              <path d="M90,80 Q125,95 160,120 Q120,110 90,80" />
              <path d="M90,80 Q40,95 15,115 Q50,105 90,80" />
            </g>

            {/* Right Palm Tree */}
            <g transform="translate(600, 230) scale(0.9) scale(-1, 1) translate(-100, 0)">
              {/* Trunk */}
              <path d="M70,250 Q55,140 90,70 Q105,140 85,250 Z" />
              {/* Fronds */}
              <path d="M90,70 Q50,30 10,55 Q45,65 90,70" />
              <path d="M90,70 Q60,5 25,15 Q55,35 90,70" />
              <path d="M90,70 Q100,0 130,10 Q110,35 90,70" />
              <path d="M90,70 Q140,30 170,60 Q130,65 90,70" />
              <path d="M90,70 Q125,85 160,110 Q120,100 90,70" />
            </g>
          </g>
        )}

        {/* 7. Japanese Kanji Subtitle */}
        {config.showJapaneseText && (
          <g id="japanese-text-layer">
            <rect
              x="260"
              y="405"
              width="280"
              height="34"
              rx="6"
              fill="#06010f"
              fillOpacity="0.8"
              stroke={secondary}
              strokeWidth="1.5"
            />
            <text
              x="400"
              y="428"
              textAnchor="middle"
              fontFamily="'Noto Sans JP', sans-serif"
              fontSize="16"
              fontWeight="900"
              letterSpacing="6"
              fill={secondary}
              filter="url(#neonGlowCyan)"
            >
              {config.japaneseText || '月 面 ロ ー ル プ レ イ'}
            </text>
          </g>
        )}

        {/* 8. Main 3D Chrome Typography "MoonRP" */}
        <g id="main-typography" filter="url(#chromeBevel)">
          {/* Extruded Deep 3D Shadow Layers */}
          {[-6, -5, -4, -3, -2, -1].map((dy) => (
            <text
              key={`shadow-${dy}`}
              x="400"
              y={515 - dy}
              textAnchor="middle"
              fontFamily="'Righteous', 'Orbitron', 'Monoton', cursive"
              fontSize="92"
              fontWeight="900"
              letterSpacing="4"
              fill="#000000"
              opacity="0.6"
            >
              {config.title}
            </text>
          ))}

          {/* Neon Pink Under-Glow */}
          <text
            x="400"
            y="515"
            textAnchor="middle"
            fontFamily="'Righteous', 'Orbitron', 'Monoton', cursive"
            fontSize="92"
            fontWeight="900"
            letterSpacing="4"
            fill={primary}
            filter="url(#neonGlowPink)"
            opacity="0.9"
          >
            {config.title}
          </text>

          {/* High-Gloss Chrome Lettering */}
          <text
            x="400"
            y="515"
            textAnchor="middle"
            fontFamily="'Righteous', 'Orbitron', 'Monoton', cursive"
            fontSize="92"
            fontWeight="900"
            letterSpacing="4"
            fill="url(#chromeGrad)"
            stroke="#ffffff"
            strokeWidth="1.5"
          >
            {config.title}
          </text>
        </g>

        {/* 9. Subtitle Ribbon & Garry's Mod RP Tag */}
        <g id="subtitle-ribbon">
          {/* Laser Underline Bar */}
          <line
            x1="180"
            y1="540"
            x2="620"
            y2="540"
            stroke={secondary}
            strokeWidth="2.5"
            filter="url(#neonGlowCyan)"
          />
          <polygon
            points="390,536 400,544 410,536 400,528"
            fill={accent}
            filter="url(#neonGlowPink)"
          />

          {/* Subtitle Text */}
          <text
            x="400"
            y="575"
            textAnchor="middle"
            fontFamily="'Orbitron', 'VT323', sans-serif"
            fontSize="22"
            fontWeight="700"
            letterSpacing="8"
            fill="#ffffff"
            style={{ textShadow: `0 0 12px ${primary}` }}
          >
            {config.subtitle.toUpperCase()}
          </text>

          {/* Tagline / Mode */}
          <text
            x="400"
            y="608"
            textAnchor="middle"
            fontFamily="'VT323', monospace"
            fontSize="22"
            letterSpacing="3"
            fill={secondary}
            opacity="0.9"
          >
            {`[ ${config.tagline} • EST. ${config.establishedYear} ]`}
          </text>
        </g>

        {/* 10. Garry's Mod Server Badges */}
        {config.showBadges && (
          <g id="badges-layer" transform="translate(0, 640)">
            {/* Left Badge: GMOD DARKRP */}
            <g transform="translate(200, 0)">
              <rect
                x="-80"
                y="0"
                width="160"
                height="26"
                rx="6"
                fill="#000000"
                fillOpacity="0.7"
                stroke={primary}
                strokeWidth="1.2"
              />
              <text
                x="0"
                y="17"
                textAnchor="middle"
                fontFamily="'Orbitron', sans-serif"
                fontSize="11"
                fontWeight="700"
                letterSpacing="2"
                fill={primary}
              >
                GMOD ROLEPLAY
              </text>
            </g>

            {/* Right Badge: 64 SLOTS / TICKRATE 66 */}
            <g transform="translate(600, 0)">
              <rect
                x="-80"
                y="0"
                width="160"
                height="26"
                rx="6"
                fill="#000000"
                fillOpacity="0.7"
                stroke={secondary}
                strokeWidth="1.2"
              />
              <text
                x="0"
                y="17"
                textAnchor="middle"
                fontFamily="'Orbitron', sans-serif"
                fontSize="11"
                fontWeight="700"
                letterSpacing="2"
                fill={secondary}
              >
                CYBER DOWNTOWN
              </text>
            </g>
          </g>
        )}

        {/* 11. CRT Scanlines Overlay (Optional) */}
        {config.showScanlines && (
          <g id="scanlines-layer" opacity="0.18">
            {Array.from({ length: 80 }).map((_, i) => (
              <line
                key={`scan-${i}`}
                x1="0"
                y1={i * 10}
                x2="800"
                y2={i * 10}
                stroke="#ffffff"
                strokeWidth="1"
              />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
};
