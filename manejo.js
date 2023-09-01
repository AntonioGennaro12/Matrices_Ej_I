const miTablero     = document.querySelector("#mi-tablero");
const misCasillas   = document.querySelectorAll(".casilla");
const misFiguras    = document.querySelectorAll(".figura");
const misFiguras2   = document.querySelectorAll(".figura2");
//const contFiguras   = document.querySelector(".figura");

const IMG_PIC_FAIL = "pic_fail.jpg";

const symbLib     = [ "💎", "🍀", "🔔", "🎰", "🌟", "💰", "🕰️", "📀",
                      "🍊", "🍒", "🍋", "🍇", "🍉", "🍓", "🍎", "🍍",
                      "🍄", "🎲", "🌈", "🎁",  "🎩","📯", "🎸", "🎹",
                      "⚽", "🏈", "🏉", "🥎", "🏀", "🏐", "🎾", "🎱" ];

const ANCHO_TABLERO = 4;
const ALTO_TABLERO  = 6;
const THINK_TIME    = 2000;

let memoInterval = 0 ;  
let nroDePares     = (ANCHO_TABLERO * ALTO_TABLERO)/2;
let nroFiguras     = misFiguras.length;
let quedanFiguras  = nroFiguras;
let muestraFigura  = false;
let index1, index2 = 0
let setDeFiguras   = [];

let picFail = false;
let failPos = 0;


initAll();

function initAll () {
    // limpia bien todas las casillas ocultas. 
    for (let i=0; i< nroFiguras; i++) {
        misFiguras[i].textContent = "";
        misFiguras2[i].textContent = "";
        misFiguras2[i].style.display = "none";
    }
    // selecciona las figuras (= nroDePares) necesarias al azar. 
    let anyFig; 
    let anyPos;
    let found;
    setDeFiguras.length = 0; // limpia vector de figuras a cargar
    for (let i=0; i<nroDePares;i++) {
        do {
            anyFig = symbLib [Math.floor(Math.random()*symbLib.length)];
            setDeFiguras[i] = anyFig;
            found = false;
            for (let n=0; n < i; n++) {
                if (setDeFiguras[n] == anyFig) {
                    found = true;
                }
            }
        } while (found);
    }
    console.log(setDeFiguras);
    // Ahora las ubica aleatoraimente de a pares en las casillas
    for (let i=0; i<nroDePares;i++) {
        do {
            anyPos = [Math.floor(Math.random()*nroFiguras)];
            found = false;
            if (misFiguras[anyPos].textContent != "") {
                found = true;
            }
        } while (found);
        misFiguras[anyPos].textContent = setDeFiguras [i]; // Carga la figura en la pra casilla
        // vamos por la segunda
        do {
            anyPos = [Math.floor(Math.random()*nroFiguras)];
            found = false;
            if (misFiguras[anyPos].textContent != "") {
                found = true;
            }
        } while (found);
        misFiguras[anyPos].textContent = setDeFiguras [i]; // Carga la misma figura en la 2da casilla
    } 
    //// ELIMINAR
    console.log(misFiguras[0].textContent, misFiguras[1].textContent, misFiguras[2].textContent, misFiguras[3].textContent);
    console.log(misFiguras[4].textContent, misFiguras[5].textContent, misFiguras[6].textContent, misFiguras[7].textContent);
    console.log(misFiguras[8].textContent, misFiguras[9].textContent, misFiguras[10].textContent, misFiguras[11].textContent);
    console.log(misFiguras[12].textContent, misFiguras[13].textContent, misFiguras[14].textContent, misFiguras[15].textContent);
    console.log(misFiguras[16].textContent, misFiguras[17].textContent, misFiguras[18].textContent, misFiguras[19].textContent);
    console.log(misFiguras[20].textContent, misFiguras[21].textContent, misFiguras[22].textContent, misFiguras[23].textContent);
    //////////
    quedanFiguras = nroFiguras;
    muestraFigura = false;
    for (i=0;i<nroFiguras;i++){
        misFiguras[i].style.display = "none";
        misFiguras[i].style.backgroundColor = "antiquewhite";  
    }
    memoInterval    = setInterval(showInicial, 250); 
}

