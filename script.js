// Sample quiz data stored as JSON
const quizData = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "Who wrote 'Hamlet'?",
    answers: [
      { text: "Mark Twain", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "Charles Dickens", correct: false },
      { text: "Leo Tolstoy", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
      { text: "Arctic Ocean", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

// Load progress from localStorage if available
function loadProgress() {
  const savedIndex = localStorage.getItem("quizCurrentQuestion");
  const savedScore = localStorage.getItem("quizScore");

  if (savedIndex !== null) currentQuestionIndex = Number(savedIndex);
  if (savedScore !== null) score = Number(savedScore);
}

// Save progress to localStorage
function saveProgress() {
  localStorage.setItem("quizCurrentQuestion", currentQuestionIndex);
  localStorage.setItem("quizScore", score);
}

function startQuiz() {
  loadProgress();
  resultContainer.classList.add("hide");
  nextButton.style.display = "none";
  showQuestion(quizData[currentQuestionIndex]);
}

function showQuestion(questionData) {
  resetState();
  questionElement.innerText = questionData.question;

  questionData.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";

  if (correct) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("wrong");
  }

  Array.from(answerButtonsElement.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "inline-block";
  saveProgress();
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    showQuestion(quizData[currentQuestionIndex]);
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("quiz-container").classList.add("hide");
  resultContainer.classList.remove("hide");
  scoreElement.innerText = `${score} / ${quizData.length}`;
  localStorage.removeItem("quizCurrentQuestion");
  localStorage.removeItem("quizScore");
}

restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("quiz-container").classList.remove("hide");
  resultContainer.classList.add("hide");
  startQuiz();
});

// Initialize
startQuiz();
