class Question{
    constructor(technique){
        this.technique = technique;
        [this.text, this.answer, this.left] = this.technique.questionGenerator();
    }

    isGuessRight(guess){
        return guess === this.answer;
    }

    makeSuggestions(guessedRight){
        //returns new questions
        //if guess was right, they'll be harder
        //if wrong, they'll be easier
        //placeholder implementation:
        let suggestions = [new Question(this.technique)];
        this.technique.addSuggestions(suggestions);
    }
}