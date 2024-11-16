var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
function nextSequence(){
    ++level;
    $("h1").text("level "+ level);
    userClickedPattern=[];
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
}
function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}
function animatePress(color){
    $('.'+color).fadeOut(100).fadeIn(100)
}
$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    console.log(userClickedPattern.length-1);
    checkAnswer(userClickedPattern.length-1);
})
$("h1").click(function(){
    if(started===false){
        setTimeout(nextSequence,250)
        started=true;
    }
});
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level_title").text("Game Over , You reached till level: "+level);
        setTimeout(function(){
            $("body").removeClass("game-over");   
        },200);
        startOver();
    }
}
function startOver(){
    started=false;
    level=0;
    gamePattern=[];
}


