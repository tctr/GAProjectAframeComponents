
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

// backgroundPresets = [
//                       {sky2: {
//                         thetaLength: {type:"number", default:180},
//                         rotation{type: {type:"vec3", default:}:""; shader:'flat'; color:ffffff; }
//                     }
//                     ];


      // this.element.setAttribute('geometry', `primitive: plane; width: ${this.elementRadius}; height: ${this.elementRadius};` );
      // this.element.setAttribute('material', `side: double;shader:sprite-mix;uTex:#smoke-image;transparent:true;opacity:.1;`);
      // this.element.setAttribute('material', `color:${this.data.color};transparent:true; opacity:1;`);


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


AFRAME.registerComponent('fullpreset', {
  schema: {
  thetaLength: {type:"number", default:"180"},
  radius: {type:"number", default:"200"},
  shader: {default:"flat"},
  color: {default:"#ff00ff"},
  src: {default:"#desert"}
},
  init: function () {

    //this.selBackgroundPreset = backgroundPreset1;

    //this.material = this.el.getOrCreateObject3D('mesh').material;
    //this.geometry = this.el.getOrCreateObject3D('mesh').geometry;
    // console.log(this.geometry );
    this.skyEl = this.el.sceneEl.querySelector('#sky2');
    this.skyEl.setAttribute('theta-length', this.data.thetaLength );
    this.skyEl.setAttribute('material', 'color', this.data.color);
    this.skyEl.setAttribute('material', 'src', this.data.src);
    this.skyEl.setAttribute('radius', this.data.radius);
  }

  // tick: function() {
  //   this.thetaLength -= this.data.cyclespeed;
  //   if (this.thetaLength < 160) {
  //     this.thetaLength = 180;
  //   }
  //   this.skyEl.setAttribute('theta-length', this.thetaLength );
  //   console.log(this.thetaLength );
  // }
});
