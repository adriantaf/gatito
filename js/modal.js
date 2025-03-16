"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const BODY = document.body;
  const templateModal = document.getElementById("template-modal");

  function showModal(message) {
    const clone = templateModal.content.cloneNode(true);
    clone.getElementById("txt-mensaje").textContent = message;
    clone.getElementById("btn-volver-a-jugar").addEventListener("click", () => {
      volverAJugar();
      closeModal();
    });
    console.log(clone.firstElementChild);

    BODY.prepend(clone.firstElementChild);
  }

  function closeModal() {
    const modal = document.getElementById("modal");
    if (modal) {
      modal.remove();
    }
  }
});
