'use strict';

var itemNames = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-weep',
  'scissors',
  'shark',
  'tauntaun',
  'unicorn',
  'water-can',
  'wine-glass'
];
var image1 = document.getElementById('image1');
var image2 = document.getElementById('image2');
var image3 = document.getElementById('image3');

function setup () {
  setImageSource(image1);
  setImageSource(image2);
  setImageSource(image3);
}

function setImageSource (img){
  var item = generateRandomItem();
  var pathToItem = 'img/' + item + '.jpg';
  img.src = pathToItem;
}

function generateRandomItem () {
  var index = Math.floor(Math.random() * itemNames.length);
  return itemNames[index];
}

//
//Main
//

setup();
