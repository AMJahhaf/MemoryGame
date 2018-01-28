/* @description global variables */
let cards = ['b', 'b', '8', '8', 'n', 'n', 'w', 'w', 'k', 'k', 'd', 'd', 'l', 'l', '2', '2'];
challange=[];
wrongGusses=0;
cardsMatched = 0;
shuffledCards= [];
$mainBoard= $(".mainBoard"); 
idList=[]; 
sec = 0;
clicks=0;
$clicks= $(".clicks");
$score = $(".score");


/* @description sweetalert popup. TODO: Beside congrats,  it shows some statistcs*/
function winMassage(returnOfscoring) {
    swal({
        allowEscapeKey: false,
        allowOutsideClick: false,
        title: 'Congratulations! You Won!',
        text: "your wrong gusses = " + wrongGusses + " and your stars = " + returnOfscoring +" &#9733; and you spent "+sec + " seconds",
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
    var stars=3;
    if(wrongGusses<(cards.length/2.0)){
        $score.html("<p>&#9733; &#9733; &#9733;</p>");
        $score.css("color","red")
        stars=3;
    }
    else if (wrongGusses > (cards.length / 2.0) && wrongGusses< (cards.length)){
        $score.html('<p>&#9733; &#9733;</p>'); 
        $score.css("color", "orange")
        stars=2;
    } else if  (wrongGusses > (cards.length)) {
        $score.html('<p>&#9733;</p >');
        $score.css("color", "yellow")
        stars=1;
    }
    return stars;
};  
    
/*TODO: to reset the game by reload allover again*/
function resetGame(){
    location.reload();
};

    
/*@description countup timer from Stackover*/
function pad(val) { return val > 9 ? val : "0" + val; }
setInterval(function () {
    $("#seconds").html(pad(++sec % 60));
    $("#minutes").html(pad(parseInt(sec / 60, 10)));
}, 1000);

/*@description stander shuffling algorithm by Fisher-Yates*/
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) { 
        j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}; 

/*TODO: shuffle, construct DOM obj lines with a unique IDs (incomplete)*/
function new_board(){ 
    var shuffledCards= shuffle(cards); 
    for (var i = 0; i < shuffledCards.length; i++) {
        //var $mainBoard = 
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

 
new_board();
