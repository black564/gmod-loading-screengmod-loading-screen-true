import React, { useEffect, useRef, useState } from 'react';
import { LogoConfig, COLOR_THEMES } from '../types';
import { vaporSynth } from '../utils/audioSynth';
import { Volume2, VolumeX, Sparkles, Zap, Radio } from 'lucide-react';

interface AnimatedLogoProps {
  config: LogoConfig;
  size?: number;
  className?: string;
  isInteractive?: boolean;
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  config,
  size = 600,
  className = '',
  isInteractive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [vhsTime, setVhsTime] = useState<string>('00:04:20');
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Update VHS clock
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setVhsTime(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleAudio = () => {
    const playing = vaporSynth.toggle();
    setIsAudioPlaying(playing);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const theme = COLOR_THEMES[config.theme] || COLOR_THEMES.classic_vapor;
    const primary = config.primaryColor || theme.primary;
    const secondary = config.secondaryColor || theme.secondary;
    const accent = config.accentColor || theme.accent;
    const gridCol = config.gridColor || theme.grid;
    const bgCol = config.backgroundColor || theme.bg;

    // Stars particles setup
    interface Star {
      x: number;
      y: number;
      size: number;
      color: string;
      speed: number;
      twinkle: number;
    }
    const stars: Star[] = Array.from({ length: 90 }).map(() => ({
      x: Math.random() * 800,
      y: Math.random() * 440,
      size: Math.random() * 2.2 + 0.6,
      color: Math.random() > 0.6 ? secondary : Math.random() > 0.3 ? primary : '#ffffff',
      speed: Math.random() * 0.4 + 0.1,
      twinkle: Math.random() * Math.PI * 2,
    }));

    // Floating 3D wireframe cubes
    interface Cube {
      x: number;
      y: number;
      z: number;
      rotX: number;
      rotY: number;
      rotZ: number;
      size: number;
      color: string;
    }
    const cubes: Cube[] = [
      { x: 120, y: 220, z: 1, rotX: 0, rotY: 0, rotZ: 0, size: 28, color: secondary },
      { x: 680, y: 200, z: 1, rotX: 0.5, rotY: 0.5, rotZ: 0, size: 34, color: primary },
      { x: 220, y: 120, z: 1, rotX: 1, rotY: 0.2, rotZ: 0, size: 18, color: accent },
      { x: 590, y: 110, z: 1, rotX: 0.2, rotY: 1.1, rotZ: 0, size: 22, color: secondary },
    ];

    // Electric physics sparks
    interface Spark {
      angle: number;
      radiusX: number;
      radiusY: number;
      speed: number;
      color: string;
      size: number;
    }
    const sparks: Spark[] = Array.from({ length: 14 }).map((_, i) => ({
      angle: (i / 14) * Math.PI * 2,
      radiusX: 180 + Math.random() * 20,
      radiusY: 70 + Math.random() * 15,
      speed: (Math.random() * 0.03 + 0.015) * (i % 2 === 0 ? 1 : -1),
      color: i % 2 === 0 ? secondary : i % 3 === 0 ? accent : primary,
      size: Math.random() * 3 + 2,
    }));

    const render = () => {
      time += 0.02 * config.gridSpeed;
      const audioData = vaporSynth.getAudioData();
      const avgAudio = audioData.reduce((a, b) => a + b, 0) / (audioData.length || 1);
      const bassBeat = (audioData[0] || 0) / 255; // 0 to 1

      ctx.clearRect(0, 0, 800, 800);

      // 1. Background Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, 800);
      bgGrad.addColorStop(0, '#04010a');
      bgGrad.addColorStop(0.48, bgCol);
      bgGrad.addColorStop(1, '#1e0836');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 800, 800);

      // Subtle mouse parallax shift
      const pX = mousePos.x * 12;
      const pY = mousePos.y * 8;

      ctx.save();
      ctx.translate(pX * 0.3, pY * 0.3);

      // 2. Stars rendering with twinkle
      if (config.showStars) {
        stars.forEach((star) => {
          star.twinkle += 0.05;
          const alpha = 0.4 + Math.sin(star.twinkle) * 0.4;
          ctx.fillStyle = star.color;
          ctx.globalAlpha = Math.max(0.1, Math.min(1, alpha));
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();

          // Draw cross twinkle on bigger stars
          if (star.size > 2.0) {
            ctx.strokeStyle = star.color;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(star.x - 5, star.y);
            ctx.lineTo(star.x + 5, star.y);
            ctx.moveTo(star.x, star.y - 5);
            ctx.lineTo(star.x, star.y + 5);
            ctx.stroke();
          }
        });
        ctx.globalAlpha = 1.0;
      }

      // 3. Audio-Reactive Background Nebula Glow
      const nebulaPulse = 1 + bassBeat * 0.35 * config.glowIntensity;
      const nebulaGrad = ctx.createRadialGradient(400, 300, 30, 400, 300, 260 * nebulaPulse);
      nebulaGrad.addColorStop(0, `${primary}44`);
      nebulaGrad.addColorStop(0.5, `${secondary}22`);
      nebulaGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = nebulaGrad;
      ctx.beginPath();
      ctx.arc(400, 300, 260 * nebulaPulse, 0, Math.PI * 2);
      ctx.fill();

      // 4. Moving 3D Perspective Synthwave Grid
      if (config.showGrid) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 440, 800, 360);
        ctx.clip();

        // Horizon Glow
        ctx.strokeStyle = secondary;
        ctx.lineWidth = 3 + bassBeat * 2;
        ctx.shadowColor = secondary;
        ctx.shadowBlur = 15 * config.glowIntensity;
        ctx.beginPath();
        ctx.moveTo(0, 440);
        ctx.lineTo(800, 440);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Animated Perspective Horizontal Grid Lines
        const gridOffset = (time * 40) % 60;
        ctx.strokeStyle = gridCol;

        for (let i = 0; i < 18; i++) {
          const rawY = 440 + Math.pow(i + gridOffset / 60, 2.1) * 3.8;
          if (rawY <= 800) {
            const progress = (rawY - 440) / 360;
            ctx.lineWidth = 1 + progress * 2.8;
            ctx.globalAlpha = 0.3 + progress * 0.7;
            ctx.beginPath();
            ctx.moveTo(0, rawY);
            ctx.lineTo(800, rawY);
            ctx.stroke();
          }
        }

        // Perspective Vertical Grid Lines
        const vCols = [-380, -300, -220, -150, -90, -40, 0, 40, 90, 150, 220, 300, 380];
        vCols.forEach((offset) => {
          ctx.beginPath();
          ctx.globalAlpha = Math.abs(offset) > 240 ? 0.4 : 0.8;
          ctx.lineWidth = offset === 0 ? 2.5 : 1.8;
          ctx.moveTo(400 + offset * 0.15, 440);
          ctx.lineTo(400 + offset * 2.5, 800);
          ctx.stroke();
        });

        ctx.restore();
      }

