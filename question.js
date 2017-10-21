class Question{
    constructor(text, answer, left, questionGenerator){
        //todo: make text and answer params
        this.text = text;
        this.answer = answer;
        this.left = left;
        this.questionGenerator = questionGenerator;
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