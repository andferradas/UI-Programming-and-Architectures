registerPlugin("Word Count", function(text) {
  const words = text.trim().split(/\s+/);
  return `Word count: ${words.length}`;
}, "Counts the number of words in the text");
