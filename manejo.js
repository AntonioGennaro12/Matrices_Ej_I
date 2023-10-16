//
// JUEGO DE LA MEMORIA (MEMOTEST)
// 
// Configuración 
const juegoMemoria  = document.querySelector("#juego-memoria");
const defTablero    = document.querySelector("#def-tablero");
const misFilas      = document.querySelector("#filas");
const misColumnas   = document.querySelector("#columnas"); 
const miNombre      = document.querySelector("#nombre");
const nomJugador    = document.querySelector("#nom-jug");
const mueHallOfFa   = document.querySelector("#mu-hall"); 
const nombreMejT    = document.querySelector("#nom-mej-tie");
const botonJugar    = document.querySelector("#bot-jugar");
const mejorTiempo   = document.querySelector("#mejor-tiempo");
const tiempoActual  = document.querySelector("#tiempo-actual");
const nivelJuego    = document.querySelector("#nivel-juego");   
const nivJgoTexto   = document.querySelector("#n-j-txt");
//
const miTablero     = document.querySelector("#mi-tablero");
//
let  misCasillas   = document.querySelectorAll(".casilla");
let  misFiguras    = document.querySelectorAll(".figura");
let  misFiguras2   = document.querySelectorAll(".figura2");
// HELP
const popup        = document.getElementById('popup');
const closePopup   = document.getElementById('close-popup');
//
// Reporte Jugadores
const losRecords   = document.querySelector(".records");
const histoJugadas = document.querySelector("#his-jugador");
const titHistoria  = document.querySelector("#tit-his");
const regJugadas   = document.querySelector("#records-jug");
//
const hallOfFame   = document.querySelector("#hall-fame");
const tituloHall   = document.querySelector("#tit-hall");
const hallRecords  = document.querySelector("#hall-records");
//
////////// TIPO DE DISPOSITIVO Y SISTEMA OPERATIVO
/**
 * Obtiene el tipo de dispositivo 
 * @returns Tipo de dispositivo
 */
function detectDeviceType() {
    const userAgent = navigator.userAgent;
    if (/Android/i.test(userAgent)) {
        return 'Android';
    } else if (/iPad|iPhone|iPod/i.test(userAgent)) {
        return 'iOS';
    } else if (/Windows|Macintosh|Linux/i.test(userAgent)) {
        return 'Computadora';
    } else if (/Tablet/i.test(userAgent)) {
        return 'Tablet';
    } else if (/Mobile/i.test(userAgent)) {
        return 'Movil';
    } else {
        return 'Desconocido';
    }
}
// Detectar el sistema operativo
/**
 * Lee el Sistema Operativo
 * @returns Sitema Operativo
 */
function detectOS() {
    const userAgent = navigator.userAgent;
    if (/Android/i.test(userAgent)) {
        return 'Android';
    } else if (/iPad|iPhone|iPod/i.test(userAgent)) {
        return 'iOS';
    } else if (/Windows/i.test(userAgent)) {
        return 'Windows';
    } else if (/Macintosh/i.test(userAgent)) {
        return 'Macintosh';
    } else if (/Linux/i.test(userAgent)) {
        return 'Linux';
    } else {
        return 'Desconocido';
    }
}
// Carga el tipo de dispositivo
let deviceType = detectDeviceType();
console.log('Dispositivo:', deviceType);
// Carga el sistema operativo
let operatingSystem = detectOS();
console.log('Sistema Operativo:', operatingSystem);

/////// Toma ancho y alto disponible
let limiteX     = window.innerWidth;
let limiteY     = window.innerHeight;
console.log("X: "+limiteX+" ,Y: "+limiteY);
//////////
const EMOGI_FAIL   = ["😡", "😖","👿", "😠", "🤬"];
const EMO_LEN      = EMOGI_FAIL.length;
//
const symbLib     = [ "💎", "🍀", "🔔", "🎰", "🌟", "💰", "🕰️", "📀",
                      "🍊", "🍒", "🍋", "🍇", "🍉", "🍓", "🍎", "🍍",
                      "🍄", "🎲", "🌈", "🎁",  "🎩","📯", "🎸", "🎹",
                      "⚽", "🏈", "🏉", "🥎", "🏀", "🏐", "🎾", "🎱" ];
