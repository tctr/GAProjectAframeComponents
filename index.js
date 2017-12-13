//
// let scene = document.querySelector( 'a-scene' );
// let objectCountX = 4;
// let objectCountZ = 5;
// let elementRadius = 3;
// let elementSpacing = .05;
// let size = ( elementRadius * 2 ) + elementSpacing;
// let totalSizeX = objectCountX * size;
// let totalSizeZ = objectCountZ * size;
//
// let containerElement = document.createElement( 'a-entity' );
// containerElement.setAttribute( 'position', `${-.5 * totalSizeX} 0 ${-.5 * totalSizeZ}` );
// scene.appendChild( containerElement );
//
// function create3DObject( x , z) {
//   let element = document.createElement( 'a-entity' );
//   element.setAttribute( 'geometry', `primitive: sphere; radius: ${elementRadius};` );
//   element.setAttribute( 'material', `color:#${getRandomColor()}; metalness: 0; roughness: 0` );
//   element.setAttribute( 'position', `${x} 0 ${z}` );
//   containerElement.appendChild( element );
// }
//
// function addObjects() {
//   for( let i=0; i<objectCountX; i++ ) {
//     for( let j=0; j<objectCountZ; j++) {
//       create3DObject( ( i * size ) , (j * size));
//     }
//   }
// }
//
// addObjects();
//
// // get random hex color
// function getRandomColor() {
//   let letters = '0123456789abcdef';
//   let randomColor = '';
//   for (let i = 0; i < 6; i++) {
//     randomColor += letters[Math.floor(Math.random() * 16)];
//   }
//   return randomColor;
// }



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
