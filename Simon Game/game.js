//Simon Game by RPS
// array for the colour ids
var buttonColours = ["red", "blue", "green", "yellow"];
// for store  the random colour are generated from game 
var gamePattern = [];
//for store the colour id from the user clicked
var userClickedPattern = [];

var started = false;
var level = 0;
// Here we get the key press event by the user 
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
// here we get clicked event by the user ,when they click on any colour buttons
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});
// Here we check the clicked button and random number are same or not,if true levelup else restart
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
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

//here we creat new random number for simon game with using maths functions
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(10).fadeOut(10).fadeIn(10);
  playSound(randomChosenColour);
}

//here we use animation for key press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
//here we add a fuction for sound as if button press right or wrong and which colour is clicked
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//for reset game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
