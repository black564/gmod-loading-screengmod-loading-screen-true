import React, { useState } from 'react';
import { LogoConfig, COLOR_THEMES } from './types';
import { StaticLogo } from './components/StaticLogo';
import { AnimatedLogo } from './components/AnimatedLogo';
import { GmodLoadingScreen } from './components/GmodLoadingScreen';
import { GmodHudMockup } from './components/GmodHudMockup';
import { DiscordSteamMockup } from './components/DiscordSteamMockup';
import { GmodCodeGenerator } from './components/GmodCodeGenerator';
import { ControlsPanel } from './components/ControlsPanel';
import { ExportModal } from './components/ExportModal';
import { vaporSynth } from './utils/audioSynth';
import {
  Image as ImageIcon,
  Play,
  Columns2,
  Tv,
  LayoutTemplate,
  MessageSquare,
  Download,
  Volume2,
  VolumeX,
  Sparkles,
  Sliders,
  Flame,
  Radio,
  Gamepad2,
  Moon,
  Terminal,
} from 'lucide-react';

const INITIAL_CONFIG: LogoConfig = {
  preset: 'cyber_crescent',
  theme: 'classic_vapor',
  title: 'MoonRP',
  subtitle: "GARRY'S MOD ROLEPLAY",
  japaneseText: '月 面 ロ ー ル プ レ イ',
  tagline: 'VAPORWAVE // DARKRP',
  establishedYear: '2026',

  showGmodIcon: true,
  showPhysgunBeam: true,
  showPalms: true,
  showGrid: true,
  showJapaneseText: true,
  showStars: true,
  showGlow: true,
  showScanlines: true,
  showVhsOverlay: true,
  showMountains: true,
  showBadges: true,

  glowIntensity: 1.0,
  gridSpeed: 1.0,
  glitchIntensity: 3,
  chromaticAberration: true,
  moonSize: 1.0,
  moonShape: 'crescent',

  primaryColor: '#ff2a85',
  secondaryColor: '#00f0ff',
  accentColor: '#ffe600',
  textColor: '#ffffff',
  gridColor: '#c026d3',
  backgroundColor: '#0c041d',
};

