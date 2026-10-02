import React from 'react';
import { LogoConfig, LogoStylePreset, ColorTheme, COLOR_THEMES } from '../types';
import {
  Palette,
  Sliders,
  Sparkles,
  Type,
  Layers,
  Wand2,
  Tv,
  Gamepad2,
  RefreshCw,
  Sun,
  Moon,
} from 'lucide-react';

interface ControlsPanelProps {
  config: LogoConfig;
  onChange: (newConfig: LogoConfig) => void;
  onReset: () => void;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({ config, onChange, onReset }) => {
  const handlePresetSelect = (preset: LogoStylePreset) => {
    let updated = { ...config, preset };
    if (preset === 'cyber_crescent') {
      updated = {
        ...updated,
        moonShape: 'crescent',
        theme: 'classic_vapor',
        showPalms: true,
        showGrid: true,
        showPhysgunBeam: true,
        showGmodIcon: true,
        showMountains: true,
      };
    } else if (preset === 'retro_horizon') {
      updated = {
        ...updated,
        moonShape: 'full_striped',
        theme: 'miami_vice',
        showPalms: true,
        showGrid: true,
        showPhysgunBeam: false,
        showGmodIcon: false,
        showMountains: true,
      };
    } else if (preset === 'vapor_glitch') {
      updated = {
        ...updated,
        moonShape: 'crescent',
        theme: 'tokyo_cyber',
        glitchIntensity: 5,
        chromaticAberration: true,
        showVhsOverlay: true,
        showJapaneseText: true,
      };
    } else if (preset === 'neon_badge') {
      updated = {
        ...updated,
        moonShape: 'crescent',
        theme: 'gmod_classic',
        showBadges: true,
        showGmodIcon: true,
        showPhysgunBeam: true,
      };
    }
    onChange(updated);
  };

  const handleThemeSelect = (theme: ColorTheme) => {
    const pal = COLOR_THEMES[theme];
    onChange({
      ...config,
      theme,
      primaryColor: pal.primary,
      secondaryColor: pal.secondary,
      accentColor: pal.accent,
      gridColor: pal.grid,
      backgroundColor: pal.bg,
    });
  };

  return (
    <div className="bg-[#120726]/90 backdrop-blur-xl border border-pink-500/30 rounded-3xl p-6 shadow-2xl space-y-6 text-slate-200">
      {/* 1. Header & Reset */}
      <div className="flex items-center justify-between border-b border-purple-500/30 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-['Orbitron'] font-bold text-white text-base">НАСТРОЙКИ ЛОГОТИПА</h3>
            <p className="text-xs text-slate-400">Кастомизация формы, неонового свечения и цветов</p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="px-3 py-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900 border border-purple-500/40 text-xs font-mono text-cyan-300 flex items-center gap-1.5 transition-all"
          title="Сбросить к исходным настройкам"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Сброс
        </button>
      </div>

      {/* 2. Preset Style Buttons */}
      <div className="space-y-2.5">
        <label className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
          <Wand2 className="w-3.5 h-3.5" /> СТИЛИСТИЧЕСКИЕ ПРЕСЕТЫ
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'cyber_crescent', label: '🌙 Cyber Crescent', desc: 'Полумесяц + Physgun' },
            { id: 'retro_horizon', label: '🌅 Retro Horizon', desc: 'Полосатое солнце + Сетка' },
            { id: 'vapor_glitch', label: '📺 Vapor Glitch 95', desc: 'VHS глитч + Иероглифы' },
            { id: 'neon_badge', label: '⚡ GMod Neon Badge', desc: 'Эмблема Garry\'s Mod' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handlePresetSelect(item.id as LogoStylePreset)}
              className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                config.preset === item.id
                  ? 'bg-gradient-to-br from-pink-500/20 to-cyan-500/20 border-pink-400 shadow-[0_0_15px_rgba(255,42,133,0.3)]'
                  : 'bg-black/40 border-purple-500/20 hover:border-purple-400/50 hover:bg-black/60'
              }`}
            >
              <span className="text-xs font-bold text-white block">{item.label}</span>
              <span className="text-[10px] text-slate-400 mt-1 block">{item.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Color Palettes */}
      <div className="space-y-2.5">
        <label className="text-xs font-mono uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5" /> НЕОНОВЫЕ ЦВЕТОВЫЕ СХЕМЫ
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.values(COLOR_THEMES).map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeSelect(theme.id)}
              className={`p-2.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                config.theme === theme.id
                  ? 'bg-purple-900/40 border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                  : 'bg-black/40 border-purple-500/20 hover:border-purple-400/40'
              }`}
            >
              <div className="flex -space-x-1.5 shrink-0">
                <span
                  className="w-4 h-4 rounded-full border border-black shadow"
                  style={{ backgroundColor: theme.primary }}
                />
                <span
                  className="w-4 h-4 rounded-full border border-black shadow"
                  style={{ backgroundColor: theme.secondary }}
                />
                <span
                  className="w-4 h-4 rounded-full border border-black shadow"
                  style={{ backgroundColor: theme.accent }}
                />
              </div>
              <span className="text-xs font-medium text-slate-200 truncate">{theme.name.split(' (')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Text & Branding Customizer */}
      <div className="space-y-3">
        <label className="text-xs font-mono uppercase tracking-wider text-yellow-400 flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5" /> ТЕКСТ И НАЗВАНИЕ СЕРВЕРА
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1 font-mono">ГЛАВНЫЙ ЗАГОЛОВОК</label>
            <input
              type="text"
              value={config.title}
              onChange={(e) => onChange({ ...config, title: e.target.value })}
              className="w-full bg-black/60 border border-purple-500/40 rounded-xl px-3 py-2 text-sm font-bold font-['Orbitron'] text-cyan-300 focus:outline-none focus:border-pink-500"
              placeholder="MoonRP"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1 font-mono">ПОДЗАГОЛОВОК</label>
            <input
              type="text"
              value={config.subtitle}
              onChange={(e) => onChange({ ...config, subtitle: e.target.value })}
              className="w-full bg-black/60 border border-purple-500/40 rounded-xl px-3 py-2 text-sm font-bold font-['Orbitron'] text-pink-300 focus:outline-none focus:border-cyan-500"
              placeholder="GARRY'S MOD ROLEPLAY"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1 font-mono">ЯПОНСКИЙ ТЕКСТ (КАНДЗИ)</label>
            <input
              type="text"
              value={config.japaneseText}
              onChange={(e) => onChange({ ...config, japaneseText: e.target.value })}
              className="w-full bg-black/60 border border-purple-500/40 rounded-xl px-3 py-2 text-sm font-mono text-emerald-300 focus:outline-none focus:border-pink-500"
              placeholder="月 面 ロ ー ル プ レ イ"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1 font-mono">ТЕГЛАЙН / СЛОГАН</label>
            <input
              type="text"
              value={config.tagline}
              onChange={(e) => onChange({ ...config, tagline: e.target.value })}
              className="w-full bg-black/60 border border-purple-500/40 rounded-xl px-3 py-2 text-sm font-mono text-yellow-300 focus:outline-none focus:border-pink-500"
              placeholder="VAPORWAVE // DARKRP"
            />
          </div>
        </div>
      </div>

      {/* 5. Garry's Mod & Vapor Elements Toggles */}
      <div className="space-y-3">
        <label className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
          <Gamepad2 className="w-3.5 h-3.5" /> ЭЛЕМЕНТЫ GARRY'S MOD И VAPORWAVE
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
          {[
            { key: 'showGmodIcon', label: 'Логотип GMod "g"' },
            { key: 'showPhysgunBeam', label: 'Энергия Physgun' },
            { key: 'showGrid', label: '3D Сетка Horizon' },
            { key: 'showPalms', label: 'Пальмы 80-х' },
            { key: 'showMountains', label: 'Low-Poly Горы' },
            { key: 'showStars', label: 'Космос & Звезды' },
            { key: 'showJapaneseText', label: 'Японская плашка' },
            { key: 'showBadges', label: 'Серверные плашки' },
            { key: 'showVhsOverlay', label: 'VHS экран & VCR' },
            { key: 'showScanlines', label: 'CRT Скайнлайны' },
          ].map((toggle) => {
            const isChecked = (config as unknown as Record<string, boolean>)[toggle.key];
            return (
              <label
                key={toggle.key}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-pink-950/30 border-pink-500/50 text-white'
                    : 'bg-black/40 border-purple-500/20 text-slate-400 hover:text-slate-300'
                }`}
              >
                <span>{toggle.label}</span>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) =>
                    onChange({
                      ...config,
                      [toggle.key]: e.target.checked,
                    })
                  }
                  className="rounded bg-black border-purple-500 text-pink-500 focus:ring-0 w-4 h-4 cursor-pointer"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* 6. Sliders & Visual FX */}
      <div className="space-y-4 pt-2 border-t border-purple-500/30">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-slate-300">
              <span>НЕОНОВОЕ СВЕЧЕНИЕ:</span>
              <span className="text-pink-400 font-bold">{Math.round(config.glowIntensity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="2.0"
              step="0.1"
              value={config.glowIntensity}
              onChange={(e) => onChange({ ...config, glowIntensity: parseFloat(e.target.value) })}
              className="w-full accent-pink-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-slate-300">
              <span>СКОРОСТЬ СЕТКИ:</span>
              <span className="text-cyan-400 font-bold">{config.gridSpeed}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3.0"
              step="0.2"
              value={config.gridSpeed}
              onChange={(e) => onChange({ ...config, gridSpeed: parseFloat(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-slate-300">
              <span>VHS ГЛИТЧ:</span>
              <span className="text-yellow-400 font-bold">{config.glitchIntensity}/10</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={config.glitchIntensity}
              onChange={(e) => onChange({ ...config, glitchIntensity: parseInt(e.target.value) })}
              className="w-full accent-yellow-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Moon Shape Switch */}
        <div className="flex items-center gap-3 pt-2">
          <span className="text-xs font-mono text-slate-400">ФОРМА ЛУНЫ / СОЛНЦА:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onChange({ ...config, moonShape: 'crescent' })}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                config.moonShape === 'crescent'
                  ? 'bg-pink-500 text-white shadow-[0_0_10px_rgba(255,42,133,0.5)]'
                  : 'bg-black/50 text-slate-400 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5" /> Полумесяц Moon
            </button>
            <button
              onClick={() => onChange({ ...config, moonShape: 'full_striped' })}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                config.moonShape === 'full_striped'
                  ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(0,240,255,0.5)]'
                  : 'bg-black/50 text-slate-400 hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5" /> Полосатое Retro Sun
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
