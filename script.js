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
    onLastLevel = progress.futureTechniques.length == 0
    if(progress.currentTechnique.isPassing() && !onLastLevel){
            alert("level up!");
            progress.passedTechniques.push(progress.currentTechnique);
            progress.currentTechnique = progress.futureTechniques.shift();
    }
}

function checkAnswer(event){
    let guess = parseInt(document.getElementById("answer").value, base());
    let wasRight = guess === questionDetail.answer
    recordQuestion(wasRight);
    let result = document.getElementById("result");
    if(wasRight){
        result.textContent = "correct!";
        statistics.totalCorrect += 1;
        statistics.test.correct += 1;
        checkProgress();
        newQuestion(questionDetail);
    }else{
        result.textContent = "wrong!";
        statistics.totalIncorrect += 1;
        statistics.test.incorrect += 1;
        numberLine(questionDetail.left, guess, true);
        let questionText = document.getElementById("question").textContent;
        let answerText = questionDetail.answer.toString(base());
        alert(questionText.replace("?", answerText));
    }
    refreshGraph(plotData);
    document.getElementById("answer").value = "";
    document.getElementById("answer").focus();
}

function recordQuestion(wasCorrect){
    questionDetail.technique.addResult(wasCorrect);
    let previousAnswers = document.getElementById("previous-answers");
    let entry = document.createElement('li');
    if(wasCorrect){
        entry.setAttribute("class", "correct");
    }else{
        entry.setAttribute("class", "incorrect");
    }
    entry.appendChild(document.createTextNode(questionDetail.question));
    previousAnswers.prepend(entry);
}

let techniques = [
    new Technique("Count on up to 10", countingOnUpTo10, "count-on"),
    new Technique("Count on above 10", countingOnAbove10, "count-on"),
    new Technique("Count on", countingOn, "count-on"),
    new Technique("Doubles", doubles, "doubles"),
    new Technique("Doubles plus 1", doublesPlusOne, "doubles-plus-1"),
    new Technique("Making 10", makingTen, "making-10"),
    new Technique("Making multiples of 10", makingMultiplesOfTen, "making-multiples-of-10"),
    new Technique("Front end Addition", frontEndAddtion, "front-end-addition")
];

let progress = {
    currentTechnique: techniques[0],
    passedTechniques: [],
    futureTechniques: techniques.slice(1)
};

let statistics = {
    totalCorrect: 0,
    totalIncorrect: 0,
    test:{
        correct: 0,
        incorrect: 0
    }
};

let questionDetail;

function pickTechnique(){
    //prioritise techniques that don't have enough answers to get an accurate average
    let possibleTechniques = progress.passedTechniques.concat(progress.currentTechnique);
    for(let technique of possibleTechniques){
        if(technique.windowAverage.length < technique.windowSize){
            return technique;
        }
    }
    //techniques user's done badly have the best change of being picked
    //exponetial decrease in probablity means only worst 4/5 are likely
    function lowToHigh(a, b){return b.average() - a.average()}
    possibleTechniques.sort(function(a, b){return b.average() - a.average()});
    for(let technique of possibleTechniques){
        if(Math.random() > 0.5){
            return technique;
        }
    }
    //we're only likely to get here when there aren't many possible techniques
    return possibleTechniques[-1];
}

function newQuestion(){
    result.textContent = "";
    let chosenTechnique = pickTechnique();
    questionDetail = chosenTechnique.newQuestion();
    question = document.getElementById("question");
    question.textContent = questionDetail.question;
}

window.onload = function(){
    checkButton = document.getElementById("check");
    checkButton.addEventListener("click", checkAnswer, true);
    document.getElementById("do-test").addEventListener("click", doTest, true);
    newQuestion();
    drawGraph();
}