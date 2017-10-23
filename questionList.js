class QuestionList{
    //todo: make currentQuestion a propertiy of this class
    constructor(){
        this.questions = new Map();
    }

    addQuestion(question){
        this.questions.set(question, 1);
    }

    addQuestions(questions){
        for(let question of questions){
            this.questions.set(question, 1);
        }
    }

    tune(answeredQuestion, guessedRight){
        let newQuestions = countingOnUpTo10(answeredQuestion, guessedRight);
        this.addQuestions(newQuestions);
    }

    pickQuestion(){
        let questionIndex = Math.floor(Math.random()*this.questions.size);
        return Array.from(this.questions.keys())[questionIndex];
    }
}