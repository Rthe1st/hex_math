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

function checkProgress(){
    /*todo: this should check the stats array, add questions based on it
    i.e.
    if(more then 20 questions right){
        questionList.addQuestions([
            new Question(countingOnUpTo10),
        ]);
    }
    etc
    new Question(countingOnAbove10),
    new Question(countingOn),
    new Question(doubles),
    new Question(doublesPlusOne),
    new Question(makingTen),
    new Question(makingMultiplesOfTen),
    new Question(frontEndAddtion),
    */
}

function checkAnswer(event){
    let guess = parseInt(document.getElementById("answer").value, base());
    let wasRight = currentQuestion.isGuessRight(guess);
    recordQuestion(currentQuestion, wasRight);
    let result = document.getElementById("result");
    if(wasRight){
        result.textContent = "correct!";
        statistics.totalCorrect += 1;
        statistics.test.correct += 1;
        checkProgress();
        questionList.addQuestions(currentQuestion.makeSuggestions(wasRight));
        chooseQuestion();
    }else{
        result.textContent = "wrong!";
        statistics.totalIncorrect += 1;
        statistics.test.incorrect += 1;
        numberLine(currentQuestion.left, guess, true);
        alert(currentQuestion.text.replace("?", currentQuestion.answer.toString(base())));
    }
    refreshGraph(stats, plotData);
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
        new Question(countingOnUpTo10)
    ]);
    stats = [
        {name: "Count on up to 10", correct: 0, incorrect: 0},
        {name: "Count on above 10", correct: 0, incorrect: 0},
        {name: "Count on", correct: 0, incorrect: 0},
        {name: "Doubles", correct: 0, incorrect: 0},
        {name: "Doubles plus 1", correct: 0, incorrect: 0},
        {name: "Making 10", correct: 0, incorrect: 0},
        {name: "Making multiples of 10", correct: 0, incorrect: 0},
        {name: "Front end Addition", correct: 0, incorrect: 0}
    ];
    drawGraph(stats);
    chooseQuestion();
    checkButton = document.getElementById("check");
    checkButton.addEventListener("click", checkAnswer, true);
    document.getElementById("do-test").addEventListener("click", doTest, true);
}