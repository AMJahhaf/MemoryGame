/* @description global variables */
let cards = ['b', 'b', '8', '8' , 'n', 'n', 'w', 'w', 'k', 'k', 'd', 'd', 'l', 'l', '2', '2'];
challange=[];
wrongGusses=0;
cardsMatched = 0;
shuffledCards= [];
$mainBoard= $(".mainBoard"); 
idList=[]; 
second = 0;
clicks=0;
$clicks= $(".clicks");
$score = $(".score");
$timer=$(".timer")
/* Global vatiables for timer */
var secondsLabel = document.getElementById("seconds");
var minutesLabel = document.getElementById("minutes");
var totalMills = 0;
var totalSeconds = 0;
var totalMinutes = 0;
var totalHours = 0;
var startHours = 0;
var startMinutes = 0;
var startSeconds = 0;
var startMills = 0;
var counter = 0;
var timerOn = 0;
var htmlResets = 0;
var dateGrab = 0;
var timerPaused = 0;
var dateStart = 0;
var datePaused = 0;



/* @description sweetalert popup. TODO: Beside congrats,  it shows some statistcs*/
function winMassage(numStars) {
    swal({
        allowEscapeKey: false,
        allowOutsideClick: false,
        title: 'Congratulations! You Won!',
        text: "your wrong gusses = " + wrongGusses + " and your stars = " + numStars +" &#9733; and you spent "+totalSeconds + "sec and " + totalMinutes+ "min" ,
        type: 'success',
        confirmButtonColor: '#02ccba',
        confirmButtonText: 'Play again!'
    }).then(function (isConfirm) {
        if (isConfirm) {
            location.reload();
        }
    })
}

/* @description  scoring counter according to the wrongGusses vs array.length*/
function score(){
    var stars= 3;
    if(wrongGusses<(cards.length/2.0)){
        $score.html("<p>&#9733; &#9733; &#9733;</p>");
        $score.css("color","red")
        stars= 3;
        }
    else if (wrongGusses > (cards.length / 2.0) && wrongGusses< (cards.length)){
        $score.html('<p>&#9733; &#9733;</p>'); 
        $score.css("color", "orange")
        stars = 2;        
    } else if  (wrongGusses >= (cards.length)) {
        $score.html('<p>&#9733;</p >');
        $score.css("color", "yellow")
        stars = 1;
        } 
        return stars; 
};


    
/*TODO: to reset the game by reload allover again*/
function resetGame(){
    location.reload();
};


/*@description stander shuffling algorithm by Fisher-Yates*/
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) { 
        j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}; 

/* start the game and timer */
function DoPlay(){
    var x= confirm("do you wanna start the game?");
    if (x) {
    new_board();
    // timerstart
} else{
    return; 
}};

/*TODO: shuffle, construct DOM obj lines with a unique IDs (incomplete)*/
function new_board(){ 
    startTimer();
    var shuffledCards= shuffle(cards); 
    for (var i = 0; i < shuffledCards.length; i++) {
    $(".mainBoard").append($('<li id="card_' + i + '" class="card" onclick="memoryFlipcard(this,\'' + shuffledCards[i] +'\')"</li>'));
    } 
}


