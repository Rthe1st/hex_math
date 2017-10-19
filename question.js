class Question{
    constructor(technique){
        this.technique = technique;
        [this.text, this.answer, this.left] = this.technique.questionGenerator();
    }

    isGuessRight(guess){
        return guess === this.answer;
    }
}