// test.js

// Si necesitas las clases para crear items directamente:
const { Item, Book, Film, Library, User } = require('./classes.js');

// Si tus funciones de logic.js dependen de data.js, asegúrate de importarlas también
const {
  createUser,
  loginUser,
  addNewItem,
  removeItem,
  getAllItems,
  toggleItemFinishedStatus
} = require('./logic.js');

console.log("== Crear usuarios ==");

const success1 = createUser("andrea", "1234");
console.log("Usuario creado:", success1); // true

const success2 = createUser("andrea", "4321");
console.log("Intento duplicado:", success2); // false

console.log("\n== Login de usuario ==");

const login1 = loginUser("andrea", "1234");
console.log("Login correcto:", login1); // true

const login2 = loginUser("andrea", "wrongpass");
console.log("Login incorrecto:", login2); // false

console.log("\n== Añadir items ==");

addNewItem(1, "The Hobbit", "Fantasy", 1937, "J.R.R. Tolkien", "book");
addNewItem(2, "Inception", "Sci-Fi", 2010, "Christopher Nolan", "film");

console.log("Todos los items del usuario:");
console.log(getAllItems());

console.log("\n== Toggle finished ==");

toggleItemFinishedStatus("The Hobbit");

console.log(getAllItems());

console.log("\n== Eliminar item ==");

removeItem("Inception");

console.log(getAllItems());
