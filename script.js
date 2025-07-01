const questions = [
  {
    question: "If you were walking right now and the person right in front of you walked slowly, how would you react?",
    name: "q1",
    options: [
      { text: "You would not mind", value: "peaceful" },
      { text: "Just move", value: "happy" },
      { text: "Move, but scream inside", value: "notchill" },
      { text: "Actually scream", value: "mad" }
    ]
  },
  {
    question: "Choose a snack:",
    name: "q2",
    options: [
      { text: "Black coffe", value: "notchill" },
      { text: "Eggs and Ham", value: "happy" },
      { text: "Something baked and sweet", value: "peaceful" },
      { text: "Anything is fine", value: "mad" }
    ]
  },
  {
    question: "If you can rate your sleep how would you rate it?",
    name: "q3",
    options: [
      { text: "Good", value: "happy" },
      { text: "Meh", value: "peaceful" },
      { text: "Sleep? Who does that?", value: "notchill" },
      { text: "I wanna rip my head off", value: "mad" }
    ]
  },
  {
    question: "Choose a weirdly specific weather mood:",
    name: "q4",
    options: [
      { text: "Cloudy but bright", value: "notchill" },
      { text: "Thunder in the distance but no rain", value: "mad" },
      { text: "A sudden gust of wind that makes you feel seen", value: "peaceful" },
      { text: "That golden haze before sunset, when everything feels unreal", value: "happy" }
    ]
  },
  {
    question: "Explain your entire personality with an object",
    name: "q5",
    options: [
      { text: "A tangled pair of headphones", value: "mad" },
      { text: "A book with too many notes in the margins", value: "notchill" },
      { text: "A cocunut scent candle", value: "happy" },
      { text: "A spinning coin", value: "peaceful" }
    ]
  }
];

let currentQuestion = 0;
const userAnswers = [];

function startQuiz() {
  document.getElementById('start-page').classList.add('hidden');
  document.getElementById('quiz').classList.remove('hidden');
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  const container = document.getElementById('question-container');
  container.innerHTML = `<div class="question"><p>${q.question}</p>` +
    q.options.map(option => `<label><input type="radio" name="${q.name}" value="${option.value}"> ${option.text}</label><br>`).join('') +
    `</div>`;
  document.getElementById('next-button').textContent = (currentQuestion === questions.length - 1) ? "Reveal Your Cat!" : "Next";
}

function nextQuestion() {
  const selected = document.querySelector(`input[name="${questions[currentQuestion].name}"]:checked`);
  if (!selected) {
    alert("Please select an option.");
    return;
  }
  userAnswers.push(selected.value);
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const score = { notchill: 0, peaceful: 0, mad: 0, happy: 0 };
  userAnswers.forEach(value => score[value]++);

  let resultText = "";
  let resultImg = "";

  if (score.notchill >= 2) {
    resultText = "Are you looking for trouble?</strong> –  You are not as mad as you could be, but you are definetely looking for trouble. You are mostly nice, but today you could forget about it. Just chill bro.";
    resultImg = "images/notchill.jpg";

  } else if (score.peaceful >= 2) {
    resultText = "You are chill bro</strong> – The world could be about to end, but you keep yourself calm. That's nice, congrats bro";
    resultImg = "images/peaceful.jpg";
  } else if (score.mad >= 2) {
    resultText = "Woke up with the wrong foot?</strong> – The world can be cruel, but seems to be crue-ler today. Everything will be fine, take a nap, there is brighter days ahead!";
    resultImg = "images/mad.jpg";
  } else {
    resultText = "We like you bro</strong> – You are chill and positive, just like this cat. Congrats and keep it up!";
    resultImg = "images/happy.jpg";
  }

  document.getElementById('quiz').classList.add('hidden');
  document.getElementById('result-text').innerHTML = resultText;
  document.getElementById('result-image').src = resultImg;
  document.getElementById('result').classList.remove('hidden');
}
