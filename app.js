'use strict';

var PICTURE_DATA = 'pictureData';

var picStorage = [];
var clickCounter = [];
var MAX_CLICK_COUNTER = 20;
var randomPics = [];

function getRandomPicIndex() {
  return Math.floor(Math.random() * (picStorage.length));
}

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
  };

  this.render = function (domReferance) {
    domReferance.src = this.picture;
    this.timeShown++;
  };



  this.loadData = function (data) {
    this.timesClicked = data.timesClicked;
    this.timeShown = data.timeShown;
    this.name = data.name;
    this.picture = data.picture;
  };
};

if (localStorage.getItem(PICTURE_DATA) === null) {
  var bag = new Picture('bag', './image/bag.jpg');
  var banana = new Picture('banana', './image/banana.jpg');
  var bathroom = new Picture('bathroom', './image/bathroom.jpg');
  var boots = new Picture('bots', './image/boots.jpg');
  var breakfast = new Picture('breakfast', './image/breakfast.jpg');
  var bubblegum = new Picture('bubblegum', './image/bubblegum.jpg');
  var chair = new Picture('chair', './image/chair.jpg');
  var cthulhu = new Picture('cthulhu', './image/cthulhu.jpg');
  var dogDuck = new Picture('dog-duck', './image/dog-duck.jpg');
  var dragon = new Picture('dragon', './image/dragon.jpg');
  var pen = new Picture('pen', './image/pen.jpg');
  var petSweep = new Picture('pet-sweep', './image/pet-sweep.jpg');
  var scissors = new Picture('scissors', './image/scissors.jpg');
  var shark = new Picture('shark', './image/shark.jpg');
  var sweep = new Picture('sweep', './image/sweep.png');
  var tauntaun = new Picture('tauntaun', './image/tauntaun.jpg');
  var unicorn = new Picture('unicorn', './image/unicorn.jpg');
  var usb = new Picture('usb', './image/usb.gif');
  var waterCan = new Picture('water-can', './image/water-can.jpg');
  var wineGlass = new Picture('wine-glass', './image/wine-glass.jpg');

  picStorage.push(bag);
  picStorage.push(banana);
  picStorage.push(bathroom);
  picStorage.push(boots);
  picStorage.push(breakfast);
  picStorage.push(bubblegum);
  picStorage.push(chair);
  picStorage.push(cthulhu);
  picStorage.push(dogDuck);
  picStorage.push(dragon);
  picStorage.push(pen);
  picStorage.push(petSweep);
  picStorage.push(scissors);
  picStorage.push(shark);
  picStorage.push(sweep);
  picStorage.push(tauntaun);
  picStorage.push(unicorn);
  picStorage.push(usb);
  picStorage.push(waterCan);
  picStorage.push(wineGlass);

} else {
  var jsonData = localStorage.getItem(PICTURE_DATA);
  var data = JSON.parse(jsonData);

  for (var i = 0; i < data.length; i++) {
    var newPic = new Picture('', '');

    newPic.loadData(data[i]);
    picStorage.push(newPic);
  }
}




function clickManager(event) {
  clickCounter++;
  if (clickCounter < MAX_CLICK_COUNTER) {
    var pictureIndex;

    if (event.target.id === 'placeholder-0') {
      pictureIndex = 0;
    } else if (event.target.id === 'placeholder-1') {
      pictureIndex = 1;
    } else {
      pictureIndex = 2;
    }
    var clickedPicture = picStorage[randomPics[pictureIndex]];
    //console.log(clickedPicture);
    clickedPicture.markClick();

    select3PicsAndRender();

  } else {
    alert('game over');
    savePictureDataToLoacalStorage();
    createPictureChart();
    resultsList();
  }

  function savePictureDataToLoacalStorage() {
    var jsonData = JSON.stringify(picStorage);
    localStorage.setItem(PICTURE_DATA, jsonData);
  }
}

function resultsList() {
  var results = document.getElementById('resultsOfGame');
  for (var i = 0; i < picStorage.length; i++) {
    var li = document.createElement('li');
    li.textContent = `${picStorage[i].name}: was shown ${picStorage[i].timeShown} times, of those times it was selected ${picStorage[i].timesClicked} times.`;
    results.append(li);
  }
}
getRandomPicIndex();
select3PicsAndRender();

var placeholder0 = document.getElementById('placeholder-0');
var placeholder1 = document.getElementById('placeholder-1');
var placeholder2 = document.getElementById('placeholder-2');

placeholder0.addEventListener('click', clickManager);
placeholder1.addEventListener('click', clickManager);
placeholder2.addEventListener('click', clickManager);

function createPictureChart() {
  var nameArray = [];
  var clickArray = [];
  var timesShownArray = [];

  for (var i = 0; i < picStorage.length; i++) {
    nameArray.push(picStorage[i].name);
    clickArray.push(picStorage[i].timesClicked);
    timesShownArray.push(picStorage[i].timeShown);
  }

  var context = document.getElementById('chart').getContext('2d');
  var pictureChart = new Chart(context, {
    type: 'bar',
    data: {
      labels: nameArray,
      datasets: [
        {
          label: 'Picture Clicks',
          data: clickArray,
          backgroundColor: 'rgb(255,99,132)',
          borderColor: 'rgb(255,99,132)',
        },
        {
          label: 'timesShown',
          data: timesShownArray,
        }
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            }
          },
        ],
      }
    },
  });
}

