'use strict';

const allProducts = [];
let lastRoundIndices = [];
let thisRoundIndices = [];
let roundsLeft = 25;
const oldProducts = JSON.parse(localStorage.getItem('allProducts'));
// ************************* DOM ITEMS **********************************
const imgChoices = document.querySelectorAll('img');
const resultsBtn = document.querySelector('.hide');
const results = document.querySelector('.results');
const choice2 = document.querySelector('#Choice-2');
const mainText = document.querySelector('#main-text');
const canvasContainer = document.querySelector('.canvas');
const canvas = document.querySelector('canvas');
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
if (oldProducts) {
  for (let i = 0; i < allProducts.length; i++) {
    allProducts[i].timesShown = oldProducts[i].timesShown;
    allProducts[i].timesPicked = oldProducts[i].timesPicked;
  }
}

// **************** GAME FUNCTIONS ***********************
function showChart() {
  let chartObject = {
    type: 'bar',
    data: {
      labels: allProducts.map(product => product.name),
      datasets: [{
        label: '# of Views',
        data: allProducts.map(product => product.timesShown),
        backgroundColor: ['rgb(4, 90, 4)'],
        borderWidth: 2
      },
      {
        label: '# of Votes',
        data: allProducts.map(product => product.timesPicked),
        backgroundColor: ['rgb(255, 255, 0)'],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  new Chart(canvas, chartObject);
}
function showResults() {
  results.innerText = '';
  mainText.classList.toggle('hide');
  canvasContainer.classList.toggle('hide');
  let resultsData = document.createElement('ul');
  results.appendChild(resultsData);
  for (let item of allProducts) {
    let tempElement = document.createElement('li');
    tempElement.innerText = `${item.name}: Picked-${item.timesPicked}/Shown ${item.timesShown}`;
    resultsData.appendChild(tempElement);
  }
  showChart();
  localStorage.setItem('allProducts', JSON.stringify(allProducts));
}
function render(event) {
  choice2.innerText = 'Choice 2';
  let imgClicked = event.target.alt;
  lastRoundIndices = thisRoundIndices;
  thisRoundIndices = [];
  let tempIndex = getRandomIndex();
  for (let i = 3; i > 0; i--) {
    while (lastRoundIndices.includes(tempIndex) || thisRoundIndices.includes(tempIndex)) {
      tempIndex = getRandomIndex();
    } thisRoundIndices.push(tempIndex);
  }
  imgChoices[0].src = allProducts[thisRoundIndices[0]].src;
  imgChoices[0].alt = allProducts[thisRoundIndices[0]].name;
  imgChoices[1].src = allProducts[thisRoundIndices[1]].src;
  imgChoices[1].alt = allProducts[thisRoundIndices[1]].name;
  imgChoices[2].src = allProducts[thisRoundIndices[2]].src;
  imgChoices[2].alt = allProducts[thisRoundIndices[2]].name;
  
  allProducts[thisRoundIndices[0]].timesShown++;
  allProducts[thisRoundIndices[1]].timesShown++;
  allProducts[thisRoundIndices[2]].timesShown++;

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
      img.src = 'https://via.placeholder.com/550/045a04/FFFF00/?text=Game Over';
      img.alt = 'Game Over';
      resultsBtn.classList.toggle('hide');
      resultsBtn.addEventListener('click', showResults);
    }
  }
}
// **************** EXECUTABLE CODE *************************
for (let img of imgChoices) {
  img.addEventListener('click', render);
}
