
 // Script sobre tela email

const campoInputEmail = document.getElementById("emailSobreTelaEmail");
const campoEmail = document.querySelector(".campoSobreTelaEmail");
const btnCliqueAqui = document.querySelector(".btnCliqueAqui");
const btnFecharSobreTelaEmail = document.querySelector(".btnFecharSobreTelaEmail");
const enviarCodigoSobreTelaEmail = document.querySelector(".enviarCodigoSobreTelaEmail");
const funcao = document.getElementById("funcao");

// Dados mantidos durante as etapas da recuperação
let emailRecuperacao = "";
let tipoUserRecuperacao = "";
let codigoRecuperacao = "";

// Abrir tela de recuperação
btnCliqueAqui.addEventListener("click", () => {
    campoEmail.classList.add("ativoCampoSobreTelaEmail");
    campoEmail.style.display = "block";
});

// Fechar tela de e-mail
btnFecharSobreTelaEmail.addEventListener("click", () => {
    campoEmail.classList.remove("ativoCampoSobreTelaEmail");
    campoEmail.style.display = "none";
});

// Script sobre tela código

const btnConfirmarSobreTelaCodigo = document.querySelector(".btnConfirmarSobreTelaCodigo");
const campoCodigo = document.querySelector(".campoSobreTelaCodigo");
const inputCodigo = document.getElementById("codigoSobreTelaCodigo");

// Solicitar e-mail com código de recuperação
enviarCodigoSobreTelaEmail.addEventListener("click", async () => {
    emailRecuperacao = campoInputEmail.value.trim();
    tipoUserRecuperacao = funcao.value;

    if (!campoInputEmail.checkValidity()) {
        campoInputEmail.reportValidity();
        return;
    }

    if (!tipoUserRecuperacao) {
        alert("Selecione sua função.");
        return;
    }

    try {
        const resposta = await window.accessGuardian.solicitarCodigoRecuperacao({
            email: emailRecuperacao,
            tipoUser: tipoUserRecuperacao
        });

        if (!resposta.sucesso) {
            alert(resposta.mensagem);
            return;
        }

        alert("Código enviado para seu e-mail.");

        campoCodigo.classList.add("ativoCampoSobreTelaCodigo");
        campoCodigo.style.display = "block";
        campoEmail.style.display = "none";

    } catch (erro) {
        console.error("Erro ao solicitar código:", erro);
        alert("Não foi possível enviar o código de recuperação.");
    }
});

// Fechar tela do código
const btnFecharSobreTelaCodigo = document.querySelector(".btnFecharSobreTelaCodigo");

btnFecharSobreTelaCodigo.addEventListener("click", () => {
    campoCodigo.classList.remove("ativoCampoSobreTelaCodigo");
    campoCodigo.style.display = "none";
});

// Script sobre tela senha

const campoSobreTelaSenha = document.querySelector(".campoSobreTelaSenha");
const senhaSobreTelaSenha = document.getElementById("senhaSobreTelaSenha");
const confirmaSenhaSobreTelaSenha = document.getElementById("confirmaSenhaSobreTelaSenha");
const btnFecharSobreTelaSenha = document.querySelector(".btnFecharSobreTelaSenha");
const btnVoltarLoginSobreTelaCodigo = document.querySelector(".btnVoltarLoginSobreTelaCodigo");

// Validar a nova senha
function validarNovaSenha() {
    const senhasValidas =
        senhaSobreTelaSenha.value === confirmaSenhaSobreTelaSenha.value;

    const tamanhoValido =
        senhaSobreTelaSenha.value.length >= 8 &&
        confirmaSenhaSobreTelaSenha.value.length >= 8;

    return (
        senhaSobreTelaSenha.checkValidity() &&
        confirmaSenhaSobreTelaSenha.checkValidity() &&
        tamanhoValido &&
        senhasValidas
    );
}

// Confirmar código digitado
async function confirmarCodigo() {
    codigoRecuperacao = inputCodigo.value.trim();

    if (!/^[0-9]{6}$/.test(codigoRecuperacao)) {
        alert("Digite exatamente 6 números de 0 a 9.");
        return;
    }

    try {
        const resposta = await window.accessGuardian.validarCodigoRecuperacao({
            email: emailRecuperacao,
            tipoUser: tipoUserRecuperacao,
            codigo: codigoRecuperacao
        });

        console.log("Resposta da validação:", resposta);

        if (!resposta.sucesso) {
            alert(resposta.mensagem);
            return;
        }

        campoSobreTelaSenha.classList.add("ativoCampoSobreTelaSenha");
        campoSobreTelaSenha.style.display = "block";
        campoCodigo.style.display = "none";

    } catch (erro) {
        console.error("Erro ao validar código:", erro);
        alert("Não foi possível validar o código.");
    }
}

btnConfirmarSobreTelaCodigo.addEventListener("click", confirmarCodigo);

// Fechar tela da nova senha
btnFecharSobreTelaSenha.addEventListener("click", () => {
    campoSobreTelaSenha.classList.remove("ativoCampoSobreTelaSenha");
    campoSobreTelaSenha.style.display = "none";
});

// Salvar a nova senha
btnVoltarLoginSobreTelaCodigo.addEventListener("click", async (event) => {
    event.preventDefault();

    if (!validarNovaSenha()) {
        alert("As senhas não coincidem ou não atendem aos critérios. A senha deve ter pelo menos 8 caracteres.");
        return;
    }

    try {
        const resposta = await window.accessGuardian.atualizarSenhaRecuperacao({
            email: emailRecuperacao,
            tipoUser: tipoUserRecuperacao,
            codigo: codigoRecuperacao,
            novaSenha: senhaSobreTelaSenha.value
        });

        console.log("Resposta da alteração de senha:", resposta);

        if (!resposta.sucesso) {
            alert(resposta.mensagem);
            return;
        }

        alert("Senha alterada com sucesso!");

        window.location.href = "inicio.html";

    } catch (erro) {
        console.error("Erro ao atualizar senha:", erro);
        alert("Não foi possível alterar a senha.");
    }
});
