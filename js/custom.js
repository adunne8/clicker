"use strict";

/************** DECLARATIONS **************/
let food;
let wood;
let stone;

let empireName;
let emperorName;
let darkmodeState;

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


class Worker {
    constructor(name, total, effeciency, cost = 0, hunger = .8){
        this.name = name,
        this.total = total,
        this.effeciency = effeciency,
        this.cost = cost,
        this.hunger = hunger
    }
    //LISTS OUT ALL PROPERTIES+VALUES OF THE CLASS
    toString(){

        for(var property in this){
            console.log(property + ': ' + this[property]);
        }

    }

    productivity(){
        return this.total * this.effeciency;
    }
    // RETURNS THE TOTAL AMOUNT OF WORKERS
    summary(){
        return worker.total + farmer.total + lumberjack.total + miner.total;
    }
}

// TO BE INVESTIGATED IN THE FUTURE FOR UPGRADE PROCESSING
class Upgrade{
    constructor(name, label, description, active, foodCost = 0, woodCost = 0, stoneCost = 0){
        this.name = name,
        this.label = label,
        this.description = description,
        this.active = active,
        this.foodCost = foodCost,
        this.woodCost = woodCost,
        this.stoneCost = stoneCost
    }

    //LISTS OUT ALL PROPERTIES+VALUES OF THE CLASS
    toString(){

        for(var property in this){
            console.log(property + ': ' + this[property]);
        }

    }
    

}
/*
class Building{
    constructor(name, total, foodCost, woodCost, stoneCost, foodStorage, woodStorage, stoneStorage){
        this.name = name,
        this.total = total,
        this.foodCost = foodCost,
        this.woodCost = woodCost,
        this.stoneCost = stoneCost,

    }

}
*/

class Building{
    constructor(definition){
        this.name = definition.name,
        this.total = definition.total,
        this.foodCost = definition.foodCost,
        this.woodCost = definition.woodCost,
        this.stoneCost = definition.stoneCost,

        this.foodStorage = definition.foodStorage,
        this.woodStorage = definition.woodStorage,
        this.stoneStorage = definition.stoneStorage,
        this.workerStorage = definition.workerStorage,
        // WANT TO ADD EACH INSTANCE OF A BUILDING INTO AN ARRAY
        arrBuildings.push(this);
    }

    canPurchaseBuilding(num){
        //console.log(this.foodCost + " " + food.total  + " " +  this.woodCost  + " " +  wood.total  + " " +  this.stoneCost  + " " +  stone.total)

        if((this.foodCost * num) <= food.total && (this.woodCost * num) <= wood.total && (this.stoneCost * num) <= stone.total){
            return true;
        }
        else{
            return false;
        }
    }
    purchaseBuilding(num){
        food.total -= this.foodCost * num;
        wood.total -= this.woodCost * num;
        stone.total -= this.stoneCost * num;

        this.total += num;
    }
    housingSummary(){
        return (woodHovel.workerStorage * woodHovel.total);
    }
}


// INITIALISE UPGRADES
let doubleClickFood;
let doubleClickWood;
let doubleClickStone;

// INITIALISE WORKERS
let worker;
let farmer;
let lumberjack;
let miner;

// INITIALISE BUILDINGS

let building;
let barn;
let lumberyard;
let stoneyard;
let woodHovel;

let arrBuildings = [];





// BUTTONS
// RESOURCE BUTTONS
const foodButton = document.getElementById("food__button");
const woodButton = document.getElementById("wood__button");
const stoneButton = document.getElementById("stone__button");
// UPGRADE BUTTONS
const doubleClickFoodButton = document.getElementById("doubleclick--food");
const doubleClickWoodButton = document.getElementById("doubleclick--wood");
const doubleClickStoneButton = document.getElementById("doubleclick--stone");

// WORKER BUTTONS
const newWorkerButton = document.getElementById("worker__new");
const newFarmerButton = document.getElementById("worker__farmer");
const newLumberjackButton = document.getElementById("worker__lumberjack");
const newMinerButton = document.getElementById("worker__miner");

// BUILDING BUTTONS
const newBarnButton = document.getElementById("build_barn");
const newLumberyardButton = document.getElementById("build_lumberyard");
const newStoneyardButton = document.getElementById("build_stoneyard");
const newWoodHovelButton = document.getElementById("build_woodhovel");

const upgradeButtons = document.querySelectorAll(".upgrade__button");

