// Function to display numbers from 1 to 10 using a for-loop
function displayNumbers() {
    // Get the <ul> element to display the numbers
    let numberList = document.getElementById("numberList");
    
    // Clear any previous content in the list
    numberList.innerHTML = "";

    // For-loop to print numbers from 1 to 10
    for (let i = 1; i <= 10; i++) {
        let listItem = document.createElement("li");
        listItem.innerText = "Number: " + i;
        numberList.appendChild(listItem);
    }
}