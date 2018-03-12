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
var question05 = new Question(
    "What is the state bird of Wyoming?",
    "Western Meadowlark",
    "Brewer's Blackbird",
    "American Goldfinch",
    "Wyoming doesn't have a state bird."
)
var question06 = new Question(
    "Which of the following would Rick Astley - not - never do?",
    "Eat you alive",
    "Give you up",
    "Let you down",
    "Run around and desert you"
)
var question07 = new Question(
    "Who was the first person to travel into space?",
    "Jesus",
    "John Glenn",
    "Yuri Gagarin",
    "Amelia Earhart"
)
var question08 = new Question(
    "How many jQueries are in a JSON DOM API element before concatenation?",
    "Hogwash!",
    "5d",
    "Several more than are in 2 asynchronous HTMLs over CDN",
    "2000"
)
var question09 = new Question(
    "Chuck Taylor was:",
    "a shoe salesman",
    "a famous basketball player",
    "the owner of 13 McDonald's franchises",
    "Richard Nixon's grand-nephew"
)
var question10 = new Question(
    "What percentage of humans have prehensile tails?",
    "0 %",
    "50 %",
    "35 %",
    "2 %"
)
// 0: not started; 1: started; 2: correct and awaiting feedback; 3:incorrect, awaiting feedback; 4: timed out; 5: finished.
var gameState = 0;
//array of question objects:
var questions = [
    question01,
    question02,
    question03,
    question04,
    question05,
    question06,
    question07,
    question08,
    question09,
    question10
]
var randomizedQuestions = [];
var right = 0;
var wrong = 0;
var score = 0;
var initialPoints = 1000;
var timeAllowed = 10;
var points = initialPoints;
var correctAnswer;
var arrayOfNumbers = [];
var makeArrayLength = questions.length;
var usedQuestions = 0;
var answerChoicesNum = 4;
var bac = 0;

function random(num) {
    return Math.floor(Math.random() * num);
}

function startGame() {
    $('#answerA').off('click');
    gameState = 1;
    $('#right').html("Right: <span class='writ'>" + right + '</span>');
    $('#wrong').html("Wrong: <span class='writ'>" + wrong + '</span>');
    makeArrayOfNumbers(questions);
    randomizeQuestions(questions, randomizedQuestions);
    chooseQuestion2();
}
function makeArrayOfNumbers(array) {
    for (var i = 0; i < array.length; i++) {
        arrayOfNumbers.push(i);
    }
};

function randomizeQuestions() {
    for (var j = 0; j < makeArrayLength; j++) {
        var rando = random(arrayOfNumbers.length);
        var rando2 = arrayOfNumbers[rando];
        randomizedQuestions.push(questions[rando2]);
        arrayOfNumbers.splice(rando, 1);
    }
}