// SYSTEM MANAGEMENT BUTTONS
const resetButton = document.getElementById("reset_game");
const renameButton = document.getElementById("reset_name");
const toggleDarkmodeButton = document.getElementById("toggle_darkmode");
const showCookiePolicy = document.getElementById("show_cookiepolicy");


// DISPLAYS
const foodDisplay = document.getElementById("food__count");
const woodDisplay = document.getElementById("wood__count");
const stoneDisplay = document.getElementById("stone__count");

const foodMaxDisplay = document.getElementById("food__max");
const woodMaxDisplay = document.getElementById("wood__max");
const stoneMaxDisplay = document.getElementById("stone__max");

const populationTotalDisplay = document.getElementById("population_total_display");
const housingTotalDisplay = document.getElementById("housing_total_display");


const foodIncrementDisplay = document.getElementById("food__increment");
const woodIncrementDisplay = document.getElementById("wood__increment");
const stoneIncrementDisplay = document.getElementById("stone__increment");

const workerDisplay = document.getElementById("worker__count");
const farmerDisplay = document.getElementById("farmer__count");
const lumberjackDisplay = document.getElementById("lumberjack__count");
const minerDisplay = document.getElementById("miner__count");

const barnDisplay = document.getElementById("barn__count");
const lumberyardDisplay = document.getElementById("lumberyard__count");
const stoneyardDisplay = document.getElementById("stoneyard__count");

const woodHovelDisplay = document.getElementById("woodhovel__count")

const purchasedUpgradeList = document.getElementById("pu_section");

const empireNameDisplay = document.getElementById("title__name");
const emperorNameDisplay = document.getElementById("emperor__name");
const darkModeDisplay = document.getElementById("darmode_state");

const eventsListDisplay = document.getElementById("events_list");

const cookiePolicyDisplay = document.getElementById("cookie_detail");

// STYLESHEETS
const darkmodeStylesheet = document.styleSheets[1];




// FOR LOADING, RESETS
function initializeValues(){
    console.log('initialized');
    food = new Resource("food", 0, 1);
    wood = new Resource("wood", 0, 1);
    stone = new Resource("stone", 0, 1);

    worker = new Worker("worker", 0, 1, 20);
    farmer = new Worker("farmer", 0, 1);
    lumberjack = new Worker("lumberjack", 0, .5);
    miner = new Worker("miner", 0, .2);

    // LOOPS THROUGH EACH KEY IN THE upgradesList OBJECT AND SETS THEM TO FALSE
    /*
    Object.keys(upgradesList).forEach(function(key){
        upgradesList[key] = false;
    });
    */

    doubleClickFood = new Upgrade("doubleClickFood", "Double Food per Click", "Each click generates twice as much food", false, 100, 0, 0);
    doubleClickWood = new Upgrade("doubleClickWood", "Double Wood per Click", "Each click generates twice as much wood", false, 0, 100, 0);
    doubleClickStone = new Upgrade("doubleClickStone", "Double Stone per Click", "Each click generates twice as much stone", false, 0, 0, 100);
    /*
    barn = new Building("Barn", 0, 80, 20);
    lumberyard = new Building("Lumberyard", 0, 80, 20);
    stoneyard = new Building("Stoneyard", 0, 80, 20);
    */


    // WE USE TOTAL = 1 HERE TO SET THE INITIAL TOTALS AT THE START OF THE GAME
    let barnParams = {
        name: "Barn",
        foodCost: 0,
        woodCost: 80,
        stoneCost: 20,
        foodStorage: 200,
        total: 1
    };
    let lumberyardParams = {
        name: "Lumberyard",
        foodCost: 0,
        woodCost: 80,
        stoneCost: 20,
        woodStorage: 200,
        total: 1
    };
    let stoneyardParms = {
        name: "Stoneyard",
        foodCost: 0,
        woodCost: 80,
        stoneCost: 20,
        stoneStorage: 200,
        total: 1
    };
    let woodHovelParms = {
        name: "Wood Hovel",
        foodCost: 0,
        woodCost: 20,
        stoneCost: 0,
        workerStorage: 5,
        total: 1
    }

    // USED FOR ACCESSING BUILDING CLASS FUNCTIONS
    building = new Building("building", 0, 0, 0);
    

    barn = new Building(barnParams);
    lumberyard = new Building(lumberyardParams);
    stoneyard = new Building(stoneyardParms);
    woodHovel = new Building(woodHovelParms);



    
}


