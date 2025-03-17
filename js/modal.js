"use strict";

import { volverAJugar } from "./logica_juego.js";

const BODY = document.body;
const templateModal = document.getElementById("template-modal");

export function showModal(message) {
  const clone = templateModal.content.cloneNode(true);
  clone.getElementById("txt-mensaje").textContent = message;
  clone.getElementById("btn-volver-a-jugar").addEventListener("click", () => {
    volverAJugar();
    closeModal();
  });

  BODY.prepend(clone.firstElementChild);
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.remove();
  }
}
