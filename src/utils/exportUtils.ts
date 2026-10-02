import confetti from 'canvas-confetti';

// Trigger celebratory retro confetti burst
export function triggerExportConfetti() {
  confetti({
    particleCount: 70,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#ff2a85', '#00f0ff', '#ffe600', '#c026d3', '#ffffff'],
  });
}

// Export SVG element to clean downloadable SVG file
export function exportSvgToFile(svgElementId: string, filename = 'moonrp-vaporwave-logo.svg') {
  const svg = document.getElementById(svgElementId);
  if (!svg) {
    console.error('SVG element not found:', svgElementId);
    return;
  }

  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = filename;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);

  triggerExportConfetti();
}

// Convert SVG or Canvas to High-Res PNG (up to 4096x4096)
export async function exportToHighResPng(
  svgElementId: string,
  width = 1024,
  height = 1024,
  filename = 'moonrp-vaporwave-logo.png'
): Promise<void> {
  const svg = document.getElementById(svgElementId);
  if (!svg) return;

  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const URLObj = window.URL || window.webkitURL || window;
  const blobURL = URLObj.createObjectURL(svgBlob);

  const img = new Image();
  img.crossOrigin = 'anonymous';

  return new Promise((resolve, reject) => {
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Cannot create canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to generate PNG blob'));
          return;
        }
        const pngURL = URLObj.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = pngURL;
        downloadLink.download = filename;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URLObj.revokeObjectURL(pngURL);
        URLObj.revokeObjectURL(blobURL);
        triggerExportConfetti();
        resolve();
      }, 'image/png');
    };

    img.onerror = (err) => {
      URLObj.revokeObjectURL(blobURL);
      reject(err);
    };

    img.src = blobURL;
  });
}

// Record Canvas stream to WebM animated video
export function recordCanvasToWebM(
  canvas: HTMLCanvasElement,
  durationMs = 5000,
  onProgress?: (progress: number) => void
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      const stream = canvas.captureStream(60);
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9',
        videoBitsPerSecond: 5000000,
      });

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(chunks, { type: 'video/webm' });
        resolve(videoBlob);
      };

      mediaRecorder.start();

      const startTime = Date.now();
      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const p = Math.min(100, Math.round((elapsed / durationMs) * 100));
        if (onProgress) onProgress(p);
      }, 100);

      setTimeout(() => {
        clearInterval(progressInterval);
        mediaRecorder.stop();
      }, durationMs);
    } catch (err) {
      reject(err);
    }
  });
}
