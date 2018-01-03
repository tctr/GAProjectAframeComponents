let scene = document.querySelector( 'a-scene' );

AFRAME.registerComponent('rainbow', {
      init: function () {
        this.hue = 0;
        this.material = this.el.getOrCreateObject3D('mesh').material;
      },
      schema: {
        cyclespeed: {type: 'float', default: .001}
      },
      tick: function() {
        this.hue += this.data.cyclespeed;
        this.material.color.setHSL ( this.hue % 1, 1, .5 );
      }
    });
