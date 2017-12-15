class BeatingSineWA {

  constructor(options) {
        this.audioContext = options.AudioContext;
        this.output = this.audioContext.createGain();
        this.output.gain.value = 0.;

        this.lfo = this.audioContext.createOscillator();
        this.lfo.type = "sine"; this.lfo.frequency.value = 5; this.lfo.start(0);
        this.intermediateGain = this.audioContext.createGain();
        this.intermediateGain.gain.value = 0.;

        //setup oscillators
        this.osc1 = this.audioContext.createOscillator(); this.osc1.frequency.value = options.freq1; this.osc1.type = "sine"; this.osc1.start(0);
        this.osc2 = this.audioContext.createOscillator(); this.osc2.frequency.value = options.freq2; this.osc2.type = "sine"; this.osc2.start(0);
        this.osc3 = this.audioContext.createOscillator(); this.osc3.frequency.value = options.freq3; this.osc3.type = "sine"; this.osc3.start(0);
        this.osc4 = this.audioContext.createOscillator(); this.osc4.frequency.value = options.freq4; this.osc4.type = "sine"; this.osc4.start(0);
        this.osc5 = this.audioContext.createOscillator(); this.osc5.frequency.value = options.freq5; this.osc5.type = "sine"; this.osc5.start(0);
        this.osc6 = this.audioContext.createOscillator(); this.osc6.frequency.value = options.freq6; this.osc6.type = "sine"; this.osc6.start(0);

      }


      play(volume) {
        this.osc1.connect( this.output );
        this.osc2.connect( this.output );
        this.osc3.connect( this.output );
        this.osc4.connect( this.output );
        this.osc5.connect( this.output );
        this.osc6.connect( this.output );
        this.output.gain.value = volume;
      }

      playmodulate(volume, lfofreq) {
        this.osc1.connect( this.intermediateGain );
        this.osc2.connect( this.intermediateGain );
        this.osc3.connect( this.intermediateGain );
        this.osc4.connect( this.intermediateGain );
        this.osc5.connect( this.intermediateGain );
        this.osc6.connect( this.intermediateGain );
        this.lfo.frequency.value = lfofreq;
        this.lfo.connect(this.intermediateGain.gain);
        this.output.gain.value = volume;
        this.intermediateGain.connect(this.output);
      }

      stop() { this.output.gain.value = 0.0; }
      stopmodulate() {
        this.lfo.disconnect(this.output.gain);
        this.output.gain.value = 0.0;
      }
}



// // DEPRECATED :  P5 Sound Library
// function beatingsine(fosc1a,fosc1b,fosc2a,fosc2b,fosc3a,fosc3b) {
//
//   this.osc1a = new p5.Oscillator(); this.osc1a.setType('sine'); this.freq1a = fosc1a; this.osc1a.freq(this.fosc1a); this.osc1a.amp(0); this.osc1a.start();
//   this.osc1b = new p5.Oscillator(); this.osc1b.setType('sine'); this.fosc1b = fosc1b; this.osc1b.freq(this.fosc1b); this.osc1b.amp(0); this.osc1b.start();
//
//   this.osc2a = new p5.Oscillator(); this.osc2a.setType('sine'); this.fosc2a = fosc2a; this.osc2a.freq(this.fosc2a); this.osc2a.amp(0); this.osc2a.start();
//   this.osc2b = new p5.Oscillator(); this.osc2b.setType('sine'); this.fosc2b = fosc2b; this.osc2b.freq(this.fosc2b); this.osc2b.amp(0); this.osc2b.start();
//
//   this.osc3a = new p5.Oscillator(); this.osc3a.setType('sine'); this.fosc3a = fosc3a; this.osc3a.freq(this.fosc3a); this.osc3a.amp(0); this.osc3a.start();
//   this.osc3b = new p5.Oscillator(); this.osc3b.setType('sine'); this.fosc3b = fosc3b; this.osc3b.freq(this.fosc3b); this.osc3b.amp(0); this.osc3b.start();
//
//   this.modulator = new p5.Oscillator('triangle');
//   this.modulator.disconnect();  // disconnect the modulator from master output
//   this.modulator.freq(10);
//   this.modulator.amp(1);
//   this.modulator.start();
//
//   this.play = function(amp,timetoreach) {
//     this.osc1a.amp(amp,timetoreach); this.osc1b.amp(amp,timetoreach);
//     this.osc2a.amp(amp,timetoreach); this.osc2b.amp(amp,timetoreach);
//     this.osc3a.amp(amp,timetoreach); this.osc3b.amp(amp,timetoreach);
//   }
//
//   this.playmodulate = function() {
//     console.log(this.modulator.scale(-1,1,1,-1));
//     this.osc1.amp(this.modulator.scale(-1,1,1,-1));
//     this.osc2.amp(this.modulator.scale(-1,1,1,-1));
//   }
// }