function chooseQuestion2() {
    if (usedQuestions < makeArrayLength) {
        gameState = 1;
        var questionIs = randomizedQuestions[usedQuestions];
        $("#question").html(questionIs.question);
        correctAnswer = questionIs.answers[0].answer;
        var randAnswers = [];
        questionIs.randomizeAnswers(randAnswers);
        usedQuestions++;
        timer.start();

        $('#answerA').html(randAnswers[0].answer);
        $('#answerB').html(randAnswers[1].answer).show();
        $('#answerC').html(randAnswers[2].answer).show();
        $('#answerD').html(randAnswers[3].answer).show();

        $('#answerA').data('anSource', randAnswers[0]);
        $('#answerB').data('anSource', randAnswers[1]).show();
        $('#answerC').data('anSource', randAnswers[2]).show();
        $('#answerD').data('anSource', randAnswers[3]).show();
        $('#points').html(points);

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


    $('.answerChoice').off('click');
    $("#scoreboard").html('Score: <span class="writ">' + score + '</span>');
    $("#right").html("Right: <span class='writ'>" + right + '</span>');
    $("#wrong").html("Wrong: <span class='writ'>" + wrong + '</span>');
    if (gameState === 2) {
        var winResponses = [
            "You're a genius.",
            "Are you cheating!?",
            "Yep. That's right.",
            "Way to go!",
            "Overachiever."
        ]
        $("#question").html(winResponses[random(winResponses.length)]);
        var ding = new Audio('./assets/sounds/bell.mp3');
        setTimeout(function(){ding.play()}, 200);
        //function for displaying points gained. animate in CSS
        setTimeout(chooseQuestion2, 2200);
    } else if (gameState === 3) {
        var loseResponses = [
            "Nope.",
            "Yeah... no.",
            "Right! ...Just kidding.",
            "That was the wrong guess.",
            "You've clearly not been studying."
        ]
        $("#question").html(loseResponses[random(loseResponses.length)] + " The answer was &quot;" + correctAnswer + "&quot;");
        takeShot();
        setTimeout(chooseQuestion2, 2200);
    } else if (gameState === 4) {
        var timeResponses = [
            "Couldn't make up your mind?",
            "Cat got your tongue?",
            "Time's up!",
            "We ain't got all day..."
        ]
        $("#question").html(timeResponses[random(timeResponses.length)]);
        takeShot();
        setTimeout(chooseQuestion2, 2200);
    } else if (gameState === 5) {
        gameOver();
        if (bac <= 0) {
            $("#question").html("Congratulations! You're driving!");
        } else if (bac > 0 && bac < 4) {
            $("#question").html("Good job. Don't fall off the barstool there, buddy.");

        } else if (bac >= 4) {
            $("#question").html('Go sober up!')
                .css('filter', 'blur(0px)')
                .css('font-size', '5vw');


        }
    }
}

//empty shot glass, get buzzed======================================
function takeShot() {
    var thud = new Audio('./assets/sounds/glasssetdown.mp3');
    var gulp = new Audio('./assets/sounds/gulp.mp3');
    setTimeout(function(){gulp.play()}, 250);
    setTimeout(function(){thud.play()}, 450);
    var i = usedQuestions - 1;
    var glass = $("#glass" + i);
    var blur = bac + 1;
    bac = blur;
    glass.attr('src', 'assets/images/shotempty.png');
    $('#pageContainer').css('filter', "blur(" + blur + 'px)');
}


//==================================================================

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
    $("#scoreboard").html('Score: <span class="writ">' + score + '</span>');
    $('#right').html("Right: <span class='writ'>" + right + '</span>');
    $('#wrong').html("Wrong: <span class='writ'>" + wrong + '</span>');
    makeArrayOfNumbers(questions);
    randomizeQuestions(questions, randomizedQuestions);
    for (var i = 0; i < makeArrayLength; i++) {
        $("#glass" + i).remove();
    }
    $("#question")
        .css('filter', 'none')
        .css('font-size', '2vw');


    stackem();
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

//putting up shot glasses=================================================================\
function stackem() {
    var x = 200;
    var width = 4;
    for (var i = 0; i < makeArrayLength; i++) {
        var glass = $("<img id='glass" + i + "'>").attr('src', 'assets/images/shotfull.png');
        glass.css('position', 'relative')
            .css('width', width + 'vw')
            .css('height', width * 1.3 + 'vw')
            .css('left', ((5 + i / 2) * width) + '%')
            .css('bottom', '13vw');
        $('#pageContainer').append(glass);
    }
}

//Timer==============================================================================================================
var interv;
var countingDown = false;
function updateScores() {
    points -= (initialPoints / timeAllowed);
    $('#points').html(points);
    $('#timer').html(timer.time);
    //and sober up:
    if (bac > 0) {
        bac -= 0.1;
    } else {
        bac = 0;
    }
    var blur = bac;
    $('#pageContainer').css('filter', "blur(" + blur + 'px)');
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
            wrong++;
            gameState = 4;
            showResponse();
        }
        updateScores();
    }
}

//End of timer ======================================================================================================

window.onload = function () {
    $('#points').html(initialPoints);
    $('#timer').html(timeAllowed);
    $('#right').html("Right: <span class='writ'>" + right + '</span>');
    $('#wrong').html("Wrong: <span class='writ'>" + wrong + '</span>');
    $("#scoreboard").html('Score: <span class="writ">' + score + '</span>');
    stackem();
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