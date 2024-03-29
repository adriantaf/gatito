'use strict';

// Elementos HTML
const main = document.querySelector('#main');
const casillas = document.querySelectorAll('.casilla');
const cuadricula = document.querySelector('#cuadricula');
const contenedorMensaje = document.querySelector('#contenedor-mensaje');
const btnVolverAJugar = document.querySelector('#btn-volver-a-jugar');
const txtMensaje = document.querySelector('#txt-mensaje');
const txtContadorUsuario = document.querySelector('#txt-contador-usuario');
const txtContadorSistema = document.querySelector('#txt-contador-sistema');

// Variables
const jugadasGanadoras = [
	[0, 1, 2],
	[0, 3, 6],
	[2, 5, 8],
	[6, 7, 8],
	[0, 4, 8],
	[2, 4, 6],
	[1, 4, 7],
	[3, 4, 5]];
const turnoInicial = "usuario";
let jugadaDelUsuario = [];
let jugadaDelSistema = [];
let turno = turnoInicial;
let simboloDelSistema = "o";
let simboloDelUsuario = "x";
let contadorUsuario = 0;
let contadorSistema = 0;

// Funciones
function validarPuntuacionInicial() {
	// if (localStorage.getItem('contador-usuario-tictactoe')) {
	// 	contadorUsuario = parseInt(localStorage.getItem('contador-usuario-tictactoe'));
	// }

	// if (localStorage.getItem('contador-sistema-tictactoe')) {
	// 	contadorSistema = parseInt(localStorage.getItem('contador-sistema-tictactoe'));
	// }

	txtContadorSistema.textContent = contadorSistema;
	txtContadorUsuario.textContent = contadorUsuario;
}

function verificarJugadas(jugador) {
	for (let i = 0; i < jugadasGanadoras.length; i++) {
		let el = jugadasGanadoras[i];
		
		if (casillas[el[0]].dataset.jugador === jugador && casillas[el[1]].dataset.jugador === jugador && casillas[el[2]].dataset.jugador === jugador) {
			return {victoria: true, jugada: el};
			break;
		}
	}

	return {victoria: false, jugada: null}
}

function deshabilitarCasillas() {
	casillas.forEach((el, i) => el.setAttribute('disabled', ''));
}

function aumentarContador(jugador) {
	if (jugador === "usuario") {
		contadorUsuario++
		txtContadorUsuario.textContent = contadorUsuario;
		localStorage.setItem('contador-usuario-tictactoe', contadorUsuario);
	} else if (jugador === "sistema") {
		contadorSistema++
		txtContadorSistema.textContent = contadorSistema;
		localStorage.setItem('contador-sistema-tictactoe', contadorSistema);
	}
}

function marcarJugadaGanadora(jugador, casillasGanadoras) {
	casillasGanadoras.forEach(el => casillas[el].classList.add('ganadora'));

	deshabilitarCasillas();
	aumentarContador(jugador);

	if (jugador === "sistema") {
		mostrarMensaje(true, "GAME OVER!! 🤖");
	} else if (jugador === "usuario") {
		mostrarMensaje(true, "HAS GANADO!");
	}
}

function volverAJugar() {
	casillas.forEach(el => {

		if (el.textContent !== '') {
			el.textContent = '';
		}

		if (el.dataset.jugador) {
			el.removeAttribute('data-jugador');
		}

		if (el.hasAttribute('disabled')) {
			el.removeAttribute('disabled');
		}

		if (el.classList.contains('presionada') && el.classList.contains('ganadora')) {
			el.classList.remove('presionada', 'ganadora');
		} else if (el.classList.contains('presionada')) {
			el.classList.remove('presionada');
		}

		jugadaDelUsuario = [];
	});

	mostrarMensaje(false);

	if (turno === "sistema") {
		turnoDelSistema();
	}
}

function mostrarMensaje(estado, mensaje) {
	if (estado) {
		contenedorMensaje.classList.add('visible');
		txtMensaje.textContent = mensaje;
	} else {
		contenedorMensaje.classList.remove('visible');
	}
}

function casillaVacia(indice) {
	return casillas[indice].dataset.jugador !== 'usuario' && casillas[indice].dataset.jugador !== 'sistema'; 
}

function lugarVacio() {
	let bool = false, indice = null;
	
	for (let i = 0; i < casillas.length; i++) {
		if (casillas[i].dataset.jugador === undefined) {
			bool = true;
			indice = i;
			break;
		}
	}

	return {bool, indice}
}

function ponerSimboloDelSistema(indice) {
	casillas[indice].dataset.jugador = turno;

	setTimeout(() => {
		casillas[indice].textContent = simboloDelSistema;
		casillas[indice].classList.add('presionada');
		console.log("PRESIOADA")

		if (verificarJugadas(turno).victoria) {
			marcarJugadaGanadora(turno, verificarJugadas(turno).jugada);
			console.log("GANASTE")
	
		} else {
			turno = "usuario";
		}
	}, 160);
}

function jaque(jugador) {
	let bool = false, indice = null

	for (let i = 0; i < jugadasGanadoras.length; i++) {
		let el = jugadasGanadoras[i];
		
		if (casillas[el[0]].dataset.jugador === undefined && casillas[el[1]].dataset.jugador === jugador && casillas[el[2]].dataset.jugador === jugador) {
			bool = true;
			indice = el[0];
			break;
		} 

		if (casillas[el[0]].dataset.jugador === jugador && casillas[el[1]].dataset.jugador === undefined && casillas[el[2]].dataset.jugador === jugador) {
			bool = true;
			indice = el[1];
			break; 
		}

		if (casillas[el[0]].dataset.jugador === jugador && casillas[el[1]].dataset.jugador === jugador && casillas[el[2]].dataset.jugador === undefined) {
			bool = true;
			indice = el[2];
			break;
		}
	}

	return {bool, indice}
}

function turnoDelSistema() {
	if (lugarVacio().bool) {
		if (casillaVacia(4)) {
			ponerSimboloDelSistema(4);
		} else if (jaque("sistema").bool) {
			ponerSimboloDelSistema(jaque("sistema").indice);
		} else if (jaque("usuario").bool) {
			ponerSimboloDelSistema(jaque("usuario").indice);
		} else if (lugarVacio().bool) {
			ponerSimboloDelSistema(lugarVacio().indice);
		}

		if (!lugarVacio().bool) {
			deshabilitarCasillas();
			mostrarMensaje(true, "Empate!!, se han quedado sin espacios");
			turno = "usuario";
		}
	}	else {
		deshabilitarCasillas();
		mostrarMensaje(true, "Empate!!, se han quedado sin espacios");
	}
}

function turnoDelUsuario(e) {
	if (lugarVacio().bool) {
		casillas[e.target.dataset.index].textContent = simboloDelUsuario;
		casillas[e.target.dataset.index].classList.add('presionada');
		e.target.dataset.jugador = turno;
		jugadaDelUsuario.push(e.target.dataset.index);

		if (verificarJugadas(turno).victoria) {
			marcarJugadaGanadora(turno, verificarJugadas(turno).jugada)
		} else {
			turno = "sistema";
			turnoDelSistema();
		}
	} else {
		deshabilitarCasillas();
		mostrarMensaje(true, "Es un empate!");
		turno = "sistema";
	}
}


// Eventos
cuadricula.addEventListener('click', (e) => {
	if (e.target.classList.contains('casilla') && casillas[e.target.dataset.index].textContent === '') {
		turnoDelUsuario(e);
	}
});

btnVolverAJugar.addEventListener('click', volverAJugar);

// Llamada de funciones al iniciar
validarPuntuacionInicial();