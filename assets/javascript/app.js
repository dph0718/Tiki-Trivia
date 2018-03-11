var randAnswers = [];
var Answer = function (answer, correct) {
    this.answer = answer;
    if (correct === true) {
        this.correct = true;
    } else {
        this.correct = false;
    }
    this.chosen = false;
}

var Question = function (question, answerA, answerB, answerC, answerD) {
    this.question = question;
    this.used = false;
    this.answers = [
        answerA = new Answer(answerA, true),
        answerB = new Answer(answerB),
        answerC = new Answer(answerC),
        answerD = new Answer(answerD)
    ]
    this.randomizeAnswers = function (array) {
        makeArrayOfNumbers(this.answers);
        for (var i = 0; i < makeArrayLength; i++) {
            var rando = random(arrayOfNumbers.length);
            var rando2 = arrayOfNumbers[rando];
            array.push(this.answers[rando2]);
            arrayOfNumbers.splice(rando, 1);
        }
    }
}

var question01 = new Question(
    "What is the square root of 16?",
    "4",
    "9",
    "19",
    "32"
);
var question02 = new Question(
    "Kampala is the capital of which African country?",
    "Uganda",
    "Zimbabwe",
    "Niger",
    "Canada"
);
var question03 = new Question(
    "What is the closest star to the Earth?",
    "The Sun",
    "The Moon",
    "Venus",
    "Proxima Centauri"
);
var question04 = new Question(
    "Where does Spongebob Squarepants live?",
    "in a pineapple under the sea.",
    "at the Krusty Krab.",
    "The Chum Bucket.",
    "Winslow, Arizona."
)
// 0: not started; 1: started; 2: correct and awaiting feedback; 3:incorrect, awaiting feedback; 4: timed out; 5: finished.
var gameState = 0;
//array of question objects:
var questions = [
    question01,
    question02,
    question03,
    question04
]
var randomizedQuestions = [];
var right = 0;
var wrong = 0;
var score = 0;
var initialPoints = 1000;
var timeAllowed = 5;
var points = initialPoints;
var correctAnswer;
var arrayOfNumbers = [];
var makeArrayLength;
var usedQuestions = 0;
var answerChoicesNum = 4;

function random(num) {
    return Math.floor(Math.random() * num);
}

function startGame() {
    $('#answerA').off('click');
    gameState = 1;
    $('#right').html("right: " + right);
    $('#wrong').html("wrong: " + wrong);
    console.log("questions: " + questions, "randomizedQuestions: " + randomizedQuestions);
    makeArrayOfNumbers(questions);
    randomizeQuestions(questions, randomizedQuestions);
    chooseQuestion2();
    console.log("questions: " + questions, "randomizedQuestions: " + randomizedQuestions);
}
function makeArrayOfNumbers(array) {
    for (var i = 0; i < array.length; i++) {
        arrayOfNumbers.push(i);
    }
    makeArrayLength = arrayOfNumbers.length;
};


function randomizeQuestions() {
    for (var j = 0; j < makeArrayLength; j++) {
        var rando = random(arrayOfNumbers.length);
        var rando2 = arrayOfNumbers[rando];
        randomizedQuestions.push(questions[rando2]);
        console.log(randomizedQuestions[3]);
        arrayOfNumbers.splice(rando, 1);
    }
}

function chooseQuestion2() {
    if (usedQuestions < makeArrayLength) {
        console.log("chooseQuestion2: " + randomizedQuestions[usedQuestions])
        gameState = 1;
        var questionIs = randomizedQuestions[usedQuestions];
        $("#question").html(questionIs.question);
        correctAnswer = questionIs.answers[0].answer;
        var randAnswers = [];
        questionIs.randomizeAnswers(randAnswers);
        usedQuestions++;
        console.log(usedQuestions);
        console.log(makeArrayLength);
        timer.start();

        $('#answerA').html(randAnswers[0].answer);
        $('#answerB').html(randAnswers[1].answer).show();
        $('#answerC').html(randAnswers[2].answer).show();
        $('#answerD').html(randAnswers[3].answer).show();

        $('#answerA').data('anSource', randAnswers[0]);
        $('#answerB').data('anSource', randAnswers[1]).show();
        $('#answerC').data('anSource', randAnswers[2]).show();
        $('#answerD').data('anSource', randAnswers[3]).show();
        $('#points').html("available points: " + points);

        detectAnswer();
    } else {
        gameState = 5;
        showResponse();
    }
}

