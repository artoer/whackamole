/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/

//Arthur Menken
//500813448
//Klas Fuchsia
//22 maart 2019

//Slaat alle hol afbeeldingen in het document op in een array
var holArray = document.querySelectorAll('.hol');

//Slaat de filename als string voor geraakte mollen op in een array
var hitArray = ['hit1.png', 'hit2.png', 'hit3.png'];

//Variabele waarin de willekeurige geselecteerde filename van hitArray als string in wordt opgeslagen
var hitImg;

//Variabelen waarin in een getal wordt opgeslagen, die vervolgens worden gebruikt om een item in de array op te roepen
var hitRnd;
var molRnd;

//Variabelen van de tellers
var score;
var rounds;


//Maakt een telling van het aantal mollen dat verschenen zijn
function countUp() {
    rounds = rounds + 1;
    roundCheck();
    molesLeft();
}

//Checkt of alle 20 mollen verschenen zijn, zo ja, voert dan de Game Over timer uit
function roundCheck() {
    console.log(rounds);

    if (rounds == 20) {
        gameOverTimer();
    }
}

//Timer voor het game over scherm verschijnt
function gameOverTimer() {
    setTimeout(gameOver, 3500);
}

//Laat de "Game Over" tekst na 4 seconden verschijnen als er 20 mollen (het maximale aantal) verschenen zijn, zorgt ervoor dat de speler weer een nieuw spel kan beginnen door de event weer toe te voegen
function gameOver() {

    document.querySelector('h3').innerHTML = 'GAME OVER';
    document.querySelector('h4').innerHTML = 'Press any key to try again';
    document.body.addEventListener("keypress", start);

}

//Telt het aantal mollen dat de gebruiker nog kan verwachten en laat dat zien
function molesLeft() {

    if (rounds < 19) {
        document.querySelector('h5').innerHTML = 'There are ' + (20 - rounds) + ' moles left';
    } else if (rounds == 19) {
        document.querySelector('h5').innerHTML = 'There is 1 mole left';
    } else {
        document.querySelector('h5').innerHTML = 'There are no moles left';
    }

}


//Loop die ervoor zorgt dat de code 20 keer uitgevoerd wordt om de 2,4 seconden, er komen dus in totaal 20 mollen tevoorschijn, ook wordt de functie aangeroepen die het aantal mollen telt
//BRON: https://stackoverflow.com/a/17686722 (Omdat ik niet wist hoe ik een vertraging in een for loop kon maken)
//Wat ik ervan begrijp: de loop voert meteen alles 20x uit op het moment dat hij aangeroepen wordt, maar wat de loop uitvoert wordt vertraagd, daarom moet i ook vermenigvuldigd worden met de timeout anders wordt alles tegelijkertijd uitgevoerd na 2,4 seconden
function loop() {
    var i;
    for (i = 1; i <= 20; i++) {
        setTimeout(molCalc, i * 2400);
        setTimeout(countUp, i * 2400);

    }
}

//Begint de loop, geeft wat feedback en zorgt ervoor dat een toetsaanslag de functie niet nogmaals kan aanroepen, verwijdert de "Game Over" tekst als die aanwezig is, maakt de telling weer 0 zodat de telling weer werkt als de speler nog een keer start
function start() {
    document.querySelector('h1').innerHTML = 'WHACK A MOLE!';
    document.querySelector('h3').innerHTML = ' ';
    document.querySelector('h4').innerHTML = ' ';
    document.body.removeEventListener("keypress", start);

    rounds = 0;
    score = 0;
    setScore();
    molesLeft();

    loop();

}

//Selecteert willekeurig een hol uit de array en zet daar een mol neer, zorgt ervoor dat op de mol geklikt kan worden om de hit-functie uit te voeren
function molCalc() {

    molRnd = Math.floor(holArray.length * Math.random());
    holArray[molRnd].addEventListener("click", hit);
    holArray[molRnd].src = './images/mole.png';
    molClrTime();

}

//Feedback en scoretelling wanneer een mol geraakt wordt, EventListener wordt weggehaald om te voorkomen dat een mol meerdere keren geklikt kan worden
function hit() {
    score = score + 500;
    feedback();
    holArray[molRnd].src = './images/' + hitImg;
    holArray[molRnd].removeEventListener("click", hit);
    setScore();
}

//Berekent welke van de drie afbeeldingen van geraakte mollen gebruikt wordt in de functie hit
function feedback() {

    hitRnd = Math.floor(hitArray.length * Math.random());
    hitImg = hitArray[hitRnd];

}

//Functie die de functie de mol weghaalt met 1.2s vertraagt
function molClrTime() {
    setTimeout(molClear, 1200);

}

//Functie die de mol weghaalt en zorgt dat er niet meer op de mol geklikt kan worden
function molClear() {

    holArray[molRnd].removeEventListener("click", hit);
    holArray[molRnd].src = './images/hole.png';

}

//Functie geeft verschillende feedback op basis van de score
function highscore() {


    //        5/20 mollen geraakt
    if (score == 2500) {
        document.querySelector('h1').innerHTML = 'You whacked a few moles, keep it up!';

        //        10/20 mollen geraakt
    } else if (score == 5000) {
        document.querySelector('h1').innerHTML = 'Not bad! You whacked half of the moles!';

        //        20/20 mollen geraakt
    } else if (score == 10000) {
        document.querySelector('h1').innerHTML = 'TOP GUN! You whacked all moles!';
    }

}


//Laat de scoreteller zien
function setScore() {
    document.querySelector('h2').innerHTML = 'SCORE: ' + score;
    highscore();

}

//Begint het spel wanneer er een toetsaanslag gemaakt wordt.
document.body.addEventListener("keypress", start);
