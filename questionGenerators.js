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

function countingOnUpTo10(){
    /*Single digit sums that add up to a single digit
    For bases with leters (i.e. base > 10), a bias is given towards summing to letters (more then 10)
    */
    let leftNumber = Math.floor(Math.random()*(baseConversion("10")));
    let rightNumberMax = (baseConversion("10") - leftNumber);
    let rightNumber = Math.floor(Math.random()*rightNumberMax);
    if(rightNumber > leftNumber){
        //big number first is easier because it matches reading direction
        let temp = rightNumber;
        rightNumber = leftNumber;
        leftNumber = temp;
    }
    if(baseConversion("10") > 10 && (leftNumber + rightNumber) < 10){
        //skew towards letter answers
        let headroom = baseConversion("10") -  (leftNumber + rightNumber);
        leftNumber += Math.floor(Math.random()*headroom);
    }
    let question = makeEquationString(leftNumber, rightNumber, null);
    let answer = leftNumber + rightNumber;
    return [question, answer, leftNumber];
}

function countingOnAbove10(){
    /*Single digit (non letter) sums that add to more then base("10")
    WARNING: for larger bases this means some letters will never appear
    i.e. m + 9 < 10 for base(35)
    */
    let leftNumberMin = Math.max(baseConversion("10") - 9, 0);
    let leftNumber = leftNumberMin + Math.floor(Math.random()*(baseConversion("10") - leftNumberMin));
    let rightNumberMin = (baseConversion("10") - leftNumber);
    let rightNumberMax = Math.min(base("10"), 9);
    let rightNumber = rightNumberMin + Math.floor(Math.random()*(rightNumberMax - rightNumberMin));
    if(rightNumber > leftNumber){
        let temp = rightNumber;
        rightNumber = leftNumber;
        leftNumber = temp;
    }
    let question = makeEquationString(leftNumber, rightNumber, null);
    let answer = leftNumber + rightNumber;
    return [question, answer, leftNumber];
}

function countingOn(){
    /*Only useful for bases larger then 10
    Sums that both use letters
    */
    let leftNumber = Math.floor(Math.random()*baseConversion("10"));
    let rightNumber = Math.floor(Math.random()*leftNumber);
    let question = makeEquationString(leftNumber, rightNumber, null);
    let answer = leftNumber + rightNumber;
    return [question, answer, leftNumber];
}

function doubles(){
    let number = Math.floor(Math.random()*baseConversion("10"));
    let question = makeEquationString(number, number, null);
    let answer = number*2;
    return [question, answer, number];
}

function doublesPlusOne(){
    let rightNumber = leftNumber = Math.floor(Math.random()*baseConversion("10"));
    if(Math.floor() >= 0.5){
        rightNumber += 1;
    }else{
        leftNumber += 1;
    }
    let question = makeEquationString(leftNumber, rightNumber, null);
    let answer = leftNumber + rightNumber;
    return [question, answer, leftNumber];
}

function makingTen(){
    /*this needs to have one of the left/right values missing
    because answer is easy to guess*/
    leftNumber = Math.floor(Math.random()*baseConversion("10"));
    let question = makeEquationString(leftNumber, null, baseConversion("10"));
    let answer = 0x10 - leftNumber;
    return [question, answer, leftNumber];
}

function makingMultiplesOfTen(){
    /*this needs to have one of the left/right values missing
    because answer is easy to guess*/
    leftNumber = Math.floor(Math.random()*baseConversion("100"));
    rightNumber = baseConversion("10") - (leftNumber%baseConversion("10"));
    let question = makeEquationString(leftNumber, null, (leftNumber + rightNumber));
    let answer = rightNumber;
    return [question, answer, leftNumber];
}

function frontEndAddtion(){
    /*this probably needs us to check they add up the 3 component parts as well*/
    leftNumber = Math.floor(Math.random()*baseConversion("100"));
    rightNumber = Math.floor(Math.random()*baseConversion("10"));
    let question = makeEquationString(leftNumber, rightNumber, null);
    let answer = leftNumber + rightNumber;
    return [question, answer, leftNumber];
}