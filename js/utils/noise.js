class noiseGenerator {

  constructor(options) {
    this.noiseType = options.noiseType;
    this.audioContext = options.AudioContext;
    this.output = this.audioContext.createGain();
    this.output.gain.value = 0.;

    var bufferSize = 2 * this.audioContext.sampleRate;

    this.whiteNoiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    // This gives us the actual ArrayBuffer that contains the data
    this.whiteNoiseOutput = this.whiteNoiseBuffer.getChannelData(0);

    this.pinkNoiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    // This gives us the actual ArrayBuffer that contains the data
    this.pinkNoiseOutput = this.pinkNoiseBuffer.getChannelData(0);

    var b0, b1, b2, b3, b4, b5, b6;
        b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
    for (var i = 0; i < bufferSize; i++) {
      this.whiteNoiseOutput[i] = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + this.whiteNoiseOutput[i] * 0.0555179;
      b1 = 0.99332 * b1 + this.whiteNoiseOutput[i] * 0.0750759;
      b2 = 0.96900 * b2 + this.whiteNoiseOutput[i] * 0.1538520;
      b3 = 0.86650 * b3 + this.whiteNoiseOutput[i] * 0.3104856;
      b4 = 0.55000 * b4 + this.whiteNoiseOutput[i] * 0.5329522;
      b5 = -0.7616 * b5 - this.whiteNoiseOutput[i] * 0.0168980;
      this.pinkNoiseOutput[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + this.whiteNoiseOutput[i] * 0.5362;
      this.pinkNoiseOutput[i] *= 0.11; // (roughly) compensate for gain
      b6 = this.whiteNoiseOutput[i] * 0.115926;
    }

    this.noiseSource = this.audioContext.createBufferSource();
    this.noiseSource.connect( this.output );
    if (this.noiseType == "pinkNoise") {
      this.noiseSource.buffer = this.pinkNoiseBuffer;
    }
    else {
      this.noiseSource.buffer = this.whiteNoiseBuffer;
    }

    this.noiseSource.loop = true;
    this.noiseSource.start(0);
    this.output.gain.value = 0;
  }

  playNoise(volume) {
    this.output.gain.value = volume;
  }

  playWhiteNoise(volume) {
      this.output.gain.value = volume;
  }

  stop() {
    this.noiseSource.stop(0);
    this.output.gain.value = 0.0;
  }

}

// var bufferSize = 2 * audioContext.sampleRate,
//     noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
//     output = noiseBuffer.getChannelData(0);
// for (var i = 0; i < bufferSize; i++) {
//     output[i] = Math.random() * 2 - 1;
// }
//
// var whiteNoise = audioContext.createBufferSource();
// whiteNoise.buffer = noiseBuffer;
// whiteNoise.loop = true;
// whiteNoise.start(0);
//
// whiteNoise.connect(audioContext.destination);





// var bufferSize = 2 * audioContext.sampleRate,
//     noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
//     output = noiseBuffer.getChannelData(0);
// var b0, b1, b2, b3, b4, b5, b6;
//     b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
// for (var i = 0; i < bufferSize; i++) {
//   var white = Math.random() * 2 - 1;
//   b0 = 0.99886 * b0 + white * 0.0555179;
//   b1 = 0.99332 * b1 + white * 0.0750759;
//   b2 = 0.96900 * b2 + white * 0.1538520;
//   b3 = 0.86650 * b3 + white * 0.3104856;
//   b4 = 0.55000 * b4 + white * 0.5329522;
//   b5 = -0.7616 * b5 - white * 0.0168980;
//   output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
//   output[i] *= 0.11; // (roughly) compensate for gain
//   b6 = white * 0.115926;
// }
// var pinkNoise = audioContext.createBufferSource();
// pinkNoise.buffer = noiseBuffer;
// pinkNoise.loop = true;
// pinkNoise.start(0);
// pinkNoise.connect(audioContext.destination);