      // 5. Floating 3D Wireframe Prisms/Cubes (Vaporwave Props)
      cubes.forEach((cube) => {
        cube.rotX += 0.015;
        cube.rotY += 0.02;
        cube.y += Math.sin(time + cube.x) * 0.4;

        ctx.save();
        ctx.translate(cube.x, cube.y);
        ctx.strokeStyle = cube.color;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = cube.color;
        ctx.shadowBlur = 8 * config.glowIntensity;

        // 3D Isometric Wireframe Cube projection
        const s = cube.size * (1 + bassBeat * 0.15);
        const cosX = Math.cos(cube.rotX);
        const sinX = Math.sin(cube.rotX);
        const cosY = Math.cos(cube.rotY);
        const sinY = Math.sin(cube.rotY);

        const vertices = [
          [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s],
          [-s, -s, s], [s, -s, s], [s, s, s], [-s, s, s],
        ];

        const projected = vertices.map(([vx, vy, vz]) => {
          // Rotate Y
          const x1 = vx * cosY - vz * sinY;
          const z1 = vx * sinY + vz * cosY;
          // Rotate X
          const y2 = vy * cosX - z1 * sinX;
          return [x1, y2];
        });

        const edges = [
          [0, 1], [1, 2], [2, 3], [3, 0], // Back face
          [4, 5], [5, 6], [6, 7], [7, 4], // Front face
          [0, 4], [1, 5], [2, 6], [3, 7], // Connecting edges
        ];

        ctx.beginPath();
        edges.forEach(([start, end]) => {
          ctx.moveTo(projected[start][0], projected[start][1]);
          ctx.lineTo(projected[end][0], projected[end][1]);
        });
        ctx.stroke();
        ctx.restore();
      });

