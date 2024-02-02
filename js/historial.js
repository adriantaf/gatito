"use strict";

const btnHistorial = document.getElementById('btn-historial');
const modalHistorial = document.getElementById('modal-historial');

btnHistorial.addEventListener('click', () => cambiarModal(MODAL.historial));

class Acordeon {
	constructor() {
		this.items = [];
	}

	agregarItem(titulo, contenido) {
		this.items.push([titulo, contenido]);
	}

	renderizar() {
		console.log(9)
	}
}




document.getElementById('registro').addEventListener('click', function(e) {
	document.getElementById('registro').classList.toggle('abrir');
	document.getElementById('btn-lista').classList.toggle('abrir');
	document.getElementById('lista').classList.toggle('mostrar');
});
const data = {
	"31/01/2024": [
		{ganador: "sistema", hora: "18:09"},
		{ganador: "jugador", hora: "10:10"},
	],
	"01/02/2024": [
		{ganador: "sistema", hora: "20:09"},
		{ganador: "sistema", hora: "20:10"},
	],
}