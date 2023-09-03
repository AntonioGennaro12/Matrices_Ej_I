// Configuración 
const juegoMemoria  = document.querySelector("#juego-memoria");
const misFilas      = document.querySelector("#filas");
const misColumnas   = document.querySelector("#columnas"); 
const botonJugar    = document.querySelector("#bot-jugar");
const mejorTiempo   = document.querySelector("#mejor-tiempo");
const tiempoActual  = document.querySelector("#tiempo-actual");
const nivelJuego    = document.querySelector("#nivel-juego");


const miTablero     = document.querySelector("#mi-tablero");

let  misCasillas   = document.querySelectorAll(".casilla");
let  misFiguras    = document.querySelectorAll(".figura");
let  misFiguras2   = document.querySelectorAll(".figura2");
//const contFiguras   = document.querySelector(".figura");
 // MOVIDO ABAJO 

const IMG_PIC_FAIL = "pic_fail.jpg";
const EMOGI_FAIL   = ["😡", "😖","👿", "😠", "🤬"];
const EMO_LEN      = EMOGI_FAIL.length;

const symbLib     = [ "💎", "🍀", "🔔", "🎰", "🌟", "💰", "🕰️", "📀",
                      "🍊", "🍒", "🍋", "🍇", "🍉", "🍓", "🍎", "🍍",
                      "🍄", "🎲", "🌈", "🎁",  "🎩","📯", "🎸", "🎹",
                      "⚽", "🏈", "🏉", "🥎", "🏀", "🏐", "🎾", "🎱" ];

const ALTO_TABLERO  = 4;
const ANCHO_TABLERO = 4;

const THINK_TIME_B    = 2000;
const THINK_TIME_M    = 1500;
const THINK_TIME_E    = 1000;

let filasTablero   = ALTO_TABLERO;
let colTablero     = ANCHO_TABLERO;
let nroFiguras     = filasTablero * colTablero;
let nroDePares     = nroFiguras/2;
let quedanFiguras  = nroFiguras;

const L_JUNIOR     = "junior";
const L_MEDIUM     = "medium";
const L_EXPERT     = "expert";

let juegoLevel     = L_JUNIOR;     // begginer
let thinkTime      = THINK_TIME_B; // begginer

let cTiempoActual  = 0;
let regMejorTiempB = 3600; 
let regMejorTiempM = 3600;
let regMejorTiempE = 3600;
let currRegMejorT  = regMejorTiempB;

mejorTiempo.textContent = convertTiempo (currRegMejorT);

let muestraFigura  = false;
let index1, index2 = 0
let setDeFiguras   = [];
let failPos        = 0;
let failRunnig     = false;
let gameRunning    = false;
let memoInterval   = 0 ;  

function jugarMemo() {
    if (gameRunning == true) {
        gameRunning = false;
        stopClock();
        stopTimer();
        // recarga mejor tiempo según nivel por si cambi
        switch (juegoLevel) {
            case L_JUNIOR:
                regMejorTiempB = currRegMejorT;
                break;
            case L_MEDIUM: 
                regMejorTiempM = currRegMejorT;
                break;
            case L_EXPERT: 
                regMejorTiempE = currRegMejorT;
                break;
        }
        setTimeout (startAgain(), 500);
    }
    else {
        filasTablero = parseInt(misFilas.value);
        colTablero = parseInt(misColumnas.value);
        nroFiguras = filasTablero * colTablero;
        console.log(nroFiguras);
        switch (nroFiguras) {
            case 9: case 15: case 21: case 25: case 35: case 49:
                console.log("Error! configuración no válida");
                botonJugar.textContent = "Config. No Válida";
                botonJugar.style.backgroundColor = "red";
                setTimeout(startAgain, 1000);
                return;
            }
        // ajusta ancho 
        if (colTablero > 4) {
            juegoMemoria.style.width = colTablero * 90 + "px";
        }
        // Carga nivel de juego
        switch (juegoLevel = nivelJuego.value) {
            case L_JUNIOR:
                thinkTime = THINK_TIME_B;
                currRegMejorT = regMejorTiempB;
                break;
            case L_MEDIUM:
                thinkTime = THINK_TIME_M;
                currRegMejorT = regMejorTiempM;
                break;
            case L_EXPERT:
                thinkTime = THINK_TIME_E;
                currRegMejorT = regMejorTiempE;
                break;
        }
        /// Armar tablero
        index1 = 0;
        miTablero.innerHTML = ""; // borra tablero existente
        for (let f=0;f<filasTablero;f++){
            miTablero.innerHTML += `
            <div class="row">
                ${llenaColumnas()}
            </div>
            `;
        }  
        const misCasillasI   = document.querySelectorAll(".casilla");
        const misFigurasI    = document.querySelectorAll(".figura");
        const misFiguras2I   = document.querySelectorAll(".figura2");
        misCasillas   = misCasillasI;
        misFiguras    = misFigurasI;
        misFiguras2   = misFiguras2I;  
        initAll();
    }
}

