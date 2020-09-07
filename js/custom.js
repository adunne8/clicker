// ****** DECLARATIONS ******

// RESOURCES
class Resource {
    constructor(name, total){
        this.name = name;
        this.total = total;
    }

    toString(){
        console.table(this);
    }

}

let food = new Resource('food', 0);
let wood = new Resource('wood', 0);
let stone = new Resource('stone', 0);




// ** HTML ELEMENTS ASSIGNMENT

// BUTTONS
const foodButton = document.getElementById('food__button');
const woodButton = document.getElementById('wood__button');
const stoneButton = document.getElementById('stone__button');
const resetButton = document.getElementById('management__reset');

// DISPLAYS
const foodDisplay = document.getElementById('food__count');
const woodDisplay = document.getElementById('wood__count');
const stoneDisplay = document.getElementById('stone__count');


// ADDING RESOURCES - FOOD, STONE, WOOD
function addResource(resource){
    // ADDS 1 RESOURCE TO THE CLICKED RESOURCE
    resource.total++;

    console.log(resource.name + ': ' + resource.total);


    // UPDATE LOCAL STORAGE AND DISPLAYS
    setLocalStorage();
    updateDisplay();
}



// UPDATING THE PAGE
function updateDisplay(){
    foodDisplay.textContent = food.total;
    woodDisplay.textContent = wood.total;
    stoneDisplay.textContent = stone.total;

}

// LOCAL STORAGE FUNCTIONS
function setLocalStorage(){
    localStorage.setItem("foodTotal", food.total);
    localStorage.setItem("woodTotal", wood.total);
    localStorage.setItem("stoneTotal", stone.total);
}
// NEED || IN CASE NO VALUE STORED IN LOCAL STORAGE
function getLocalStorage(){
    food.total = localStorage.getItem("foodTotal") || food.total;
    wood.total = localStorage.getItem("woodTotal") || wood.total;
    stone.total = localStorage.getItem("stoneTotal") || stone.total;

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
stoneButton.addEventListener("click", function(){
    addResource(stone);
});
resetButton.addEventListener("click", clearLocalStorage);

getLocalStorage();
