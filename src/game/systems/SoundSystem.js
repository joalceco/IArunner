// Sound effect system
// In production, replace these with actual audio files

export class SoundSystem {
  constructor() {
    this.enabled = true;
    this.sounds = {
      jump: null,
      collect: null,
      hit: null,
      upgrade: null,
      gameOver: null,
    };
    this.audioContext = null;
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch {
      console.warn('Web Audio API not supported');
    }
  }

  // Simple beep sound generator
  playBeep(frequency, duration, type = 'sine') {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + duration
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  playJump() {
    this.playBeep(400, 0.1, 'square');
  }

  playCollect() {
    this.playBeep(800, 0.1, 'sine');
  }

  playHit() {
    this.playBeep(100, 0.2, 'sawtooth');
  }

  playUpgrade() {
    this.playBeep(600, 0.2, 'sine');
    setTimeout(() => this.playBeep(800, 0.2, 'sine'), 100);
  }

  playGameOver() {
    this.playBeep(200, 0.5, 'sawtooth');
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

export default SoundSystem;