//
/// FECHA Y HORA PARA AGREGAR A LOS REGISTROS
let fechaYHoraActual = new Date();
// Obtener la fecha actual (formato: AAAA-MM-DD)
let fechaActual = fechaYHoraActual.toISOString().slice(0, 10);
// Obtener la hora actual (formato: HH:MM:SS)
let horaActual = fechaYHoraActual.toTimeString().slice(0, 8);
console.log("Fecha actual:", fechaActual);
console.log("Hora actual:", horaActual);
//
const MAX_FILAS         = 8;
const MAX_COLUMNAS      = 8;
const MAX_PARES         = (MAX_FILAS*MAX_COLUMNAS)/2;
//
const ALTO_TABLERO      = 4;
const ANCHO_TABLERO     = 4;
const ANCHO_MIN         = 320;
//
const MAX_TIME_LEV      = 3;  
const THINK_TIME_B      = 2000;
const THINK_TIME_M      = 1500;
const THINK_TIME_E      = 1000;
//
let filasTablero        = ALTO_TABLERO;
let colTablero          = ANCHO_TABLERO;
let nroFiguras          = filasTablero * colTablero;
let altoCelda           = 80; 
let anchoCelda          = 80;
let nroDePares          = nroFiguras/2;
let quedanFiguras       = nroFiguras;
//
const L_JUNIOR          = 1;
const L_MEDIUM          = 2;
const L_EXPERT          = 3;
const L_NUM_J           = 0;
const L_NUM_M           = 1;
const L_NUM_E           = 2;
//
let juegoLevel          = L_JUNIOR;     // begginer
let thinkTime           = THINK_TIME_B; // begginer
let currLevel           = L_NUM_J;
//
let nombreJugador       = "";
let cTiempoActual       = 0;
let regMejorTiempo      = 3600; 
let regMejDaTime        = fechaYHoraActual;
//////// LOCAL STORAGE
// VECTORES PARA GUARDAR MEJORES TIEMPOS (fecha nombre y record) 
let regMejTieMatrx      = [];
let regMejTieName       = [];
let regMejDateTime      = [];
// Genera Matriz de mejor tiempo en función de nivel y nro de pares
for (let i=0; i< MAX_TIME_LEV;i++){
    regMejTieMatrx.push([]);
    regMejTieName.push([]);
    regMejDateTime.push([]);
    for(let j=0; j<MAX_PARES;j++) {
        regMejTieMatrx[i].push(regMejorTiempo+i); 
        regMejTieName[i].push(""); 
        regMejDateTime[i].push(fechaYHoraActual);
    }
}
// VECTORES PARA GUARDAR JUGADORES Y JUGADAS 
let misJugadores   = [];
let registroJuga   = [];  // Día, hora y 3 enteros: nivel: (1,2 ó 3 - Nro de pares) y tiempo (en segundos) hasta 59min:59seg. 
let writePointer   = [];  // puntero de escritura libre (0 a 9) buffer circular 
//////////////////////////////
// Elimina todos los elementos almacenados en el Local Storage

//localStorage.clear();

// Paso 2: Intenta recuperar los datos del LocalStorage
const storedRegMejTieMatrx = JSON.parse(localStorage.getItem('regMejTieMatrx'));
const storedRegMejTieName = JSON.parse(localStorage.getItem('regMejTieName'));
const storedRegMejDateTime = JSON.parse(localStorage.getItem('regMejDateTime'));
const storedMisJugadores = JSON.parse(localStorage.getItem('misJugadores'));
const storedRegistroJuga = JSON.parse(localStorage.getItem('registroJuga'));
const storedWritePointer = JSON.parse(localStorage.getItem('writePointer'));
console.log(storedRegMejTieMatrx, storedRegMejTieName, storedRegMejDateTime, 
            storedMisJugadores, storedRegistroJuga, storedWritePointer);
