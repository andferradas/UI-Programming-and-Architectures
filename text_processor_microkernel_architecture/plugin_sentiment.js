registerPlugin("Sentiment (naive)", function(text) {
  const positive = ["good", "great", "awesome", "happy"];
  const negative = ["bad", "sad", "terrible", "angry"];

  let score = 0;
  text.toLowerCase().split(/\s+/).forEach(word => {
    if (positive.includes(word)) score++;
    if (negative.includes(word)) score--;
  });

  return `Sentiment score: ${score}`;
}, "Naive sentiment analysis");