/*TODO: apply the game logic*/
function memoryFlipcard(card, val) {
    /* TODO: check the defult values of innerHTML and challange[] to prevent conflict
        @return complete the html
                count clicks++ */

        if (card.innerHTML == "" && challange.length < 2) {    
        card.innerHTML = val;
        clicks++;
        $clicks.html(clicks);
        /*TODO: check if 1st card out of challaneg[] & push value to challange[]& push card.ID to ID[] */
        if (challange.length == 0) {
            challange.push(val);
            idList.push(card.id);
        /*TODO: check if 2nd card out of challaneg[] & push value to challange[]& push card.ID to ID[] */
        } else if (challange.length == 1) {
            // console.log("pass if 2nd card")
            challange.push(val);
            idList.push(card.id);
            /*TODO: check if challaneg[] elems are matched & start count cardsMatched */
            if (challange[0] == challange[1]) { // this is matcher 
                cardsMatched +=2;                 
                challange = [];
                idList = []; 
                /*TODO: check if total matches are complete to show popup and reset the game   */
                if (cardsMatched == cards.length) {
                    stopTimer();
                    var returnOfscoring= score();
                    setTimeout(function () {
                        winMassage(returnOfscoring);
                    }, 500);
                    
                } 
            /* TODO: if not matched, clear the innerHTML, challange[], ID[] for reuse & count wrongGusess */
            } else { 
                    function clearHTML() {
                        var card1 = document.getElementById(idList[0]);
                        var card2 = document.getElementById(idList[1]);
                        card1.innerHTML = "";
                        card2.innerHTML = "";
                        challange = [];
                        idList = [];
                        wrongGusses += 1; 
                        score(wrongGusses);
                    }
               setTimeout(clearHTML, 300)
            }
        }
    }
}
/* all credit goes to zen00 from http://www.overclock.net forum */
/* starts and pauses the timer if conditions are met */
function startTimer() {
    if (timerOn == 1) {
        return;
    }
    else if (timerOn == 0 & timerPaused == 0) {
        /* setup the initial clock and read the time */
        dateStart = new Date();

        startMinutes = dateStart.getMinutes();
        startSeconds = dateStart.getSeconds();


        counter = setInterval(setTime, 10);
        timerOn = 1;
        htmlResets = 0;
    }
    else if (timerOn == 0 & timerPaused == 1) {
        /* resets the start date while making time corrections to prevent lose of place */
        dateStart = new Date();

        startMinutes = dateStart.getMinutes() - totalMinutes;
        startSeconds = dateStart.getSeconds() - totalSeconds;
        dateStart.setHours((dateStart.getHours() - startHours), (dateStart.getMinutes() - startMinutes), (dateStart.getSeconds() - startSeconds), (dateStart.getMilliseconds() - startMills));
        counter = setInterval(setTime, 10);
        timerOn = 1;
        htmlResets = 0;
    }
}
function stopTimer() {
    if (timerOn == 1) {
        clearInterval(counter);
        timerOn = 0;
        timerPaused = 1;
    }

    if (htmlResets == 1) {
        minutesLabel.innerHTML = "00";
        secondsLabel.innerHTML = "00";
        totalSeconds = 0;
        totalMinutes = 0;
    }
    else {
        htmlResets = 1;
    }
}

function setTime() {
    /* setup the new clock , read the time, compare it to the start time, assign variables */
    dateGrab = new Date();
    dateGrab.setHours((dateGrab.getHours() - startHours), (dateGrab.getMinutes() - startMinutes), (dateGrab.getSeconds() - startSeconds), (dateGrab.getMilliseconds() - startMills));// this will take thw current local time and reset it to zero

    totalHours = dateGrab.getHours();
    totalMinutes = dateGrab.getMinutes();
    totalSeconds = dateGrab.getSeconds();
    totalMills = dateGrab.getMilliseconds();

    /* rolls over and resets the timer if left running too long */
    if (totalHours == 99 & totalMinutes == 59 & totalSeconds == 59) {
        totalHours = 0;
        totalMinutes = 0;
        totalSeconds = 0;
        totalMills = 0;
        hoursLabel.innerHTML = "00";
        minutesLabel.innerHTML = "00";
        secondsLabel.innerHTML = "00";
        clearInterval(counter);
        timerOn = 0;
    }

    /* format and display variables */
    secondsLabel.innerHTML = pad(totalSeconds);
    minutesLabel.innerHTML = pad(totalMinutes);
}

/* formats the variables by adding leading "0"s and converting to strings for display */
function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    }
    else {
        return valString;
    }
}

DoPlay();

