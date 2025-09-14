// ===== Quiz Data =====
const quizData = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlinks and Text Marking Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "CSS", "Python"],
    answer: "CSS"
  },
  {
    question: "Which language is used for interactivity?",
    options: ["CSS", "JavaScript", "SQL"],
    answer: "JavaScript"
  },
  {
    question: "Which property is used in CSS to change text color?",
    options: ["font-color", "text-style", "color"],
    answer: "color"
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Netscape", "Microsoft", "Google"],
    answer: "Netscape"
  }
];

let quizIndex = 0, score = 0;
const questionEl = document.getElementById("question");
const formEl = document.getElementById("quiz-form");
const submitBtn = document.getElementById("submitBtn");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");

function loadQuiz() {
  feedbackEl.textContent = "";
  const current = quizData[quizIndex];
  questionEl.textContent = `Q${quizIndex + 1}. ${current.question}`;
  formEl.innerHTML = "";

  current.options.forEach(opt => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="option" value="${opt}"> ${opt}`;
    formEl.appendChild(label);
  });
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const selected = formEl.querySelector("input[name='option']:checked");
  if (!selected) {
    feedbackEl.textContent = "⚠️ Please select an answer!";
    return;
  }
  if (selected.value === quizData[quizIndex].answer) {
    feedbackEl.textContent = " Correct answer!";
    score++;
  } else {
    feedbackEl.textContent = ` Wrong! Correct answer: ${quizData[quizIndex].answer}`;
  }

  setTimeout(() => {
    quizIndex++;
    if (quizIndex < quizData.length) {
      loadQuiz();
    } else {
      questionEl.textContent = "🎉 Quiz Completed!";
      formEl.innerHTML = "";
      submitBtn.style.display = "none";
      scoreEl.textContent = `Your Score: ${score}/${quizData.length}`;
    }
  }, 1500);
});

loadQuiz();

// ===== Joke API in Footer =====
const quoteEl = document.getElementById("quote");
const refreshBtn = document.getElementById("refreshQuote");

async function loadJoke() {
  const res = await fetch("https://official-joke-api.appspot.com/random_joke");
  const data = await res.json();
  quoteEl.textContent = `${data.setup} — 😂 ${data.punchline}`;
}

// Load joke on page open + when refresh clicked
refreshBtn.addEventListener("click", loadJoke);
loadJoke();