export default function App() {
  const [config, setConfig] = useState<LogoConfig>(INITIAL_CONFIG);
  const [activeTab, setActiveTab] = useState<
    'static' | 'animated' | 'compare' | 'loading' | 'hud' | 'branding' | 'guide'
  >('compare');
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [transparentBg, setTransparentBg] = useState<boolean>(false);

  const handleAudioToggle = () => {
    const isPlaying = vaporSynth.toggle();
    setIsAudioPlaying(isPlaying);
  };

  const handleReset = () => {
    setConfig(INITIAL_CONFIG);
  };

  return (
    <div className="min-h-screen bg-[#070114] text-slate-100 flex flex-col font-sans selection:bg-pink-500 selection:text-white">
      {/* Top Vaporwave Ambient Neon Header Glow */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-cyan-400 via-purple-500 to-yellow-400 z-50 shadow-[0_0_20px_rgba(255,42,133,0.8)]" />

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0c031d]/90 backdrop-blur-xl border-b border-purple-500/30 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Brand Logo Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('compare')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-cyan-400 flex items-center justify-center p-0.5 shadow-[0_0_15px_rgba(255,42,133,0.6)]">
              <div className="w-full h-full bg-[#0c031d] rounded-[14px] flex items-center justify-center">
                <Moon className="w-5 h-5 text-pink-400 fill-pink-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Righteous'] text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400">
                  MoonRP
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                  Vaporwave Studio
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 block -mt-0.5">
                Garry's Mod Brand Identity • 80s Retrowave
              </span>
            </div>
          </div>

          {/* Action Buttons: Audio Synthesizer & Export Suite */}
          <div className="flex items-center gap-2.5">
            {/* 80s Ambient Synthesizer Button */}
            <button
              onClick={handleAudioToggle}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all border ${
                isAudioPlaying
                  ? 'bg-pink-500/25 text-pink-300 border-pink-400 shadow-[0_0_18px_rgba(255,42,133,0.5)] animate-pulse'
                  : 'bg-black/50 text-slate-300 border-purple-500/30 hover:border-cyan-400 hover:text-cyan-300'
              }`}
              title="Фоновая музыка в стиле 80s Vaporwave Synthwave (Web Audio API)"
            >
              {isAudioPlaying ? <Volume2 className="w-4 h-4 text-pink-400" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">
                {isAudioPlaying ? 'SYNTHWAVE: ON' : 'ВКЛ. 80s МУЗЫКУ'}
              </span>
            </button>

            {/* Export Modal Trigger Button */}
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:from-pink-400 hover:to-cyan-400 text-white text-xs font-bold font-['Orbitron'] flex items-center gap-2 shadow-[0_0_20px_rgba(255,42,133,0.4)] transition-all transform hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>СКАЧАТЬ / ЭКСПОРТ</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs Bar */}
      <div className="bg-[#0e0422] border-b border-purple-500/20 px-4 sm:px-8 py-2 sticky top-[61px] z-30 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
          {[
            { id: 'compare', label: '⚡ Сравнение 1 и 2', icon: Columns2, badge: 'Рекомендуется' },
            { id: 'static', label: '1. Статичный логотип', icon: ImageIcon, badge: 'SVG / PNG' },
            { id: 'animated', label: '2. Анимированный логотип', icon: Play, badge: '60 FPS Live' },
            { id: 'loading', label: '🎮 Экран загрузки GMod', icon: Tv },
            { id: 'hud', label: '🏙️ DarkRP HUD & Водяной знак', icon: LayoutTemplate },
            { id: 'branding', label: '🌐 Discord & Steam', icon: MessageSquare },
            { id: 'guide', label: '💻 Инструкция и Lua-код', icon: Terminal, badge: 'DarkRP' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/30 text-white border border-pink-500/60 shadow-[0_0_12px_rgba(255,42,133,0.3)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-pink-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-sans uppercase ${
                      isActive ? 'bg-pink-500 text-white' : 'bg-purple-950 text-purple-300'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Showcase */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-8 space-y-8">
        {/* Banner Explainer for Garry's Mod MoonRP */}
        <div className="bg-gradient-to-r from-purple-950/40 via-pink-950/30 to-cyan-950/40 border border-pink-500/30 rounded-3xl p-6 relative overflow-hidden backdrop-blur-md">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-mono font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> GARRY'S MOD VAPORWAVE BRANDING
                </span>
                <span className="text-xs font-mono text-cyan-400">#MoonRP #Retrowave #DarkRP</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold font-['Orbitron'] text-white">
                Фирменный стиль и два варианта логотипа для сервера "MoonRP"
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
                Разработаны 2 полноценных варианта в культовой стилистике 80s/90s Vaporwave & Synthwave:
                векторный статичный логотип с хромированным шрифтом и анимированная версия с 3D-сеткой горизонта, вращающимся полумесяцем и энергией Garry's Mod Physgun.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setIsExportModalOpen(true)}
                className="px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold font-['Orbitron'] flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
              >
                <Download className="w-4 h-4" /> ЭКСПОРТИРОВАТЬ ФАЙЛЫ
              </button>
            </div>
          </div>
        </div>

        {/* TAB 1: SIDE-BY-SIDE COMPARE (Default) */}
        {activeTab === 'compare' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Option 1: Static Logo */}
              <div className="bg-[#120726]/80 rounded-3xl p-6 border border-purple-500/30 flex flex-col items-center justify-between relative shadow-2xl">
                <div className="w-full flex items-center justify-between border-b border-purple-500/20 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-mono text-xs font-bold border border-pink-500/30">
                      ВАРИАНТ 1
                    </span>
                    <h3 className="font-['Orbitron'] font-bold text-white text-base">
                      Статичный логотип (Vector / PNG)
                    </h3>
                  </div>
                  <button
                    onClick={() => setTransparentBg(!transparentBg)}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-black/50 text-cyan-300 border border-cyan-500/30 hover:bg-black/80"
                  >
                    {transparentBg ? 'Фон: Прозрачный' : 'Фон: Неон Градиент'}
                  </button>
                </div>

                <div className="w-full max-w-[440px] aspect-square flex items-center justify-center my-4">
                  <StaticLogo
                    config={config}
                    size={440}
                    showBackground={!transparentBg}
                    id="moonrp-static-svg"
                  />
                </div>

                <div className="w-full pt-4 border-t border-purple-500/20 flex items-center justify-between text-xs font-mono text-slate-300">
                  <span>✦ Идеально для аватарок, мерча, баннеров и HUD</span>
                  <button
                    onClick={() => setActiveTab('static')}
                    className="text-pink-400 hover:text-pink-300 font-bold underline"
                  >
                    Подробнее →
                  </button>
                </div>
              </div>

              {/* Option 2: Animated Logo */}
              <div className="bg-[#120726]/80 rounded-3xl p-6 border border-pink-500/40 flex flex-col items-center justify-between relative shadow-[0_0_30px_rgba(255,42,133,0.15)]">
                <div className="w-full flex items-center justify-between border-b border-pink-500/20 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
                      ВАРИАНТ 2
                    </span>
                    <h3 className="font-['Orbitron'] font-bold text-white text-base">
                      Анимированный логотип (Live 60FPS)
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-pink-400 flex items-center gap-1">
                    <Radio className="w-3 h-3 animate-pulse" />
                    REALTIME CANVAS
                  </span>
                </div>

                <div className="w-full max-w-[440px] aspect-square flex items-center justify-center my-4">
                  <AnimatedLogo config={config} size={440} />
                </div>

                <div className="w-full pt-4 border-t border-purple-500/20 flex items-center justify-between text-xs font-mono text-slate-300">
                  <span>✦ Идеально для экрана загрузки GMod и Web-баннеров</span>
                  <button
                    onClick={() => setActiveTab('animated')}
                    className="text-cyan-400 hover:text-cyan-300 font-bold underline"
                  >
                    Подробнее →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ONLY STATIC LOGO */}
        {activeTab === 'static' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-[#120726]/90 rounded-3xl p-6 sm:p-10 border border-purple-500/30 flex flex-col items-center shadow-2xl">
              <div className="w-full flex items-center justify-between border-b border-purple-500/30 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold font-['Orbitron'] text-white">
                    Статичный логотип MoonRP
                  </h2>
                  <p className="text-xs text-cyan-400 font-mono">
                    SVG векторная графика с хромированным 3D-текстом и японским субтитром
                  </p>
                </div>
                <button
                  onClick={() => setTransparentBg(!transparentBg)}
                  className="px-3 py-1.5 rounded-lg bg-purple-950/80 border border-purple-500/40 text-xs font-mono text-cyan-300"
                >
                  {transparentBg ? 'Фон: Прозрачный' : 'Фон: Градиент'}
                </button>
              </div>

              <div className="w-full max-w-[540px] aspect-square flex items-center justify-center">
                <StaticLogo
                  config={config}
                  size={540}
                  showBackground={!transparentBg}
                  id="moonrp-static-svg"
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsExportModalOpen(true)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-['Orbitron'] font-bold text-xs flex items-center gap-2 shadow-lg"
                >
                  <Download className="w-4 h-4" /> СКАЧАТЬ ВЫСОКОЕ РАЗРЕШЕНИЕ (PNG/SVG)
                </button>
              </div>
            </div>

            {/* Controls sidebar */}
            <div className="lg:col-span-5">
              <ControlsPanel config={config} onChange={setConfig} onReset={handleReset} />
            </div>
          </div>
        )}

        {/* TAB 3: ONLY ANIMATED LOGO */}
        {activeTab === 'animated' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-[#120726]/90 rounded-3xl p-6 sm:p-10 border border-pink-500/40 flex flex-col items-center shadow-2xl">
              <div className="w-full flex items-center justify-between border-b border-pink-500/30 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold font-['Orbitron'] text-white">
                    Анимированный 60FPS логотип MoonRP
                  </h2>
                  <p className="text-xs text-pink-400 font-mono">
                    Бесконечная 3D-сетка, вращающийся полумесяц, Physgun искры и VHS-эффект
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-mono border border-pink-500/30">
                  Web Audio + Canvas 2D
                </span>
              </div>

              <div className="w-full max-w-[540px] aspect-square flex items-center justify-center">
                <AnimatedLogo config={config} size={540} />
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={handleAudioToggle}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold font-['Orbitron'] flex items-center gap-2 border transition-all ${
                    isAudioPlaying
                      ? 'bg-pink-500 text-white border-pink-400 shadow-[0_0_20px_rgba(255,42,133,0.6)]'
                      : 'bg-black/60 text-cyan-300 border-cyan-500/40 hover:bg-black/80'
                  }`}
                >
                  {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span>{isAudioPlaying ? 'МУЗЫКА СИНТЕЗАТОРА АКТИВНА' : 'ВКЛЮЧИТЬ 80s САУНДТРЕК'}</span>
                </button>

                <button
                  onClick={() => setIsExportModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-['Orbitron'] font-bold text-xs flex items-center gap-2 shadow-lg"
                >
                  <Download className="w-4 h-4" /> ЗАПИСАТЬ WEBM ВИДЕО
                </button>
              </div>
            </div>

            {/* Controls sidebar */}
            <div className="lg:col-span-5">
              <ControlsPanel config={config} onChange={setConfig} onReset={handleReset} />
            </div>
          </div>
        )}

        {/* TAB 4: GMOD LOADING SCREEN SIMULATOR */}
        {activeTab === 'loading' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-['Orbitron'] text-white">
                  Симулятор экрана загрузки Garry's Mod (sv_loadingurl)
                </h2>
                <p className="text-xs text-cyan-300 font-mono">
                  Так выглядит логотип MoonRP при подключении игрока на сервер
                </p>
              </div>
              <button
                onClick={() => setIsExportModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-purple-950 border border-purple-500/40 text-xs font-mono text-cyan-300"
              >
                Получить HTML код загрузочного экрана
              </button>
            </div>
            <GmodLoadingScreen config={config} />
          </div>
        )}

        {/* TAB 5: GMOD DARKRP HUD */}
        {activeTab === 'hud' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold font-['Orbitron'] text-white">
                Garry's Mod DarkRP HUD и водяной знак MoonRP
              </h2>
              <p className="text-xs text-pink-300 font-mono">
                Интеграция логотипа в левый верхний угол игрового интерфейса (HUD Watermark)
              </p>
            </div>
            <GmodHudMockup config={config} />
          </div>
        )}

        {/* TAB 6: DISCORD & STEAM COMMUNITY SHOWCASE */}
        {activeTab === 'branding' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold font-['Orbitron'] text-white">
                Брендинг сообщества: Discord, Steam и поиск серверов GMod
              </h2>
              <p className="text-xs text-cyan-300 font-mono">
                Превью аватарки сервера, баннера сообщества и карточки в списке серверов
              </p>
            </div>
            <DiscordSteamMockup config={config} />
          </div>
        )}

        {/* TAB 7: GMOD LUA & SERVER INTEGRATION GUIDE */}
        {activeTab === 'guide' && (
          <div className="space-y-6">
            <GmodCodeGenerator config={config} />
          </div>
        )}

        {/* Bottom Customizer Panel if on Compare Tab */}
        {activeTab === 'compare' && (
          <div className="mt-8">
            <ControlsPanel config={config} onChange={setConfig} onReset={handleReset} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-purple-500/30 bg-[#090216] py-6 px-4 text-center text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ff2a85]" />
            <span className="text-white font-bold font-['Orbitron']">MoonRP Garry's Mod</span>
            <span>• 80s/90s Vaporwave Brand System</span>
          </div>
          <div className="text-slate-500">
            Разработано со статичным и анимированным вариантами логотипа, WebM рекордером и SVG экспортом.
          </div>
        </div>
      </footer>

      {/* Export & Download Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        config={config}
      />
    </div>
  );
}
