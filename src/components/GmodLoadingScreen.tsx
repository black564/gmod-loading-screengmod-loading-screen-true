import React, { useState, useEffect } from 'react';
import { LogoConfig } from '../types';
import { AnimatedLogo } from './AnimatedLogo';
import { StaticLogo } from './StaticLogo';
import { Server, Users, Wifi, Disc as DiscordIcon, ShieldAlert, Cpu, Music } from 'lucide-react';

interface GmodLoadingScreenProps {
  config: LogoConfig;
}

export const GmodLoadingScreen: React.FC<GmodLoadingScreenProps> = ({ config }) => {
  const [downloadProgress, setDownloadProgress] = useState(68);
  const [currentFile, setCurrentFile] = useState('models/player/vapor_cyber_cop.mdl');
  const [activeTab, setActiveTab] = useState<'rules' | 'staff' | 'updates'>('rules');

  // Simulated download progress
  useEffect(() => {
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) return 30;
        return prev + 1;
      });

      const files = [
        'models/player/vapor_cyber_cop.mdl',
        'materials/moonrp/hud_vapor_neon.vmt',
        'sound/moonrp/synth_ambient_loop.mp3',
        'maps/rp_downtown_moon_v2.bsp',
        'materials/models/weapons/v_physcannon.vtf',
        'lua/autorun/client/cl_moon_hud.lua',
      ];
      setCurrentFile(files[Math.floor(Math.random() * files.length)]);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#05010c] text-slate-100 rounded-3xl overflow-hidden border border-pink-500/40 shadow-2xl relative min-h-[640px] flex flex-col justify-between p-6 sm:p-10 font-sans">
      {/* Background ambient neon flare */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,42,133,0.15),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

      {/* Top Header Bar (Garry's Mod Server Connection Status) */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-purple-500/30 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-cyan-400 flex items-center justify-center font-bold text-black font-mono shadow-[0_0_15px_rgba(0,240,255,0.6)]">
            g
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                GARRY'S MOD // CONNECTING
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-mono border border-pink-500/30">
                sv_loadingurl
              </span>
            </div>
            <h2 className="text-lg font-bold font-['Orbitron'] text-white">
              [RU] MoonRP | Vaporwave Roleplay | Custom HUD & Cars
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-lg border border-cyan-500/30 text-cyan-300">
            <Server className="w-3.5 h-3.5" />
            <span>MAP: rp_downtown_moon</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-lg border border-pink-500/30 text-pink-300">
            <Users className="w-3.5 h-3.5" />
            <span>PLAYERS: 62 / 64</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-lg border border-emerald-500/30 text-emerald-300">
            <Wifi className="w-3.5 h-3.5" />
            <span>PING: 18ms</span>
          </div>
        </div>
      </div>

      {/* Main Center Content with the Animated Logo */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 my-6 items-center">
        {/* Left Side: Server Rules / Info */}
        <div className="lg:col-span-4 bg-black/70 backdrop-blur-md rounded-2xl p-5 border border-purple-500/30 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-purple-500/20 pb-2">
            <button
              onClick={() => setActiveTab('rules')}
              className={`text-xs font-mono font-bold px-2.5 py-1 rounded transition-all ${
                activeTab === 'rules'
                  ? 'bg-pink-500 text-white shadow-[0_0_10px_rgba(255,42,133,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ПРАВИЛА
            </button>
            <button
              onClick={() => setActiveTab('staff')}
              className={`text-xs font-mono font-bold px-2.5 py-1 rounded transition-all ${
                activeTab === 'staff'
                  ? 'bg-pink-500 text-white shadow-[0_0_10px_rgba(255,42,133,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              АДМИНИСТРАЦИЯ
            </button>
            <button
              onClick={() => setActiveTab('updates')}
              className={`text-xs font-mono font-bold px-2.5 py-1 rounded transition-all ${
                activeTab === 'updates'
                  ? 'bg-pink-500 text-white shadow-[0_0_10px_rgba(255,42,133,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ОБНОВЛЕНИЯ
            </button>
          </div>

          <div className="text-xs space-y-2.5 font-mono text-slate-300 min-h-[160px]">
            {activeTab === 'rules' && (
              <>
                <div className="flex items-start gap-2">
                  <span className="text-pink-400 font-bold">1.1</span>
                  <span>Запрещен RDM, FreeKill и NonRP поведение в неоновых зонах.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-pink-400 font-bold">1.2</span>
                  <span>Уважайте других игроков и поддерживайте атмосферу ретро-киберпанка.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-pink-400 font-bold">1.3</span>
                  <span>Использование микрофона разрешено с 14 лет (или адекватный голос).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-pink-400 font-bold">1.4</span>
                  <span>Physgun и Toolgun только для RP-построек без спам-пропов.</span>
                </div>
              </>
            )}
            {activeTab === 'staff' && (
              <>
                <div className="flex items-center justify-between p-2 rounded bg-purple-950/40 border border-purple-500/20">
                  <span className="text-cyan-300 font-bold">✦ Vapor_Admin</span>
                  <span className="text-[10px] text-pink-400">SERVER OWNER</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-purple-950/40 border border-purple-500/20">
                  <span className="text-cyan-300 font-bold">✦ Neon_Knight</span>
                  <span className="text-[10px] text-yellow-400">HEAD ADMIN</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-purple-950/40 border border-purple-500/20">
                  <span className="text-cyan-300 font-bold">✦ MoonCoder</span>
                  <span className="text-[10px] text-emerald-400">LUA DEV</span>
                </div>
              </>
            )}
            {activeTab === 'updates' && (
              <>
                <div className="text-emerald-400 font-bold">✓ Новая неоновая Downtown карта</div>
                <div className="text-slate-300">✓ Добавлен кастомный Physgun Beam с эффектом синтвейва</div>
                <div className="text-slate-300">✓ Музыкальный плеер в автомобилях с 80s радио</div>
              </>
            )}
          </div>

          <div className="mt-auto pt-3 border-t border-purple-500/20 flex items-center justify-between text-[11px] text-cyan-400 font-mono">
            <span>DISCORD.GG/MOONRP</span>
            <span className="text-pink-400">VK.COM/MOONRP</span>
          </div>
        </div>

        {/* Center/Right: The MoonRP Animated Logo */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center">
          <div className="max-w-[420px] w-full">
            <AnimatedLogo config={config} size={420} className="scale-95" />
          </div>
        </div>
      </div>

      {/* Bottom Loading Progress Bar */}
      <div className="relative z-10 flex flex-col gap-2 bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-cyan-500/30">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-cyan-300 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-pink-400 animate-spin" />
            ЗАГРУЗКА РЕСУРСОВ: <span className="text-white">{currentFile}</span>
          </span>
          <span className="text-pink-400 font-bold">{downloadProgress}%</span>
        </div>

        {/* Neon Progress Bar */}
        <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-purple-500/40">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 shadow-[0_0_12px_rgba(255,42,133,0.8)] transition-all duration-300"
            style={{ width: `${downloadProgress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-1">
          <span>Нажмите SPACE для переключения фоновой музыки</span>
          <span className="text-cyan-400">STEAM_0:1:71777322 • GARRY'S MOD 13</span>
        </div>
      </div>
    </div>
  );
};
