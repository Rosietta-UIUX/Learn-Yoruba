// quiz script

const categories = [
    { name: "Greetings", quizzes: [
        { type: "multiple-choice", question: "What is 'Hello' in Yoruba?", options: ["Ẹ kaaro", "O dabo", "Ẹ jọwọ", "Bawo ni"], answer: "Ẹ kaaro" },
        { type: "fill-in-the-blank", question: "Translate 'Goodbye' to Yoruba.", answer: "O dabo" }
    ]},
    { name: "Numbers", quizzes: [
        { type: "multiple-choice", question: "What is 'Two' in Yoruba?", options: ["Ẹyọkan", "Ẹjì", "Mẹta", "Mẹfa"], answer: "Ẹjì" },
        { type: "multiple-choice", question: "What is 'Five' in Yoruba?", options: ["Ẹrin", "Ẹfa", "Aarun", "Eje"], answer: "Aarun" },
        { type: "matching", question: "Match the number to Yoruba", pairs: [
            { english: "One", yoruba: "Ẹyọkan" },
            { english: "Two", yoruba: "Ẹjì" }
        ]}
    ]},
    { name: "Colors", quizzes: [
        { type: "multiple-choice", question: "What is 'Red' in Yoruba?", options: ["Bulu", "Pupa", "Funfun", "Dudu"], answer: "Pupa" },
        { type: "fill-in-the-blank", question: "What is 'Blue' in Yoruba?", answer: "Bulu" }
    ]}
];

let currentQuizIndex = 0;
let score = 0;
const categoryIndex = localStorage.getItem("categoryIndex");
const quizzes = categories[categoryIndex].quizzes;

function displayQuiz(index) {
    const quizContainer = document.getElementById("quiz-container");
    const currentQuiz = quizzes[index];
    const feedback = document.getElementById("quiz-feedback");

    // Clear previous content
    quizContainer.innerHTML = "";
    feedback.textContent = "";

    // Display the question
    quizContainer.innerHTML = `<p>${currentQuiz.question}</p>`;

    // Display options based on question type
    if (currentQuiz.type === "multiple-choice") {
        currentQuiz.options.forEach(option => {
            const btn = document.createElement("button");
            btn.textContent = option;
            btn.onclick = () => checkAnswer(option, currentQuiz.answer);
            quizContainer.appendChild(btn);
        });
    } else if (currentQuiz.type === "fill-in-the-blank") {
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "Type your answer here");
        quizContainer.appendChild(input);

        const submitBtn = document.createElement("button");
        submitBtn.textContent = "Submit";
        submitBtn.onclick = () => checkAnswer(input.value.trim(), currentQuiz.answer);
        quizContainer.appendChild(submitBtn);
    } else if (currentQuiz.type === "matching") {
        currentQuiz.pairs.forEach((pair, i) => {
            const item = document.createElement("div");
            item.innerHTML = `
                <span>${pair.english}</span> 
                <select id="match-${i}">
                    <option value="">Select Translation</option>
                    ${currentQuiz.pairs.map(p => `<option value="${p.yoruba}">${p.yoruba}</option>`).join("")}
                </select>
            `;
            quizContainer.appendChild(item);
        });

        const submitBtn = document.createElement("button");
        submitBtn.textContent = "Submit";
        submitBtn.onclick = () => {
            const correct = currentQuiz.pairs.every((pair, i) => 
                document.getElementById(`match-${i}`).value === pair.yoruba
            );
            displayFeedback(correct);
        };
        quizContainer.appendChild(submitBtn);
    }

    document.getElementById("prev-button").disabled = index === 0;
    document.getElementById("next-button").disabled = index === quizzes.length - 1;
}

function checkAnswer(selected, correctAnswer) {
    const feedback = document.getElementById("quiz-feedback");

    if (selected === correctAnswer) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
        score++;
        document.getElementById("score").textContent = score;
    } else {
        feedback.textContent = "Try Again!";
        feedback.style.color = "red";
    }

    // Move to the next question after a short delay
    setTimeout(() => {
        currentQuizIndex++;
        if (currentQuizIndex < quizzes.length) {
            displayQuiz(currentQuizIndex);
        } else {
            quizContainer.innerHTML = `<p>Quiz completed! Your final score is ${score}.</p>`;
        }
    }, 1000);
}

document.getElementById("prev-button").onclick = function() {
    if (currentQuizIndex > 0) {
        currentQuizIndex--;
        displayQuiz(currentQuizIndex);
    }
};

document.getElementById("next-button").onclick = function() {
    if (currentQuizIndex < quizzes.length - 1) {
        currentQuizIndex++;
        displayQuiz(currentQuizIndex);
    }
};

// Start the quiz with the first question
displayQuiz(currentQuizIndex);