let food = 0;


function generate_food_fnc(){
    console.log("Generate Food"); 
    food++;
    console.log(food);
}

function update_resource_display_fnc(){

}



const generate_food = document.getElementById('generate-food');

generate_food.addEventListener("click", generate_food_fnc);
