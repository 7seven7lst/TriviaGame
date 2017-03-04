const data =[
{question: "Who won the 2004 NBA Champions?", choices: {"A": "LA Lakers", "B":"Boston Celtics", "C": "Detroit Pistons", "D": "San Antonio Spurs"}, key: "C", ref: "piston.png"},
//{question: "What is the most popular breed of dog in the United States?", choices: {"A": "Beagles", "B":"British Bulldogs", "C": "Labrador Retriever", "D": "Chihuahua"}, key: "C", ref: "retriever.png"},
//{question: "Madagascar is an island located of the southeast coast of what continent?", choices: {"A": "Africa", "B":"Asia", "C": "South America", "D": "Oceania"}, key: "A", ref: "madagascar.png"},
//{question: "Yerevan, one of the world's oldest continuously inhabited cities, is the capital of what country?", choices: {"A": "Argentina", "B":"Armenia", "C": "Georgia", "D": "India"}, key: "B", ref: "yerevan.png"},
];

class TriviaQuestion {
	constructor(q){
		this.question = q.question;
		this.choices = q.choices;
		this.key = q.key;
		this.ref = q.ref;
		this.response = null;
		this.intervalId = null;
		this.timeAllowed = 5000;
		this.elapsedTime = 0;
	}

	renderQuestion(){
		$("#question").text(this.question);
		let questionDisplayed = $("<ol>");
		$("#test").append(questionDisplayed);
		_.forEach(this.choices, (choice, key) =>{
			let choiceDisplayed = $("<li>");
			choiceDisplayed.text(choice);
			choiceDisplayed.attr({"id": key})
			questionDisplayed.append(choiceDisplayed);
		})
	}

	setTimer(game){
		var self = this;
		this.intervalId = setInterval(function(){
			self.updateClock(game);
		}, 1000);
	}

	updateClock(game) {
		this.elapsedTime +=1000;
		if (this.elapsedTime >= this.timeAllowed){
			this.displayAnswer(null,game);
		}
	}

	displayAnswer(id, game){
		$("#answer").text(this.key);
		clearInterval(this.intervalId);
		var self =this;
		this.determineAnswer(id, game);
		this.intervalId = setTimeout(function(){
			self.removeQuestion(game);
		}, 3000);
	}

	determineAnswer(id, game){
		if (!game.clicked) {
			let displayImg = $("<img>");
			let base = `./assets/images/`;
			displayImg.attr({"src": `${base}/${this.ref}`, "width": "200px", "height":"200px"});
			$("#img-container").append(displayImg);
		} 
		
		if (!game.clicked){
			$(`#${id}`).attr({"class": "selected"});
			if (id === this.key){
				$("#right-or-wrong").text("You are correct!");
				game.gameStatus.correct++;
			} else if (id !==null) {
				game.gameStatus.incorrect++;
				$("#right-or-wrong").text("You guessed wrong!");
			} else {
				game.gameStatus.incorrect++;
				$("#right-or-wrong").text("Times up, you didn't pick an answer!");
			}
		}
		game.clicked=true;
	}

	handleClick(id, game){
		this.displayAnswer(id, game);
	}

	removeQuestion(game){
		$("#question").html("");
		$("#test").html("");
		$("#answer").html("");
		$("#right-or-wrong").html("");
		$("#img-container").html("");
		clearTimeout(this.intervalId);
		game.displayNextQuestion();
	}
}

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

$(document).ready(function(){
	let game = new TriviaGame(data);
	game.displayNextQuestion();
	let clicked = false;
	$(document).on('click', "li", function(){
		let id = $(this).attr("id");
		clicked = true;
		game.currentQuestion.handleClick(id, game, clicked);
	});
	$(document).on('click', "#restart", function(){
		$("#restart").attr({"class":"button-hide"});
		$("#stats").html("");
		clicked = false;
		game = new TriviaGame(data);
		game.displayNextQuestion();
	});

});