// INITIAL LOAD OF RESOURCES ON PAGELOAD
initializeValues();



// ADDING RESOURCES - FOOD, STONE, WOOD
function addResource(resource){
    // ADDS 1 RESOURCE TO THE CLICKED RESOURCE
    if(storageCheck(resource, resource.clickValue)){
        resource.total = resource.total + resource.clickValue;

        // UPDATE LOCAL STORAGE AND DISPLAYS
        saveData();
        updateDisplay();
    }
}

/************** DISPLAYS **************/

// THIS FUNCTION CLEANS UP NUMBERS SO THERE ARE NO FLOATING POINT ERRORS AND NUMBERS CAN BE ROUNDED DOWN
// WE DONT WANT TO SHOW THE USER HAS MORE RESOURCES THAN THEY ACTUALLY HAVE
function beautifyNumber(uglyNum, accuracy, roundDown){
    if(roundDown){
        return Math.floor(uglyNum);
    }
    else{
        return Number.parseFloat(uglyNum).toFixed(accuracy);
    }
}

// UPDATING THE PAGE
function updateDisplay(){

    updateTotalsDisplay();
    updatePopulationDisplay();
    updateUpgradesDisplay();
    updateProductivityDisplay();
    updateBuildingsDisplay();

}
// THIS UPDATES THE TOTAL NUMBER OF RESOURCES/WORKERS ETC ON THE SCREEN
// IF A FLOATING POINT ERROR OCCURS WE WANT TO HIDE THAT
function updateTotalsDisplay(){
    foodDisplay.textContent = beautifyNumber(food.total, 0, true);
    woodDisplay.textContent = beautifyNumber(wood.total, 0, true);
    stoneDisplay.textContent = beautifyNumber(stone.total, 0, true);

    foodMaxDisplay.textContent = barn.total * barn.foodStorage;
    woodMaxDisplay.textContent = lumberyard.total * lumberyard.woodStorage;
    stoneMaxDisplay.textContent = stoneyard.total * stoneyard.stoneStorage;

    workerDisplay.textContent = worker.total;
    farmerDisplay.textContent = farmer.total;
    lumberjackDisplay.textContent = lumberjack.total;
    minerDisplay.textContent = miner.total;

    barnDisplay.textContent = barn.total;
    lumberyardDisplay.textContent = lumberyard.total;
    stoneyardDisplay.textContent = stoneyard.total;

    woodHovelDisplay.textContent = woodHovel.total;

    
    populationTotalDisplay.textContent = worker.summary();
    housingTotalDisplay.textContent = building.housingSummary();

}

// THIS FUNCTION SETS THE VALUES AND COLOUR OF THE RESOURCE BEING GENERATED EACH SECOND
function updateProductivityDisplay(){
    // THIS CALCULATION IS DONE A FEW TIMES - CAN BE CONDENSED
    foodIncrementDisplay.textContent = beautifyNumber(farmer.productivity() - (worker.summary() * worker.hunger), 1, false);
    woodIncrementDisplay.textContent = beautifyNumber(lumberjack.productivity(), 1, false);
    stoneIncrementDisplay.textContent = beautifyNumber(miner.productivity(), 1, false);

    if(farmer.productivity() - (worker.summary() * worker.hunger)>= 0){
        foodIncrementDisplay.classList.remove("property__increment--negative");
        foodIncrementDisplay.classList.add("property__increment--positive");
    }
    else{
        foodIncrementDisplay.classList.remove("property__increment--positive");
        foodIncrementDisplay.classList.add("property__increment--negative");
    }
    if(lumberjack.productivity() > 0){
        woodIncrementDisplay.classList.remove("property__increment--negative");
        woodIncrementDisplay.classList.add("property__increment--positive");
    }
    else if(lumberjack.productivity() < 0){
        woodIncrementDisplay.classList.remove("property__increment--positive");
        woodIncrementDisplay.classList.add("property__increment--negative");
    }
    if(miner.productivity() > 0){
        stoneIncrementDisplay.classList.remove("property__increment--negative");
        stoneIncrementDisplay.classList.add("property__increment--positive");
    }
    else if(miner.productivity() < 0){
        stoneIncrementDisplay.classList.remove("property__increment--positive");
        stoneIncrementDisplay.classList.add("property__increment--negative");
    }
}




