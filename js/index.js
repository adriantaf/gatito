'use strict';

const MODAL = Object.freeze({
	historial: "historial"
});
const ESTADO_MODAL = Object.freeze({
	oculto: "oculto",
	presente: "presente"
});


function mostrarModal(modal, boton) {
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: "smooth",
	});
	document.body.style.overflow = "hidden";
	modal.classList.add('mostrar');
	boton.classList.add('activado');
}

function ocultarModal(modal, boton) {
	document.body.style.overflow = "auto";
	modal.classList.remove('mostrar');
	boton.classList.remove('activado');
}

function cambiarModal(opcion) {
	if (opcion === MODAL.historial) {
		if (!modalHistorial.classList.contains('mostrar')) {
			mostrarModal(modalHistorial, btnHistorial);
		} else {
			ocultarModal(modalHistorial, btnHistorial);
		}
	}
}