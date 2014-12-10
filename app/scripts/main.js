var step = 0;
var flag = {};
var sum = 0;
var order = {};

function random() {
  'use strict';
  var mark = [0, 1, 2, 3, 4];
  var num = 0;
  for (var i = 4; i > 0; i--) {
    num = 1 + (Math.round(Math.random() * (i - 1)));
    console.log(num);
    var temp = mark[i];
    mark[i] = mark[num];
    mark[num] = temp;
    order[i.toString()] = mark[i];
    console.log(mark);
  }
  console.log(order);
}

random();

function hasClassName(inElement, inClassName)
{
  'use strict';
  var regExp = new RegExp('(?:^|\\s+)' + inClassName + '(?:\\s+|$)');
  return regExp.test(inElement.className);
}

function addClassName(inElement, inClassName)
{
  'use strict';
  if (!hasClassName(inElement, inClassName)) {
    inElement.className = [inElement.className, inClassName].join(' ');
  }
}

function removeClassName(inElement, inClassName)
{
  'use strict';
  if (hasClassName(inElement, inClassName)) {
    var regExp = new RegExp('(?:^|\\s+)' + inClassName + '(?:\\s+|$)', 'g');
    var curClasses = inElement.className;
    inElement.className = curClasses.replace(regExp, ' ');
  }
}

function change(isOpen) {
  'use strict';
  if (isOpen) {
    removeClassName(document.getElementById('outside'), 'cube');
    addClassName(document.getElementById('outside'), 'ring');
    setTimeout(function() {
      removeClassName(document.getElementById('outside'), 'ring');
      addClassName(document.getElementById('outside'), 'ringDown');
      removeClassName(document.getElementById('inside'), 'cube');
      addClassName(document.getElementById('inside'), 'ringDown');
      //removeClassName(document.getElementById("outside"), 'cubeShow');
      removeClassName(document.getElementById('inside'), 'cubeShow');
      setTimeout(function() {
        removeClassName(document.getElementById('outside'), 'cubeShow');
      }, 2000);
    }, 2000);
  } else {
    addClassName(document.getElementById('outside'), 'cubeShow');
    addClassName(document.getElementById('inside'), 'cubeShow');
    removeClassName(document.getElementById('inside'), 'ringDown');
    addClassName(document.getElementById('inside'), 'cube');
    removeClassName(document.getElementById('outside'), 'ringDown');
    addClassName(document.getElementById('outside'), 'ring');
    setTimeout(function() {
      removeClassName(document.getElementById('outside'), 'ring');
      addClassName(document.getElementById('outside'), 'cube');
    }, 2000);
  }
}

function turnBack(num) {
  'use strict';
  var frontFaceId = 'card' + num;
  var frontFaceClass = 'card' + num + 'TurnBack';
  var backFaceId = 'card' + num + 'Back';
  var backFaceClass = 'card' + num + 'TurnFront';
  addClassName(document.getElementById(backFaceId), 'bonus' + order[num.toString()]);
  addClassName(document.getElementById(frontFaceId), frontFaceClass);
  addClassName(document.getElementById(backFaceId), backFaceClass);
  setTimeout(function() {
    removeClassName(document.getElementById(frontFaceId), 'card' + num);
    addClassName(document.getElementById(frontFaceId), 'bonus' + order[num.toString()]);
    removeClassName(document.getElementById(backFaceId), 'bonus' + order[num.toString()]);
    removeClassName(document.getElementById(frontFaceId), frontFaceClass);
    removeClassName(document.getElementById(backFaceId), backFaceClass);
  }, 3000);
}

function Start(keyNum) {
  'use strict';
  switch (step) {
    case 0:
      if (keyNum === 32) {
        change(true);
        step++;
      }
      break;
    case 1:
      if ((keyNum >= 49 && keyNum <= 52) || (keyNum >= 97 && keyNum <= 100)) {
        var objId = keyNum > 60 ? (keyNum - 96) : (keyNum - 48);
        if (!flag.hasOwnProperty(objId.toString())) {
          flag[objId.toString()] = 1;
          sum++;
          turnBack(objId);
          if (sum >= 4) {
            step++;
          }
        }
      }
      break;
    case 2:
      if (keyNum === 32) {
        change(false);
        step = 0;
        delete flag['1'];
        delete flag['2'];
        delete flag['3'];
        delete flag['4'];
        sum = 0;
      }
      break;
    default:
      step = 0;
      break;
  }
}

$('body').keydown(function(event){
  'use strict';
  new Start (event.which);
});
