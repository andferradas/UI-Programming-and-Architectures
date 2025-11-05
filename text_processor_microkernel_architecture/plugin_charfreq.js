// Additional
/* 
 * It calculates the frequency of each character in the input text.
 */
registerPlugin("Character Frequency", function(text) {
    const freq = {};
    text.split("").forEach(char => {
        if (char.match(/\S/)) { // Ignore whitespace characters
            freq[char] = (freq[char] || 0) + 1;
        }
    });

    let result = "Character Frequencies:\n";
    for (const [char, count] of Object.entries(freq)) {
        result += `'${char}': ${count}\n`;
    }
    return result.trim();
}, "Calculates the frequency of each character in the text");