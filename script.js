let questions = [
    {
        question: "What is phishing?",
        answers: [
            { text: "A type of fish", correct: false },
            { text: "A cyber attack to steal sensitive information", correct: true },
            { text: "A programming language", correct: false },
            { text: "A type of hardware", correct: false }
        ],
        hint: "Phishing often involves fake emails or websites designed to trick you into revealing personal information."
    },
    {
        question: "What is a strong password?",
        answers: [
            { text: "123456", correct: false },
            { text: "Password123", correct: false },
            { text: "Tr0ub4dor&3", correct: true },
            { text: "qwerty", correct: false }
        ],
        hint: "A strong password should be at least 12 characters long and include a mix of letters, numbers, and symbols."
    },
    {
        question: "What is two-factor authentication (2FA)?",
        answers: [
            { text: "A type of fish", correct: false },
            { text: "A security method that requires two forms of verification", correct: true },
            { text: "A programming language", correct: false },
            { text: "A type of malware", correct: false }
        ],
        hint: "2FA adds an extra layer of security by requiring something you know (like a password) and something you have (like a phone)."
    },
    {
        question: "What is a firewall?",
        answers: [
            { text: "A physical wall that protects a building", correct: false },
            { text: "A security system that monitors and controls network traffic", correct: true },
            { text: "A type of virus", correct: false },
            { text: "A tool for hacking", correct: false }
        ],
        hint: "A firewall acts as a barrier between your device and the internet, blocking unauthorized access."
    },
    {
        question: "What is malware?",
        answers: [
            { text: "A type of fish", correct: false },
            { text: "Malicious software designed to harm or exploit devices", correct: true },
            { text: "A programming language", correct: false },
            { text: "A type of hardware", correct: false }
        ],
        hint: "Malware includes viruses, worms, and ransomware, which can damage your computer or steal your data."
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

// Display the current question
function showQuestion(question) {
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const hintElement = document.getElementById("hint");

    questionElement.innerText = question.question;
    answersElement.innerHTML = "";
    hintElement.innerText = ""; // Clear the hint text

    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer-btn");
        button.addEventListener("click", () => selectAnswer(answer.correct));
        answersElement.appendChild(button);
    });

    // Update progress bar
    const progress = (currentQuestionIndex / questions.length) * 100;
    document.getElementById("progress").style.width = `${progress}%`;
}

// Handle answer selection
function selectAnswer(isCorrect) {
    clearInterval(timer); // Stop the timer
    const correctSound = document.getElementById("correct-sound");
    const incorrectSound = document.getElementById("incorrect-sound");

    if (isCorrect) {
        correctSound.play();
        score++;
        document.getElementById("question-container").classList.add("correct");
    } else {
        incorrectSound.play();
        document.getElementById("question-container").classList.add("incorrect");
    }

    setTimeout(() => {
        document.getElementById("question-container").classList.remove("correct", "incorrect");
        nextQuestion();
    }, 500);
}

// Move to the next question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        resetTimer();
    } else {
        endGame();
    }
}

// End the game
function endGame() {
    localStorage.setItem("score", score); // Store score for results page
    window.location.href = "results.html";
}

// Timer functions
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            selectAnswer(false); // Automatically mark as incorrect
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 10;
    document.getElementById("time").innerText = timeLeft;
    startTimer();
}

// Show hint for the current question
function showHint() {
    const hint = questions[currentQuestionIndex].hint;
    document.getElementById("hint").innerText = `Hint: ${hint}`;
}

// Load the first question when the page loads
showQuestion(questions[currentQuestionIndex]);
startTimer();