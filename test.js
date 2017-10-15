let inTest;

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
    inTest = false;
}

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