var idInterval;
var pause = false;
var seconde = 59;
var minute = 25;

function passageTemps(){
    idInterval = setInterval(decrementeSeconde(), 1000);
}

function decrementeSeconde() {
    if (seconde == 0) {
        seconde = 59;
        decrementeMinute();
    } else {
        seconde--;
    }
}

function decrementeMinute() {
    if(minute == 0){
        passagePause();
    } else {
        minute--;
    }
}

function passagePause(){
    if (pause) {
        minute = 25;
    } else {
        minute = 5;
    }
}

function stop(){
    clearInterval(idInterval);
}