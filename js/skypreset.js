
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
    console.log(this.thetaLength );
  }
});

// background preset 1 :
// SKIES :  both skies theta = 180 degrees
//          no rainbow
//          image : panorama or the mission
//
//  CAMERA :  FOV = 120 degrees
//            rotation = standard around Y axe only

// Objects Preset 1
// OBJECTS : box + torus + cylinder
// POSTION : HIGH in the sky
// ROTATION : around all axes


      // let v1 = new THREE.Vector3(-this.data.direction.x, -this.data.direction.y, -this.data.direction.z );
      // let v2 = this.el.object3D.position;
      // v2.add(v1);
      // this.el.setAttribute('position', `${v2.x} ${v2.y } ${v2.z}`);
      // this.element.setAttribute('material', 'uColor', this.data.color);

      //       schema: {
      //   speed: {type: "number", default: .0001},
      //   direction:{type: "vec3", default: {x: 0, y: 0, z: 0}},
      //   lifeSpan:{type: "number", default: 2000},//milliseconds
      //   color:{default:"#999"}
      // },


      //src: {type:"src",default:'Assets/mission.jpg'}
      //src: {type:"src",default:'Assets/voielactee360_2.jpg'}
      //src: {type:"src",default:'Assets/pano_mission.jpg'}
      //src: {type:"src",default:'Assets/goatrock360_4.jpg'}
      //src: {type:"src",default:'Assets/murals360.jpg'}
      //src: {type:"src",default:'Assets/murals360_2.jpg'}
      //src: {type:"src",default:'Assets/beach360_3.jpg'}

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
                       { camfov:150, sky1radius:200, sky1topcolor:'#ffffff', sky1bottomcolor:'#ffffff', changeTheta: false, thetaLength: 180, radius: 200, shader: 'flat', color: '#ff00ff', src: 'Assets/panorama.jpg'},
                       // desert with theta=160
                       { camfov:150, sky1radius:200, sky1topcolor:'#ffffff', sky1bottomcolor:'#ffffff', changeTheta: false, thetaLength: 160, radius: 200, shader: 'flat', color: '#ff00ff', src: 'Assets/panorama.jpg'},
                       // voie lactee
                       { camfov:150, sky1radius:200, sky1topcolor:'#ffffff', sky1bottomcolor:'#ffffff', changeTheta: false, changeTheta: true, thetaLength: 180, radius: 200, shader: 'flat', color: '#ffffff', src: 'Assets/voielactee360.jpg'},
                       // voie mosaic trees
                       { camfov:120, sky1radius:200.5, sky1topcolor:'#ffffff', sky1bottomcolor:'#ffffff', changeTheta: false, thetaLength: 178, radius: 200, shader: 'flat', color: '#ffffff', src: 'Assets/sequoiatrip2.png'},
                       // colors only
                       { camfov:120, sky1radius:200., sky1topcolor:'#ffaa00', sky1bottomcolor:'#ee50ff', changeTheta: true, thetaLength: 179, radius: 200, shader: 'flat', color: '#0000ff', src: ''}
];

    this.ichoice = this.data.ichoice;
    this.initScene();
    this.enterInitScene = false;
    this.firstframe==true;
  },

  tick: function() {
    if (this.firstframe==true) {
      this.firstframe = false;
      this.thetaLength = this.bgpresets[this.ichoice].thetaLength;
    }

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
          source.start(audioContext.currentTime + 0.100);
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

      this.firstframe = true;

      this.deltatheta = 0.1; this.changeThetaLengthMode = true;

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
