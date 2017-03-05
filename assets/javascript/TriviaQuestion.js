class TriviaQuestion {
	constructor(q){
		this.question = q.question;
		this.choices = q.choices;
		this.key = q.key;
		this.ref = q.ref;
		this.response = null;
		this.intervalId = null;
		this.timeAllowed = 10000;
		this.elapsedTime = 0;
	}

	renderQuestion(){
		$("#question").text(this.question);
		let questionDisplayed = $("<ol>");
		$("#choices").append(questionDisplayed);
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
		$("#time").text((this.timeAllowed-this.elapsedTime)/1000);
		if (this.elapsedTime >= this.timeAllowed){
			this.displayAnswer(null,game);
		}
	}

	displayAnswer(id, game){
		$("#answer").text(`Correct answer is ${this.key}`);
		clearInterval(this.intervalId);
		var self =this;
		this.determineAnswer(id, game);
		this.intervalId = setTimeout(function(){
			self.removeQuestion(game);
		}, 4000);
	}

	determineAnswer(id, game){
		if (!game.clicked) {
			let displayImg = $("<img>");
			let base = `./assets/images/`;
			displayImg.attr({"src": `${base}/${this.ref}`});
			$("#img-container").append(displayImg);
		} 
		
		if (!game.clicked){
			$(`#${id}`).attr({"class": "selected"});
			if (id === this.key){
				$("#right-or-wrong").attr({"class": "right"});
				$("#right-or-wrong").text("You are correct!");
				$("#audio-source").attr({"src": "./assets/audios/tada.mp3"});
				$("#player").load();
				game.gameStatus.correct++;
			} else if (id !==null) {
				game.gameStatus.incorrect++;
				$("#right-or-wrong").attr({"class": "wrong"});
				$("#right-or-wrong").text("You guessed wrong!");
			} else {
				game.gameStatus.incorrect++;
				$("#right-or-wrong").attr({"class": "wrong"});
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
		$("#choices").html("");
		$("#answer").html("");
		$("#right-or-wrong").attr({class: ""});
		$("#right-or-wrong").html("");
		$("#img-container").html("");
		$("#time").html("");
		clearTimeout(this.intervalId);
		game.displayNextQuestion();
	}
}