// Asigna los valores recuperados o sino usa valores predeterminados
regMejTieMatrx = storedRegMejTieMatrx || regMejTieMatrx;
regMejTieName = storedRegMejTieName || regMejTieName;
regMejDateTime = storedRegMejDateTime || regMejDateTime;
misJugadores = storedMisJugadores || misJugadores;
registroJuga = storedRegistroJuga || registroJuga;
writePointer = storedWritePointer || writePointer;
//////// DEBUG ///////////////
console.table(regMejTieMatrx);
console.table(regMejTieName);
console.table(regMejDateTime);
console.table(misJugadores);
console.table(registroJuga);
console.table(writePointer);
//////////// FIN RECARGA LOCAL STORAGE
// Carga mejor tiempo con valor de default "__:__"
let currRegMejorT       = regMejorTiempo;
let currRegMejorTprov   = regMejorTiempo;
mejorTiempo.textContent = convertTiempo (currRegMejorT);
let currNomMejorT  = "";
//
let nroJugadores   = misJugadores.length;
console.log("NroJugadoresInicial: "+nroJugadores);
const MAX_HIS_REC  = 10;  // máximo 10 registros 
//
let muestraFigura  = false;
let apuraProxFig   = false;
let index1         = 0;
let index2         = 0;
let setDeFiguras   = [];
let failPos        = 0;
let failRunnig     = false;
let showInicFig    = false;
let failEnd        = true;
let gameRunning    = false;
let picEnable      = false;
let memoInterval   = 0;
let hallTime       = 0;  
//
// Fin de definicioenes
// Inicia el main
if (limiteX > ANCHO_MIN) {juegoMemoria.style.width = (limiteX*0.9) + "px";}
else {juegoMemoria.style.width = ANCHO_MIN + "px";}
ajustaAltoCelda();

// Manda un timer para el show inicial
let showInterval = setInterval(showEmojis, 250);
// 
/**
 * Show inicial d eempgis, los genera aleatoriamente y los va desplazando 
 * desde la primera posición a la última...
 */
function showEmojis() {  // Desplaza las figuras hacia a dereha por todo el tablero..
    let miEmo = misFiguras[0].textContent;
    let miBkg = misFiguras[0].style.backgroundColor;
    let miEmo2 ="";
    let miBkg2 = "transparent";
    misFiguras[0].textContent = symbLib[Math.floor(Math.random()*symbLib.length)];
    if ((++index1%3)==1) {misFiguras[0].style.backgroundColor = "red";}
    else {misFiguras[0].style.backgroundColor = "gold";}
    for (let i=1;i<nroFiguras;i++) {
        miEmo2 = misFiguras[i].textContent;
        misFiguras[i].textContent = miEmo;
        miEmo = miEmo2;
        miBkg2 = misFiguras[i].style.backgroundColor;
        misFiguras[i].style.backgroundColor = miBkg;
        miBkg = miBkg2;
    }
}

// HELP
/**
 * Al hacer click en el "?", abre la ventana emergente
 */
function clickHelp() {
    popup.style.display = 'block';
}
// Cierra la ventana emergente
closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});
//
/* Listener por cambio en el nombre del jugador..
   Si ya existe lo deja y si no existe lo crea.. */