function llenaColumnas() {
let mistring = "";
    for (let i=0;i<colTablero;i++){
        mistring += `
        <div class="casilla" onclick="picBox(${index1})">  <div class="figura">🌟</div> <div class="figura2"></div> </div>
        `;
        index1++;
    }
    return (mistring);
}



function startAgain() {
    botonJugar.textContent = "JUGAR";
    botonJugar.style.backgroundColor = "lightgreen";
}

function startGameBoton() {
    botonJugar.textContent = "REINICIAR JUEGO";
    botonJugar.style.backgroundColor = "gold";
}

function initAll () {
    nroFiguras     = filasTablero * colTablero;
    nroDePares     = nroFiguras/2;
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
    let idx = 0;
    for (let f=0; f<filasTablero;f++){
        let miStr = "";
        for (let c=0; c<colTablero-1;c++) {
            miStr += misFiguras[idx].textContent + ", "; 
            idx++;
        }
        miStr += misFiguras[idx].textContent; 
        idx++;
        console.log(miStr);
    }
    //////////var miString = variable1 + ", " + variable2 + ", " + variable3;
    quedanFiguras = nroFiguras;
    muestraFigura = false;
    
    // Actualiza indicadores de tiempo.
    mejorTiempo.textContent = convertTiempo (currRegMejorT);
    cTiempoActual = 0;
    tiempoActual.textContent = convertTiempo (cTiempoActual);

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
        // ACA INICIA EL JUEGO
        startGameBoton();
        gameRunning     = true;
        memoInterval    = setInterval(memoTest, thinkTime); 
        clockInterval   = setInterval(clockHandler, 1000);
    } 
}
/**
 * Convierte segundos en "minutos:segundos"
 * @param {number} segundos 
 * @returns 
 */
function convertTiempo (segundos) {
    if (segundos >= 3600) {
        return ("__:__");
    }
    let minutos = Math.floor(segundos / 60);
    let segRestantes = segundos % 60;
    return (minutos + ":" + (segRestantes < 10 ? "0" : "") + segRestantes);
}

function clockHandler () {
    cTiempoActual++;
    tiempoActual.textContent = convertTiempo (cTiempoActual);

}

function stopClock () {
    clearInterval(clockInterval);
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
        for (index2= 0; index2 < nroFiguras;index2++) {
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
            console.log("acertaste: "+misFiguras[pos].textContent );
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
                stopClock();
                if (currRegMejorT > cTiempoActual) {
                    currRegMejorT = cTiempoActual;
                    mejorTiempo.textContent = convertTiempo (currRegMejorT);
                }
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
            if (misFiguras2[pos].textContent == "") {
            stopTimer();
            failRunnig = true;
            misFiguras2[pos].style.display = "block";
            misFiguras2[pos].style.backgroundColor = "red";
            misFiguras2[pos].style.fontSize = "60px";
            misFiguras2[pos].textContent = EMOGI_FAIL[pos%EMO_LEN]; 
            failPos = pos;
            memoInterval  = setInterval(picFalse, 400); 
            }
        } 
    } 
}

function picFalse () {
    stopTimer();
    failRunnig = false;
    //misFiguras2[failPos].style.backgroundColor = "transparent";
    misFiguras2[failPos].textContent = ""; 
    misFiguras2[failPos].style.backgroundColor = "transparent";
    misFiguras2[failPos].style.fontSize = "30px";
    misFiguras2[failPos].style.display = "none";
    memoInterval  = setInterval(memoTest, thinkTime); 
}
