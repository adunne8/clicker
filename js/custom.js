// ****** DECLARATIONS ******

// TOTALS
let foodTotal = 0;
let woodTotal = 0;


// HTML ELEMENTS
const foodButton = document.getElementById('food__button');
const woodButton = document.getElementById('wood__button');
const resetButton = document.getElementById('management__reset');

const foodDisplay = document.getElementById('food__count');
const woodDisplay = document.getElementById('wood__count');


// ADDING RESOURCES
function addFood(){
    console.log("Generate Food"); 
    foodTotal++;
    console.log(foodTotal);
    updateDisplay();
    setLocalStorage();
}
function addWood(){
    console.log("Generate Wood"); 
    woodTotal++;
    console.log(woodTotal);
    updateDisplay();
    setLocalStorage();
}

// UPDATING THE PAGE
function updateDisplay(){
    foodDisplay.textContent = foodTotal;
    woodDisplay.textContent = woodTotal;

}

// LOCAL STORAGE FUNCTIONS
function setLocalStorage(){
    localStorage.setItem("foodTotal", foodTotal);
    localStorage.setItem("woodTotal", woodTotal);
}
// NEED || IN CASE NO VALUE STORED IN LOCAL STORAGE
function getLocalStorage(){
    foodTotal = localStorage.getItem("foodTotal") || foodTotal;
    woodTotal = localStorage.getItem("woodTotal") || woodTotal;

    updateDisplay();
}
function clearLocalStorage(){
    localStorage.clear();
    // NEED TO RESET THE DISPLAY VALUES PROPERLY
    updateDisplay();
}


// EVENT LISTENERS
foodButton.addEventListener("click", addFood);
woodButton.addEventListener("click", addWood);

resetButton.addEventListener("click", clearLocalStorage);

getLocalStorage();