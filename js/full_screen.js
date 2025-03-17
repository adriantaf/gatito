"use strict";

export const btnFullScreen = document.getElementById("btn-fullscreen");

btnFullScreen.addEventListener("click", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
});

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    btnFullScreen.classList.add("activado");
  } else {
    btnFullScreen.classList.remove("activado");
  }
});