// THIS FUNCTION WILL CHECK HOW AN UPGRADE BUTTON SHOULD BE DISPLAYED
// IS IT ACTIVE/PURCHASED: HIDDEN
// IS IT NOT AFFORDABLE: DISABLED
// CAN IT BE PURCAHSED: ENABLED
function updateUpgradesDisplay(){
    if(doubleClickFood.active === true){
        doubleClickFoodButton.hidden = true;
    }
    else{
        doubleClickFoodButton.hidden = false;
        if(upgradePurchaseCheck(doubleClickFood)){
            doubleClickFoodButton.disabled = false;
        }
        else{
            doubleClickFoodButton.disabled = true;
        }
    }
    if(doubleClickWood.active === true){
        doubleClickWoodButton.hidden = true;
    }
    else{
        doubleClickWoodButton.hidden = false;
        if(upgradePurchaseCheck(doubleClickWood)){
            doubleClickWoodButton.disabled = false;
        }
        else{
            doubleClickWoodButton.disabled = true;
        }
    }
    if(doubleClickStone.active === true){
        doubleClickStoneButton.hidden = true;
    }
    else{
        doubleClickStoneButton.hidden = false;
        if(upgradePurchaseCheck(doubleClickStone)){
            doubleClickStoneButton.disabled = false;
        }
        else{
            doubleClickStoneButton.disabled = true;
        }
    }

    
}

// THIS FUNCTION WILL CHECK IF THE WORKERS BUTTONS SHOULD BE ENABLED OR NOT
function updatePopulationDisplay(){

    // REDUCE CALLS TO CLASS FUNCTION
    const workerSummary = worker.summary();
    const housingSummary = building.housingSummary();

    // CAN WE MAKE A NEW WORKER
    if(food.total >= worker.cost && housingSummary > workerSummary ){
        newWorkerButton.disabled = false;
    }
    else{
        newWorkerButton.disabled = true;
    }

    // CAN WE ASSIGN A WORKER
    if(worker.total > 0){
        newFarmerButton.disabled = false;
        newLumberjackButton.disabled = false;
        newMinerButton.disabled = false;
    }
    else{
        newFarmerButton.disabled = true;
        newLumberjackButton.disabled = true;
        newMinerButton.disabled = true;
    }


    // DO WE NEED TO ADD A WARNING CAUTION LABEL FOR APPROACHING POPULATION LIMIT
    if(workerSummary >= housingSummary){
        populationTotalDisplay.classList.add("warning");
    }
    else if(workerSummary >= ((housingSummary / 100) * 90)){
        populationTotalDisplay.classList.add("caution");
    }
    else{
        populationTotalDisplay.classList.remove("caution");
        populationTotalDisplay.classList.remove("warning");
    }


}

// THIS FUNCTION DECIDES IF ABUILDING BUTTON IS ENABLED OR NOT BASED ON AVAILABLE RESOURCES
function updateBuildingsDisplay(){

    // TODO - CAN THESE BE PUT INTO A LOOP?
    
    if(barn.canPurchaseBuilding(1)){
        newBarnButton.disabled = false;
    }
    else{
        newBarnButton.disabled = true;
    }
    if(lumberyard.canPurchaseBuilding(1)){
        newLumberyardButton.disabled = false;
    }
    else{
        newLumberyardButton.disabled = true;
    }
    if(stoneyard.canPurchaseBuilding(1)){
        newStoneyardButton.disabled = false;
    }
    else{
        newStoneyardButton.disabled = true;
    }
    if(woodHovel.canPurchaseBuilding(1)){
        newWoodHovelButton.disabled = false;
    }
    else{
        newWoodHovelButton.disabled = true;
    }
    /*
    arrBuildings.forEach(function(buildingInstance){
        console.log(buildingInstance);

        if(buildingInstance.canPurchaseBuilding(1)){
            buildingInstance.disabled = false;
        }
        else{
            buildingInstance.disabled = true;
        }

    });
    */

    
}

// THIS FUNCTION POPULATES THE LIST OF PURCHASED UPGRADES
function updatePurchasedUpgradesDisplay(upgradeList){
    // NEED TO CLEAR OUT OLD INFO FIRST
    purchasedUpgradeList.innerHTML = "<h1 id='upgrades_heading'>Purchased Upgrades</h1>";
    
    if(upgradeList){
        // GO THROUGH EACH KEY IN THE LIST
        for (let key in upgradeList) {
            // ASSIGN THE NESTED JSON TO THE value VARIABLE
            let value = upgradeList[key];
            if(value.active){
                const upgElement = document.createElement("p");
                upgElement.id = "pu__" + value.name.toLowerCase();
                upgElement.innerHTML = "<strong>" + value.label + "</strong> - " + value.description;
                purchasedUpgradeList.appendChild(upgElement);
            }


        }
    }

    

}


