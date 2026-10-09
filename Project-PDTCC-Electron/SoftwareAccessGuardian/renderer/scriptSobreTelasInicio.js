//Script sobre tela email
const email = document.getElementById("emailSobreTelaEmail");
const campoEmail = document.querySelector(".campoSobreTelaEmail");
const btnCliqueAqui = document.querySelector(".btnCliqueAqui");
const btnFecharSobreTelaEmail = document.querySelector(".btnFecharSobreTelaEmail");
const enviarCodigoSobreTelaEmail = document.querySelector(".enviarCodigoSobreTelaEmail");

btnCliqueAqui.addEventListener("click", () => {
    campoEmail.classList.add("ativoCampoSobreTelaEmail");
    campoEmail.style.display = "block";
})

btnFecharSobreTelaEmail.addEventListener("click", () => {
    campoEmail.classList.remove("ativoCampoSobreTelaEmail");
    campoEmail.style.display = "none";
})

//Script sobre tela código

const btnConfirmarSobreTelaCodigo = document.querySelector(".btnConfirmarSobreTelaCodigo");
const campoCodigo = document.querySelector(".campoSobreTelaCodigo");
const codigo = document.getElementById("codigoSobreTelaCodigo");

enviarCodigoSobreTelaEmail.addEventListener("click", () => {
    if (email.checkValidity()) {
        const btnFecharSobreTelaCodigo = document.querySelector(".btnFecharSobreTelaCodigo");

        campoCodigo.classList.add("ativoCampoSobreTelaEmail");
        campoCodigo.style.display = "block";
        campoEmail.style.display = "none";

        btnFecharSobreTelaCodigo.addEventListener("click", () => {
            campoCodigo.classList.remove("ativoCampoSobreTelaCodigo");
            campoCodigo.style.display = "none";
        })
    }
    else {
        email.reportValidity();
    }
})


const senhaSobreTelaSenha = document.getElementById("senhaSobreTelaSenha");
const confirmaSenhaSobreTelaSenha = document.getElementById("confirmaSenhaSobreTelaSenha");

function validarNovaSenha() {

    const senhasValidas =
        senhaSobreTelaSenha.value === confirmaSenhaSobreTelaSenha.value;

    const tamanhoValido =
        senhaSobreTelaSenha.value.length >= 8 &&
        confirmaSenhaSobreTelaSenha.value.length >= 8;

    if (
        senhaSobreTelaSenha.checkValidity() &&
        confirmaSenhaSobreTelaSenha.checkValidity() &&
        tamanhoValido &&
        senhasValidas
    ) {
        return true;
    }

    return false;
}

//Script sobre tela senha

btnConfirmarSobreTelaCodigo.addEventListener("click", () => {
    if (/^[0-9]{6}$/.test(codigo.value)) {
        const campoSobreTelaSenha = document.querySelector(".campoSobreTelaSenha");
        const btnFecharSobreTelaSenha = document.querySelector(".btnFecharSobreTelaSenha");
        const btnVoltarLoginSobreTelaCodigo = document.querySelector(".btnVoltarLoginSobreTelaCodigo");

        campoSobreTelaSenha.classList.add("ativoCampoSobreTelaSenha");
        campoSobreTelaSenha.style.display = "block";
        campoCodigo.style.display = "none";

        btnFecharSobreTelaSenha.addEventListener("click", () => {
            campoSobreTelaSenha.classList.remove("ativoCampoSobreTelaSenha");
            campoSobreTelaSenha.style.display = "none";
        })

        btnVoltarLoginSobreTelaCodigo.addEventListener("click", (event) => {
            event.preventDefault();
            if (validarNovaSenha()) {
                location.href = "inicio.html";
            }
            else {
                alert("As senhas não coincidem ou não atendem aos critérios de validação.");
            }
        });
    }
    else {
        alert("Digite exatamente 6 números de 0 a 9.");
        return;
    }
})

