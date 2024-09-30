var idInterval;
var pause = false;

var minuteTravail = sessionStorage.getItem("tempsTravail");
var secondeTravail = sessionStorage.getItem("tempsTravailSeconde");

var minutePause = sessionStorage.getItem("tempsPause");
var secondePause = sessionStorage.getItem("tempsPauseSeconde");


if (minuteTravail == null || minutePause == null || minuteTravail == 0 || minutePause == 0) {
    minuteTravail = 25;
    minutePause = 5;
}

if (secondeTravail == null || secondePause == null || secondeTravail == 0 || secondePause == 0) {
    secondeTravail = 0;
    secondePause = 0;
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
    let travailRentreSeconde = Number(formData.get("tempsTravailSeconde"));
    let pauseRentreSeconde = Number(formData.get("tempsPauseSeconde"));
    if (Number(travailRentre) < 1) {
        alert("Vous ne pouvez pas travailler pendant moins d'une minute");
        erreur = true;
    }
    if (Number(pauseRentre) < 1) {
        alert("Vous ne pouvez pas avoir moins d'une minute de pause");
        erreur = true;
    } if (Number(travailRentreSeconde) < 0) {
        alert("Vous ne pouvez pas travailler pendant un nombre négatif de seconde (à moins de remonter dans le temps)");
        erreur = true;
    }
    if (Number(pauseRentreSeconde) < 0) {
        alert("Vous ne pouvez pas avoir une pause qui est un nombre négatif de seconde (à moins de remonter dans le temps)");
        erreur = true;
    }
    if (Number(travailRentreSeconde) > 59) {
        alert("Au delà de 59 seconde, ça fait une minute. Veuillez corriger cela");
        erreur = true;
    }
    if (Number(pauseRentreSeconde) > 59) {
        alert("Au delà de 59 seconde, ça fait une minute. Veuillez corriger cela");
        erreur = true;
    }
    if(Number(pauseRentreSeconde)%1 != 0 || Number(pauseRentre)%1 != 0 || Number(travailRentre)%1 != 0 || Number(travailRentreSeconde)%1 != 0  ){
        alert("Des valeur ne sont pas des entiers");
        erreur = true;
    }
    if (!erreur) {
        sessionStorage.setItem("tempsTravail", travailRentre);
        sessionStorage.setItem("tempsPause", pauseRentre);
        sessionStorage.setItem("tempsTravailSeconde", travailRentreSeconde);
        sessionStorage.setItem("tempsPauseSeconde", pauseRentreSeconde);
        minuteTravail = sessionStorage.getItem("tempsTravail");
        minutePause = sessionStorage.getItem("tempsPause");
        secondeTravail = sessionStorage.getItem("tempsTravailSeconde");
        secondePause = sessionStorage.getItem("tempsPauseSconde");
        location.reload();
    }

}