/************** SYSTEM MANAGEMENT **************/
 
function setCustomItems(convertedGenericData){

    if(convertedGenericData){
        empireName = convertedGenericData.empireName;
        emperorName = convertedGenericData.emperorName;
        darkmodeState = convertedGenericData.darkmodeState;
    }
    else{
        empireName = prompt("What is the name of your empire?");
        emperorName = prompt("What is your name?");
        darkmodeState = false;
    }

    empireNameDisplay.textContent = empireName;
    emperorNameDisplay.textContent = emperorName;
    
    // REPEATED CODE?
    if(darkmodeState){
        darkmodeStylesheet.disabled = false;
        darkModeDisplay.textContent = "on";
    }
    else{
        darkmodeStylesheet.disabled = true;
        darkModeDisplay.textContent = "off";

    }

    saveData();


}

// SWITCHES ON OR OFF THE DARKMODE CSS STYLESHEET
function toggleDarkmode(){
    // IF DARKMODE IS CURRENTLY DISABLED
    if(darkmodeStylesheet.disabled){
        darkmodeStylesheet.disabled = false;
        darkModeDisplay.textContent = "on";
        console.debug("Switching Darkmode on");
        darkmodeState = true;
    }
    else{
        darkmodeStylesheet.disabled = true;
        console.debug("Switching Darkmode off");
        darkModeDisplay.textContent = "off";
        darkmodeState = false;
    }
    // NEED TO SAVE THE DARKMODE STATE
    saveData();

}

function toggleCookiePolicy(){
    console.log(cookiePolicyDisplay.style.display);
    if(cookiePolicyDisplay.style.display === 'block'){
        cookiePolicyDisplay.style.display = 'none';
    }
    else{
        cookiePolicyDisplay.style.display = 'block';
    }
}


/************** UPGRADES **************/

// THIS CHECKS IF A SPECIFIC UPGRADE CAN BE PURCHASED
function upgradePurchaseCheck(selectedUpgrade){
    // compare resource totals vs upgrade totals

    if(selectedUpgrade.foodCost <= food.total 
        && selectedUpgrade.woodCost <= wood.total
        && selectedUpgrade.stoneCost <= stone.total){
            return true;
    }
    return false;
}


// UPGRADES PROCESSOR FUNCTION
// CHECKS THE TYPE OF UPGRADE AND WHETHER IT CAN BE PURCHASED WITH THE GIVEN RESOURCES
function upgrade(upgradeButton){
    
    if(upgradeButton.id === 'doubleclick--food' && upgradePurchaseCheck(doubleClickFood)){
        food.clickValue = food.clickValue*2;
        doubleClickFood.active = true;
        food.total = food.total - doubleClickFood.foodCost;
    }    
    else if(upgradeButton.id === 'doubleclick--wood' && upgradePurchaseCheck(doubleClickWood)){

        wood.clickValue = wood.clickValue*2;
        doubleClickWood.active = true;
        wood.total = wood.total - doubleClickWood.woodCost;
    }
    else if(upgradeButton.id === 'doubleclick--stone' && upgradePurchaseCheck(doubleClickStone)){
        stone.clickValue = stone.clickValue*2;
        doubleClickStone.active = true;
        stone.total = stone.total - doubleClickStone.stoneCost;
    }
    else{
        console.log("No valid resources")
    }

    let upgradeData = {
        doubleClickFood:doubleClickFood,
        doubleClickWood:doubleClickWood,
        doubleClickStone:doubleClickStone
    }

    saveData();
    updateDisplay();
    updatePurchasedUpgradesDisplay(upgradeData);
}


/************** WORKERS **************/

