registerPlugin("Reverse Text", function(text) {
  return text.split("").reverse().join("");
}, "Reverses the input text");