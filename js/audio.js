//sound variables
var webAudioStarted = false;
var audioContext;
var masterGain;
var musicplaying = false;
var isthatyou;
var beatingsineWA1;
var beatingsineWA2;
var pinkNoise;
var whiteNoise;
var filter;
var panNode;


var SoundSamples;
var samples;

document.addEventListener('click',function(){
  if(!webAudioStarted) {
    webAudioStarted=true;

    //create audio context
    if('webkitAudioContext' in window) {
      audioContext = new webkitAudioContext();
    }
    else {
      audioContext = new AudioContext();
    }
    audiosetup();
  }
});

document.addEventListener('touchend',function(){
  if(!webAudioStarted) {
    webAudioStarted=true;

    //create audio context
    if('webkitAudioContext' in window) {
      audioContext = new webkitAudioContext();
    }
    else {
      audioContext = new AudioContext();
    }
    audiosetup();
  }
  else {
    beatingsineWA1.playmodulate(0.1,3);
    beatingsineWA2.playmodulate(0.1,3);
    whiteNoise.playNoise(0.3);

    var source = audioContext.createBufferSource();
    source.connect(audioContext.destination);
    source.buffer = samples.isthatyou;
    source.start(audioContext.currentTime + 0.100);

    musicplaying = true;
  }
});


document.addEventListener('mousemove',function(e){
  if(musicplaying) {

    // filter tuning
    filter.frequency.value = (1000-500)*e.pageY/window.innerHeight + 500;
    filter.Q.value = (20-10)*e.pageX/window.innerWidth+10;

    //panNode.pan.value = 2*(screenX/window.innerWidth-0.5);

  }
});


// // create a reverb
// const reverb = new Reverb({
// 	audioContext,
// 	//url: "audio/impulses/water.wav"
// 	//url: "audio/impulses/space_2.wav"
// 	url: "audio/impulses/default.wav"
// })




function audiosetup() {

  masterGain = audioContext.createGain();
  masterGain.connect( audioContext.destination );

  SoundSamples = function() {
    loadSounds(this, {
    isthatyou: 'Assets/isthatyou.mp3',
    // basicimpulse: 'Assets/7348__jovica__basic-impulse-wave-2-c1.wav',
    electricimpulse: 'Assets/341966__robinhood76__06526-electric-impulse-on-wires.wav'
    });
  };

  samples = new SoundSamples();

  beatingsineWA1 = new BeatingSineWA({AudioContext: audioContext, freq1: 330, freq2: 330.2, freq3: 440, freq4: 440.33, freq5: 587, freq6: 587.25});
  beatingsineWA2 = new BeatingSineWA({AudioContext: audioContext, freq1: 200, freq2: 200.2, freq3: 266, freq4: 266.3, freq5: 350, freq6: 350.25});

  pinkNoise = new noiseGenerator( {AudioContext: audioContext, noiseType: "pinkNoise" } );
  whiteNoise = new noiseGenerator( {AudioContext: audioContext, noiseType: "whiteNoise" } );

  // // when calling the reverb
  // masterGain.connect(reverb.input );
  // beatingsineWA1.output.connect(reverb);
  // beatingsineWA2.output.connect(reverb);
  // reverb.output.connect(audioContext.destination);

  // connecting without the reverb
  beatingsineWA1.output.connect(masterGain);
  beatingsineWA2.output.connect(masterGain);


  panNode = audioContext.createStereoPanner();
  panNode.pan.value = 0.5;

  filter = audioContext.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1000;
  filter.Q.value = 20;
  //filter.connect(masterGain);
  filter.connect(masterGain);


  filter2 = audioContext.createBiquadFilter();
  filter2.type = "lowpass";
  filter2.frequency.value = 3000;
  filter2.Q.value = 2;
  //filter.connect(masterGain);
  filter2.connect(masterGain);

  // pinkNoise.output.connect(masterGain);
  // whiteNoise.output.connect(masterGain);

  pinkNoise.output.connect(filter);
  whiteNoise.output.connect(panNode);

  panNode.connect(filter);

  masterGain.connect(audioContext.destination);

  beatingsineWA1.playmodulate(0.1,3);
  beatingsineWA2.playmodulate(0.1,3);
  whiteNoise.playNoise(0.3);

  var source = audioContext.createBufferSource();
  source.connect(audioContext.destination);
  source.buffer = samples.isthatyou;
  source.start(audioContext.currentTime + 0.100);

  musicplaying = true;

}


// connectStream() {
//   // let AudioContext = window.AudioContext || window.webkitAudioContext;
//   let AudioContext = window.webkitAudioContext;
//   this.audioContext = new AudioContext();
//   this.analyser = this.audioContext.createAnalyser();
//   this.analyser.fftSize = 2048;
//
//   let _this = this;
//
//   navigator.getUserMedia(
//     { audio: true, video: false },
//     function(stream) {
//       let input = _this.audioContext.createMediaStreamSource(stream);
//       let gain = _this.audioContext.createGain();
//       gain.gain.value = .1;
//
//       input.connect(_this.analyser);
//       input.connect(gain);
//       gain.connect(_this.audioContext.destination);
//       _this.streamConnected = true;
//     },
//     function( e ) { console.log( 'No live audio input: ' + e ) }
//   )
// },
