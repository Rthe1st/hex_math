class QuestionList{
    //todo: make currentQuestion a propertiy of this class
    constructor(){
        this.questions = new Map();
    }

    addQuestion(question){
        this.questions.set(question.text, question);
    }

    addQuestions(questions){
        for(let question of questions){
            this.questions.set(question.text, question);
        }
    }

    pickQuestion(){
        let questionIndex = Math.floor(Math.random()*this.questions.size);
        return Array.from(this.questions.values())[questionIndex];
    }
}