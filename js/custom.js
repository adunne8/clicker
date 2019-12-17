// DECLARATIONS
let pizzas = 0;

const pizzaButton = document.getElementById('pizza__button');


function generate_food_fnc(){
    console.log("Generate Pizza"); 
    pizzas++;
    console.log(pizzas);
}

function update_resource_display_fnc(){

}

pizzaButton.addEventListener("click", generate_food_fnc);
