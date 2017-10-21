class Question{
    constructor(parts, answer, questionGenerator){
        //todo: when we have a better parser, just work out the answer based on question
        this.parts = parts;
        if(!this.isValidEquation(parts)){
            console.log("invalid equation " + parts.join() + "in question");
        }
        this.answer = answer;
        this.questionGenerator = questionGenerator;
    }

    isValidEquation(parts){
        //only hands basic int+int=int case
        //where one int can be a ?
        //todo: stack based parse for mo complex sturf
        let questionMarkCount = 0;
        for(let [index, part] of parts.entries()){
            let evenIndex = index % 2 === 0;
            if(evenIndex){
                if(part === "?"){
                    questionMarkCount += 1;
                }else if(Number.isNaN(baseConversion(part))){
                    console.log("Nan result for baseConversion(" + part + ")");
                    return false;
                }
            }else{
                if(part !== "+" && part !== "="){
                    console.log(part + " not a + or =");
                    return false;
                }
            }
        }
        if(questionMarkCount != 1){
            console.log("too many ?'s");
            return false;
        }
        return true;
    }

    get text(){
        return this.parts.join(" ");
    }

    get numberLineStart(){
        //todo: this more inteligently. It will break especily if we move ? to left side of equation
        return this.parts[0];
    }

    isGuessRight(guess){
        //todo: record past gusses are property of question
        return guess === this.answer;
    }

    makeSuggestions(guessedRight){
        //returns new questions
        //if guess was right, they'll be harder
        //if wrong, they'll be easier
        //placeholder implementation:
        return [this.questionGenerator()];
    }
}