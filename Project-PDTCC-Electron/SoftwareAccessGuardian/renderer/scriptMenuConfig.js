const btnConfig = document.getElementById("btnConfigMenu");
const campoConfig = document.getElementById("campoConfig");
const btnFecharMenu = document.getElementById("btnFecharMenu");

if (btnConfig && campoConfig) {
    btnConfig.addEventListener("click", () => {
        campoConfig.classList.add("aberto");
        campoConfig.setAttribute("aria-hidden", "false");
    });
}

if (btnFecharMenu && campoConfig) {
    btnFecharMenu.addEventListener("click", () => {
        campoConfig.classList.remove("aberto");
        campoConfig.setAttribute("aria-hidden", "true");
    });
}