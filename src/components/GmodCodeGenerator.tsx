import React, { useState } from 'react';
import { LogoConfig } from '../types';
import JSZip from 'jszip';
import { triggerExportConfetti } from '../utils/exportUtils';
import {
  Code2,
  Copy,
  Check,
  FileCode,
  Server,
  Terminal,
  Download,
  FolderArchive,
  PackageCheck,
  Sparkles,
} from 'lucide-react';

interface GmodCodeGeneratorProps {
  config: LogoConfig;
}

export const GmodCodeGenerator: React.FC<GmodCodeGeneratorProps> = ({ config }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState<boolean>(false);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleDownloadAddonZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();

      // 1. Lua files
      zip.file('garrysmod/lua/autorun/client/cl_moonrp_hud.lua', luaHudCode);
      zip.file(
        'garrysmod/lua/autorun/server/sv_resources.lua',
        `-- MoonRP - Auto-download resources to clients\nresource.AddFile("materials/moonrp/logo_512.png")\n`
      );

      // 2. Loading screen
      zip.file('loading_screen/index.html', loadingHtmlCode);

      // 3. Server CFG snippet
      zip.file('garrysmod/cfg/moonrp_server_snippet.cfg', serverCfgCode);

      // 4. Instructions Readme
      const readmeText = `=====================================================
MoonRP (Garry's Mod / DarkRP) - Vaporwave Brand Addon
=====================================================

ИНСТРУКЦИЯ ПО УСТАНОВКЕ:

1. ЭКРАН ЗАГРУЗКИ (LOADING SCREEN):
   - Загрузите папку 'loading_screen/' на ваш веб-хостинг (например: https://moonrp.ru/loading/).
   - В 'garrysmod/cfg/server.cfg' добавьте:
     sv_loadingurl "https://moonrp.ru/loading/?steamid=%s&mapname=%m"

2. ИГРОВОЙ HUD (ВОДЯНОЙ ЗНАК В ИГРЕ):
   - Скопируйте папку 'garrysmod/' в корень вашего сервера Garry's Mod.
   - Файлы автоматически разместятся в:
     * garrysmod/lua/autorun/client/cl_moonrp_hud.lua
     * garrysmod/lua/autorun/server/sv_resources.lua
     * garrysmod/materials/moonrp/logo_512.png

3. ПЕРЕЗАПУСТИТЕ СЕРВЕР:
   - Введите 'changelevel rp_downtown' или перезагрузите сервер.
`;
      zip.file('README_MOONRP_INSTALL.txt', readmeText);

      // 5. Generate PNG image from SVG element
      const svg = document.getElementById('moonrp-static-svg');
      if (svg) {
        const serializer = new XMLSerializer();
        const svgStr = serializer.serializeToString(svg);
        const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
        const URLObj = window.URL || window.webkitURL || window;
        const blobURL = URLObj.createObjectURL(svgBlob);

        const img = new Image();
        img.src = blobURL;
        await new Promise((resolve) => {
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, 512, 512);
              canvas.toBlob((blob) => {
                if (blob) {
                  zip.file('garrysmod/materials/moonrp/logo_512.png', blob);
                }
                URLObj.revokeObjectURL(blobURL);
                resolve(true);
              }, 'image/png');
            } else {
              resolve(false);
            }
          };
          img.onerror = () => resolve(false);
        });
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'moonrp_gmod_darkrp_addon.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      triggerExportConfetti();
    } catch (err) {
      console.error('Error creating addon zip:', err);
    } finally {
      setIsZipping(false);
    }
  };

  const luaHudCode = `--[[
  MoonRP - DarkRP In-Game HUD Watermark & Brand Overlay
  Файл: garrysmod/lua/autorun/client/cl_moonrp_hud.lua
]]--

if not CLIENT then return end

-- Подгружаем материал логотипа (поместите в garrysmod/materials/moonrp/logo_512.png или .vtf)
local LOGO_MAT = Material("moonrp/logo_512.png", "noclamp smooth")
local COLOR_CYAN = Color(0, 240, 255, 255)
local COLOR_PINK = Color(255, 42, 133, 255)
local COLOR_BG = Color(10, 3, 24, 210)

surface.CreateFont("MoonRP_Watermark_Title", {
    font = "Orbitron", -- или Roboto / Arial если шрифт не установлен
    size = 18,
    weight = 800,
    antialias = true,
    shadow = true
})

surface.CreateFont("MoonRP_Watermark_Sub", {
    font = "Arial",
    size = 12,
    weight = 600,
    antialias = true
})

hook.Add("HUDPaint", "MoonRP_DrawLogoWatermark", function()
    -- Позиция в правом или левом верхнем углу
    local padding = 20
    local boxW = 220
    local boxH = 64
    local x = ScrW() - boxW - padding
    local y = padding

    -- Полупрозрачная неоновая подложка
    draw.RoundedBox(8, x, y, boxW, boxH, COLOR_BG)

    -- Неоновая рамка
    surface.SetDrawColor(COLOR_PINK)
    surface.DrawOutlinedRect(x, y, boxW, boxH, 1)

    -- Отрисовка логотипа MoonRP
    surface.SetDrawColor(255, 255, 255, 255)
    surface.SetMaterial(LOGO_MAT)
    surface.DrawTexturedRect(x + 8, y + 8, 48, 48)

    -- Текст MoonRP
    draw.SimpleText("${config.title}", "MoonRP_Watermark_Title", x + 64, y + 14, COLOR_CYAN, TEXT_ALIGN_LEFT)
    draw.SimpleText("DARKRP // ${config.tagline}", "MoonRP_Watermark_Sub", x + 64, y + 36, Color(200, 200, 220, 230), TEXT_ALIGN_LEFT)
end)

print("[MoonRP] Custom Vaporwave HUD Loaded successfully!")`;

  const serverCfgCode = `// ==========================================
// MoonRP - server.cfg (Экран загрузки и FastDL)
// ==========================================

// 1. Указываем ссылку на веб-экран загрузки MoonRP
// Параметры %s (SteamID64) и %m (Название карты) передаются автоматически
sv_loadingurl "https://ваш-сайт.ru/loading/?steamid=%s&mapname=%m"

// 2. Настройки FastDL (быстрая загрузка контента)
sv_downloadurl "https://fastdl.ваш-сайт.ru/garrysmod/"
sv_allowdownload 1
sv_allowupload 0`;

  const loadingHtmlCode = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>MoonRP Loading Screen</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #06010e;
      color: #fff;
      font-family: 'Righteous', 'Orbitron', sans-serif;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 40px;
      overflow: hidden;
    }
    .grid-bg {
      position: absolute;
      inset: 0;
      background: linear-gradient(rgba(255,42,133,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,240,255,0.1) 1px, transparent 1px);
      background-size: 40px 40px;
      transform: perspective(400px) rotateX(45deg);
      transform-origin: bottom;
      z-index: 1;
    }
    .logo-container {
      position: relative;
      z-index: 10;
      text-align: center;
      margin: auto;
    }
    .logo-video {
      width: 480px;
      height: 480px;
      filter: drop-shadow(0 0 35px #ff2a85);
    }
    .progress-box {
      position: relative;
      z-index: 10;
      background: rgba(10,3,24,0.85);
      border: 1px solid #00f0ff;
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 0 20px rgba(0,240,255,0.3);
    }
    .bar {
      height: 10px;
      background: #110426;
      border-radius: 5px;
      overflow: hidden;
      margin-top: 8px;
    }
    .bar-fill {
      width: 0%;
      height: 100%;
      background: linear-gradient(90deg, #00f0ff, #ff2a85, #ffe600);
      transition: width 0.3s ease;
    }
  </style>
</head>
<body>
  <div class="grid-bg"></div>

  <!-- Верхняя панель -->
  <div style="position:relative; z-index:10; display:flex; justify-content:space-between;">
    <h1 style="color:#00f0ff; font-size:24px;">MoonRP // GARRYS MOD</h1>
    <div id="map-name" style="color:#ff2a85; font-family:monospace;">MAP: Загрузка...</div>
  </div>

  <!-- Центральное лого (WebM видео или PNG) -->
  <div class="logo-container">
    <video autoplay loop muted playsinline class="logo-video">
      <source src="moonrp-animation.webm" type="video/webm">
      <img src="moonrp-logo.png" alt="MoonRP">
    </video>
  </div>

  <!-- Статус загрузки Garry's Mod -->
  <div class="progress-box">
    <div style="display:flex; justify-content:space-between; font-family:monospace; font-size:13px;">
      <span id="status-text" style="color:#00f0ff;">ПОДКЛЮЧЕНИЕ К СЕРВЕРУ...</span>
      <span id="percent-text" style="color:#ff2a85;">0%</span>
    </div>
    <div class="bar"><div id="bar-fill" class="bar-fill"></div></div>
  </div>

  <!-- Стандартные JS функции Garry's Mod Loading API -->
  <script>
    var totalFiles = 100;
    var filesNeeded = 100;

    function GameDetails(servername, serverurl, mapname, maxplayers, steamid, gamemode) {
      document.getElementById('map-name').innerText = 'КАРТА: ' + mapname;
    }

    function SetFilesTotal(total) {
      totalFiles = total;
    }

    function SetFilesNeeded(needed) {
      filesNeeded = needed;
      var progress = Math.max(0, Math.min(100, Math.round(((totalFiles - needed) / totalFiles) * 100)));
      document.getElementById('bar-fill').style.width = progress + '%';
      document.getElementById('percent-text').innerText = progress + '%';
    }

    function DownloadingFile(filename) {
      document.getElementById('status-text').innerText = 'ЗАГРУЗКА: ' + filename;
    }

    function SetStatusChanged(status) {
      document.getElementById('status-text').innerText = status.toUpperCase();
    }
  </script>
</body>
</html>`;

  const dhtmlHudCode = `--[[
  MoonRP - Анимированный 60FPS Web-HUD через DHTML
  Файл: garrysmod/lua/autorun/client/cl_moonrp_dhtml_hud.lua
]]--

if not CLIENT then return end

local MoonHUDPanel = nil

hook.Add("InitPostEntity", "MoonRP_CreateDHTML_HUD", function()
    if IsValid(MoonHUDPanel) then MoonHUDPanel:Remove() end

    MoonHUDPanel = vgui.Create("DHTML")
    MoonHUDPanel:SetPos(ScrW() - 240, 20)
    MoonHUDPanel:SetSize(220, 220)
    MoonHUDPanel:SetMouseInputEnabled(false)

    -- Открываем локальный HTML файл или Web-страницу с живым анимированным логотипом
    MoonHUDPanel:SetHTML([[
        <!DOCTYPE html>
        <html>
        <body style="margin:0; background:transparent; overflow:hidden; display:flex; align-items:center; justify-content:center;">
          <img src="https://ваш-сайт.ru/logo-anim.gif" style="width:200px; filter:drop-shadow(0 0 15px #ff2a85);">
        </body>
        </html>
    ]])
end)`;

  return (
    <div className="space-y-8 text-slate-200 font-sans">
      {/* Overview Card */}
      <div className="bg-[#120726]/90 border border-purple-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-purple-500/30 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-500 to-pink-500 text-black font-bold">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-['Orbitron'] text-white">
                ПОШАГОВОЕ РУКОВОДСТВО ПО ИНТЕГРАЦИИ (GARRYS MOD / DARKRP)
              </h2>
              <p className="text-xs text-cyan-300 font-mono">
                Готовые файлы Lua, HTML5 для экрана загрузки и настройки server.cfg
              </p>
            </div>
          </div>

          <button
            onClick={handleDownloadAddonZip}
            disabled={isZipping}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-400 hover:to-cyan-300 text-black font-['Orbitron'] font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(255,42,133,0.5)] transition-all transform hover:scale-105 shrink-0"
          >
            <FolderArchive className="w-4 h-4 text-black" />
            <span>{isZipping ? 'СБОРКА АРХИВА...' : 'СКАЧАТЬ ГОТОВЫЙ АДДОН (ZIP)'}</span>
          </button>
        </div>

        {/* Step 1: Loading Screen */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-pink-500 text-white font-bold text-xs flex items-center justify-center font-mono">
                1
              </span>
              <h3 className="font-bold text-base text-white font-['Orbitron']">
                ЭКРАН ЗАГРУЗКИ (sv_loadingurl)
              </h3>
            </div>
            <button
              onClick={() => copyToClipboard(loadingHtmlCode, 'loading_html')}
              className="px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow"
            >
              {copiedKey === 'loading_html' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedKey === 'loading_html' ? 'СКОПИРОВАНО!' : 'СКОПИРОВАТЬ INDEX.HTML'}
            </button>
          </div>
          <p className="text-xs text-slate-300">
            1. Загрузите файл <code className="text-pink-400 bg-black/60 px-1.5 py-0.5 rounded">index.html</code> и видео <code className="text-cyan-300 bg-black/60 px-1.5 py-0.5 rounded">moonrp-animation.webm</code> (или PNG логотип) на ваш веб-хостинг (например: <code className="text-yellow-300">https://moonrp.ru/loading/</code>).<br />
            2. В <code className="text-pink-400 bg-black/60 px-1.5 py-0.5 rounded">server.cfg</code> пропишите команду:
          </p>

          <div className="relative">
            <pre className="bg-[#090214] p-4 rounded-xl border border-cyan-500/30 text-xs font-mono text-cyan-300 overflow-x-auto">
              {serverCfgCode}
            </pre>
            <button
              onClick={() => copyToClipboard(serverCfgCode, 'server_cfg')}
              className="absolute top-3 right-3 px-2.5 py-1 rounded bg-purple-950/80 hover:bg-purple-900 text-[11px] font-mono text-slate-300 border border-purple-500/30 flex items-center gap-1"
            >
              {copiedKey === 'server_cfg' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              Копировать cfg
            </button>
          </div>
        </div>

        {/* Step 2: DarkRP HUD */}
        <div className="space-y-3 pt-6 border-t border-purple-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-400 text-black font-bold text-xs flex items-center justify-center font-mono">
                2
              </span>
              <h3 className="font-bold text-base text-white font-['Orbitron']">
                ИГРОВОЙ ВОДЯНОЙ ЗНАК HUD (LUA ХУК HUDPaint)
              </h3>
            </div>
            <button
              onClick={() => copyToClipboard(luaHudCode, 'lua_hud')}
              className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow"
            >
              {copiedKey === 'lua_hud' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedKey === 'lua_hud' ? 'СКОПИРОВАНО!' : 'СКОПИРОВАТЬ CL_MOONRP_HUD.LUA'}
            </button>
          </div>

          <p className="text-xs text-slate-300">
            1. Скачайте PNG логотип (кнопка <strong>«Скачать / Экспорт»</strong> в верхнем меню) и сохраните в папку сервера: <code className="text-pink-400 bg-black/60 px-1.5 py-0.5 rounded">garrysmod/materials/moonrp/logo_512.png</code>.<br />
            2. Создайте файл <code className="text-cyan-300 bg-black/60 px-1.5 py-0.5 rounded">garrysmod/lua/autorun/client/cl_moonrp_hud.lua</code> и вставьте следующий код:
          </p>

          <div className="relative">
            <pre className="bg-[#090214] p-4 rounded-xl border border-purple-500/30 text-xs font-mono text-pink-300 overflow-x-auto max-h-64">
              {luaHudCode}
            </pre>
          </div>
        </div>

        {/* Step 3: FastDL & Content Sharing */}
        <div className="space-y-3 pt-6 border-t border-purple-500/30">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-yellow-400 text-black font-bold text-xs flex items-center justify-center font-mono">
              3
            </span>
            <h3 className="font-bold text-base text-white font-['Orbitron']">
              КАК ПЕРЕДАТЬ ЛОГОТИП ИГРОКАМ (FastDL / resource.AddFile)
            </h3>
          </div>

          <div className="bg-black/50 p-4 rounded-2xl border border-purple-500/30 text-xs space-y-2 text-slate-300">
            <p>
              Чтобы у заходящих игроков не было черно-фиолетовой текстуры (Missing Texture), добавьте в серверный файл <code className="text-cyan-300 bg-black/80 px-1 rounded">garrysmod/lua/autorun/server/sv_resources.lua</code>:
            </p>
            <pre className="bg-[#090214] p-3 rounded-lg text-emerald-300 font-mono">
{`-- Автозагрузка логотипа игрокам при подключении
resource.AddFile("materials/moonrp/logo_512.png")`}
            </pre>
            <p className="text-[11px] text-slate-400">
              Если вы используете <strong>FastDL</strong>, также скопируйте папку <code className="text-pink-400">materials/moonrp/</code> на ваш веб-сервер FastDL с синхронизацией bz2.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
