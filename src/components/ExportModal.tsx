import React, { useState } from 'react';
import { LogoConfig } from '../types';
import {
  exportSvgToFile,
  exportToHighResPng,
  recordCanvasToWebM,
  triggerExportConfetti,
} from '../utils/exportUtils';
import {
  Download,
  FileImage,
  Video,
  Code2,
  X,
  Check,
  Copy,
  Sparkles,
  Layers,
} from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: LogoConfig;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, config }) => {
  const [resolution, setResolution] = useState<number>(1024);
  const [includeBackground, setIncludeBackground] = useState<boolean>(true);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordProgress, setRecordProgress] = useState<number>(0);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isExportingPng, setIsExportingPng] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleExportPng = async () => {
    setIsExportingPng(true);
    try {
      await exportToHighResPng(
        'moonrp-static-svg',
        resolution,
        resolution,
        `moonrp-vaporwave-${resolution}x${resolution}.png`
      );
    } catch (e) {
      console.error('PNG Export failed:', e);
    } finally {
      setIsExportingPng(false);
    }
  };

  const handleExportSvg = () => {
    exportSvgToFile('moonrp-static-svg', 'moonrp-vaporwave-vector.svg');
  };

  const handleRecordVideo = async () => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (!canvas) {
      alert('Пожалуйста, переключитесь на вкладку "Анимированный вариант" для записи видео.');
      return;
    }

    setIsRecording(true);
    setRecordProgress(0);

    try {
      const blob = await recordCanvasToWebM(canvas, 5000, (p) => setRecordProgress(p));
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'moonrp-vaporwave-animation.webm';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      triggerExportConfetti();
    } catch (err) {
      console.error('Video recording failed:', err);
    } finally {
      setIsRecording(false);
    }
  };

  const gmodLoadingHtmlSnippet = `<!-- Garry's Mod Loading Screen (MoonRP Vaporwave) -->
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>MoonRP Loading Screen</title>
  <style>
    body {
      margin: 0;
      background: #090217;
      color: #fff;
      font-family: 'Righteous', 'Orbitron', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      overflow: hidden;
    }
    .neon-logo {
      width: 480px;
      filter: drop-shadow(0 0 25px #ff2a85);
      animation: pulse 2s infinite alternate;
    }
    @keyframes pulse {
      from { filter: drop-shadow(0 0 15px #ff2a85); }
      to { filter: drop-shadow(0 0 35px #00f0ff); }
    }
    .status-bar {
      margin-top: 30px;
      width: 400px;
      height: 12px;
      background: #110426;
      border: 1px solid #00f0ff;
      border-radius: 6px;
      overflow: hidden;
    }
    .progress {
      width: 60%;
      height: 100%;
      background: linear-gradient(90deg, #ff2a85, #00f0ff);
    }
  </style>
</head>
<body>
  <div id="loading-container">
    <img src="moonrp-logo.png" class="neon-logo" alt="MoonRP">
    <div class="status-bar"><div class="progress"></div></div>
    <p style="color:#00f0ff; font-family:monospace; margin-top:10px;">CONNECTING TO MOONRP...</p>
  </div>
</body>
</html>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(gmodLoadingHtmlSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#14062c] border border-pink-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-[0_0_50px_rgba(255,42,133,0.3)] space-y-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-purple-950 hover:bg-purple-900 text-slate-300 hover:text-white transition-all border border-purple-500/30"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-purple-500/30 pb-4">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-pink-500 to-cyan-400 text-black font-bold">
            <Download className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-['Orbitron'] text-white">
              ЭКСПОРТ ЛОГОТИПА И ФИРМЕННОГО СТИЛЯ
            </h2>
            <p className="text-xs text-cyan-300 font-mono">
              Скачивание в высоком разрешении, SVG векторе и WebM видео
            </p>
          </div>
        </div>

        {/* 1. Static High-Res PNG Export */}
        <div className="bg-black/40 rounded-2xl p-4 border border-purple-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileImage className="w-5 h-5 text-pink-400" />
              <span className="font-bold text-sm text-white font-['Orbitron']">
                1. СТАТИЧНЫЙ РАСТРОВЫЙ PNG
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono">Для Discord, Steam, HUD и ВК</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              {[512, 1024, 2048].map((res) => (
                <button
                  key={res}
                  onClick={() => setResolution(res)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border ${
                    resolution === res
                      ? 'bg-pink-500 text-white border-pink-400 shadow-[0_0_10px_rgba(255,42,133,0.5)]'
                      : 'bg-black/60 text-slate-300 border-purple-500/30 hover:border-purple-400'
                  }`}
                >
                  {res} × {res} px
                </button>
              ))}
            </div>

            <button
              onClick={handleExportPng}
              disabled={isExportingPng}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white text-xs font-bold font-['Orbitron'] flex items-center gap-2 shadow-lg transition-all"
            >
              <Download className="w-4 h-4" />
              {isExportingPng ? 'ГЕНЕРАЦИЯ...' : `СКАЧАТЬ PNG (${resolution}px)`}
            </button>
          </div>
        </div>

        {/* 2. Vector SVG Download */}
        <div className="bg-black/40 rounded-2xl p-4 border border-purple-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <div>
              <span className="font-bold text-sm text-white font-['Orbitron'] block">
                2. ВЕКТОРНЫЙ SVG (БЕЗ ПОТЕРИ КАЧЕСТВА)
              </span>
              <span className="text-xs text-slate-400 font-mono">Масштабируется до любого разрешения</span>
            </div>
          </div>

          <button
            onClick={handleExportSvg}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold font-['Orbitron'] flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
          >
            <Download className="w-4 h-4" /> СКАЧАТЬ SVG
          </button>
        </div>

        {/* 3. Animated WebM Video Record */}
        <div className="bg-black/40 rounded-2xl p-4 border border-purple-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-yellow-400" />
              <div>
                <span className="font-bold text-sm text-white font-['Orbitron'] block">
                  3. ЗАПИСЬ АНИМАЦИИ (WEBM 60FPS)
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  5-секундный бесшовный видеоролик для экранов загрузки и Discord баннеров
                </span>
              </div>
            </div>

            <button
              onClick={handleRecordVideo}
              disabled={isRecording}
              className="px-5 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold font-['Orbitron'] flex items-center gap-2 shadow-[0_0_15px_rgba(234,179,8,0.4)] transition-all"
            >
              {isRecording ? (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                  <span>ЗАПИСЬ {recordProgress}%</span>
                </>
              ) : (
                <>
                  <Video className="w-4 h-4" />
                  <span>ЗАПИСАТЬ 5 СЕК</span>
                </>
              )}
            </button>
          </div>

          {isRecording && (
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-yellow-500/40">
              <div
                className="h-full bg-yellow-400 transition-all duration-100"
                style={{ width: `${recordProgress}%` }}
              />
            </div>
          )}
        </div>

        {/* 4. Garry's Mod Loading Screen HTML Snippet */}
        <div className="bg-black/40 rounded-2xl p-4 border border-purple-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-emerald-400" />
              <span className="font-bold text-sm text-white font-['Orbitron']">
                4. HTML/CSS ДЛЯ GMOD LOADING SCREEN
              </span>
            </div>

            <button
              onClick={handleCopyCode}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCode ? 'СКОПИРОВАНО!' : 'СКОПИРОВАТЬ КОД'}
            </button>
          </div>

          <pre className="bg-[#0a0214] p-3 rounded-xl border border-purple-900/60 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-28">
            {gmodLoadingHtmlSnippet}
          </pre>
        </div>
      </div>
    </div>
  );
};
