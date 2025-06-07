const questions = [
  {
    question: "What is the capital of India?",
    options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
    answer: "Delhi"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    answer: "Mars"
  },
  {
    question: "Who developed JavaScript?",
    options: ["Brendan Eich", "Bill Gates", "Mark Zuckerberg", "James Gosling"],
    answer: "Brendan Eich"
  },
  {
    question: "HTML stands for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Marketing Language",
      "Hyper Text Markup Language",
      "Hyper Text Markup Leveler"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which company owns YouTube?",
    options: ["Facebook", "Apple", "Google", "Amazon"],
    answer: "Google"
  }
];

let currentQuestion = 0;
let score = 0;
let selected = false;

const startScreen = document.getElementById("start-screen");
const quizBox = document.getElementById("quiz-box");
const questionText = document.getElementById("question");
const optionList = document.getElementById("option-list");
const nextBtn = document.getElementById("next-btn");
const feedback = document.getElementById("feedback");
const resultScreen = document.getElementById("result-screen");
const finalScore = document.getElementById("final-score");

document.getElementById("start-btn").addEventListener("click", () => {
  startScreen.classList.add("hidden");
  quizBox.classList.remove("hidden");
  loadQuestion();
});

document.getElementById("restart-btn").addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  resultScreen.classList.add("hidden");
  quizBox.classList.remove("hidden");
  loadQuestion();
});

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

function loadQuestion() {
  selected = false;
  nextBtn.disabled = true;
  feedback.textContent = "";

  const q = questions[currentQuestion];
  questionText.textContent = `Q${currentQuestion + 1}. ${q.question}`;
  optionList.innerHTML = "";

  q.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.addEventListener("click", () => checkAnswer(li, q.answer));
    optionList.appendChild(li);
  });
}

function checkAnswer(selectedOption, correctAnswer) {
  if (selected) return;
  selected = true;
  const allOptions = document.querySelectorAll("li");
  allOptions.forEach(opt => opt.style.pointerEvents = "none");

  if (selectedOption.textContent === correctAnswer) {
    selectedOption.classList.add("correct");
    feedback.textContent = "✅ Correct!";
    score++;
  } else {
    selectedOption.classList.add("wrong");
    feedback.textContent = `❌ Wrong! Correct: ${correctAnswer}`;
  }

  nextBtn.disabled = false;
}

function showResults() {
  quizBox.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  finalScore.textContent = `Your score: ${score} / ${questions.length}`;
}
