var idInterval;
var pause = false;

var minuteTravail = sessionStorage.getItem("tempsTravail");
var secondeTravail = 0;

var minutePause = sessionStorage.getItem("tempsPause");;
var secondePause = 0;


if (minuteTravail == null || minutePause == null || minuteTravail == 0 || minutePause == 0) {
    minuteTravail = 25;
    minutePause = 5;
}
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
const bouton = document.getElementById("btn");
console.log(bouton);

actualiseTimer();

function passageTemps() {
    bouton.classList.remove("fa-play");
    bouton.classList.add("fa-stop");
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
    bouton.classList.remove("fa-stop");
    bouton.classList.add("fa-play");
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

function fermer() {
    modal.classList.remove("is-visible");
}

function sauvegarde() {
    const form = document.getElementById("formulaire");
    const formData = new FormData(form);
    let erreur = false;
    let travailRentre = Number(formData.get("tempsTravail"));
    let pauseRentre = Number(formData.get("tempsPause"));
    if (Number(travailRentre) < 5) {
        alert("Vous dever travailler plus de 5 minutes");
        erreur = true;
    }
    if (Number(pauseRentre) < 2) {
        alert("Vous dever avoir une pause de plus de 2 minutes");
        erreur = true;
    } if (Number(travailRentre) > 120) {
        alert("Vous dever travailler moins de 120 minutes");
        erreur = true;
    }
    if (Number(pauseRentre) > 60) {
        alert("Vous dever avoir une pause de plus de 60 minutes");
        erreur = true;
    }
    if (!erreur) {
        sessionStorage.setItem("tempsTravail", travailRentre);
        sessionStorage.setItem("tempsPause", pauseRentre);
        minuteTravail = sessionStorage.getItem("tempsTravail");
        minutePause = sessionStorage.getItem("tempsPause");;
        location.reload();
    }

}