function showInicial () {
    if(quedanFiguras > 0) {
        if (!muestraFigura) {
            muestraFigura = true;
            for (i=0;i<nroFiguras;i++){
                misFiguras[i].style.display = "block";
                if (i%2) { misFiguras[i].style.backgroundColor = "lightgreen"; }
                else { misFiguras[i].style.backgroundColor = "yellow"; }                  
            }
        }
        else {
            muestraFigura = false;
            for (i=0;i<nroFiguras;i++){
                misFiguras[i].style.display = "none";
            }
        }
        quedanFiguras--;
    }
    else{ 
        stopTimer();
        quedanFiguras = nroFiguras;
        muestraFigura = false;
        for (i=0;i<nroFiguras;i++){
            misFiguras[i].style.display = "none";
            misFiguras[i].style.backgroundColor = "antiquewhite";  
        }
        memoInterval    = setInterval(memoTest, THINK_TIME); 
    } 
}

function getDosRandom(max) {
    let num1 = Math.floor(Math.random() * max);
    let num2;
    do {
      num2 = Math.floor(Math.random() * max);
    } while (num2 === num1);
    return [num1, num2];
}

/**
 * Obtiene una posisión que tiene figura 
 * @param {Number} max 
 * @returns numero
 */
function getRandPresent (max) {
    let num;
    do {
      num = Math.floor(Math.random() * max);
    } while (misFiguras[num].textContent == "");
    return (num);
}

/**
 * Juego de la memoria
 */    
function memoTest () {
    if (picFail = true) {
            picFail = false;
            misFiguras2[failPos].style.backgroundColor = "transparent";
            misFiguras2[failPos].style.display = "none";
    }
    if (!muestraFigura) {
        muestraFigura = true;
        index1 = getRandPresent(nroFiguras);
        misFiguras[index1].style.display = "block";
    }
    else {
        muestraFigura = false;
        misFiguras[index1].style.display = "none";
    }
}

function memoGanaste() {
    if (--quedanFiguras >= 0) {
        for (index2= 0; index2 < misFiguras.length;index2++) {
            if (quedanFiguras%2) { 
                misFiguras2[index2].textContent = "💰";
                misFiguras2[index2].style.backgroundColor = "red";
            }
            else {
                misFiguras2[index2].textContent = "💎";
                misFiguras2[index2].style.backgroundColor = "gold";
            }
        }
    }
    else {
        stopTimer();
        setTimeout(initAll,2000);
    }
}   
/**
 * Detiene el Intervalo del Temporizador
 */
function stopTimer () {
    clearInterval(memoInterval);
} 

function picBox(pos) {
    console.log("entró: "+pos);
    if (pos != index1){
        if (misFiguras[pos].textContent == misFiguras[index1].textContent) {
            console.log("acertaste: "+misFiguras[pos].textContent);
            ///////// ENCONTRADO
            misFiguras[pos].style.display = "none";
            misFiguras[index1].style.display = "none";
            misFiguras2[pos].style.backgroundColor = "brown";
            misFiguras2[pos].style.display = "block";
            misFiguras2[index1].style.backgroundColor = "brown";
            misFiguras2[index1].style.display = "block";
            misFiguras2[pos].textContent = misFiguras[pos].textContent;
            misFiguras2[index1].textContent = misFiguras[index1].textContent;
            misFiguras[pos].textContent = "";
            misFiguras[index1].textContent = "";
            ///////
            quedanFiguras -=2;
            if (quedanFiguras <= 0) {
                stopTimer();
                console.log ("FIN!!!");
                for (index2= 0; index2 < nroFiguras;index2++) {
                    misFiguras2[index2].textContent = "";
                    //misFiguras2[index2].style.display = "block";
                }
                for (index2= 0; index2 < nroFiguras;index2++) {
                    misFiguras2[index2].textContent = "💎";
                    //misFiguras[index2].style.display = "block";
                }
                memoInterval  = setInterval(memoGanaste, 250);  
                quedanFiguras = misFiguras.length;
            }
        }
        else { // le pifió muestro un background 
            failPos = pos;
            picFail = true;
            misFiguras2[failPos].style.display = "block";
            misFiguras2[failPos].style.backgroundSize = "cover"; 
            misFiguras2[failPos].style.backgroundPosition = "center center";
            misFiguras2[failPos].style.backgroundImage = "url('"+IMG_PIC_FAIL+"')";
        }

    } 
}
