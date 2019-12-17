// DECLARATIONS
let pizzas = 0;

const pizzaButton = document.getElementById('pizza__button');
const pizzaCount = document.getElementById('pizza__count')


function addPizza(){
    console.log("Generate Pizza"); 
    pizzas++;
    console.log(pizzas);
    updateDisplay();
}

function updateDisplay(){
    pizzaCount.textContent = pizzas;
}

pizzaButton.addEventListener("click", addPizza);