// WORKKER FUNCTIONS
function newWorker(num){
    // CHECK IF WE HAVE THE FOOD TO MAKE A WORKER
    if(food.total < worker.cost*num){
        console.log("cannot add worker, not enough food: " + food.total + " for worker cost: " + worker.cost*num);
    }
    // CHECK IF WE HAVE THE HOUSING FOR A WORKER
    else if(worker.summary() + num > building.housingSummary()){
        console.log("cannot add worker, not enough housing");
    }
    else{
        worker.total = worker.total + num;
        food.total = food.total - worker.cost*num;
    }
    saveData();
    updateDisplay();

};
function assignWorker(job, num){
    // CHECK WE HAVE SPARE WORKERS TO ASSIGN 
    if (worker.total >= num){
        if(job === farmer.name){
            farmer.total = farmer.total + num;
            worker.total = worker.total - num;
        }
        else if (job === lumberjack.name){
            lumberjack.total = lumberjack.total + num;
            worker.total = worker.total - num;

        }
        else if(job === miner.name){
            miner.total = miner.total + num;
            worker.total = worker.total - num;

        }
        saveData();
        updateDisplay();
    }
}



/************** BUILDINGS **************/

function newBuilding(type, num){
    if(type.canPurchaseBuilding(num)){
        type.purchaseBuilding(num);
        console.log("Adding " + type.name);
        saveData();
        updateDisplay();
    }

}




// THIS FUNCTION CHECKS IF THERE IS STORAGE AVAILABLE TO ADD THE RESOURCE/WORKER TO
function storageCheck(resourceType, amount){
    let storageType;
    if(resourceType === worker){
        console.log("Checking Houses");
        //storageType = house
    }
    else if(resourceType === food){
        //console.log("Checking Food");
        storageType = barn;

        if((barn.total * barn.foodStorage) - food.total >= amount){
            return true;
        }
        return false;
    }
    else if(resourceType === wood){
        //console.log("Checking Wood");
        storageType = lumberyard;

        if((lumberyard.total * lumberyard.woodStorage) - wood.total >= amount){
            return true;
        }
        return false;
    }
    else if(resourceType === stone){
        //console.log("Checking stone");
        storageType = stoneyard;
        if((stoneyard.total * stoneyard.stoneStorage) - stone.total >= amount){
            return true;
        }
        return false;
    }
    // NEED TO ENSURE NO INVALID TYPE IS PASSED IN
    else{
        console.error("Invalid resource type: " + resourceType);
        return false;
    }
}






/************** LOCAL STORAGE SAVING/LOADING/RESET FUNCTIONS **************/

// SAVING DATA
function saveData(){
    // WE FIRST DECLARE THE DATA OBJECTS TO BE STORED
    let resourceData = {
        food:food,
        wood:wood,
        stone:stone
    }

    let upgradeData = {
        doubleClickFood:doubleClickFood,
        doubleClickWood:doubleClickWood,
        doubleClickStone:doubleClickStone
    }

    let workerData = {
        worker:worker,
        farmer:farmer,
        lumberjack:lumberjack,
        miner:miner
    }

    let buildingData = {
        barn:barn,
        lumberyard:lumberyard,
        stoneyard:stoneyard,
        woodHovel:woodHovel
    }

    let genericData = {
        empireName:empireName,
        emperorName:emperorName,
        darkmodeState:darkmodeState
    }

    // THEN CONVERT THE Data Objects INTO A JSON STRING AND SAVE TO localStorage
    // EG {"food":{"name":"food","total":377,"clickValue":128}}
    try{

        localStorage.setItem("resourceStorage", JSON.stringify(resourceData));
        localStorage.setItem("upgradeStorage" , JSON.stringify(upgradeData));
        localStorage.setItem("workerStorage", JSON.stringify(workerData));
        localStorage.setItem("buildingStorage", JSON.stringify(buildingData));
        localStorage.setItem("genericStorage", JSON.stringify(genericData));
        
    }
    catch(error){
        console.error("Error: Cannot set localStorage: " + error);
    }
}


