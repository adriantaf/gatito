'use strict';

const btnAjustes = document.getElementById('btn-ajustes');
const btnHistorial = document.getElementById('btn-historial');
const btnGuardarCambios = document.getElementById('btn-guardar-cambios');
const inputNombreUsuario = document.getElementById('input-nombre-usuario');
const modalAjustes = document.getElementById('modal-ajustes');
const modalHistorial = document.getElementById('modal-historial');

const MODAL = Object.freeze({
	ajustes: "ajustes",
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
	if (opcion === MODAL.ajustes) {

		if (!modalAjustes.classList.contains('mostrar')) {
			if (modalHistorial.classList.contains('mostrar')) {
				ocultarModal(modalHistorial, btnHistorial);
			}

			mostrarModal(modalAjustes, btnAjustes);
		} else {
			ocultarModal(modalAjustes, btnAjustes);
		}

	} else if (opcion === MODAL.historial) {
		if (!modalHistorial.classList.contains('mostrar')) {
			if (modalAjustes.classList.contains('mostrar')) {
				ocultarModal(modalAjustes, btnAjustes)
			}

			mostrarModal(modalHistorial, btnHistorial);
		} else {
			ocultarModal(modalHistorial, btnHistorial);
		}
	}
}

btnAjustes.addEventListener('click', (e) => cambiarModal(MODAL.ajustes));
btnHistorial.addEventListener('click', (e) => cambiarModal(MODAL.historial));
cambiarModal(MODAL.historial)