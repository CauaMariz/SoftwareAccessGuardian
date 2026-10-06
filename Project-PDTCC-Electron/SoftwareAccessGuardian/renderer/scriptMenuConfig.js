let btnConfig = document.getElementById("btnConfig");
let campoConfig = document.querySelector(".campoConfig");
let btnFecharMenu = document.querySelector('#btnFecharMenu');
btnConfig.addEventListener("click", function () {
  campoConfig.classList.add('ativo');
  btnConfig.style.display = 'none';
});
btnFecharMenu.addEventListener('click', () => {
    campoConfig.classList.remove('ativo');
    btnConfig.style.display = 'block';
});