// THIS FUNCTION IS CALLED ON PAGE LOAD TO GET THE PREVIOUS SAVED GAME DATA
function loadData(){

    let loadedResourceData;
    let loadedUpgradeData;
    let convertedResourceData;
    let convertedUpgradeData;
    let loadedWorkerData;
    let convertedWorkerData;
    let loadedBuildingData;
    let convertedBuildingData;
    let loadedGenericData;
    let convertedGenericData;


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
    try{
        loadedWorkerData = localStorage.getItem("workerStorage");
    }
    catch(error){
        console.warn("Error: Cannot load worker data: " + error);
    }
    try{
        loadedBuildingData = localStorage.getItem("buildingStorage");
    }
    catch(error){
        console.warn("Error: Cannot load building data: " + error);
    }
    try{
        loadedGenericData = localStorage.getItem("genericStorage");
    }
    catch(error){
        console.warn("Error: Cannot load generic data: " + error);
    }
    
    try{
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
            convertedUpgradeData = JSON.parse(loadedUpgradeData);

            if(doubleClickFood){
                doubleClickFood.active = convertedUpgradeData.doubleClickFood.active;
            }
            if(doubleClickWood){
                doubleClickWood.active = convertedUpgradeData.doubleClickWood.active;
            }
            if(doubleClickStone){
                doubleClickStone.active = convertedUpgradeData.doubleClickStone.active
            }

            updatePurchasedUpgradesDisplay(convertedUpgradeData);

        }
        else{
            console.warn("No localStorage for upgrades found");
        }

        if(loadedWorkerData){
            convertedWorkerData = JSON.parse(loadedWorkerData);

            if(convertedWorkerData.worker){
                worker.total = convertedWorkerData.worker.total;
                worker.cost = convertedWorkerData.worker.cost;
            }
            if(convertedWorkerData.farmer){
                farmer.total = convertedWorkerData.farmer.total;
                farmer.effeciency = convertedWorkerData.farmer.effeciency;
            }
            if(convertedWorkerData.lumberjack){
                lumberjack.total = convertedWorkerData.lumberjack.total;
                lumberjack.effeciency = convertedWorkerData.lumberjack.effeciency;
            }
            if(convertedWorkerData.miner){
                miner.total = convertedWorkerData.miner.total;
                miner.effeciency = convertedWorkerData.miner.effeciency;
            }

            
        }
        else{
            console.warn("No localStorage for workers found");
        }
        if(loadedBuildingData){
            convertedBuildingData = JSON.parse(loadedBuildingData);

            barn.total = convertedBuildingData.barn.total;
            lumberyard.total = convertedBuildingData.lumberyard.total;
            stoneyard.total = convertedBuildingData.stoneyard.total;
            woodHovel.total = convertedBuildingData.woodHovel.total;
        }
        else{
            console.warn("No localstorage for buildings found");
        }
        if(loadedGenericData){
            convertedGenericData = JSON.parse(loadedGenericData);
        }
        else{
            console.warn("No localStorage for generic info found");
        }
        // THIS SHOULD ALWAYS BE RUN, EVEN IF NO DATA IS FOUND
        setCustomItems(convertedGenericData);

        updateUpgradesDisplay();

        updateDisplay();
    }
    catch(error){
        console.error("Error thrown while loading saved data: " + error);
    }
}

// RESET DATA
function resetValues(){
    if(confirm("Delete all data?")){
        console.warn('Reset Triggered, resetting values');
        localStorage.clear();
        initializeValues();
        updateDisplay();
        updatePurchasedUpgradesDisplay();
        setCustomItems(null);
    }
}



/************** EVENT LISTENERS **************/
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

// WORKERS
newWorkerButton.addEventListener("click", function(){
    newWorker(1);
});
newFarmerButton.addEventListener("click", function(){
    assignWorker(farmer.name, 1);
});
newLumberjackButton.addEventListener("click", function(){
    assignWorker(lumberjack.name, 1);
});
newMinerButton.addEventListener("click", function(){
    assignWorker(miner.name, 1);
});

// BUILDINGS
// TODO MERGE ASSIGNMENTS LIKE UPGRADE BUTTONS
newBarnButton.addEventListener("click", function(){
    newBuilding(barn, 1);
});
newLumberyardButton.addEventListener("click", function(){
    newBuilding(lumberyard, 1);
});
newStoneyardButton.addEventListener("click", function(){
    newBuilding(stoneyard, 1);
});
newWoodHovelButton.addEventListener("click", function(){
    newBuilding(woodHovel, 1)
});

// UPGRADES
upgradeButtons.forEach(function(currentButton){
    currentButton.addEventListener('click', function(){
        upgrade(currentButton);
    });
});

// SYSTEM
resetButton.addEventListener("click", function(){
    resetValues()
});
renameButton.addEventListener("click", function(){
    setCustomItems();
});
toggleDarkmodeButton.addEventListener("click", function(){
    toggleDarkmode();
});

showCookiePolicy.addEventListener("click", function(){
    toggleCookiePolicy();
})
// CHECK FOR AND LOAD DATA FROM LOCALSTORAGE
loadData();



/************** DEVELOPER FUNCTIONS (DONT CHEAT) **************/

