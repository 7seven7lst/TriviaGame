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
