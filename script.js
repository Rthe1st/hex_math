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

function makeEquationString(left, right, answer){
    //let nullParams = 1;//[left, right, answer].filter(function(element){
    //   return element == null;
    //});
    //let nullParams = [left, right, answer].filter(element => element == null);
   //if(nullParams.length > 1){
    //    console.log("Equation is under-specified");
    //}
    [left, right, answer] = [left, right, answer].map(function(value){
        if(value == null){
            return "?";
        }else{
            return value.toString(base());
        }
    });
    return left + " + " + right + " = " + answer;
}

function checkProgress(){
    if(progress.currentTechnique.isPassing()){
        if(progress.futureTechniques.length > 0){
            alert("level up!");
            progress.passedTechniques.push(progress.currentTechnique);
            progress.currentTechnique = progress.futureTechniques.shift();
        }else{
            return;
        }
    }
}

function checkAnswer(event){
    let guess = parseInt(document.getElementById("answer").value, base());
    result = document.getElementById("result");
    recordQuestion(guess === questionDetail.answer);
    questionDetail.technique.addResult(guess === questionDetail.answer);
    checkProgress();
    if(guess === questionDetail.answer){
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
    adjustValue(plotData);
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

let statistics = {
    totalCorrect: 0,
    totalIncorrect: 0,
    test:{
        correct: 0,
        incorrect: 0
    }
};

let progress = {
    currentTechnique: techniques[0],
    passedTechniques: [],
    futureTechniques: techniques.slice(1)
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

function refreshHelp(){
    let css = questionDetail.technique.cssName;
    let helpDiv = document.querySelector('#help > [name="' + css + '"]');
    let allHelpDivs = document.querySelectorAll('#help > *');
    allHelpDivs.forEach(function(element){
        element.setAttribute("hidden", true);
    });
    helpDiv.removeAttribute("hidden");

}

let inTest;
var timer = 0;

function countDown(){
    let minutes = parseInt(timer / 60, 10)
    let seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.querySelector('#time').textContent = minutes + ":" + seconds;
    if (--timer < 0) {
        endTest();
    }else{
        window.setTimeout(countDown, 1000);
    }
}

function doTest(){
    var duration = 60;
    timer = duration;
    window.setTimeout(countDown, 1000);
    let previousAnswers = document.getElementById("previous-answers");
    while (previousAnswers.hasChildNodes()) {
        previousAnswers.removeChild(previousAnswers.lastChild);
    }
    statistics.test.correct = 0;
    statistics.test.incorrect = 0;
    inTest = true;
}

function endTest(){
    alert("test over, right: " + statistics.test.correct + ", wrong: " + statistics.test.incorrect);
}

function numberLine(start, end, showGuess){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    var w = canvas.width;
    var h = canvas.height;
    let lowest = start - (start % baseConversion("10"));
    let highest = end + (baseConversion("10") - (end % baseConversion("10")));
    let spacing = canvas.width/(highest-lowest);
    with(ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        lineWidth = 2;
        strokeStyle = '#000';
        for(var i = 0;i <= highest-lowest; i++) {
            beginPath();
            strokeStyle = '#000';
            lineWidth = 2;
            let x = (i + 1) * spacing;
            moveTo(x, h/2 - 20);
            lineTo(x, h/2 + 20);
            if(start === i){
                fillStyle = '#0f0';
                strokeStyle = '#0f0';
            }else if(end === i){
                fillStyle = '#f00';
                strokeStyle = '#f00';
            }else{
                fillStyle = '#000';
                strokeStyle = '#000';
            }
            fillText((lowest + i).toString(base()), x - 5, h/2 + 35);
            fill();
            stroke();
        }
        beginPath();
        strokeStyle = '#f00';
        fillStyle = '#f00';
        let startPosition = (start - lowest + 1)*spacing;
        ctx.moveTo(startPosition,h/2);
        let endPosition = (end - lowest + 1)*spacing;
        let midPoint = startPosition + (endPosition - startPosition)/2;
        ctx.quadraticCurveTo(midPoint,h*0.25,endPosition,h/2);
        let text = start + "+" + (end-start).toString(base());
        ctx.fillText(text,midPoint,h/2*0.5-10);
        ctx.stroke();
    }
}

function adjustValue(data) {
    for(let [index, entry] of techniques.entries()){
        let [correct, incorrect] = entry.windowStats();
        data[0]['x'][index] = correct;
        data[1]['x'][index] = incorrect;
    }
    Plotly.redraw('tester');
}

var plotData;

window.onload = function(){
    checkButton = document.getElementById("check");
    checkButton.addEventListener("click", checkAnswer, true);
    document.getElementById("do-test").addEventListener("click", doTest, true);
    newQuestion();

    let yAxis = [];
    let xAxisCorrect = [];
    let xAxisIncorrect = [];
    for(let technique of techniques){
        yAxis.push(technique.name);
        xAxisCorrect.push(technique.correct);
        xAxisIncorrect.push(technique.incorrect);
    }
    var trace1 = {
        x: xAxisCorrect,
        y: yAxis,
        name: 'Correct',
        type: 'bar',
        orientation: 'h'
    };

    var trace2 = {
        x: xAxisIncorrect,
        y: yAxis,
        name: 'Wrong',
        type: 'bar',
        orientation: 'h'
    };

    var data = [trace1, trace2];

    plotData = data;
    var layout = {
        barmode: 'stack',
        xaxis: {
            rangemode: "tozero",
            autorange: true,
            gridwidth: 1
        }
    };

    Plotly.newPlot('tester', data, layout);
}