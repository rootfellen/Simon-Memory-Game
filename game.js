// Variable with array of colors

var colors = ["yellow", "green", "blue", "red"];

// Empty Game Colors Pattern Array 

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var gameStarted = false;


// By pressing button, we will start game and launch our main game function, game mode will be started and level title will be change accordingly.

$(document).keypress(function() {

	if (gameStarted === false) {
		$("#level-title").text("Level " + level);
		randomColor();
		gameStarted = true;
	}

});


//  With click on the button, we will get an id of the button which was clicked and push it as a string to empty array of Users Clicked Pattern.
// We will add a sound to a click by using function playSound and we will let player to click on the previous button as per the rules

$(".btn").click(function(){

	var userChosenColor = $(this).attr("id");

	userClickedPattern.push(userChosenColor);

	playSound(userChosenColor)

	checkingAnswer(userClickedPattern.length-1);

});

//  With this function we will check if our array of colors equal to clicked array, same as their length, by using conditional statements,
//  we will make a delay before our main function randomColor will be executed, otherwise we will apply class game over if they are not equal.
//  We will do reset of the level, gamePattern array reset and reset of the sign which will tell us if the game has started.

function checkingAnswer(usersLevel) {

	if (gamePattern[usersLevel] === userClickedPattern[usersLevel]) {
		if (userClickedPattern.length === gamePattern.length){
			setTimeout(function() {
				randomColor();
			}, 1000);
		}

	} else {
		playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
	setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

		startOver();
	}
}


//  Function to get a random number, choose random color by those number from array with colors and push it to the end of the Game Colors Pattern Array
//  including animation by using FadeIn, FadeOut and playsound function by choosing sound according to random color, got randomly.

function randomColor() {

userClickedPattern = [];

level++;	

$("#level-title").text("Level " + level);

var randomNumber = Math.floor(Math.random()*4);

var randomChosenColor = colors[randomNumber];

	gamePattern.push(randomChosenColor);

$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

	playSound(randomChosenColor);

}

//  Adding animation to our game buttons

$(".btn").click(function() {

	var animated = $(this);

animated.addClass("pressed");

setTimeout(function() {
	animated.removeClass("pressed");
	
	}, 100);

})

// Play sound on click function

function playSound(name) {

	var audio = new Audio("./sounds/" + name + ".mp3");
	audio.play();
}

// Full reset, reset of the game level, reset of the game mode and reset of the main array with color patterns.

function startOver(){
	level = 0;
	gameStarted = false;
	gamePattern = [];
}