//detects answer
function detectAnswer() {
    $('.answerChoice').on('click', function () {
        var answerId = '#' + this.id;
        if ($(answerId).data('anSource').correct === true) {
            gameState = 2;
            right++;
            score += points;
        } else {
            gameState = 3;
            wrong++;
        }
        timer.stop();
        showResponse();
    });

}

function showResponse() {
    console.log("response shown");
    console.log('gamestate: ' + gameState);


    $('.answerChoice').off('click');
    $("#scoreboard").html('score: ' + score);
    $("#right").html("right: " + right);
    $("#wrong").html("wrong: " + wrong);
    if (gameState === 2) {
        var winResponses = [
            "You're a genius.",
            "Are you cheating?",
            "Yep. That's right.",
            "Way to go!",
            "Overachiever."
        ]
        $("#question").html(winResponses[random(winResponses.length)]);
        //function for displaying points gained. animate in CSS
        setTimeout(chooseQuestion2, 1000);
    } else if (gameState === 3) {
        var loseResponses = [
            "Nope.",
            "Yeah... no.",
            "Right! ...Just kidding.",
            "That was the wrong guess.",
            "You've clearly not been studying."
        ]
        $("#question").html(loseResponses[random(loseResponses.length)] + " The answer was " + correctAnswer);
        setTimeout(chooseQuestion2, 1000);
    } else if (gameState === 4) {
        var timeResponses = [
            "Couldn't make up your mind?",
            "Cat got your tongue?",
            "Time's up!",
            "We ain't got all day..."
        ]
        $("#question").html(timeResponses[random(timeResponses.length)]);
        setTimeout(chooseQuestion2, 1000);
    } else if (gameState === 5) {
        gameOver();
        $("#question").html('You got through them all.');
    }
}

function reset() {
    right = 0;
    wrong = 0;
    arrayOfNumbers = [];
    usedQuestions = 0;
    randomizedQuestions = [];
    score = 0;
    randAnswers = [];
    $('#answerA').off('click');
    gameState = 1;
    $('#right').html("right: " + right);
    $('#wrong').html("wrong: " + wrong);
    makeArrayOfNumbers(questions);
    randomizeQuestions(questions, randomizedQuestions);
    chooseQuestion2();

}

function gameOver() {
    $('#answerB').hide();
    $('#answerC').hide();
    $('#answerD').hide();
    $('#answerA').html("Click to play again.");
    $('#answerA').on('click', function () {

        reset();
    });


}


//Timer==============================================================================================================
var interv;
var countingDown = false;
function updateScores() {
    points -= (initialPoints / timeAllowed);
    $('#points').html("available points: " + points);
    $('#timer').html(timer.time);
}

var timer = {
    time: undefined,
    start: function () {
        if (!countingDown) {
            points = initialPoints;
            timer.time = timeAllowed;
            $('#timer').html(timer.time);
            countingDown = true;
            interv = setInterval(timer.countdown, 1000);
        }
    },
    stop: function () {
        countingDown = false;
        clearInterval(interv);
    },
    countdown: function () {
        if (timer.time > 1 && countingDown === true) {
            timer.time--;
        }
        else {
            timer.time = 0;
            timer.stop();
            gameState = 4;
            showResponse();
        }
        updateScores();
    }
}

//End of timer ======================================================================================================

window.onload = function () {
    if (gameState === 0) {
        $('#answerB').hide();
        $('#answerC').hide();
        $('#answerD').hide();
        $('#answerA').on('click', startGame);
    }
}
/*

if gameState === 0 (not started), function() {set up the start screen, detect for start to load questions}
else if gameState === 1 (started, listening for choice), function() {start a timer, detect for answers, stop timer}
else if gameState === 2 (waiting response, choosing next questions), function() {give response, repopulate answers, gameState = 1}
else if gameState === 3 (finished, resetting the game)
*/