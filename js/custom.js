// ****** DECLARATIONS ******
let food;
let wood;
let stone;

// RESOURCES
class Resource {
    constructor(name, total, clickValue){
        this.name = name;
        this.total = total;
        this.clickValue = clickValue;
    }

    //LISTS OUT ALL PROPERTIES+VALUES OF THE CLASS
    toString(){

        for(var property in this){
            console.log(property + ': ' + this[property]);
        }

    }

}

let upgradesList = {
    doubleClickFood: false,
    doubleClickWood: false,
    doubleClickStone: false,
    quadrupleClickFood: false
}


// FOR LOADING, RESETS
function initializeValues(){
    //console.log('initialized');
    food = new Resource('food', 0, 1);
    wood = new Resource('wood', 0, 1);
    stone = new Resource('stone', 0, 1);

    // LOOPS THROUGH EACH KEY IN THE upgradesList OBJECT AND SETS THEM TO FALSE
    Object.keys(upgradesList).forEach(function(key){
        upgradesList[key] = false;
    });

}


// INITIAL LOAD OF RESOURCES ON PAGELOAD
initializeValues();

// ** HTML ELEMENTS ASSIGNMENT

// BUTTONS
// RESOURCE BUTTONS
const foodButton = document.getElementById('food__button');
const woodButton = document.getElementById('wood__button');
const stoneButton = document.getElementById('stone__button');
// UPGRADE BUTTONS
const doubleClickFoodButton = document.getElementById("doubleclick--food");
const doubleClickWoodButton = document.getElementById("doubleclick--wood");
const doubleClickStoneButton = document.getElementById("doubleclick--stone");

const upgradeButtons = document.querySelectorAll('.upgrade__button');

// SYSTEM MANAGEMENT BUTTONS
const resetButton = document.getElementById('management__reset');



// DISPLAYS
const foodDisplay = document.getElementById('food__count');
const woodDisplay = document.getElementById('wood__count');
const stoneDisplay = document.getElementById('stone__count');






// ADDING RESOURCES - FOOD, STONE, WOOD
function addResource(resource){
    // ADDS 1 RESOURCE TO THE CLICKED RESOURCE
    resource.total = resource.total + resource.clickValue;

    // UPDATE LOCAL STORAGE AND DISPLAYS
    setLocalStorage();
    updateDisplay();
}

// UPGRADES PROCESSOR FUNCTION
function upgrade(upgradeButton){
    console.log(upgradeButton.id);

    if(upgradeButton.id === 'doubleclick--food'){
        food.clickValue = food.clickValue*2;
        upgradesList.doubleClickFood = true;
    }    
    if(upgradeButton.id === 'doubleclick--wood'){
        wood.clickValue = wood.clickValue*2;
        upgradesList.doubleClickWood = true;
    }
    if(upgradeButton.id === 'doubleclick--stone'){
        stone.clickValue = stone.clickValue*2;
        upgradesList.doubleClickStone = true;
    }

    updateUpgradesDisplay();
}



// UPDATING THE PAGE
function updateDisplay(){
    foodDisplay.textContent = food.total;
    woodDisplay.textContent = wood.total;
    stoneDisplay.textContent = stone.total;

}

// THIS FUNCTION WILL CHECK IF THE UPGRADE BUTTON SHOULD BE ENABLED OR NOT
function updateUpgradesDisplay(){
    if(upgradesList.doubleClickFood === true){
        doubleClickFoodButton.disabled = true;
    }
    else{
        doubleClickFoodButton.disabled = false;
    }
    if(upgradesList.doubleClickWood === true){
        doubleClickWoodButton.disabled = true;
    }
    else{
        doubleClickWoodButton.disabled = false;
    }
    if(upgradesList.doubleClickStone === true){
        doubleClickStoneButton.disabled = true;
    }
    else{
        doubleClickStoneButton.disabled = false;
    }

    
}

// LOCAL STORAGE FUNCTIONS
function setLocalStorage(){

    let resourceData = {
        food:food,
        wood:wood,
        stone:stone
    }

    // DEBUGGING
    /*
    console.log("ResourceData: ")
    console.log(resourceData);
    console.log("JSON Stringified resourceData");
    console.log(JSON.stringify(resourceData));

    */


    try{
        // CONVERTS THE resourceData Object INTO A JSON STRING FOR localStorage
        // EG {"food":{"name":"food","total":377,"clickValue":128}}

        localStorage.setItem("resourceStorage", JSON.stringify(resourceData));
        localStorage.setItem("upgradeStorage" , JSON.stringify(upgradesList));
    }
    catch(error){
        console.error("Error: Cannot set localStorage: " + error);
    }
}


// THIS FUNCTION IS CALLED ON PAGE LOAD TO GET THE PREVIOUS SAVED GAME DATA
function getLocalStorage(){

    let loadedResourceData;
    let loadedUpgradeData;
    let convertedResourceData;
    try{
        loadedResourceData = localStorage.getItem("resourceStorage");
        //console.log("loadedResourceData: ")
        //console.log(loadedResourceData);
    }
    catch(error){
        console.warn("Error: Cannot load resource data: " + error)
    }
    try{
        loadedUpgradeData = localStorage.getItem("upgradeStorage")
        //console.log("loadedUpgradeData: ")
        //console.log(loadedUpgradeData);
    }
    catch(error){
        console.warn("Error: Cannot load upgrade data: " + error)
    }
    if(loadedResourceData){
        // THIS LOADS UP THE STORED DATA AND "UN-STRINGIFIES" BACK INTO AN OBJECT:
        // RESOURCE.PROPERTY.VALUE
        convertedResourceData = JSON.parse(loadedResourceData);
        //console.log("convertedResourceData: ")
        // console.log(convertedResourceData);
        
        // FOOD DATA
        if(convertedResourceData.food.total != null){
            food.total = convertedResourceData.food.total;
        }
        if(convertedResourceData.food.clickValue != null){
            food.clickValue = convertedResourceData.food.clickValue;
        }
        // WOOD DATA
        if(convertedResourceData.wood.total != null){
            wood.total = convertedResourceData.wood.total;
        }
        if(convertedResourceData.wood.clickValue != null){
            wood.clickValue = convertedResourceData.wood.clickValue;
        }
        // STONE DATA
        if(convertedResourceData.stone.total != null){
            stone.total = convertedResourceData.stone.total;
        }
        if(convertedResourceData.stone.clickValue != null){
            stone.clickValue = convertedResourceData.stone.clickValue;
        }

    }
    else{
        console.warn("No localStorage for resources found");
    }

    if(loadedUpgradeData){
        upgradesList = JSON.parse(loadedUpgradeData);

    }

    updateUpgradesDisplay();

    updateDisplay();
}
function resetValues(){

    console.warn('Reset Triggered, resetting values');
    
    initializeValues();
    clearLocalStorage();
    updateUpgradesDisplay();

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
upgradeButtons.forEach(function(currentButton){
    currentButton.addEventListener('click', function(){
        upgrade(currentButton);
    });
});

// SYSTEM
resetButton.addEventListener("click", resetValues);

getLocalStorage();
