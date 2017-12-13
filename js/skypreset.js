
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