miNombre.addEventListener("change", function () {
    if ( (nombreJugador = miNombre.value) == "" || (nombreJugador == NaN) ) {return;}
    let jugadorIndex = -1; // Variable para rastrear el índice del jugador
    // Buscar si el jugador ya existe
    for (let i = 0; i < misJugadores.length; i++) {
      if (nombreJugador === misJugadores[i]) {
        jugadorIndex = i; // Guardar el índice del jugador existente
        break;
      }
    }  
    if (jugadorIndex == -1) {
      // Agregar un nuevo jugador al arreglo de jugadores
      misJugadores.push(nombreJugador);
      localStorage.setItem('misJugadores', JSON.stringify(misJugadores));
      // Inicializar el arreglo de registros para el nuevo jugador
      fechaYHoraActual = new Date();
      registroJuga.push([]);
      for (let i = 0; i < MAX_HIS_REC; i++) {
        // Inicializar cada registro del nuevo jugador
        registroJuga[nroJugadores].push([fechaYHoraActual, -1, misJugadores.length, 3600]);
      }
      localStorage.setItem('registroJuga', JSON.stringify(registroJuga));
      writePointer.push(0); // puntero de escritura en 0..
      localStorage.setItem('writePointer', JSON.stringify(writePointer));
      nroJugadores++;
      console.log("Cargó nuevo nombre: "+misJugadores[(misJugadores.length-1)]+" Idx: "+(nroJugadores-1));
    } else {
    // Muestra el indice del encontrado
        console.log("Jugador existente, nombre: "+misJugadores[jugadorIndex]+" Index: "+jugadorIndex);
    }
    histoJugadas.style.display = "none";
  });
 
// Detecta cambio de tamaño de pantalla 
window.addEventListener("resize", function() {
    limiteX     = window.innerWidth;
    limiteY     = window.innerHeight;
    console.log("X: "+limiteX+" ,Y: "+limiteY);
    ajustaAltoCelda();
});

 /**
  * Ajusta el tamaño de la celda al espacio disponible
  */ 
function ajustaAltoCelda() {
    altoCelda = Math.floor((limiteY * 0.50) / filasTablero);
    if (((limiteX * 0.90) / colTablero) >= altoCelda) {
        anchoTabla = altoCelda * colTablero;
        if (anchoTabla <= ANCHO_MIN) {
            anchoTabla = ANCHO_MIN;
        }
    }
    else {
        anchoTabla = limiteX * 0.90;
    }
    juegoMemoria.style.width = anchoTabla + "px";
    anchoCelda = anchoTabla / colTablero;
    // AJUSTE PARA CELULARES, ajusta alto celda para no exceder 
    if (altoCelda > (anchoCelda * 1.10)) {
        altoCelda = (anchoCelda * 1.10);
    }
    for (let i=0; i< nroFiguras;i++){
        misCasillas[i].style.height = altoCelda + "px"; 
        misFiguras[i].style.fontSize = (altoCelda * 0.6) + "px"; 
        misFiguras2[i].style.fontSize = (altoCelda * 0.3) + "px"; 
    } 
}

/**
 * Carga el Nivel del Juego
 */
function cargaNivelJgo() {
    switch (juegoLevel = parseInt(nivelJuego.value)) {
        case L_JUNIOR:
            thinkTime = THINK_TIME_B;
            currRegMejorT = regMejTieMatrx[L_NUM_J][nroDePares - 1];
            currNomMejorT = regMejTieName[L_NUM_J][nroDePares - 1];
            currLevel = L_JUNIOR;
            break;
        case L_MEDIUM:
            thinkTime = THINK_TIME_M;
            currRegMejorT = regMejTieMatrx[L_NUM_M][nroDePares - 1];
            currNomMejorT = regMejTieName[L_NUM_M][nroDePares - 1];
            currLevel = L_MEDIUM;
            break;
        case L_EXPERT:
            thinkTime = THINK_TIME_E;
            currRegMejorT = regMejTieMatrx[L_NUM_E][nroDePares - 1];
            currNomMejorT = regMejTieName[L_NUM_E][nroDePares - 1];
            currLevel = L_EXPERT;
            break;
    }
}
/**
 * Carga mejor tiempo en matriz
 */
