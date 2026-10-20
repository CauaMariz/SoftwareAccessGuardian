const btnConfig = document.getElementById("btnConfigMenu");
const campoConfig = document.getElementById("campoConfig2");
const btnFecharMenu = document.getElementById("btnFecharMenu");

if (btnConfig && campoConfig) {
    btnConfig.addEventListener("click", () => {
        campoConfig.classList.add("ativo");
        campoConfig.setAttribute("aria-hidden", "false");
    });
}

if (btnFecharMenu && campoConfig) {
    btnFecharMenu.addEventListener("click", () => {
        campoConfig.classList.remove("ativo");
        campoConfig.setAttribute("aria-hidden", "true");
    });
}