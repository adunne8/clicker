"use strict";

/************** DECLARATIONS **************/
let food;
let wood;
let stone;

let empireName;
let emperorName;

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
    constructor(name, total, effeciency, cost = 0){
        this.name = name,
        this.total = total,
        this.effeciency = effeciency,
        this.cost = cost
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



let doubleClickFood;
let doubleClickWood;
let doubleClickStone;

let worker;
let farmer;
let lumberjack;
let miner;







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


const upgradeButtons = document.querySelectorAll(".upgrade__button");

// SYSTEM MANAGEMENT BUTTONS
const resetButton = document.getElementById("management__reset");
const renameButton = document.getElementById("management__rename");



// DISPLAYS
const foodDisplay = document.getElementById('food__count');
const woodDisplay = document.getElementById('wood__count');
const stoneDisplay = document.getElementById('stone__count');

const workerDisplay = document.getElementById('worker__count');
const farmerDisplay = document.getElementById('farmer__count');
const lumberjackDisplay = document.getElementById('lumberjack__count');
const minerDisplay = document.getElementById('miner__count');

const purchasedUpgradeList = document.getElementById("pu_section");

const empireNameDisplay = document.getElementById("title__name");
const emperorNameDisplay = document.getElementById("emperor__name");





// FOR LOADING, RESETS
function initializeValues(){
    console.log('initialized');
    food = new Resource("food", 0, 1);
    wood = new Resource("wood", 0, 1);
    stone = new Resource("stone", 0, 1);

    worker = new Worker("worker", 0, 1, 10);
    farmer = new Worker("farmer", 0, 1);
    lumberjack = new Worker("lumberjack", 0, 1);
    miner = new Worker("miner", 0, 1);

    // LOOPS THROUGH EACH KEY IN THE upgradesList OBJECT AND SETS THEM TO FALSE
    /*
    Object.keys(upgradesList).forEach(function(key){
        upgradesList[key] = false;
    });
    */

    doubleClickFood = new Upgrade("doubleClickFood", "Double Food per Click", "Each click generates twice as much food", false, 100, 0, 0);
    doubleClickWood = new Upgrade("doubleClickWood", "Double Wood per Click", "Each click generates twice as much wood", false, 0, 100, 0);
    doubleClickStone = new Upgrade("doubleClickStone", "Double Stone per Click", "Each click generates twice as much stone", false, 0, 0, 100);


}


// INITIAL LOAD OF RESOURCES ON PAGELOAD
initializeValues();



// ADDING RESOURCES - FOOD, STONE, WOOD
function addResource(resource){
    // ADDS 1 RESOURCE TO THE CLICKED RESOURCE
    resource.total = resource.total + resource.clickValue;

    // UPDATE LOCAL STORAGE AND DISPLAYS
    saveData();
    updateDisplay();
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

}
// THIS UPDATES THE TOTAL NUMBER OF RESOURCES/WORKERS ETC ON THE SCREEN
// IF A FLOATING POINT ERROR OCCURS WE WANT TO HIDE THAT
function updateTotalsDisplay(){
    foodDisplay.textContent = beautifyNumber(food.total, 0, true);
    woodDisplay.textContent = beautifyNumber(wood.total, 0, true);
    stoneDisplay.textContent = beautifyNumber(stone.total, 0, true);

    workerDisplay.textContent = worker.total;
    farmerDisplay.textContent = farmer.total;
    lumberjackDisplay.textContent = lumberjack.total;
    minerDisplay.textContent = miner.total;
}




// THIS FUNCTION WILL CHECK HOW AN UPGRADE BUTTON SHOULD BE DISPLAYED
// IS IT ACTIVE: HIDDEN
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

    if(food.total >= worker.cost){
        newWorkerButton.disabled = false;
    }
    else{
        newWorkerButton.disabled = true;
    }

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


}

