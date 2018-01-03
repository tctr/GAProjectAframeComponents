// to make working with angles easy
const TO_RAD = Math.PI / 180;
const TO_DEG = 1 / TO_RAD;

var angleX;
var angleXfiltered; alpha = 0.05;

var panningValue;

Leap.loop({

  // frame callback is run before individual frame components
  frame: function(frame){
  console.log('');
  },

  // hand callbacks are run once for each hand in the frame
  hand: function(hand){
    angleX  = hand.pitch()*TO_DEG/(40-0)*Math.PI - Math.PI/2;
    angleX = Math.max(angleX,-Math.PI/2);
    angleX = Math.min(angleX,Math.PI/2);
    angleXfiltered = alpha*angleX + (1-alpha)*angleXfiltered;

    var yawDeg = hand.yaw()*TO_DEG;
    var rollDeg = hand.roll()*TO_DEG;

    panningValue = (rollDeg-30)*2/(30) -1;
    panningValue = Math.max(angleX,-1);
    panningValue = Math.min(angleX,1);

    // if (yawDeg<-22) {
    //   incCamAngleY = -0.015;
    // }
    // else if (yawDeg<-16) {
    //   incCamAngleY = -0.01;
    // }
    // else {
    //   incCamAngleY = -0.005;
    // }

    // console.log("Hand: " + hand.id + ' roll: ' + Math.round(hand.roll() * TO_DEG) + ' yaw: ' + Math.round(hand.yaw() * TO_DEG) + ' pitch: ' + angleX + ' ' + Math.round(hand.pitch() * TO_DEG) );
    // console.log(' yaw: ' + Math.round(hand.yaw() * TO_DEG) + ' incCamAngleY: ' + incCamAngleY );
    // console.log(' pos0: ' + Math.round(hand.palmPosition[0]) + ' pos1: ' + Math.round(hand.palmPosition[1]) + ' pos2: ' + Math.round(hand.palmPosition[2]) );
    // console.log(' panningValue'+ panningValue + ' roll: ' + Math.round(hand.roll() * TO_DEG) )

  }

});
