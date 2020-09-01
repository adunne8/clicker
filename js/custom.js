// DECLARATIONS
let foodTotal = 0;
let woodTotal = 0;

const foodButton = document.getElementById('food__button');
const woodButton = document.getElementById('wood__button');


const foodCount = document.getElementById('food__count');
const woodCount = document.getElementById('wood__count');



function addFood(){
    console.log("Generate Food"); 
    foodTotal++;
    console.log(foodTotal);
    updateDisplay();
}
function addWood(){
    console.log("Generate Wood"); 
    woodTotal++;
    console.log(woodTotal);
    updateDisplay();
}

function updateDisplay(){
    foodCount.textContent = foodTotal;
    woodCount.textContent = woodTotal;

}

foodButton.addEventListener("click", addFood);
woodButton.addEventListener("click", addWood);
