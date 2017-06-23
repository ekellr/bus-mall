'use strict';

var image1;
var image2;
var image3;

var MAX_VOTES = 25;
var PREVIOUS_RESULTS_KEY = 'previousResults';
var totalClickCount = 0;

var mruItems = [];

var items = [
  new Item('R2D2 Bag', 'img/bag.jpg'),
  new Item('Banana Slicer', 'img/banana.jpg'),
  new Item('iPad Stand for Bathroom', 'img/bathroom.jpg'),
  new Item('Open-Toed Rain Boots', 'img/boots.jpg'),
  new Item('Easybake Oven', 'img/breakfast.jpg'),
  new Item('Meatball Bubble Gum', 'img/bubblegum.jpg'),
  new Item('Gumby Chair', 'img/chair.jpg'),
  new Item('Gargoyle', 'img/cthulhu.jpg'),
  new Item('Duck Muzzle', 'img/dog-duck.jpg'),
  new Item('Dragon Meat', 'img/dragon.jpg'),
  new Item('Pen Utensils', 'img/pen.jpg'),
  new Item('Pet Sweep', 'img/pet-sweep.jpg'),
  new Item('Pizza Cutter Scissors', 'img/scissors.jpg'),
  new Item('Shark Sleeping Bag', 'img/shark.jpg'),
  new Item('Tauntaun Sleeping Bag', 'img/tauntaun.jpg'),
  new Item('Unicorn Meat', 'img/unicorn.jpg'),
  new Item('Escher Watering Can', 'img/water-can.jpg'),
  new Item('Impossible Wine Glass', 'img/wine-glass.jpg'),
  new Item('Baby Sweep', 'img/sweep.png'),
  new Item('USB Tentacle', 'img/usb.gif'),
];

//Single event handler for all images
var imageOnClick = function (){
  var img = event.target;
  img.item.clickCount++;

  totalClickCount++;

  if (totalClickCount >= MAX_VOTES){
    displayProductResults(items, 'The votes are in!');
    displayProductResultsChart(getItemNames(items), getItemClickCounts(items));
    var stringifiedItems = JSON.stringify(items);
    localStorage.setItem(PREVIOUS_RESULTS_KEY, stringifiedItems);
    // disable the event handlers for the images
    tearDownImages();
  }
  else {
    refreshImages();
  }
};

function initializeImages(){
  image1 = document.getElementById('image1');
  image1.addEventListener('click', imageOnClick);

  image2 = document.getElementById('image2');
  image2.addEventListener('click', imageOnClick);

  image3 = document.getElementById('image3');
  image3.addEventListener('click', imageOnClick);
}

//Stops listening to the event
function tearDownImages()
{
  image1.removeEventListener('click', imageOnClick);
  image2.removeEventListener('click', imageOnClick);
  image3.removeEventListener('click', imageOnClick);
}

function refreshImages () {
  setImageSource(image1);
  setImageSource(image2);
  setImageSource(image3);

  if(mruItems.length > 3){
    mruItems = mruItems.slice(3);
  }
}
//It selects a random image and sets the source of the specified image
function setImageSource (img){
  var item = generateRandomItem();
  while (isMRU(item)){
    item = generateRandomItem();
  }

  img.src = item.imageSource;
  img.name = item.name;

// attach the Item instance this img is displaying
// so we don't have to look it up later in our onclick handler
  img.item = item;

  item.displayCount++;

  mruItems.push(item);
}

function generateRandomItem () {
  var index = Math.floor(Math.random() * items.length);
  return items[index];
}

//Constructs an instance of an item and initializes its state
function Item (name, imageSource){
  this.name = name;
  this.imageSource = imageSource;
  this.clickCount = 0;
  this.displayCount = 0;
}

//Use to determine if the specified item is a duplicate of
function isMRU (item){
  for (var i = 0; i < mruItems.length; i++){
    if (mruItems[i] == item){
      return true;
    }
  }

  return false;
}

function displayProductResults(dataItems, label){
  var container = document.getElementById('productResults');
  container.innerHTML = '';

  var header = document.createElement('h2');
  header.innerHTML = label;
  container.appendChild(header);

  var list = document.createElement('ul');
  container.appendChild(list);

  for(var i = 0; i < dataItems.length; i++)
  {
    var li = document.createElement('li');
    li.innerText = dataItems[i].clickCount + ' vote';
    if (dataItems[i].clickCount != 1){
      li.innerText += 's';
    }
    li.innerText += ' for the ' + dataItems[i].name;

    list.appendChild(li);
  }
}

function getItemNames(dataItems) {
  var names = [];
  for(var i = 0; i < dataItems.length; i++){
    names.push(dataItems[i].name);
  }

  return names;
}

function getItemClickCounts(dataItems){
  var clickCounts = [];
  for(var i = 0; i < dataItems.length; i++){
    clickCounts.push(dataItems[i].clickCount);
  }

  return clickCounts;
}


function displayProductResultsChart(itemNames, itemValues){
  var canvas = document.getElementById('productResultsChart');
  var ctx = canvas.getContext('2d');

  // modeled after the Getting Started example in the chartJS docs
  new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: itemNames,
      datasets: [{
        label: '# of Clicks',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: itemValues,
      }]
    },

    // Configuration options go here
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function initialize(){
  initializeImages();
  refreshImages();
  initializePreviousResults();
}

function initializePreviousResults (){
  if(localStorage.getItem (PREVIOUS_RESULTS_KEY) != null){
    //load out previousResults from storage
    var previousResults =  JSON.parse(localStorage.getItem (PREVIOUS_RESULTS_KEY));
    //display loaded result
    displayProductResults(previousResults, 'The previous votes were:' );
    displayProductResultsChart(getItemNames(previousResults), getItemClickCounts(previousResults));
  }
  //alert('check');
}

//
//------------------------------------Main--------------------------------------
//

initialize();
