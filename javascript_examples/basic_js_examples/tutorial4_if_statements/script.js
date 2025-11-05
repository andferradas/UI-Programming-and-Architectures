// Function to check if the user is old enough to drive using an if statement
function checkAge() {
    let age = document.getElementById("age").value;  // Get the age entered by the user
    let message = "";

    // If statement to check the age
    if (age >= 18) {
        message = "You're old enough to drive!";
    } else if (age > 0) {
        message = "You're too young to drive.";
    } else {
        message = "Please enter a valid age!";
    }

    // Display the message in the <p> element
    document.getElementById("message").innerText = message;
}