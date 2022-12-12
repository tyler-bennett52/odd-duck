'use strict';
// const imageSourceArray = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg', 'img/boots.jpg', 'img/breakfast.jpg', 'img/bubblegum.jpg', 'img/chair.jpg', 'img/cthulu.jpg', 'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.jpg', 'img/tauntaun.jpg', 'img/unicorn.jpg', 'img/water-can.jpg', 'img/wine=glass.jpg'];
const allProducts = [];
const randomIndices = [0, 0, 0];
let randomSelection1 = 0;
let randomSelection2 = 0;
let randomSelection3 = 0;
let roundsLeft = 25;

// ************************* DOM ITEMS **********************************
const imgChoices = document.querySelectorAll('img');
const resultsBtn = document.querySelector('.hide');
const results = document.querySelector('.results');
const choice2 = document.querySelector('#Choice-2');

// ************************ HELPER FUNCTIONS ********************************
const getRandomIndex = () => {
  return Math.floor(Math.random() * allProducts.length);
};
// **************** CREATE CLASS, BUILD OBJECTS *************************
class Product {
  constructor(name, src) {
    this.name = name;
    this.src = src;
    this.timesShown = 0;
    this.timesPicked = 0;
    allProducts.push(this);
  }
}
const bag = new Product('bag', 'img/bag.jpg');
const banana = new Product('banana', 'img/banana.jpg');
const bathroom = new Product('bathroom', 'img/bathroom.jpg');
const boots = new Product('boots', 'img/boots.jpg');
const breakfast = new Product('breakfast', 'img/breakfast.jpg');
const bubblegum = new Product('bubblegum', 'img/bubblegum.jpg');
const chair = new Product('chair', 'img/chair.jpg');
const cthulhu = new Product('cthulhu', 'img/cthulhu.jpg');
const dogDuck = new Product('dog-duck', 'img/dog-duck.jpg');
const dragon = new Product('dragon', 'img/dragon.jpg');
const pen = new Product('pen', 'img/pen.jpg');
const petSweep = new Product('pet-sweep', 'img/pet-sweep.jpg');
const scissors = new Product('scissors', 'img/scissors.jpg');
const shark = new Product('shark', 'img/shark.jpg');
const sweep = new Product('sweep', 'img/sweep.png');
const tauntaun = new Product('tauntaun', 'img/tauntaun.jpg');
const unicorn = new Product('unicorn', 'img/unicorn.jpg');
const waterCan = new Product('water-can', 'img/water-can.jpg');
const wineGlass = new Product('wine-glass', 'img/wine-glass.jpg');

// **************** GAME FUNCTIONS ***********************
function showResults () {
  results.innerText = '';
  let resultsData = document.createElement('ul');
  results.appendChild(resultsData);
  for (let item of allProducts) {
    let tempElement = document.createElement('li');
    tempElement.innerText = `${item.name}: #Picked-${item.timesPicked}/#Shown ${item.timesShown} = ${item.timesPicked/item.timesShown} Click %`;
    resultsData.appendChild(tempElement);
  }

}


function render(event) {
  choice2.innerText = 'Choice 2';
  let imgClicked = event.target.alt;
  randomSelection1 = getRandomIndex();
  randomSelection2 = getRandomIndex();
  while (randomSelection2 === randomSelection1) {
    randomSelection2 = getRandomIndex();
  }
  randomSelection3 = getRandomIndex();
  while (randomSelection3 === randomSelection2 || randomSelection3 === randomSelection1) {
    randomSelection3 = getRandomIndex();
  }
  imgChoices[0].src = allProducts[randomSelection1].src;
  imgChoices[0].alt = allProducts[randomSelection1].name;
  imgChoices[1].src = allProducts[randomSelection2].src;
  imgChoices[1].alt = allProducts[randomSelection2].name;
  imgChoices[2].src = allProducts[randomSelection3].src;
  imgChoices[2].alt = allProducts[randomSelection3].name;

  allProducts[randomSelection1].timesShown++;
  allProducts[randomSelection2].timesShown++;
  allProducts[randomSelection3].timesShown++;

  for (let item of allProducts) {
    if (imgClicked === item.name) {
      item.timesPicked++;
      break;
    }
  }
  roundsLeft--;
  if (roundsLeft === 0) {
    for (let img of imgChoices) {
      img.removeEventListener('click', render);
      img.src = '';
      img.alt = 'Game Over';
      // results.innerText = 'Press the button below to view your results.';
      resultsBtn.classList.toggle('hide');
      resultsBtn.addEventListener('click', showResults);
    }
  }
}
// **************** EXECUTABLE CODE *************************
for (let img of imgChoices) {
  img.addEventListener('click', render);
}
