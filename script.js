//Variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResuldato = null;
let segundoResultado = null;
let movimientos = 0;
let intentos = 0;
let _MAX = 31;
let _MIN = 0;
let _GLOW_VERDE = 'glowVerde';
let _GLOW_ROJO = 'glowRojo';
let numeros = [];
let _NUMERO_CARTAS = 16;
let _NUMERO_PARES = 8;

//Lo que esta en el HTML
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarIntentos = document.getElementById("intentos");

inicializar();

function inicializar(){
  //Números aleatorios
  numeros = [];
  for(var i=0; i < _NUMERO_PARES; i++){
    let imagenId = random();
    if(numeros.indexOf(imagenId)<0){
      numeros.push(imagenId);
      numeros.push(imagenId);
    } else {
      i--;
    }
  }
  //el método sort ordena los numeros de acuerdo a una función
  numeros = numeros.sort(() => {
    return Math.random() -0.5;
  });
}


function reiniciar() {
  for(let i=0; i < _NUMERO_CARTAS; i++){
    let tarjeta = document.getElementById(i);
    tarjeta.innerHTML = " ";
    tarjeta.className = "";
    tarjeta.disabled = false;
    tarjetasDestapadas = 0;
  }
  intentos ++;
  mostrarIntentos.innerHTML = `Intentos : ${intentos}`;
  movimientos = 0;
  mostrarMovimientos.innerHTML = `Movimientos : ${movimientos}`;
  inicializar();
}

function random() {
  return Math.floor((Math.random() * (_MAX - _MIN + 1)) + _MIN);
}

//Funcion principal
function destapar(id) {
  tarjetasDestapadas++;
  if (tarjetasDestapadas == 1) {
    //mostrar el primer número
    tarjeta1 = document.getElementById(id);
    //console.log(numeros[id]);
    primerResuldato = numeros[id];
    tarjeta1.innerHTML = `<img src="./img/${primerResuldato}.png">`;
    //Deshabilitar el primer boton
    tarjeta1.disabled = true;
  } else if (tarjetasDestapadas == 2) {
    //Mostrar el segundo número
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = `<img src="./img/${segundoResultado}.png">`;
    //Deshabilitar el segundo boton
    tarjeta2.disabled = true;

    //Incrementar movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos : ${movimientos}`;

    if (primerResuldato == segundoResultado) {
      //Contador tarjetas destapadas
      tarjetasDestapadas = 0;
      tarjeta1.className = _GLOW_VERDE;
      tarjeta2.className = _GLOW_VERDE;
    } else {
      tarjeta1.className = _GLOW_ROJO;
      tarjeta2.className = _GLOW_ROJO;
      //Mostrar por momentos el valor de cada tarjeta y volverlo a voltear
      setTimeout(() => {
        tarjeta1.innerHTML = " ";
        tarjeta2.innerHTML = " ";
        tarjeta1.className = "";
        tarjeta2.className = "";
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
      }, 500);
    }
  }
}