function cargaRegMejorT() {
    juegoLevel = parseInt(nivelJuego.value);
    switch (juegoLevel) {
        case L_JUNIOR:
            regMejTieMatrx[L_NUM_J][nroDePares - 1] = currRegMejorT;
            regMejTieName [L_NUM_J][nroDePares - 1] = currNomMejorT;
            regMejDateTime[L_NUM_J][nroDePares - 1] = regMejDaTime;
            currLevel = L_JUNIOR;
            break;
        case L_MEDIUM:
            regMejTieMatrx[L_NUM_M][nroDePares - 1] = currRegMejorT;
            regMejTieName [L_NUM_M][nroDePares - 1] = currNomMejorT;
            regMejDateTime[L_NUM_M][nroDePares - 1] = regMejDaTime;;
            currLevel = L_MEDIUM;
            break;
        case L_EXPERT:
            regMejTieMatrx[L_NUM_E][nroDePares - 1] = currRegMejorT;
            regMejTieName [L_NUM_E][nroDePares - 1] = currNomMejorT;
            regMejDateTime[L_NUM_E][nroDePares - 1] = regMejDaTime;;
            currLevel = L_EXPERT;
            break;
    }
    localStorage.setItem('regMejTieMatrx', JSON.stringify(regMejTieMatrx));
    localStorage.setItem('regMejTieName', JSON.stringify(regMejTieName));
    localStorage.setItem('regMejDateTime', JSON.stringify(regMejDateTime));
}
/**
 * Llena contenido de columnnas en cada fila...
 * @returns String con texto HTML
 */
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
/**
 * Prepara para jugar de Nuevo
 */
function startAgain() {
    botonJugar.textContent = "JUGAR MEMOTEST";
    botonJugar.style.backgroundColor = "lightgreen";
}
/**
 * Prepara para Reinciar Juego
 */
function startGameBoton() {
    botonJugar.textContent = "DETENER/ REINICIAR JUEGO";
    botonJugar.style.backgroundColor = "gold";
}
/**
 * espera por show
 */
function waitShowBoton() {
    botonJugar.textContent = "... memoriza lo que puedas...";
    botonJugar.style.backgroundColor = "lightsalmon";
}
/**
 * Inicializa todo para empezar con el Tablero elegido
 */
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
    // Elige la cantidad de pares necesarios para cubrir el tablero, 
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
    //// MUESTRA EL TABLERO OCULTO (ELIMINAR)
    let idx = 0;
    for (let f=0; f<filasTablero;f++){
    let miStr = "";
    for (let c=0; c<colTablero-1;c++) {
        miStr += misFiguras[idx].textContent + ", "; 
        idx++;
    }
    miStr += misFiguras[idx].textContent; 
    idx++;
    console.table(miStr);
    }
    ///////////////////////////

    quedanFiguras = nroFiguras;
    muestraFigura = false;
        // Actualiza indicadores de tiempo.
    if (nroJugadores > 0) { mejorTiempo.textContent = convertTiempo (currRegMejorT);}
    cTiempoActual = 0;
    tiempoActual.textContent = convertTiempo (cTiempoActual);

    for (i=0;i<nroFiguras;i++){
        misFiguras[i].style.display = "none";
        misFiguras[i].style.backgroundColor = "antiquewhite";  
    }
    defTablero.style.display = "none";
    // ajusta inicación de nivel, nombre, etc.
    currLevel = nivelJuego.value;
    nivJgoTexto.textContent = "Nivel de juego: "+currLevel+"-"+nroDePares;
    showInicFig = true;
    memoInterval = setInterval(showInicial, 250); 
}
/**
 * Muestra las figuras un número proporcional a la cantidad de pares... 
 */
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
    else { 
        stopTimer();
        quedanFiguras = nroFiguras; // Aquí se ocultan todas las figuras después del show
        muestraFigura = false;
        for (i=0;i<nroFiguras;i++){
            misFiguras[i].style.display = "none";
            misFiguras[i].style.backgroundColor = "antiquewhite";  
        }
// ACA INICIA EL JUEGO
        startGameBoton();
        showInicFig    = false
        gameRunning    = true;
        runTimer(thinkTime); 
        runClock(); // fijo 1 segundo
        picEnable = true;
    } 
}

/**
 * BOTON JUGAR Y REINICIAR :Función Play del juego y para Reiniciar
 * @returns 
 */
