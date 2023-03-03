var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var isGameStarted = false;


//Función que te devuelve un número al random del 0 al 3;
function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);

    
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    return randomChosenColor;    
}

$(".btn").on("click", function() {
    var userChoseColor = $(this).attr("id");
    userClickedPattern.push(userChoseColor);

    playSound(userChoseColor);
    animatePress(userChoseColor);
    checkAnswer(level);

    console.log(userClickedPattern);
});


function playSound(name) {
    var audio = new Audio("/sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//Banderas
$(document).keypress( function() {
    if(isGameStarted){
        console.log("ya inicio");
    }else{
        //el juego no ha iniciado y por eso corre nextsequence
        nextSequence();
        isGameStarted = true;
        $("#level-title").text("Level " + level);
        console.log("inicio");
    }
});

function checkAnswer(currentLevel) {
    if(userClickedPattern.length == currentLevel) {
        var isCorrect = true;

        for (let index = 0; index < currentLevel; index++) {
            if(userClickedPattern[index] == gamePattern[index]) {
            }else {
                isCorrect = false;
                break;
            }
        }

        if(isCorrect == true) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        } else {
            $("#level-title").text("Game Over, Press Any Key to Restart");
            var audio = new Audio("/sounds/wrong.mp3");
            audio.play();
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);
            starOver();
        }
    }
}


function starOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    isGameStarted = false;
}