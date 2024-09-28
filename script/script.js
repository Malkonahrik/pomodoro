var idInterval;
var pause = false;

var minuteTravail = 0;
var secondeTravail = 2;

var minutePause = 0;
var secondePause = 2;

var minute = minuteTravail;
var seconde = secondeTravail;



const timer = document.getElementById("timer");
const body = document.body;
const cercle = document.getElementById("cercle");
const etat = document.getElementById("etat");
const indicateurTravail = document.getElementById("travail");
const indicateurPause = document.getElementById("pause");
const cercleParam = document.getElementById("cercleParam");
const cercleStart = document.getElementById("cercleStart");
const modal = document.getElementById("modal1");


actualiseTimer();

function passageTemps() {
    const bouton = document.getElementById("btn");
    if (idInterval == null) {
        idInterval = setInterval(decrementeSeconde, 1000);
    } else {
        stop();
    }
}

function decrementeSeconde() {
    if (seconde == 0) {
        seconde = 59;
        decrementeMinute();
    } else {
        seconde--;
    }
    actualiseTimer()
}

function decrementeMinute() {
    if (minute == 0) {
        passagePause();
    } else {
        minute--;
    }
    actualiseTimer()
}

function passagePause() {
    if (pause) {
        minute = minuteTravail;
        seconde = secondeTravail;
        body.style.backgroundColor = "#8B0000";
        cercle.style.backgroundColor = "#D9544D";
        cercleParam.style.backgroundColor = "#D9544D";
        cercleStart.style.backgroundColor = "#D9544D";
        etat.style.backgroundColor = "#D9544D";
        indicateurTravail.style.fontWeight = "bold";
        indicateurPause.style.fontWeight = "normal";
        pause = false;
    } else {
        minute = minutePause;
        seconde = secondePause;
        body.style.backgroundColor = "#006400";
        cercle.style.backgroundColor = "#91c481";
        cercleParam.style.backgroundColor = "#91c481";
        cercleStart.style.backgroundColor = "#91c481";
        etat.style.backgroundColor = "#91c481";
        indicateurTravail.style.fontWeight = "normal";
        indicateurPause.style.fontWeight = "bold";
        pause = true;
    }
    actualiseTimer()
}

function stop() {
    clearInterval(idInterval);
    idInterval = null;
    minute = minuteTravail;
    seconde = secondeTravail;
    body.style.backgroundColor = "#8B0000";
    cercle.style.backgroundColor = "#D9544D";
    cercleParam.style.backgroundColor = "#D9544D";
    cercleStart.style.backgroundColor = "#D9544D";
    etat.style.backgroundColor = "#D9544D";
    indicateurTravail.style.fontWeight = "bold";
    indicateurPause.style.fontWeight = "normal";
    pause = false;
    actualiseTimer();
}

function actualiseTimer() {
    let partieMinute = "";
    let partieSeconde = "";
    if (minute < 10) {
        partieMinute = "0";
    }
    partieMinute += minute.toString();
    if (seconde < 10) {
        partieSeconde = "0";
    }
    partieSeconde += seconde.toString();
    timer.innerText = partieMinute + " : " + partieSeconde;
}

function ouvrir() {
    modal.classList.add("is-visible");
}

// When the user clicks on <span> (x), close the modal
function fermer() {
    modal.classList.remove("is-visible");
}