function jugarMemo() {
    clearInterval (showInterval); // detiene show incial
    if (showInicFig === false) {
        picEnable   = false;
        stopTimer();
        if (gameRunning == true) {
            gameRunning = false;
            stopClock();
            //cargaRegMejorT();  
            // DEBUG -- Remover          
            console.table(regMejTieMatrx);
            console.table(regMejTieName);
            console.table(regMejDateTime);
            console.table(misJugadores);
            //
            defTablero.style.display = "flex";
            cTiempoActual = 0;
            tiempoActual.textContent = convertTiempo (cTiempoActual);
            setTimeout (startAgain(), 500);
        }
        else {
            filasTablero = parseInt(misFilas.value);
            colTablero = parseInt(misColumnas.value);
            nroFiguras = filasTablero * colTablero;
            nroDePares = nroFiguras / 2;
            console.log("Nro de Fig: "+nroFiguras);
            if (((colTablero * 80) > limiteX) || ((filasTablero * 80 ) > (limiteY-80))) {
                botonJugar.textContent = "Esp. Insuficiente!!";
                    botonJugar.style.backgroundColor = "red";
                    setTimeout(startAgain, 1000);
                    return;
            }
            switch (nroFiguras) {
                case 9: case 15: case 21: case 25: case 35: case 49:
                    botonJugar.textContent = "Config. No Válida";
                    botonJugar.style.backgroundColor = "red";
                    setTimeout(startAgain, 1000);
                    return;
                }
            cargaNivelJgo();
            if (nroJugadores > 0) { mejorTiempo.textContent = convertTiempo (currRegMejorT);}
            nombreMejT.textContent = "("+currNomMejorT+")";   
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
            ajustaAltoCelda();  
            waitShowBoton();      
            initAll();
        }
    }
}

/**
 * Arranca Timer Intervalo = ThinkTime
 */
function runTimer(time) {
    memoInterval = setInterval(memoTest, time);
}
/**
 * Detiene el Intervalo del Temporizador
 */
function stopTimer () {
    clearInterval(memoInterval);
} 
/**
 * Arranca el Clock tic = 1 segundo...
 */
function runClock() {
    clockInterval = setInterval(clockHandler, 1000);
}
/**
 * Detiene el Timer de Intervalo Think Time
 */
