// Pure Web Audio API 80s Vaporwave / Synthwave Ambient Sound Generator
class VaporwaveAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private gainNode: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private intervalId: number | null = null;
  private analyser: AnalyserNode | null = null;
  private frequencyData: Uint8Array | null = null;

  // Dreamy vaporwave / synthwave chord progressions (Frequencies in Hz)
  // Chord 1: Eb maj7 (Eb, G, Bb, D)
  // Chord 2: C min7 (C, Eb, G, Bb)
  // Chord 3: Ab maj7 (Ab, C, Eb, G)
  // Chord 4: Bb 9 (Bb, D, F, Ab, C)
  private chords = [
    [155.56, 196.00, 233.08, 293.66, 392.00], // Eb Maj7/9
    [130.81, 155.56, 196.00, 233.08, 349.23], // C min7/11
    [103.83, 130.81, 155.56, 196.00, 261.63], // Ab Maj7
    [116.54, 146.83, 174.61, 207.65, 261.63], // Bb 7/9
  ];
  private currentChordIndex = 0;

  public init() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.18, this.ctx.currentTime);

      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(1400, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(2, this.ctx.currentTime);

      this.filterNode.connect(this.gainNode);
      this.gainNode.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
  }

  public playChord(frequencies: number[], duration = 4.0) {
    if (!this.ctx || !this.filterNode) return;

    const now = this.ctx.currentTime;

    // Play lush detuned sawtooth & triangle oscillators for that classic analog synth warmth
    frequencies.forEach((freq, idx) => {
      if (!this.ctx || !this.filterNode) return;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc1.type = idx === 0 ? 'sine' : 'sawtooth';
      osc2.type = 'triangle';

      // Slight retro chorus detuning (+/- 4 to 8 cents)
      const detune = (Math.random() - 0.5) * 12;
      osc1.frequency.setValueAtTime(freq, now);
      osc1.detune.setValueAtTime(detune, now);

      osc2.frequency.setValueAtTime(freq * 1.002, now);
      osc2.detune.setValueAtTime(-detune, now);

      // ADSR envelope: slow retro attack & long dreamy release
      const individualVolume = idx === 0 ? 0.35 : 0.12;
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(individualVolume, now + 1.2);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 1.0);

      osc1.connect(noteGain);
      osc2.connect(noteGain);
      noteGain.connect(this.filterNode);

      osc1.start(now);
      osc2.start(now);

      osc1.stop(now + duration + 1.5);
      osc2.stop(now + duration + 1.5);
    });
  }

  public start() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlaying = true;
    this.currentChordIndex = 0;

    // Play first chord immediately
    this.playChord(this.chords[this.currentChordIndex], 4.5);
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;

    // Loop chords every 4.2 seconds
    this.intervalId = window.setInterval(() => {
      if (!this.isPlaying) return;
      this.playChord(this.chords[this.currentChordIndex], 4.5);
      this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
    }, 4200);
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getAudioData(): number[] {
    if (!this.analyser || !this.frequencyData || !this.isPlaying) {
      return [10, 15, 25, 20, 15, 30, 10, 5];
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.analyser.getByteFrequencyData(this.frequencyData as any);
    const sampled: number[] = [];
    const step = Math.floor(this.frequencyData.length / 16) || 1;
    for (let i = 0; i < 16; i++) {
      sampled.push(this.frequencyData[i * step] || 0);
    }
    return sampled;
  }
}

export const vaporSynth = new VaporwaveAudioEngine();
