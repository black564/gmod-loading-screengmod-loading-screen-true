import React from 'react';
import { LogoConfig } from '../types';
import { StaticLogo } from './StaticLogo';
import { Heart, Shield, DollarSign, Briefcase, Crosshair, MessageSquare } from 'lucide-react';

interface GmodHudMockupProps {
  config: LogoConfig;
}

export const GmodHudMockup: React.FC<GmodHudMockupProps> = ({ config }) => {
  return (
    <div className="w-full bg-[#0d071b] rounded-3xl overflow-hidden border border-pink-500/30 shadow-2xl relative min-h-[560px] flex flex-col justify-between p-6 select-none font-mono">
      {/* 3D Game World Simulation Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#110524] via-[#1a0836] to-[#0a0214] pointer-events-none" />

      {/* Wireframe City Perspective Grid Backdrop */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hudGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ff2a85" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hudGrid)" />
        </svg>
      </div>

      {/* In-Game Center Crosshair & Toolgun Info */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          <div className="w-6 h-6 border-2 border-cyan-400/80 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-ping" />
          </div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/70 px-3 py-1 rounded border border-cyan-500/40 text-[11px] text-cyan-300">
            Physgun: <span className="text-white font-bold">prop_physics (Neon Vending)</span>
          </div>
        </div>
      </div>

      {/* Top Bar: Left = MoonRP Watermark, Right = Server Stats & Time */}
      <div className="relative z-10 flex items-start justify-between">
        {/* Top Left: MoonRP Animated/Static Watermark */}
        <div className="bg-black/80 backdrop-blur-md rounded-2xl p-3 border border-pink-500/40 shadow-[0_0_20px_rgba(255,42,133,0.3)] flex items-center gap-3">
          <div className="w-14 h-14 relative flex items-center justify-center">
            <StaticLogo config={config} size={56} showBackground={false} />
          </div>
          <div>
            <div className="text-xs font-bold font-['Orbitron'] text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 tracking-wider">
              {config.title} // DARKRP
            </div>
            <div className="text-[10px] text-slate-400 flex items-center gap-2">
              <span className="text-emerald-400">● ONLINE</span>
              <span>FPS: 144</span>
              <span>PING: 14ms</span>
            </div>
          </div>
        </div>

        {/* Top Right: DarkRP Notifications */}
        <div className="bg-black/70 backdrop-blur-md rounded-xl p-3 border border-cyan-500/30 text-right space-y-1">
          <div className="text-xs text-yellow-300 font-bold">★ VIP ПРЕМИУМ АКТИВЕН</div>
          <div className="text-[10px] text-slate-300">Законы города: 1. Не носить оружие в открытую</div>
          <div className="text-[10px] text-pink-400 font-mono">MOONRP.NET // F4: МЕНЮ</div>
        </div>
      </div>

      {/* Bottom Bar: Left = Health / Armor / Job / Wallet, Right = Weapon Ammo */}
      <div className="relative z-10 flex flex-wrap items-end justify-between gap-4 mt-auto">
        {/* Player Stats Block */}
        <div className="bg-black/85 backdrop-blur-md rounded-2xl p-4 border border-purple-500/40 shadow-2xl min-w-[290px] space-y-2.5">
          {/* Health Bar */}
          <div>
            <div className="flex justify-between text-[11px] font-bold text-red-400 mb-1">
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> ЗДОРОВЬЕ
              </span>
              <span>100%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-red-500/30">
              <div className="h-full bg-gradient-to-r from-red-600 to-pink-500 rounded-full w-full shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            </div>
          </div>

          {/* Armor Bar */}
          <div>
            <div className="flex justify-between text-[11px] font-bold text-cyan-400 mb-1">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" /> БРОНЯ
              </span>
              <span>100%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-cyan-500/30">
              <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-300 rounded-full w-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            </div>
          </div>

          {/* Job & Salary */}
          <div className="pt-2 border-t border-purple-500/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-pink-300">
              <Briefcase className="w-3.5 h-3.5" />
              <span className="font-bold">Кибер-Синдикат</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-400 font-bold">
              <DollarSign className="w-3.5 h-3.5" />
              <span>$2,450,000</span>
            </div>
          </div>
        </div>

        {/* Chat message box simulation */}
        <div className="hidden md:block bg-black/75 backdrop-blur-md rounded-xl p-3 border border-pink-500/20 max-w-sm text-[11px] space-y-1">
          <div>
            <span className="text-pink-400 font-bold">[OOC] Neon_Gamer:</span>{' '}
            <span className="text-slate-300">Кто идет грабить неоновый банк на MoonRP?</span>
          </div>
          <div>
            <span className="text-cyan-400 font-bold">[СЕРВЕР]:</span>{' '}
            <span className="text-yellow-300">Счастливые часы! x2 зарплата для всех работ!</span>
          </div>
        </div>

        {/* Ammo Counter */}
        <div className="bg-black/85 backdrop-blur-md rounded-2xl p-4 border border-cyan-500/40 shadow-2xl flex items-center gap-4">
          <div className="text-right">
            <div className="text-[10px] text-cyan-400 uppercase tracking-widest">PHYSICS GUN</div>
            <div className="text-2xl font-bold font-['Orbitron'] text-white">∞ / ∞</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-pink-500 flex items-center justify-center text-black font-bold font-mono">
            ⚡
          </div>
        </div>
      </div>
    </div>
  );
};
