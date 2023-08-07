const question = [
    {
        question: "Which is the fastest car in the world ?",
        answers: [
            {text: "Koengisegg Agera", correct: true},
            {text: "Bugatti Veyron", correct: false},
            {text: "Ferrari Roma", correct: false},
            {text: "Aston Martin Vulcan", correct: false},
        ]
    },
    {
    question: "Which is the fastest bike in the world ?",
        answers:[
            {text: "Ducati Superleggera", correct: false},
            {text: "BMW S1000 RR", correct: false},
            {text: "Kawasaki H2R", correct: true},
            {text: "Suzuki Hayabusa", correct: false},
            
        ]
    },
    {
    question: "Which is the worlds biggest airplane?",
            answers:[
                {text: "Airbus A380", correct: false},
                {text: "Boeing 737", correct: false},
                {text: "Cessna", correct: false},
                {text: "Anotonov", correct: true},
                
            ]
    },
    {
        question: "Which is the biggest car manufacturer ?",
            answers:[
                {text: "Toyota", correct: true},
                {text: "Suzuki", correct: false},
                {text: "Tesla", correct: false},
                {text: "Nissan", correct: false},
                
            ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton =  document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion(); 
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
         const selectedBtn = e.target;
         const isCorrect = selectedBtn.dataset.correct === "true";
         if(isCorrect){
            selectedBtn.classList.add("correct");
            score++;
         }else{
            selectedBtn.classList.add("incorrect");
         }
         Array.from(answerButtons.children).forEach(button => {
            if(button.dataset.correct === "true"){
                button.classList.addd("correct");
            }
            button.disabled = true;
         });
         nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = 'You scored ${score} out of ${questions.length}!';
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();       
    }
});