// dictionary script

  const words = [
    { 
        word: "Hello", 
        english: "Hello", 
        yoruba: "Ẹ kaaro", 
        usage: "Use when greeting someone in the morning." 
    },
    { 
        word: "Goodbye", 
        english: "Goodbye", 
        yoruba: "O dabo", 
        usage: "Use when parting ways." 
    },
    { 
        word: "Please", 
        english: "Please", 
        yoruba: "Ẹ jọwọ", 
        usage: "Use to make requests politely." 
    },
    { 
        word: "Thank you", 
        english: "Thank you", 
        yoruba: "Ẹ se", 
        usage: "Use to express gratitude." 
    },
    { 
        word: "One", 
        english: "One", 
        yoruba: "Ẹyọkan", 
        usage: "Use to count objects." 
    },
    { 
        word: "Two", 
        english: "Two", 
        yoruba: "Ẹ̀jì", 
        usage: "Use to indicate a pair." 
    },
    { 
        word: "Red", 
        english: "Red", 
        yoruba: "Pupa", 
        usage: "Use to describe color." 
    },
    { 
        word: "Blue", 
        english: "Blue", 
        yoruba: "Bulu", 
        usage: "Use to describe color." 
    },
    // Add more words with their meanings and usage examples
];

let currentIndex = 0;

function displayWord(index) {
    const wordData = words[index];
    document.getElementById("word").textContent = wordData.word;
    document.getElementById("english-meaning").textContent = `English: ${wordData.english}`;
    document.getElementById("yoruba-meaning").textContent = `Yoruba: ${wordData.yoruba}`;
    document.getElementById("usage-example").textContent = `Usage: ${wordData.usage}`;

    document.getElementById("prev-button").disabled = index === 0;
    document.getElementById("next-button").disabled = index === words.length - 1;
}

document.getElementById("prev-button").onclick = function() {
    if (currentIndex > 0) {
        currentIndex--;
        displayWord(currentIndex);
    }
};

document.getElementById("next-button").onclick = function() {
    if (currentIndex < words.length - 1) {
        currentIndex++;
        displayWord(currentIndex);
    }
};

document.getElementById("search-button").onclick = function() {
    const searchTerm = document.getElementById("search-input").value.toLowerCase();
    const foundIndex = words.findIndex(word => word.word.toLowerCase() === searchTerm);

    if (foundIndex !== -1) {
        currentIndex = foundIndex;
        displayWord(currentIndex);
    } else {
        alert("Word not found.");
    }
};

// Display the first word on page load
displayWord(currentIndex);