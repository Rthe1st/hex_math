class Question{
    constructor(questionGenerator){
        //todo: make text and answer params
        this.questionGenerator = questionGenerator;
        [this.text, this.answer, this.left] = this.questionGenerator();
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
        return [new Question(this.questionGenerator)];
    }
}