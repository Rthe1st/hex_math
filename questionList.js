class QuestionList{
    //todo: make currentQuestion a propertiy of this class
    constructor(){
        this.questions = new Map();
        let halfwayDigit = Math.floor(baseConversion("10")/2);
        for(let i=halfwayDigit; i<baseConversion("10"); i++){
            this.addQuestions([
                new Question([i.toString(base()), "+", "1", "=", "?"], i+1)
            ]);
        }
    }

    addQuestion(question){
        if(this.questions.has(question)){
            let currentWeight = this.questions.get(question);
            this.questions.set(answeredQuestion, currentWeighting + 1);             
        }else{
            this.questions.set(question, 1);
        }
    }

    addQuestions(questions){
        for(let question of questions){
            if(this.questions.has(question)){
                let currentWeight = this.questions.get(question);
                this.questions.set(answeredQuestion, currentWeighting + 1);             
            }else{
                this.questions.set(question, 1);
            }
        }
    }

    tune(answeredQuestion, guessedRight){
        let currentWeighting = this.questions.get(answeredQuestion);
        if(guessedRight && currentWeighting > 1){
            this.questions.set(answeredQuestion, currentWeighting - 1);
        }else if(!guessedRight){
            this.questions.set(answeredQuestion, currentWeighting + 1);
        }
        let leftNumber = baseConversion(answeredQuestion.parts[0]);
        let rightNumber = baseConversion(answeredQuestion.parts[2]);
        let newQuestions;
        if(rightNumber < baseConversion("10")-1){
            rightNumber += 1;
            let questionParts = makeQuestionParts(leftNumber, rightNumber, null);
            let answer = leftNumber + rightNumber;
            newQuestions = [new Question(questionParts, answer)];
        }else{
            newQuestions = [];
        }
        this.addQuestions(newQuestions);
    }

    pickQuestion(){
        let totalWeight = 0;
        for(let weight of this.questions.values()){
            totalWeight += weight;
        }
        let randomPick = Math.floor(Math.random()*totalWeight);
        let totalSoFar = 0;
        for(let [question, weight] of this.questions.entries()){
            totalSoFar += weight;
            if(randomPick < totalSoFar){
                return question;
            }
        }
    }
}