      // 6. Central Moon / Sun (Pulsing & Shimmering)
      ctx.save();
      const moonScale = config.moonSize * (1 + Math.sin(time * 1.5) * 0.03 + bassBeat * 0.06);
      ctx.translate(400, 300);
      ctx.scale(moonScale, moonScale);

      // Rotating Outer Neon Halo Rings
      ctx.save();
      ctx.rotate(time * 0.3);
      ctx.strokeStyle = primary;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = primary;
      ctx.shadowBlur = 20 * config.glowIntensity;
      ctx.setLineDash([40, 20, 10, 20]);
      ctx.beginPath();
      ctx.arc(0, 0, 168, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.rotate(-time * 0.4);
      ctx.strokeStyle = secondary;
      ctx.lineWidth = 1.8;
      ctx.shadowColor = secondary;
      ctx.shadowBlur = 15 * config.glowIntensity;
      ctx.setLineDash([60, 30, 20, 30]);
      ctx.beginPath();
      ctx.arc(0, 0, 155, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Draw Main Moon (Crescent or Striped)
      if (config.moonShape === 'crescent') {
        const moonGrad = ctx.createLinearGradient(-150, -150, 150, 150);
        moonGrad.addColorStop(0, accent);
        moonGrad.addColorStop(0.4, primary);
        moonGrad.addColorStop(0.85, secondary);
        moonGrad.addColorStop(1, '#3b0764');

        ctx.fillStyle = moonGrad;
        ctx.shadowColor = primary;
        ctx.shadowBlur = 25 * config.glowIntensity;

        // Dynamic Crescent Path with breathing curve
        const wave = Math.sin(time * 2) * 4;
        ctx.beginPath();
        ctx.arc(0, 0, 140, -Math.PI * 0.5, Math.PI * 0.5, false);
        ctx.bezierCurveTo(40 + wave, 100, 40 + wave, -100, 0, -140);
        ctx.fill();

        // Inner glowing craters
        ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
        ctx.strokeStyle = secondary;
        ctx.lineWidth = 1.5;

        [
          { cx: 70, cy: -50, r: 14 },
          { cx: 95, cy: 10, r: 20 },
          { cx: 50, cy: 75, r: 16 },
        ].forEach((crater) => {
          ctx.beginPath();
          ctx.arc(crater.cx, crater.cy, crater.r + Math.sin(time + crater.cx) * 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        });
      } else {
        // Striped Retro Sun
        const sunGrad = ctx.createLinearGradient(0, -140, 0, 140);
        sunGrad.addColorStop(0, accent);
        sunGrad.addColorStop(0.5, primary);
        sunGrad.addColorStop(1, secondary);

        ctx.fillStyle = sunGrad;
        ctx.shadowColor = primary;
        ctx.shadowBlur = 25 * config.glowIntensity;
        ctx.beginPath();
        ctx.arc(0, 0, 140, 0, Math.PI * 2);
        ctx.fill();

        // Laser horizontal slices
        ctx.fillStyle = bgCol;
        [
          { y: 10, h: 5 },
          { y: 25, h: 8 },
          { y: 45, h: 12 },
          { y: 72, h: 16 },
          { y: 105, h: 22 },
        ].forEach((slice) => {
          ctx.fillRect(-150, slice.y, 300, slice.h);
        });
      }

      // Garry's Mod Physics Gun Orbiting Energy Plasma Sparks
      if (config.showPhysgunBeam) {
        sparks.forEach((spark) => {
          spark.angle += spark.speed;
          const sx = Math.cos(spark.angle) * spark.radiusX;
          const sy = Math.sin(spark.angle) * spark.radiusY;

          // Lightning spark node
          ctx.fillStyle = spark.color;
          ctx.shadowColor = spark.color;
          ctx.shadowBlur = 12 * config.glowIntensity;
          ctx.beginPath();
          ctx.arc(sx, sy, spark.size + bassBeat * 2, 0, Math.PI * 2);
          ctx.fill();

          // Electric trail
          const prevSx = Math.cos(spark.angle - 0.2) * (spark.radiusX * 0.98);
          const prevSy = Math.sin(spark.angle - 0.2) * (spark.radiusY * 0.98);
          ctx.strokeStyle = spark.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(prevSx, prevSy);
          ctx.lineTo(sx, sy);
          ctx.stroke();
        });
      }

      // Garry's Mod "g" Central Icon
      if (config.showGmodIcon) {
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.strokeStyle = secondary;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = secondary;
        ctx.shadowBlur = 15 * config.glowIntensity;

        // Rounded Box
        ctx.beginPath();
        ctx.roundRect(-45, -45, 90, 90, 18);
        ctx.fill();
        ctx.stroke();

        // "g" text
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 68px "Righteous", "Orbitron", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = primary;
        ctx.shadowBlur = 12;
        ctx.fillText('g', 0, 4);
        ctx.restore();
      }

      ctx.restore(); // end moon

      // 7. Palm Trees Silhouettes
      if (config.showPalms) {
        // Subtle sway in wind
        const swayLeft = Math.sin(time * 1.2) * 4;
        const swayRight = Math.cos(time * 1.2) * 4;

        ctx.save();
        ctx.fillStyle = '#0a0216';
        ctx.strokeStyle = primary;
        ctx.lineWidth = 1.2;

        // Left Palm
        ctx.save();
        ctx.translate(130 + swayLeft * 0.3, 380);
        ctx.beginPath();
        ctx.moveTo(0, 60);
        ctx.quadraticCurveTo(-15 + swayLeft, -60, -30 + swayLeft * 1.2, -130);
        ctx.quadraticCurveTo(-10 + swayLeft, -60, 15, 60);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Right Palm
        ctx.save();
        ctx.translate(670 + swayRight * 0.3, 380);
        ctx.beginPath();
        ctx.moveTo(0, 60);
        ctx.quadraticCurveTo(15 + swayRight, -60, 30 + swayRight * 1.2, -130);
        ctx.quadraticCurveTo(10 + swayRight, -60, -15, 60);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.restore();
      }

      // 8. Japanese Subtext with Neon Glow
      if (config.showJapaneseText) {
        ctx.save();
        ctx.fillStyle = 'rgba(6, 1, 15, 0.85)';
        ctx.strokeStyle = secondary;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = secondary;
        ctx.shadowBlur = 10 * config.glowIntensity;

        ctx.beginPath();
        ctx.roundRect(260, 408, 280, 32, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = secondary;
        ctx.font = '900 16px "Noto Sans JP", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.letterSpacing = '5px';
        ctx.fillText(config.japaneseText || '月 面 ロ ー ル プ レ イ', 400, 424);
        ctx.restore();
      }

      // 9. Main Chrome 3D Animated Typography "MoonRP"
      ctx.save();
      const textWave = Math.sin(time * 2.5) * 2;
      const textY = 515 + textWave;

      // Chromatic Aberration Split (Red / Cyan displacement on glitch/beat)
      const glitchActive = config.glitchIntensity > 0 && Math.random() < config.glitchIntensity * 0.08;
      const rgbOffset = glitchActive ? (Math.random() - 0.5) * 14 : config.chromaticAberration ? 2.5 : 0;

      if (rgbOffset > 0) {
        // Red / Pink Channel Shift
        ctx.fillStyle = primary;
        ctx.font = '900 92px "Righteous", "Orbitron", cursive';
        ctx.textAlign = 'center';
        ctx.fillText(config.title, 400 - rgbOffset, textY);

        // Cyan Channel Shift
        ctx.fillStyle = secondary;
        ctx.fillText(config.title, 400 + rgbOffset, textY);
      }

      // 3D Shadow Layers
      for (let s = 6; s > 0; s--) {
        ctx.fillStyle = '#000000';
        ctx.font = '900 92px "Righteous", "Orbitron", cursive';
        ctx.textAlign = 'center';
        ctx.fillText(config.title, 400, textY + s);
      }

      // Neon Underglow
      ctx.fillStyle = primary;
      ctx.shadowColor = primary;
      ctx.shadowBlur = (20 + bassBeat * 15) * config.glowIntensity;
      ctx.fillText(config.title, 400, textY);

      // Glossy Chrome Gradient Fill
      const chromeGrad = ctx.createLinearGradient(0, textY - 60, 0, textY + 20);
      chromeGrad.addColorStop(0, '#ffffff');
      chromeGrad.addColorStop(0.3, '#cbd5e1');
      chromeGrad.addColorStop(0.48, '#64748b');
      chromeGrad.addColorStop(0.5, '#0f172a');
      chromeGrad.addColorStop(0.52, '#38bdf8');
      chromeGrad.addColorStop(0.8, '#f472b6');
      chromeGrad.addColorStop(1, '#ffffff');

      ctx.fillStyle = chromeGrad;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.fillText(config.title, 400, textY);
      ctx.strokeText(config.title, 400, textY);
      ctx.restore();

      // 10. Subtitle & Laser Underline
      ctx.save();
      ctx.strokeStyle = secondary;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = secondary;
      ctx.shadowBlur = 12 * config.glowIntensity;
      ctx.beginPath();
      ctx.moveTo(180, 542);
      ctx.lineTo(620, 542);
      ctx.stroke();

      // Diamond Accent
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.moveTo(392, 542);
      ctx.lineTo(400, 534);
      ctx.lineTo(408, 542);
      ctx.lineTo(400, 550);
      ctx.fill();

      // Subtitle
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 22px "Orbitron", "VT323", sans-serif';
      ctx.textAlign = 'center';
      ctx.shadowColor = primary;
      ctx.shadowBlur = 10;
      ctx.letterSpacing = '6px';
      ctx.fillText(config.subtitle.toUpperCase(), 400, 574);

      // Tagline
      ctx.fillStyle = secondary;
      ctx.font = '22px "VT323", monospace';
      ctx.fillText(`[ ${config.tagline} • EST. ${config.establishedYear} ]`, 400, 608);
      ctx.restore();

      // 11. Badges & Garry's Mod indicators
      if (config.showBadges) {
        ctx.save();
        // Left Badge
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.strokeStyle = primary;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.roundRect(120, 640, 160, 26, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = primary;
        ctx.font = '700 11px "Orbitron", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('GMOD ROLEPLAY', 200, 657);

        // Right Badge
        ctx.strokeStyle = secondary;
        ctx.beginPath();
        ctx.roundRect(520, 640, 160, 26, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = secondary;
        ctx.fillText('CYBER DOWNTOWN', 600, 657);
        ctx.restore();
      }

      ctx.restore(); // end parallax

      // 12. VHS Overlay, Scanlines, Tracking Noise & Glitch
      if (config.showVhsOverlay) {
        // Scanlines
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        for (let y = 0; y < 800; y += 4) {
          ctx.fillRect(0, y, 800, 2);
        }

        // Horizontal VHS Tape Tracking Glitch line
        const vhsGlitchY = (time * 120) % 860 - 30;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.fillRect(0, vhsGlitchY, 800, 8);

        // VCR On-Screen Display (OSD)
        ctx.fillStyle = '#22c55e';
        ctx.font = '20px "VT323", monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`▶ PLAY  SP`, 35, 45);
        ctx.fillText(`CH 03  STEREO`, 35, 75);

        ctx.textAlign = 'right';
        ctx.fillStyle = '#38bdf8';
        ctx.fillText(`MOON_RP.VCR`, 765, 45);
        ctx.fillText(vhsTime, 765, 75);

        // Retro Tape noise specs
        if (Math.random() < 0.3) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
          for (let n = 0; n < 20; n++) {
            const nx = Math.random() * 800;
            const ny = Math.random() * 800;
            ctx.fillRect(nx, ny, Math.random() * 6 + 2, 1);
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [config, isAudioPlaying, vhsTime, mousePos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isInteractive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Canvas container with neon border and CRT curvature */}
      <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(255,42,133,0.25)] border border-pink-500/40 bg-black">
        <canvas
          ref={canvasRef}
          width={800}
          height={800}
          style={{ width: size, height: size, maxWidth: '100%' }}
          className="block aspect-square"
        />

        {/* Floating Quick Action Overlay on Hover */}
        <div className="absolute top-4 right-4 flex items-center gap-2 opacity-90 transition-opacity">
          <button
            onClick={handleToggleAudio}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 backdrop-blur-md transition-all border ${
              isAudioPlaying
                ? 'bg-pink-500/30 text-pink-300 border-pink-400 shadow-[0_0_15px_rgba(255,42,133,0.6)] animate-pulse'
                : 'bg-black/60 text-cyan-300 border-cyan-500/40 hover:bg-black/80'
            }`}
            title="Включить 80s Vaporwave синтвейв саундтрек (Web Audio API)"
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span>SYNTH ACTIVE</span>
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>PLAY 80s SYNTH</span>
              </>
            )}
          </button>
        </div>

        {/* Live FPS / 60FPS Badge */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 pointer-events-none">
          <span className="px-2.5 py-0.5 rounded bg-black/70 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 flex items-center gap-1">
            <Radio className="w-3 h-3 text-pink-400 animate-pulse" />
            60 FPS LIVE VAPOR ENGINE
          </span>
        </div>
      </div>
    </div>
  );
};
