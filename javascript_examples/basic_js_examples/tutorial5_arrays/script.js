// Array of fruits
const fruits = ["Apple", "Banana", "Orange", "Mango", "Strawberry"];

// Function to display the fruits in the <ul> element
function displayFruits() {
    let fruitList = document.getElementById("fruitList");
    fruitList.innerHTML = ""; // Clear any previous list items

    // Loop through the array and create list items
    for (let i = 0; i < fruits.length; i++) {
        let listItem = document.createElement("li");
        listItem.innerText = fruits[i];  // Set the text of the <li> to the fruit name
        fruitList.appendChild(listItem);  // Add the <li> to the <ul>
    }
}