// THIS FUNCTION POPULATES THE LIST OF PURCHASED UPGRADES
function updatePurchasedUpgradesDisplay(upgradeList){
    // NEED TO CLEAR OUT OLD INFO FIRST
    purchasedUpgradeList.innerHTML = "";
    
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

function setCustomItems(convertedGenericData){

    if(convertedGenericData){
        empireName = convertedGenericData.empireName;
        emperorName = convertedGenericData.emperorName;
    }
    else{
        empireName = prompt("What is the name of your empire?");
        emperorName = prompt("What is your name?");
    }

    empireNameDisplay.textContent = empireName;
    emperorNameDisplay.textContent = emperorName;

    saveData();


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
    console.log("Attempting: " + upgradeButton.id);
    
    if(upgradeButton.id === 'doubleclick--food' && upgradePurchaseCheck(doubleClickFood)){
        food.clickValue = food.clickValue*2;
        doubleClickFood.active = true;
        food.total = food.total - 100;
    }    
    else if(upgradeButton.id === 'doubleclick--wood' && upgradePurchaseCheck(doubleClickWood)){

        wood.clickValue = wood.clickValue*2;
        doubleClickWood.active = true;
        wood.total = wood.total - doubleClickWood.woodCost;
        console.log("Upgrading wood");
    }
    else if(upgradeButton.id === 'doubleclick--stone' && upgradePurchaseCheck(doubleClickStone)){
        stone.clickValue = stone.clickValue*2;
        doubleClickStone.active = true;
        stone.total = stone.total - doubleClickStone.stoneCost;
        console.log("Upgrading stone");
    }
    else{
        console.log("Not valid resources")
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

    if(food.total >= worker.cost*num){
        console.log("adding worker");
        worker.total = worker.total + num;
        food.total = food.total - worker.cost*num;
    }
    else{
        console.log("cannot add worker, not enough food: " + food.total + " for worker cost: " + worker.cost*num);
    }
    saveData();
    updateDisplay();

};
function assignWorker(job, num){
    console.log("Attempting to assigning " + num + " workers as " + job);
    if (worker.total >= num){
        if(job === farmer.name){
            console.log("Adding farmer");
            farmer.total = farmer.total + num;
            worker.total = worker.total - num;
        }
        else if (job === lumberjack.name){
            console.log("Adding lumberjack");
            lumberjack.total = lumberjack.total + num;
            worker.total = worker.total - num;

        }
        else if(job === miner.name){
            console.log("Adding miner");
            miner.total = miner.total + num;
            worker.total = worker.total - num;

        }
        saveData();
        updateDisplay();
    }
}



/************** LOCAL STORAGE SAVING/LOADING/RESET FUNCTIONS **************/

// SAVING DATA
function saveData(){

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

    let genericData = {
        empireName:empireName,
        emperorName:emperorName
    }


    try{
        // CONVERTS THE resourceData Object INTO A JSON STRING FOR localStorage
        // EG {"food":{"name":"food","total":377,"clickValue":128}}

        localStorage.setItem("resourceStorage", JSON.stringify(resourceData));
        localStorage.setItem("upgradeStorage" , JSON.stringify(upgradeData));
        localStorage.setItem("workerStorage", JSON.stringify(workerData));
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
        loadedGenericData = localStorage.getItem("genericStorage");
    }
    catch(error){
        console.warn("Error: Cannot load generic data: " + error);
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

        if(worker){
            worker.total = convertedWorkerData.worker.total;
            worker.cost = convertedWorkerData.worker.cost;
        }
        if(farmer){
            farmer.total = convertedWorkerData.farmer.total;
            farmer.effeciency = convertedWorkerData.farmer.effeciency;
        }
        if(lumberjack){
            lumberjack.total = convertedWorkerData.lumberjack.total;
            lumberjack.effeciency = convertedWorkerData.lumberjack.effeciency;
        }
        if(miner){
            miner.total = convertedWorkerData.miner.total;
            miner.effeciency = convertedWorkerData.miner.effeciency;
        }

        
    }
    else{
        console.warn("No localStorage for workers found");
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

// UPGRADES
upgradeButtons.forEach(function(currentButton){
    currentButton.addEventListener('click', function(){
        upgrade(currentButton);
    });
});

// SYSTEM
resetButton.addEventListener("click", resetValues);
renameButton.addEventListener("click", function(){
    setCustomItems();
});

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
function intervalCode(){
    // DEBUGGING FOR CODE EXECUTION TIME
    var start = new Date().getTime();

    harvest();

    //DEBUGGING - MARK END OF MAIN LOOP AND CALCULATE DELTA IN MILLISECONDS
	var end = new Date().getTime();
	var time = end - start;
	console.log("Main loop execution time: " + time + "ms...Start: " + start + " -> end: " + end);


    updateDisplay();
}

function harvest(){

    food.total = food.total + (farmer.productivity());
    wood.total = wood.total + (lumberjack.productivity());
    stone.total = stone.total + (miner.productivity());

    saveData();
}

function clearInterval(){
    clearTimeout(t);
}