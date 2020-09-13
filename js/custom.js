// ****** DECLARATIONS ******
let food;
let wood;
let stone;
let upgrades;

// RESOURCES
class Resource {
    constructor(name, total, clickValue){
        this.name = name;
        this.total = total;
        this.clickValue = clickValue;
    }

    toString(){

        for(var property in this){
            console.log(property + ': ' + this[property]);
        }

    }

}

function initializeValues(){
    //console.log('initialized');

    food = new Resource('food', 0, 1);
    wood = new Resource('wood', 0, 1);
    stone = new Resource('stone', 0, 1);

}

initializeValues();

// ** HTML ELEMENTS ASSIGNMENT

// BUTTONS
const foodButton = document.getElementById('food__button');
const woodButton = document.getElementById('wood__button');
const stoneButton = document.getElementById('stone__button');
const resetButton = document.getElementById('management__reset');

const upgradeButtons = document.querySelectorAll('.upgrade__button');
upgradeButtons.forEach(function(currentButton){
    currentButton.addEventListener('click', function(){
        upgrade(currentButton);
    });
});

// DISPLAYS
const foodDisplay = document.getElementById('food__count');
const woodDisplay = document.getElementById('wood__count');
const stoneDisplay = document.getElementById('stone__count');


// ADDING RESOURCES - FOOD, STONE, WOOD
function addResource(resource){
    // ADDS 1 RESOURCE TO THE CLICKED RESOURCE
    resource.total = resource.total + resource.clickValue;

    console.log(resource.name + ': ' + resource.total);


    // UPDATE LOCAL STORAGE AND DISPLAYS
    setLocalStorage();
    updateDisplay();
}

// UPGRADES PROCESSOR
function upgrade(upgradeButton){
    console.log(upgradeButton.id);

    if(upgradeButton.id === 'doubleclick--food'){
        food.clickValue = food.clickValue*2;
        console.log(food.clickValue);
        upgradeButton.disabled = true;
    }
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
    // parseInt required to convert loaded values to integers
    food.total = parseInt(localStorage.getItem("foodTotal") || food.total);
    wood.total = parseInt(localStorage.getItem("woodTotal") || wood.total);
    stone.total = parseInt(localStorage.getItem("stoneTotal") || stone.total);


    updateDisplay();
}
function resetValues(){



        console.log('Reset Triggered, resetting values');
        /*
        let foodKeys = Object.keys(food);

        for (var i = 0; i < foodKeys.length; i++) {
            let val = food[foodKeys[i]];
            console.log('reset val: ' + val);
        }
        */
        //food = new Resource('food', 0, 1);
        
        initializeValues();
        clearLocalStorage();


}

function clearLocalStorage(){
    localStorage.clear();
    // NEED TO RESET THE DISPLAY VALUES PROPERLY
    updateDisplay();
}


// ** EVENT LISTENERS
// RESOURCES
foodButton.addEventListener("click", function(){
    addResource(food);
});
woodButton.addEventListener("click", function(){
    addResource(wood);
});
stoneButton.addEventListener("click", function(){
    addResource(stone);
});

// UPGRADES


// SYSTEM
resetButton.addEventListener("click", resetValues);

getLocalStorage();
