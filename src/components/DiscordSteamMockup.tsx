import React from 'react';
import { LogoConfig } from '../types';
import { StaticLogo } from './StaticLogo';
import { Disc as Discord, ShieldCheck, Star, Users, ExternalLink, Globe } from 'lucide-react';

interface DiscordSteamMockupProps {
  config: LogoConfig;
}

export const DiscordSteamMockup: React.FC<DiscordSteamMockupProps> = ({ config }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full font-sans">
      {/* 1. Discord Server Profile Card */}
      <div className="bg-[#1e1f22] text-white rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl flex flex-col">
        {/* Discord Server Banner */}
        <div className="h-32 w-full bg-gradient-to-r from-purple-900 via-pink-900 to-indigo-950 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,42,133,0.3),transparent_70%)]" />
          <span className="font-['Orbitron'] text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-300">
            {config.title} • VAPORWAVE RP
          </span>
        </div>

        {/* Discord Avatar Overlap */}
        <div className="px-6 pb-6 pt-0 relative flex-1 flex flex-col">
          <div className="flex justify-between items-end -mt-12 mb-4">
            <div className="w-24 h-24 rounded-full p-1 bg-[#1e1f22] shadow-xl relative">
              <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center border-2 border-pink-500 shadow-[0_0_15px_rgba(255,42,133,0.6)]">
                <StaticLogo config={config} size={88} showBackground={true} />
              </div>
              <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#1e1f22]" />
            </div>
            <button className="px-4 py-1.5 bg-[#5865f2] hover:bg-[#4752c4] text-xs font-bold rounded-md flex items-center gap-1.5 transition-all shadow-md">
              <Discord className="w-3.5 h-3.5" /> Вступить в сервер
            </button>
          </div>

          <div className="space-y-3 flex-1">
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-lg font-bold text-white">{config.title} | Garry's Mod Community</h3>
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-xs text-slate-400 font-mono">discord.gg/moonrp • 2,490 участников</p>
            </div>

            <p className="text-xs text-slate-300 bg-[#2b2d31] p-3 rounded-lg border border-slate-700/50">
              🌆 Официальный Discord-сервер Garry's Mod MoonRP. Атмосфера 80-х, неоновый город, уникальные профессии, кастомный транспорт и ивенты!
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-1 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> 842 онлайн
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-slate-500" /> 2,490 всего
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Steam Community & Server Browser Card */}
      <div className="bg-[#171a21] text-white rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl flex flex-col p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-xs font-bold text-cyan-400">
              STEAM
            </div>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              GARRY'S MOD SERVER BROWSER
            </span>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
            CONNECT READY
          </span>
        </div>

        {/* Server Browser Listing Item */}
        <div className="bg-[#1b2838] p-3.5 rounded-xl border border-cyan-500/30 flex items-center gap-4 hover:border-cyan-400 transition-all cursor-pointer">
          <div className="w-14 h-14 rounded-lg overflow-hidden bg-black flex items-center justify-center border border-pink-500 shrink-0">
            <StaticLogo config={config} size={54} showBackground={true} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-white truncate font-mono">
              [RU] MoonRP | Vaporwave City | FastDL | No Lag
            </div>
            <div className="text-xs text-cyan-400 font-mono flex items-center gap-3 mt-1">
              <span>Карта: rp_downtown_moon</span>
              <span>Игроки: 62/64</span>
              <span>Пинг: 12ms</span>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <span className="text-xs font-bold px-3 py-1.5 rounded bg-gradient-to-r from-pink-500 to-cyan-500 text-white shadow-[0_0_10px_rgba(255,42,133,0.4)]">
              ПОДКЛЮЧИТЬСЯ
            </span>
          </div>
        </div>

        {/* Steam Group Profile Mockup */}
        <div className="bg-[#1b2838]/60 p-4 rounded-xl border border-slate-700/60 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400 p-0.5 bg-black">
              <StaticLogo config={config} size={44} showBackground={true} />
            </div>
            <div>
              <div className="text-sm font-bold text-white">MoonRP Official Steam Group</div>
              <div className="text-xs text-slate-400">steamcommunity.com/groups/moonrp_gmod</div>
            </div>
          </div>
          <div className="text-xs text-slate-300 font-mono">
            ★ Тег клана в игре: <span className="text-pink-400 font-bold">[MoonRP]</span> (+15% к зарплате на сервере)
          </div>
        </div>
      </div>
    </div>
  );
};
