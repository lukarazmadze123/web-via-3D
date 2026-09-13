// Minimalist Web Audio synthesizer for ambient spatial room soundscape
class AmbientSoundscape {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private gainNode: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start() {
    if (this.isPlaying) return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 3);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(240, this.ctx.currentTime);

      // Subtle chord drones (D minor atmospheric drone: D2, A2, F3)
      const freqs = [73.42, 110.0, 174.61];
      this.oscillators = freqs.map((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq + (idx * 0.15), this.ctx!.currentTime);
        osc.connect(filter);
        osc.start();
        return osc;
      });

      filter.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);
      this.isPlaying = true;
    } catch (e) {
      console.warn('AudioContext not allowed or not supported', e);
    }
  }

  public stop() {
    if (!this.isPlaying || !this.ctx || !this.gainNode) return;

    try {
      const current = this.ctx.currentTime;
      this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, current);
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, current + 1.2);

      setTimeout(() => {
        this.oscillators.forEach(osc => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
        this.oscillators = [];
        this.ctx?.close();
        this.ctx = null;
        this.isPlaying = false;
      }, 1300);
    } catch {
      this.isPlaying = false;
    }
  }
}

export const ambientSoundscape = new AmbientSoundscape();
