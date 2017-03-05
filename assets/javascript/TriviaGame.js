class TriviaGame {
	constructor(questions){
		this.questions = _.map(questions, q=> new TriviaQuestion(q));
		this.questionIndex = -1;
		this.currentQuestion = null;
		this.gameStatus = {correct: 0, incorrect: 0};
		this.clicked = false;
	}

	displayNextQuestion(){
		if (this.currentQuestion){

		}
		this.questionIndex++;
		if (this.questionIndex < this.questions.length){
			this.currentQuestion = this.questions[this.questionIndex];
			this.currentQuestion.renderQuestion();
			this.currentQuestion.setTimer(this);
		} else {
			// game over
			console.log("game over, your record is>>>", this.gameStatus);
			$("#stats").text(`You guessed ${this.gameStatus.correct} right, and ${this.gameStatus.incorrect} wrong`);
			$("#restart").attr({"class":"btn restart-button Aligner-item"});
		}
		this.clicked = false;
	}
}
