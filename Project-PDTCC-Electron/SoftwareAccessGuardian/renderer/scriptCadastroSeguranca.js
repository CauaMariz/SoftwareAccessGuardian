const form = document.getElementById("formCadastro");
const cpf = document.getElementById("cpf");
const telefone = document.getElementById("telefone");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");
const mensagem = document.getElementById("mensagem");
const linkLogin = document.getElementById("linkLogin");

cpf.addEventListener("input", function () {
    let valor = this.value.replace(/\D/g, "").slice(0, 11);

    if (valor.length > 9) {
        valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");
    } else if (valor.length > 6) {
        valor = valor.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    } else if (valor.length > 3) {
        valor = valor.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    }

    this.value = valor;
});

telefone.addEventListener("input", function () {
    let valor = this.value.replace(/\D/g, "").slice(0, 11);

    if (valor.length > 10) {
        valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (valor.length > 6) {
        valor = valor.replace(/(\d{2})(\d{4})(\d{1,4})/, "($1) $2-$3");
    } else if (valor.length > 2) {
        valor = valor.replace(/(\d{2})(\d{1,5})/, "($1) $2");
    }

    this.value = valor;
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
        mensagem.textContent = "Preencha todos os campos.";
        mensagem.style.color = "#c62828";
        form.reportValidity();
        return;
    }

    if (senha.value !== confirmarSenha.value) {
        mensagem.textContent = "As senhas não coincidem.";
        mensagem.style.color = "#c62828";
        confirmarSenha.focus();
        return;
    }

    mensagem.textContent = "Cadastro realizado com sucesso.";
    mensagem.style.color = "#2e7d32";

    form.reset();
});

linkLogin.addEventListener("click", function (event) {
    event.preventDefault();
});