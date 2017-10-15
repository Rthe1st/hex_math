class Technique{
    constructor(name, questionGenerator, cssName){
        this.name = name;
        this.questionGenerator = questionGenerator;
        this.cssName = cssName;
        this.correct = 0;
        this.incorrect = 0;
        this.windowAverage = [];
        this.windowSize = 5;
    }

    newQuestion(){
        let [question, answer, left] = this.questionGenerator();
        return {question: question, answer: answer, left: left, technique: this};
    }

    windowStats(){
        let numberOfCorrects = 0;
        let numberOfIncorrects = 0;
        for(let answer of this.windowAverage){
            if(answer){
                numberOfCorrects += 1;
            }else{
                numberOfIncorrects += 1;
            }
        }
        return [numberOfCorrects, numberOfIncorrects];
    }

    addResult(wasCorrect){
        this.windowAverage.push(wasCorrect);
        if(this.windowAverage > this.windowSize){
            this.windowAverage.shift();
        }
        if(wasCorrect){
            this.correct += 1;
        }else{
            this.incorrect += 1;
        }
    }

    average(){
        let numberOfCorrects = 0;
        for(let answer of this.windowAverage){
            if(answer){
                numberOfCorrects += 1;
            }
        }
        if(this.windowAverage.length === 0){
            return 0;
        }else{
            return numberOfCorrects/this.windowAverage.length;
        }
    }

    isPassing(){
        if(this.windowAverage.length < this.windowSize){
            return false;
        }else{
            return this.average() > 0.5;
        }
    }
}