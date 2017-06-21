'use strict';

var items = [
  new Item('bag', 'img/bag.jpg'),
  new Item('banana',  'img/banana.jpg'),
  new Item('bathroom', 'img/bathroom.jpg'),
  new Item('boots', 'img/boots.jpg'),
  new Item('breakfast', 'img/breakfast.jpg'),
  new Item('bubblegum', 'img/bubblegum.jpg'),
  new Item('chair', 'img/chair.jpg'),
  new Item('cthulhu', 'img/cthulhu.jpg'),
  new Item('dog-duck', 'img/dog-duck.jpg'),
  new Item('dragon', 'img/dragon.jpg'),
  new Item('pen', 'img/pen.jpg'),
  new Item('pet-sweep', 'img/pet-sweep.jpg'),
  new Item('scissors', 'img/scissors.jpg'),
  new Item('shark', 'img/shark.jpg'),
  new Item('tauntaun', 'img/tauntaun.jpg'),
  new Item('unicorn', 'img/unicorn.jpg'),
  new Item('water-can', 'img/water-can.jpg'),
  new Item('wine-glass', 'img/wine-glass.jpg'),
  new Item('sweep', 'img/sweep.png'),
  new Item('usb', 'img/usb.gif'),
];
var image1 = document.getElementById('image1');
var image2 = document.getElementById('image2');
var image3 = document.getElementById('image3');

var imageOnClick = function (img){
  img.item.clickCount++;
  alert(img.name +  ' has been clicked ' + img.item.clickCount + ' times');
}

function setup () {
  setImageSource(image1);
  setImageSource(image2);
  setImageSource(image3);
}

function setImageSource (img){
  var item = generateRandomItem();
  img.src = item.imageSource;
  img.name = item.name;
  img.item = item;
}

function generateRandomItem () {
  var index = Math.floor(Math.random() * items.length);
  return items[index];
}

function Item (name, imageSource){
  this.name = name;
  this.imageSource = imageSource;
  this.clickCount = 0;
  this.displayCount = 0;
}

//
//------------------------------------Main--------------------------------------
//

setup();
