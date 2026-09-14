console.log('HOLIWIS ESTOY ANDANDO, SOY EL JS');

function funcionQueHaceMagia(){


//Agarrar mas de un elmento.
let elementosDOM = document.getElementsByTagName('h1');

console.log(elementosDOM[0]);

//Agarrar un solo elemento.
let elementoDOM = document.getElementById('contenido');
console.log(elementoDOM);

elementoDOM.style.backgroundColor = 'red';


//Crear elementos del DOM y agregarlos al HTML

elementoDOM.innerHTML='<h2>Texto cambiado desde JS</h2>';

let nuevoElemento = document.createElement('h3');

nuevoElemento.innerText="Soy nuevo elemento";

console.log(nuevoElemento);

elementoDOM.append(nuevoElemento);


}