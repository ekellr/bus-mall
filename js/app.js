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
var correctItem = '';
var wrongItem = '';
var image1 = document.getElementById('image1');
var image2 = document.getElementById('image2');
var image3 = document.getElementById('image3');

function setup () {
  // call this with a random name
  setImageSource(image1);
  setImageSource(image2);
  setImageSource(image3);
  //wrongTree = generateRandomTree();
  //renderTreeName(correctTree);
  //renderTreeImage(correctTree);
  //renderTreeImage(wrongTree);
}

function setImageSource (img){
  var item = generateRandomItem();
  var pathToItem = 'img/' + item + '.jpg';
  img.src = pathToItem;
}

setup();
/*
treeImagesParent.addEventListener('click', function (event) {
  var answer = event.target.getAttribute('id');
  if (answer === correctTree) {
    renderResponse('woohoo!');
  } else {
    renderResponse('wrong! virus alert.');
  }
});*/

function generateRandomItem () {
  var index = Math.floor(Math.random() * itemNames.length);
  return itemNames[index];
}

function renderTreeName (treeName) {
  var h3 = document.createElement('h3');
  h3.textContent = treeName;
  treeNameParent.append(h3);
}

function renderTreeImage (treeName) {
  var img = document.createElement('img');
  img.setAttribute('src', 'images/' + treeName + '.jpeg');
  img.setAttribute('id', treeName);
  treeImagesParent.append(img);
}

function renderResponse (response) {
  var p = document.createElement('p');
  p.textContent = response;
  responseParent.append(p);
}
