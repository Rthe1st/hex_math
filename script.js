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
    let result = document.getElementById("result");
    recordQuestion(wasRight);
    questionDetail.technique.addResult(wasRight);
    checkProgress();
    if(wasRight){
        result.textContent = "correct!";
        statistics.totalCorrect += 1;
        statistics.test.correct += 1;
        newQuestion(questionDetail);
    }else{
        numberLine(questionDetail.left, guess, true);
        statistics.totalIncorrect += 1;
        result.textContent = "wrong!";
        statistics.test.incorrect += 1;
        alert(document.getElementById("question").textContent.replace("?", questionDetail.answer.toString(base())));
    }
    refreshGraph(plotData);
    document.getElementById("answer").value = "";
    document.getElementById("answer").focus();
}

function recordQuestion(wasCorrect){
    let previousAnswers = document.getElementById("previous-answers");
    let entry = document.createElement('li');
    if(wasCorrect){
        entry.setAttribute("class", "correct");
    }else{
        entry.setAttribute("class", "incorrect");
    }
    entry.appendChild(document.createTextNode(questionDetail.question));
    previousAnswers.appendChild(entry);
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

function newQuestion(){
    result.textContent = "";
    let chosenTechnique = progress.currentTechnique;
    for(let technique of progress.passedTechniques){
        //this is crap (i.e. when current technique has a perfect average)
        //change to some clever weighting shit
        if(false && technique.average() < chosenTechnique.average()){
            chosenTechnique = technique;
        }
    }
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