//replace with babel compile
//NodeList.forEach
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, argument) {
        argument = argument || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(argument, this[i], i, this);
        }
    };
}

function base(){
    return parseInt(document.getElementById("base").value);
}

function baseConversion(value){
    return parseInt(value, base());
}

function checkAnswer(event){
    let guess = parseInt(document.getElementById("answer").value, base());
    let wasRight = currentQuestion.isGuessRight(guess);
    recordQuestion(currentQuestion, wasRight);
    let result = document.getElementById("result");
    questionList.tune(currentQuestion, wasRight);
    if(wasRight){
        result.textContent = "correct!";
        statistics.totalCorrect += 1;
        statistics.test.correct += 1;
        chooseQuestion();
    }else{
        result.textContent = "wrong!";
        statistics.totalIncorrect += 1;
        statistics.test.incorrect += 1;
        numberLine(currentQuestion.numberLineStart, guess, true);
        alert(currentQuestion.text.replace("?", currentQuestion.answer.toString(base())));
    }
    document.getElementById("answer").value = "";
    document.getElementById("answer").focus();
}

function recordQuestion(question, wasCorrect){
    let previousAnswers = document.getElementById("previous-answers");
    let entry = document.createElement('li');
    if(wasCorrect){
        entry.setAttribute("class", "correct");
    }else{
        entry.setAttribute("class", "incorrect");
    }
    entry.appendChild(document.createTextNode(question.text));
    previousAnswers.prepend(entry);
    let maxAnswersDisplayed = 7;
    if(previousAnswers.children.length > maxAnswersDisplayed){
        previousAnswers.removeChild(previousAnswers.lastChild);
    }
}

function chooseQuestion(){
    result.textContent = "";
    currentQuestion = questionList.pickQuestion();
    questionElement = document.getElementById("question");
    questionElement.textContent = currentQuestion.text;
}

let stats;
let questionList;

let progress = {};

let statistics = {
    totalCorrect: 0,
    totalIncorrect: 0,
    test:{
        correct: 0,
        incorrect: 0
    }
};

let currentQuestion;

window.onload = function(){
    questionList = new QuestionList();
    questionList.addQuestions([
        new Question(["9", "+", "1", "=", "?"], baseConversion('a'), countingOnUpTo10)
    ]);
    stats = [
        {name: "Count on up to 10", correct: 0, incorrect: 0}
    ];
    chooseQuestion();
    checkButton = document.getElementById("check");
    checkButton.addEventListener("click", checkAnswer, true);
    document.getElementById("do-test").addEventListener("click", doTest, true);
}