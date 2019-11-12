'use strict'


var picStorage = [];
var randomPics = [];
var clickCounter = [];
var MAX_CLICK_COUNTER = 20;

function getRandomPicIndex() {
  return Math.floor(Math.random())
    * (picStorage.length);
}

getRandomPicIndex();

function select3PicsAndRender() {
  randomPics = [];

  while (randomPics.length < 3) {
    var nextRandomValue = getRandomPicIndex();

    if (!randomPics.includes(nextRandomValue)) {
      randomPics.push(nextRandomValue);
    }
  }
  var placeholder0 = document.getElementById('placeholder-0');
  var placeholder1 = document.getElementById('placeholder-1');
  var placeholder2 = document.getElementById('placeholder-2');

  select3PicsAndRender();

  picStorage[randomPics[0]].render(placeholder0);
  picStorage[randomPics[1]].render(placeholder1);
  picStorage[randomPics[2]].render(placeholder2);
}

var Picture = function (name, picture) {
  this.name = name;
  this.picture = picture;
  this.timesClicked = 0;
  this.timeShown = 0;

  this.markClick = function () {
    this.timesClicked++;
  }

  this.render = function (domReferance) {
    domReferance.src = picture;
  }

  picStorage.push(this);
}

var bag = new Picture('bag', './image/bag.jpg');
var banana = new Picture('banana', './image/banana.jpg');
var bathroom = new Picture('bathroom', './image/bathroom.jpg');
var boots = new Picture('bots', './image/boots.jpg');
var breakfast = new Picture('breakfast', './image/breakfast.jpg');
var bubblegum = new Picture('bubblegum', './image/bubblegum.jpg');
var chair = new Picture('chair', './image/chair.jpg');
var cthulhu = new Picture('cthulhu', './image/cthulhu.jpg');
var dog-duck = new Picture('dog-duck', './image/dog-duck.jpg');
var dragon = new Picture('dragon', './image/dragon.jpg');
var pen = new Picture('pen', './image/pen.jpg');
var pet-sweep = new Picture('pet-sweep', './image/pet-sweep.jpg');
var scissors = new Picture('scissors', './image/scissors.jpg');
var shark = new Picture('shark', './image/shark.jpg');
var sweep = new Picture('sweep', './image/sweep.png');
var tauntaun = new Picture('tauntaun', './image/tauntaun.jpg');
var unicorn = new Picture('unicorn', './image/unicorn.jpg');
var usb = new Picture('usb', './image/usb.gif');
var water-can = new Picture('water-can', './image/water-can.jpg');
var wine-glass = new Picture('wine-glass', './image/wine-glass.jpg');

function clickManager(event) {
  clickCounter++;
  if (clickCounter < MAX_CLICK_COUNTER) {
    var pictureIndex;

    if (event.target.id === 'placeholder-0)'{
      pictureIndex = 0;
    } else if (event.target.id === 'placeholder-1') {
      pictureIndex = 1;
    } else {
      pictureIndex = 2;
    }
    var clickedPicture = picStorage[randomPics[pictureIndex]];
    clickedPicture.markClick();

    select3PicsAndRender();
  } else {
    alert('game over');
  }
}
clickManager(event);

getRandomPicIndex();
select3PicsAndRender();

var placeholder0 = document.getElementById('placeholder-0');
var placeholder1 = document.getElementById('placeholder-1');
var placeholder2 = document.getElementById('placeholder-2');

placeholder0.addEventListener('click', clickManager); placeholder1.addEventListener('click', clickManager); placeholder2.addEventListener('click', clickManager);