function stopClock () {
    clearInterval(clockInterval);
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
/**
 * Manejo del Reloj (incrementa y muestra tiempo de juego...)
 */
function clockHandler () {
    cTiempoActual++;
    tiempoActual.textContent = convertTiempo (cTiempoActual);
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
 * Procesa Time Interval del Juego de la memoria si muetra una figura la oculta sino muestra otra
 */    
function memoTest () {
    if (!muestraFigura) { 
        muestraFigura = true; // Muestra otra figura
        index1 = getRandPresent(nroFiguras); 
        misFiguras[index1].style.display = "block";
        if (apuraProxFig === true) { 
            apuraProxFig = false;       // si viene de haber encontrado una figura 
            stopTimer();                // reestablece timer
            runTimer(thinkTime);        // con intervalo normal
        }
        failEnd = false;
    }
    else {
        muestraFigura = false;
        misFiguras[index1].style.display = "none";
    }
}
/**
 * Festeja que haya ganado!!! 
 */
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
 * Manejo del click sobre la casilla
 * @param {Number} pos 
 * @returns Nothing
 */
function picBox(pos) {
    console.log("entró: "+pos);
    if (picEnable === true) {
        if (failEnd == true){return;};
        if (pos != index1){
            if (misFiguras[pos].textContent == misFiguras[index1].textContent) {
                console.log("acertaste: "+misFiguras[pos].textContent );
                redibujaParOk(pos);
                quedanFiguras -=2;
                if (quedanFiguras <= 0) {
                    stopClock(); // COMPLETÓ EL TABLERO!!!!
                    stopTimer();
                    picEnable = false;
                    registraMejorTiempo();
                    registroJugadaExitosa();    
                    console.log ("FIN!!!");
                    for (index2= 0; index2 < nroFiguras;index2++) {
                        misFiguras2[index2].textContent = "💎";
                    } 
                    memoInterval  = setInterval(memoGanaste, 250);  
                    quedanFiguras = misFiguras.length;
                }
                else { // quedan figuras aún rearranca el timer interval
                stopTimer();
                apuraProxFig = true; // apura cambio de figura.
                runTimer(400); // 400 milisegundos
                }
            }
            else { // le pifió muestro un background con un emoji malo
                if (misFiguras2[pos].textContent == "") {
                stopTimer();
                failRunnig = true;
                misFiguras2[pos].style.display = "block";
                misFiguras2[pos].style.backgroundColor = "red";
                misFiguras2[pos].textContent = EMOGI_FAIL[pos%EMO_LEN]; 
                failPos = pos;
                memoInterval  = setInterval(picFalse, 400); 
                }
            } 
        } 
    }
}

/**
 * Redibuja el Par de Figuras por haberlo encontrado
 * @param {Number} pos 
 */
function redibujaParOk(pos) {
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
}
/**
 * Registra mejor Tiempo
 */
function registraMejorTiempo() {
    fechaYHoraActual = new Date();
    if (nroJugadores > 0) {
        if (currRegMejorT >= cTiempoActual) {
            console.log("ahora registro, currT y TiempoActual: ", currRegMejorT, cTiempoActual);
            currRegMejorT = cTiempoActual;
            mejorTiempo.textContent = convertTiempo(currRegMejorT);
            currNomMejorT = nombreJugador;
            nombreMejT.textContent = "(" + currNomMejorT + ")";
            regMejDaTime = fechaYHoraActual;
            cargaRegMejorT();
        }
    } else {
       if (currRegMejorTprov >= cTiempoActual) {
            currRegMejorTprov = cTiempoActual;
        }
        mejorTiempo.textContent = convertTiempo(currRegMejorTprov);
    }
}

/**
 * Registro de Jugada exitosa!!
 */
function registroJugadaExitosa() {
    console.log(fechaYHoraActual);
    let indice = -1;
    for (let i = 0; i < misJugadores.length; i++) {
        if (nombreJugador === misJugadores[i]) {
            indice = i; // Guardar el índice del jugador existente
            break;
        }
    }
    if (indice != -1) {
        console.log(indice);
        console.log(writePointer[indice]);
        console.log(registroJuga[indice]);
        registroJuga[indice][writePointer[indice]] = [fechaYHoraActual,
            currLevel, nroDePares, cTiempoActual];
        if (++(writePointer[indice]) >= MAX_HIS_REC) { writePointer[indice] = 0; }
        console.log(registroJuga);
        console.log(writePointer);
        // Almacena en Local Storage
        localStorage.setItem('registroJuga', JSON.stringify(registroJuga));
        localStorage.setItem('writePointer', JSON.stringify(writePointer));
    }
}

/**
 * Click fallido -- No se encontró la figura 
 */
function picFalse () {
    stopTimer();
    failRunnig = false;
    failEnd    = true;
    misFiguras2[failPos].textContent = ""; 
    misFiguras2[failPos].style.backgroundColor = "transparent";
    misFiguras2[failPos].style.display = "none";
    apuraProxFig = true; // va al próximo intento.  
    runTimer(400); // 400 milisegundos
}
////////////// Registros de Jugadas y Hall de la Fama
/**
 * Restablece texto y color original de las leyendas de Nombre y Mejor tiempo 
 */
function restoreTexts() {
    mueHallOfFa.textContent = "Mejor tiempo:";
    mueHallOfFa.style.color = "darkslategrey";
    nomJugador.textContent = "Nombre del jugador:";
    nomJugador.style.color = "darkslategrey";
}

/**
 * Oculta registro de Jugadas después de 10 segundos
 */
function ocultaRegJugadas(){
    histoJugadas.style.display = "none";
}
/**
 * Oculta Hall of Fame después de 5 segundos
 */
function ocultaHallOfFame() {
    hallOfFame.style.display = "none";
}

/**
 * Muestra sugerencia para ver el Hall de la Fama
 */
function sugMostHallOfFame() {
    mueHallOfFa.textContent = "Click para ver Hall...";
    mueHallOfFa.style.color = "darkred";
    clearTimeout(hallTime);
    hallTime = setTimeout(restoreTexts, 2000);
}
/**
 * Muestra la lista de mejores tiempos y el Nombre del quién lo logró
 */
function muestraHall() { 
    ocultaRegJugadas();
    hallOfFame.style.display = "grid";
    tituloHall.textContent = "HALL DE LA FAMA";
    let index = -1;
    hallRecords.innerHTML = "";
    for (let i=0; i< MAX_TIME_LEV;i++){
        for(let j=0; j<MAX_PARES;j++) {
            if (regMejTieName[i][j] != "") {
                index = 1;
                let diayhora = new Date(regMejDateTime[i][j]);
                hallRecords.innerHTML += `
                <p> Nivel:${i+1}-${j+1}, Nom: ${regMejTieName[i][j]},  
                    Tiempo: ${convertTiempo(regMejTieMatrx[i][j])},  
                    Día: ${diayhora.toISOString().slice(0, 10)}-
                    Hora: ${diayhora.toTimeString().slice(0, 8)}                   
                `;
            }
        }
    }
    if (index == -1) {
        hallRecords.innerHTML += ` ..no hay registros...`;
    }
    setTimeout (ocultaHallOfFame,10000);
}
/**
 * Muestra sugerencia para ver historia del jugador
 */
function sugMostrarHis() {
    nomJugador.textContent = "Click para ver tu historia...";
    nomJugador.style.color = "darkred";
    clearTimeout(hallTime);
    hallTime = setTimeout(restoreTexts, 2000);
}
/**
 * Muestra el historial del jugador corriente
 */
function muestraHistoria() {
    ocultaHallOfFame();
    histoJugadas.style.display = "grid";
    let index = -1; // Inicializa con -1, que indica que el jugador no se encontró
    for (let i = 0; i < misJugadores.length; i++) {
      if (nombreJugador === misJugadores[i]) {
        console.log("jug: " +nombreJugador+" idx: "+i);
        console.table(registroJuga[i]);
        console.table(writePointer[i]);
        index = i; // guardo el índice del jugador encontrado
        break;
      }
    }
    if (index == -1) {
      titHistoria.textContent = "Registro de jugadas de: (no hay jugadores registrados!)";
    } else {
      titHistoria.textContent = "Registro de jugadas de: " + nombreJugador;
      let j = (writePointer[index]-1); // partimos de último escrito hacia atrás
      if (j < 0) {j = MAX_HIS_REC-1; } // corrige de dónde empieza, de 0 a MAX_HIS_REC 
      regJugadas.innerHTML = "";
        for (let i = 0; i < MAX_HIS_REC; i++) { // index = jugador, y j = nro de registro...
            console.log(i, j);
            if (registroJuga[index][j][1] != -1) { // pregunta si está vacío
                console.log("reg: "+registroJuga[index][j][1]);
                let diayhora = new Date(registroJuga[index][j][0]);
                regJugadas.innerHTML += `
                    <p> Reg: ${i+1}: ${diayhora.toISOString().slice(0, 10)}-
                                    ${diayhora.toTimeString().slice(0, 8)}: 
                            Nivel:  ${registroJuga[index][j][1]}-${registroJuga[index][j][2]},
                            Tiempo: ${convertTiempo(registroJuga[index][j][3])} </p>  `;
                if( --j == -1 ) { j = MAX_HIS_REC-1; }  // wrap around
            }
            else if (i==0){ // si i = 0, no había registros 
                regJugadas.innerHTML += `..no hay registros!..`;
            }
            else {i=MAX_HIS_REC;} // no hay más registros...
        }
    }
    setTimeout (ocultaRegJugadas,10000);
}
//// FIN!!!