function cheat(){
    food.total = 1000*1000;
    wood.total = 1000*1000;
    stone.total = 1000*1000;

    updateDisplay();
}

/* MAGIC LOOP CODE THAT RETURNS NESTED JSON DATA KEYS AND VALUES
https://www.codegrepper.com/code-examples/javascript/javascript+loop+nested+object
function nestedLoop(obj) {
    const res = {};
    function recurse(obj, current) {
        for (const key in obj) {
            let value = obj[key];
            if(value != undefined) {
                if (value && typeof value === 'object') {
                    recurse(value, key);
                } else {
                  	// Do your stuff here to var value
                    res[key] = value;
                }
            }
        }
    }
    recurse(obj);
    return res;
}
*/


/************** INTERVAL FUNCTIONS **************/

// ASSIGN TIMEOUT TO A VARIABLE SO IT CAN BE CLEARED IF NECCESSARY
let t = setInterval(intervalCode,1000);

function clearInterval(){
    clearTimeout(t);
}

function intervalCode(){
    // DEBUGGING FOR CODE EXECUTION TIME
    var start = new Date().getTime();

    harvest();
    

    //DEBUGGING - MARK END OF MAIN LOOP AND CALCULATE DELTA IN MILLISECONDS
	var end = new Date().getTime();
    var time = end - start;
    
    // FOR TIMING DEBUGGING
	console.debug("Main loop execution time: " + time + "ms...Start: " + start + " -> end: " + end);


    updateDisplay();
}

// FUNCTION TO ADD A MESSAGE TO THE EVENT LOG
function logEvent(message, messageLevel = "low"){
    console.log(message);

    const newMessage = document.createElement("p");

    // IF THE EVENT IS A SERIOUS ONE
    if(messageLevel = "high"){
        newMessage.innerHTML = "<strong>" + message + "</strong>";
    }
    else{
        newMessage.innerHTML = message;
    }
    eventsListDisplay.appendChild(newMessage);

}

// TODO - MAKE THIS PARAMETER DRIVEN
// THIS FUNCTION REDUCES THE POPULATION BY 1
function culling(type){
    let reason;

    switch(type){
        case "hunger":
            reason = "starved to death";
            break;
    }
    console.log(reason);

    if(worker.total > 0){
        worker.total--;
        logEvent("A worker " + reason);
    }
    else if(miner.total > 0){
        miner.total--;
        logEvent("A miner " + reason);
    }
    else if(lumberjack.total > 0){
        lumberjack.total--;
        logEvent("A lumberjack " + reason);
    }
    else if(farmer.total > 0){
        farmer.total--;
        logEvent("A farmer " + reason);
    }
    else{
        console.log("Nothing to cull");
    }

}

// THIS FUNCTION GATHERS THE RESOURCES WORKERS ARE PRODUCING, PROCESS THEIR HUNGER, AND CAPS RESOURCES WITH STORAGE LIMITS
function harvest(){
    // ADD THE HARVESTED AMOUNT TO THE TOTALS
    food.total += farmer.productivity();
    wood.total += lumberjack.productivity();
    stone.total += miner.productivity();


    // CLEANUP - RUNNING THIS MULTIPLE TIMES
    // SUBTRACT THE HUNGER FACTOR FOR THE TOTAL POPULATION FROM THE FOOD TOTALS
    food.total -= (worker.summary() * worker.hunger);


    // CLEANUP - SINGLE STORAGE FOR STORAGE BUILDINGS
    // IF THE RESOURCE TOTALS ARE GREATER THAN THE STORAGE SPACE, RESET TO MAX STORAGE SPACE
    if(food.total > (barn.total * barn.foodStorage)){
        food.total = barn.total * barn.foodStorage;
    }
    if(wood.total > (lumberyard.total * lumberyard.woodStorage)){
        wood.total = lumberyard.total * lumberyard.woodStorage;
    }
    if(stone.total > (stoneyard.total * stoneyard.stoneStorage)){
        stone.total = stoneyard.total * stoneyard.stoneStorage;
    }

    // TODO - ADD WHAT HAPPENS IF AVAILABLE FOOD IS > 0, PLACEHOLDER FOR NOW, FAMINE TO BE IMPLEMENTED
    if(food.total < 0){
        // FOOD LEVELS SHOULD NOT DROP BELOW 0;
        food.total = 0;

        culling("hunger");
    }


    saveData();
}


