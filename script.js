// Place categoryWords at the top
const categoryWords = {
    greetings: [
      { word: "Hello", translation: "Ẹ kaaro" },
      { word: "Goodbye", translation: "O dabo" },
      { word: "Goodnight", translation: "Kaale" },
      { word: "Good afternoon", translation: "Ẹ kaasan" },
      { word: "Welcome", translation: "Ẹ kaabo" },
      { word: "How are you?", translation: "Ṣe alafia ni?" },
      { word: "I am fine", translation: "Mo wa daadaa" }
    ],
    numbers: [
      { word: "One", translation: "Ẹyọkan" },
      { word: "Two", translation: "Ẹ̀jì" },
      { word: "Three", translation: "Ẹ̀ta" },
      { word: "Four", translation: "Ẹrin" },
      { word: "Five", translation: "Arun" },
      { word: "Ten", translation: "Ẹwá" },
      { word: "Twenty", translation: "Ogún" }
    ],
    colors: [
      { word: "Red", translation: "Pupa" },
      { word: "Blue", translation: "Bulu" },
      { word: "Green", translation: "Awo alawọ ewe" },
      { word: "Yellow", translation: "Ofeefee" },
      { word: "White", translation: "Funfun" },
      { word: "Black", translation: "Dudu" }
    ],
    basic_phrases: [
      { word: "Please", translation: "Ẹ jọwọ" },
      { word: "Thank you", translation: "Ẹ se" },
      { word: "Excuse me", translation: "Ẹ gbà mi" },
      { word: "Yes", translation: "Bẹẹni" },
      { word: "No", translation: "Rara" },
      { word: "Help", translation: "Ran mi lowo" }
    ]
  };
  

// Flashcard Data and Interactivity
let flashcards = [
    { front: "Hello", back: "Ẹ kaaro", reviewed: false },
    { front: "Thank you", back: "Ẹ se", reviewed: false },
    { front: "Goodbye", back: "O dabo", reviewed: false }
  ];
  
  let currentFlashcardIndex = 0;
  let reviewedFlashcards = new Set();
  
  function showFlashcard() {
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.remove('flipped');
    flashcard.querySelector('.front').textContent = flashcards[currentFlashcardIndex].front;
    flashcard.querySelector('.back').textContent = flashcards[currentFlashcardIndex].back;
  }
  
  function nextFlashcard() {
    reviewedFlashcards.add(currentFlashcardIndex);
    flashcards[currentFlashcardIndex].reviewed = true;
    currentFlashcardIndex = (currentFlashcardIndex + 1) % flashcards.length;
    showFlashcard();
  }
  
  function flipFlashcard() {
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.toggle('flipped');
  }
  
  showFlashcard();
  
  // Quiz Data and Functionality

let quizzes = [
    { question: "What is the Yoruba word for 'Thank you'?", options: ["Ẹ se", "Bawo ni", "O dabo", "Ẹ kaaro"], answer: "Ẹ se" },
    { question: "What is the Yoruba word for 'Goodbye'?", options: ["Ẹ kaaro", "O dabo", "Bawo ni", "Ẹ se"], answer: "O dabo" },
    { question: "What is the Yoruba word for 'Hello'?", options: ["Bawo ni", "Ẹ se", "Ẹ kaaro", "O dabo"], answer: "Ẹ kaaro" }
  ];
  
  let currentQuestionIndex = 0;
  //let score = 0;
  // Initialize score from localStorage or start at 0
let score = parseInt(localStorage.getItem('score')) || 0;
document.getElementById('score').textContent = score;

// Update the score and save to localStorage
function checkAnswer(selected) {
  const feedback = document.getElementById('quiz-feedback');
  const correctAnswer = quizzes[currentQuestionIndex].answer;

  if (selected === correctAnswer) {
    feedback.textContent = "Correct!";
    feedback.style.color = "green";
    score += 1;
    document.getElementById('score').textContent = score;
    localStorage.setItem('score', score); // Save score
  } else {
    feedback.textContent = "Try Again!";
    feedback.style.color = "red";
  }
}

  
  function showQuestion() {
    const questionData = quizzes[currentQuestionIndex];
    document.getElementById('question').textContent = questionData.question;
  
    const options = document.querySelectorAll('.options button');
    options.forEach((button, index) => {
      button.textContent = questionData.options[index];
      button.onclick = () => checkAnswer(button.textContent);
    });
  
    document.getElementById('quiz-feedback').textContent = ""; // Reset feedback
  }
  
  function checkAnswer(selected) {
    const feedback = document.getElementById('quiz-feedback');
    const correctAnswer = quizzes[currentQuestionIndex].answer;
  
    if (selected === correctAnswer) {
      feedback.textContent = "Correct!";
      feedback.style.color = "green";
      score += 1;
      document.getElementById('score').textContent = score;  // Update score display
    } else {
      feedback.textContent = "Try Again!";
      feedback.style.color = "red";
    }
  }
  
  function nextQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % quizzes.length;
    showQuestion();
  }
  
  // Initial call to load the first question
  showQuestion();

  // Data for words in each category

  // Function to display words for a specific category
  function displayWords(category) {
    const wordListContainer = document.getElementById("word-list");
  
    // Check if category exists
    if (!categoryWords[category]) {
      console.log("Category not found:", category);
      wordListContainer.innerHTML = "<p>No words available for this category.</p>";
      return;
    }
  
    // Clear any previous content
    wordListContainer.innerHTML = "";
  
    // Populate the list with words and translations
    categoryWords[category].forEach(({ word, translation }) => {
      const wordItem = document.createElement("div");
      wordItem.classList.add("word-item");
  
      wordItem.innerHTML = `
        <p><strong>${word}:</strong> ${translation}</p>
      `;
      wordListContainer.appendChild(wordItem);
    });
  }
  
  // Debugging: Console log to check if script is running
  console.log("Script loaded and ready to use.");

  // Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
    document.querySelector('nav ul').classList.toggle('dark-mode');
    document.querySelectorAll('.flashcard').forEach(card => card.classList.toggle('dark-mode'));
    document.querySelectorAll('.category-item').forEach(item => item.classList.toggle('dark-mode'));
    document.querySelector('footer').classList.toggle('dark-mode');
  }
  
  
//----------


