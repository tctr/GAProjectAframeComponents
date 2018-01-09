// to make working with angles easy
const TO_RAD = Math.PI / 180;
const TO_DEG = 1 / TO_RAD;

var angleXleap;
var angleXleapFiltered; alpha = 0.05;
var angleXleapStable90 = 0;

var panningValue;

var angleXmouse; alphaMouse = 0.2;
var angleXmouseFiltered;

document.addEventListener('mousemove',function(e){
  angleXmouse = -(e.clientY - window.innerHeight/2)*Math.PI/2*1/( (0.5-0.1)*window.innerHeight);
  angleXmouse = Math.max(angleXmouse,-Math.PI/2-0.1);
  angleXmouse = Math.min(angleXmouse,Math.PI/2 + 0.05);

  if ( angleXmouse>(Math.PI/2-0.005) && angleXmouse<(Math.PI/2+0.005)) {
    angleXmouseFiltered = Math.PI/2;
  }
  else{
    angleXmouseFiltered = alphaMouse*angleXmouse + (1-alphaMouse)*angleXmouseFiltered;
  }
});

var leaphere = 0;

Leap.loop({

  // frame callback is run before individual frame components
  frame: function(frame){
    leaphere = 1;
    //console.log(leaphere);
  },

  // hand callbacks are run once for each hand in the frame
  hand: function(hand){
    angleXleap  = hand.pitch()*TO_DEG/(50-0)*Math.PI - Math.PI/2;
    angleXleap = Math.max(angleXleap,-Math.PI/2-0.15);
    angleXleap = Math.min(angleXleap,Math.PI/2 + 0.);
    angleXleapFiltered = alpha*angleXleap + (1-alpha)*angleXleapFiltered;

    // Doing an hysteresis around 90 degree => NOT USED
    // if (angleXleapStable90==0 ) {
    //   if (angleXleap>(Math.PI/2-0.05) && angleXleap<(Math.PI/2+0.05)) {
    //     angleXleapFiltered = Math.PI/2;
    //     angleXleapStable90 = 1;
    //   }
    //   else {
    //     angleXleapFiltered = alpha*angleXleap + (1-alpha)*angleXleapFiltered;
    //   }
    // }
    // else if (angleXleap>(Math.PI/2+0.05) || angleXleap<(Math.PI/2-0.05)){
    //   angleXleapFiltered = angleXleap;
    //   angleXleapStable90 = 0;
    // }

    // NOT USED
    // var yawDeg = hand.yaw()*TO_DEG;
    // var rollDeg = hand.roll()*TO_DEG;
    //
    // panningValue = (rollDeg-30)*2/(30) -1;
    // panningValue = Math.max(angleXleap,-1);
    // panningValue = Math.min(angleXleap,1);

    //let val=angleXleapFiltered*180/Math.PI; console.log(val);
    // console.log("Hand: " + hand.id + ' roll: ' + Math.round(hand.roll() * TO_DEG) + ' yaw: ' + Math.round(hand.yaw() * TO_DEG) + ' pitch: ' + angleXleap + ' ' + Math.round(hand.pitch() * TO_DEG) );
    // console.log(' yaw: ' + Math.round(hand.yaw() * TO_DEG) + ' incCamAngleY: ' + incCamAngleY );
    // console.log(' pos0: ' + Math.round(hand.palmPosition[0]) + ' pos1: ' + Math.round(hand.palmPosition[1]) + ' pos2: ' + Math.round(hand.palmPosition[2]) );
    // console.log(' panningValue'+ panningValue + ' roll: ' + Math.round(hand.roll() * TO_DEG) )

  }

});
