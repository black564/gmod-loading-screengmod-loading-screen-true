export type LogoStylePreset = 'cyber_crescent' | 'retro_horizon' | 'vapor_glitch' | 'neon_badge' | 'minimal_wireframe';

export type ColorTheme = 'classic_vapor' | 'miami_vice' | 'tokyo_cyber' | 'gmod_classic' | 'midnight_purple' | 'golden_sunset';

export interface LogoConfig {
  preset: LogoStylePreset;
  theme: ColorTheme;
  title: string;
  subtitle: string;
  japaneseText: string;
  tagline: string;
  establishedYear: string;
  
  // Visual Toggles
  showGmodIcon: boolean;
  showPhysgunBeam: boolean;
  showPalms: boolean;
  showGrid: boolean;
  showJapaneseText: boolean;
  showStars: boolean;
  showGlow: boolean;
  showScanlines: boolean;
  showVhsOverlay: boolean;
  showMountains: boolean;
  showBadges: boolean;
  
  // Customization Sliders
  glowIntensity: number; // 0.1 to 2
  gridSpeed: number; // 0.5 to 3
  glitchIntensity: number; // 0 to 10
  chromaticAberration: boolean;
  moonSize: number; // 0.8 to 1.3
  moonShape: 'crescent' | 'full_striped' | 'geometric' | 'eclipse';
  
  // Custom Colors override
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  gridColor: string;
  backgroundColor: string;
}

export interface ColorPalette {
  name: string;
  id: ColorTheme;
  primary: string; // Neon Pink / Magenta
  secondary: string; // Neon Cyan / Turquoise
  accent: string; // Sun Gold / Yellow
  text: string;
  grid: string;
  bg: string;
}

export const COLOR_THEMES: Record<ColorTheme, ColorPalette> = {
  classic_vapor: {
    name: 'Classic Vaporwave (Неон Розовый / Циан)',
    id: 'classic_vapor',
    primary: '#ff2a85',
    secondary: '#00f0ff',
    accent: '#ffe600',
    text: '#ffffff',
    grid: '#c026d3',
    bg: '#0c041d',
  },
  miami_vice: {
    name: 'Miami Sunset 1984 (Оранж / Маджента)',
    id: 'miami_vice',
    primary: '#ff007f',
    secondary: '#ff7700',
    accent: '#ffe600',
    text: '#ffffff',
    grid: '#e11d48',
    bg: '#150524',
  },
  tokyo_cyber: {
    name: 'Tokyo Cyberpunk (Электрик Лайм / Фиолет)',
    id: 'tokyo_cyber',
    primary: '#a855f7',
    secondary: '#06b6d4',
    accent: '#22c55e',
    text: '#f8fafc',
    grid: '#7c3aed',
    bg: '#050515',
  },
  gmod_classic: {
    name: "Garry's Mod Classic (GMod Blue / Physgun Orange)",
    id: 'gmod_classic',
    primary: '#0284c7',
    secondary: '#f97316',
    accent: '#38bdf8',
    text: '#ffffff',
    grid: '#0369a1',
    bg: '#04101e',
  },
  midnight_purple: {
    name: 'Deep Cosmos (Глубокий Космос / Аметист)',
    id: 'midnight_purple',
    primary: '#d946ef',
    secondary: '#818cf8',
    accent: '#38bdf8',
    text: '#ffffff',
    grid: '#9333ea',
    bg: '#060214',
  },
  golden_sunset: {
    name: 'Outrun Gold (Золотой Синтвейв)',
    id: 'golden_sunset',
    primary: '#f59e0b',
    secondary: '#ec4899',
    accent: '#fbbf24',
    text: '#ffffff',
    grid: '#d97706',
    bg: '#1a0814',
  },
};
