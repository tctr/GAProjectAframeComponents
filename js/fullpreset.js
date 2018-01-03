AFRAME.registerComponent('fullpreset', {
  schema: {
    ichoice: {type:"number", default:"0"}
  // thetaLength: {type:"number", default:"180"},
  // radius: {type:"number", default:"200"},
  // shader: {default:"flat"},
  // color: {type:"color",default:'#ffffff'},
  // src: {type:"src",default:'Assets/voielactee360.jpg'}
},
  init: function () {
    this.bgpresets = [ // default desert
                       { camfov:150, sky1radius:200.1, sky1topcolor:'#ffffff', sky1bottomcolor:'#ffffff', changeTheta: false, thetaLength: 180, radius: 200, shader: 'flat', color: '#ff00ff', src: 'Assets/panorama.jpg'},
                       // desert with theta=160
                       { camfov:150, sky1radius:200, sky1topcolor:'#ffffff', sky1bottomcolor:'#ffffff', changeTheta: false, thetaLength: 160, radius: 200, shader: 'flat', color: '#ff00ff', src: 'Assets/panorama.jpg'},
                       // voie lactee
                       { camfov:150, sky1radius:200.05, sky1topcolor:'#ffffff', sky1bottomcolor:'#ffffff', changeTheta: false, changeTheta: true, thetaLength: 180, radius: 200, shader: 'flat', color: '#ffffff', src: 'Assets/voielactee360.jpg'},
                       // voie mosaic trees
                       { camfov:120, sky1radius:200.5, sky1topcolor:'#ffffff', sky1bottomcolor:'#ffffff', changeTheta: false, thetaLength: 178, radius: 200, shader: 'flat', color: '#ffffff', src: 'Assets/sequoiatrip2.png'},
                       // colors only
                       { camfov:120, sky1radius:200., sky1topcolor:'#ffaa00', sky1bottomcolor:'#ee50ff', changeTheta: true, thetaLength: 179, radius: 200, shader: 'flat', color: '#0000ff', src: ''}
];

    this.ichoice = this.data.ichoice;
    this.initScene();
    this.enterInitScene = false;
    this.firstframe==true;
    angleX = 0; angleXfiltered = angleX;
    panningValue = 0.;
  },

  tick: function(time, timeDelta) {
    if (this.firstframe==true) {
      this.firstframe = false;
      this.thetaLength = this.bgpresets[this.ichoice].thetaLength;
    }

    this.camEl.object3D.rotation.x = angleXfiltered;
    this.camEl.object3D.rotation.y += -0.005;

    if(musicplaying) {
      filter.frequency.value = angleXfiltered/(Math.PI/2) * (1000-500)/2 + 500;
      // console.log(filter.frequency.value);

      if (  this.camEl.object3D.rotation.x > Math.PI/2-0.2) {
        panNode.pan.value = Math.sin(time/1000*Math.PI*30);
        // console.log(time);
      }
      else {
        panNode.pan.value = 0;
      }
    }

    //filter.frequency.value = (1000-500)*e.pageY/window.innerHeight + 500;
    //  filter.Q.value = (20-10)*e.pageX/window.innerWidth+10;

    // Logics for changing scenes
    var orientation = new THREE.Vector3();
    if ( (-Math.PI/2-0.2) < this.camEl.object3D.rotation.x  && this.camEl.object3D.rotation.x< (-Math.PI/2+0.2) ) {
      this.enterInitScene = true;
      if (this.ichoice == 4) {
        this.ichoice = 0;
      }
      else {
        this.ichoice += 1;
      }
      this.initScene();
      //console.log(this.camEl.object3D.rotation);
    }
    else {
      if (this.enterInitScene == true) {
        if (musicplaying){
          var source = audioContext.createBufferSource();
          source.connect(audioContext.destination);
          source.buffer = samples.isthatyou;
          source.start(audioContext.currentTime + 1.00);
        }
        this.enterInitScene = false;
      }
    }

    // Call to function which increase and decrease thetaLength
    if (this.bgpresets[this.ichoice].changeTheta==true) {
      this.changeThetaLength();
    }
  },

  initScene(){

    if (musicplaying){
      var source = audioContext.createBufferSource();
      source.connect(filter2);
      source.buffer = samples.electricimpulse;
      source.start(audioContext.currentTime + 0.100);
    }

      this.firstframe = true;

      this.deltatheta = 0.1;

      this.sky1El = this.el.sceneEl.querySelector('#sky1');
      this.sky1El.setAttribute('radius', this.bgpresets[this.ichoice].sky1radius);
      this.sky1El.setAttribute('material', 'topColor', this.bgpresets[this.ichoice].sky1topcolor);
      this.sky1El.setAttribute('material', 'bottomColor', this.bgpresets[this.ichoice].sky1bottomcolor);

      this.camEl = this.el.sceneEl.querySelector('#camera');
      this.camEl.setAttribute('camera', 'fov', this.bgpresets[this.ichoice].camfov);
      //this.camEl.setAttribute('position', {x: 0, y:-100, z:0});

      this.sky2El = this.el.sceneEl.querySelector('#sky2');
      this.sky2El.setAttribute('theta-length', this.bgpresets[this.ichoice].thetaLength );
      this.sky2El.setAttribute('radius', this.bgpresets[this.ichoice].radius);
      this.sky2El.setAttribute('material', 'color', this.bgpresets[this.ichoice].color);
      this.sky2El.setAttribute('src', this.bgpresets[this.ichoice].src);
  },

  changeThetaLength() {
    if (this.thetaLength < 179) {
      this.deltatheta = -0.001;
    }
    else if (this.thetaLength>180) {
      this.deltatheta = 0.001;
    }

    this.thetaLength -= this.deltatheta;
    this.sky2El.setAttribute('theta-length', this.thetaLength );
    //console.log(this.thetaLength );
  }
});

AFRAME.registerComponent('skypreset', {
  init: function () {
    this.thetaLength = 160;
    //this.material = this.el.getOrCreateObject3D('mesh').material;
    //this.geometry = this.el.getOrCreateObject3D('mesh').geometry;
    this.skyEl = this.el.sceneEl.querySelector('#sky2');
    console.log(this.geometry );
  },
  schema: {
    cyclespeed: {type: 'float', default: 0.1},
    thetaLengthMin: {type: 'float', default: 155}
  },
  tick: function() {
    this.thetaLength -= this.data.cyclespeed;
    if (this.thetaLength < 160) {
      this.thetaLength = 180;
    }
    this.skyEl.setAttribute('theta-length', this.thetaLength );
    //console.log(this.thetaLength );
  }
});
