var idInterval;
var pause = false;
var seconde = 0;
var minute = 25;
const timer = document.getElementById("timer");
actualiseTimer();


function passageTemps() {
    idInterval = setInterval(decrementeSeconde(), 1000);
    console.log(idInterval);
}

function decrementeSeconde() {
    console.log("test");
    if (seconde == 0) {
        seconde = 59;
        decrementeMinute();
    } else {
        seconde--;
    }
    actualiseTimer()
}

function decrementeMinute() {
    console.log("test");
    if (minute == 0) {
        passagePause();
    } else {
        minute--;
    }
    actualiseTimer()
}

function passagePause() {
    if (pause) {
        minute = 25;
    } else {
        minute = 5;
    }
    actualiseTimer()
}

function stop() {
    clearInterval(idInterval);
    console.log("clear");
}

function actualiseTimer(){
    console.log("test");
    let partieMinute = "";
    let partieSeconde = "";
    if(minute < 10){
        partieMinute = "0";
    }
    partieMinute += minute.toString();
    if(seconde < 10){
        partieSeconde = "0";
    }
    partieSeconde += seconde.toString();
    timer.innerText = partieMinute + " : " + partieSeconde;
    console.log("test");
}