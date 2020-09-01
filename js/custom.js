// ****** DECLARATIONS ******

// RESOURCES
//let foodTotal = 0;
let food = {
    name: 'food',
    total: 0
}
let wood = {
    name: 'wood',
    total: 0
}


// HTML ELEMENTS
const foodButton = document.getElementById('food__button');
const woodButton = document.getElementById('wood__button');
const resetButton = document.getElementById('management__reset');

const foodDisplay = document.getElementById('food__count');
const woodDisplay = document.getElementById('wood__count');


// ADDING RESOURCES
function addResource(resource){

    if(resource == food){
        console.log("Food Resource Clicked");
        food.total++;
    }
    if(resource == wood){
        console.log("Wood Resource Clicked");
        wood.total++;
    }

    // UPDATE LOCAL STORAGE AND DISPLAYS
    setLocalStorage();
    updateDisplay();


}



// UPDATING THE PAGE
function updateDisplay(){
    foodDisplay.textContent = food.total;
    woodDisplay.textContent = wood.total;

}

// LOCAL STORAGE FUNCTIONS
function setLocalStorage(){
    localStorage.setItem("foodTotal", food.total);
    localStorage.setItem("woodTotal", wood.total);
}
// NEED || IN CASE NO VALUE STORED IN LOCAL STORAGE
function getLocalStorage(){
    food.total = localStorage.getItem("foodTotal") || food.total;
    wood.total = localStorage.getItem("woodTotal") || wood.total;

    updateDisplay();
}
function clearLocalStorage(){
    localStorage.clear();
    // NEED TO RESET THE DISPLAY VALUES PROPERLY
    updateDisplay();
}


// EVENT LISTENERS
foodButton.addEventListener("click", function(){
    addResource(food);
});
woodButton.addEventListener("click", function(){
    addResource(wood);
});

resetButton.addEventListener("click", clearLocalStorage);

getLocalStorage();