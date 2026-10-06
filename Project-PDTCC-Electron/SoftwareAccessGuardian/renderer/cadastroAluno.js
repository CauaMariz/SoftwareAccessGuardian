const formulario = document.getElementById("formCadastro");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const cpf = document.getElementById("cpf").value;
    const telefone = document.getElementById("tel").value;
    const rm = document.getElementById("rm").value;
    const senha = document.getElementById("senha").value;

    if (
        nome === "" ||
        email === "" ||
        cpf === "" ||
        telefone === "" ||
        rm === "" ||
        senha === ""
    ) {

        alert("Preencha todos os campos!");

        return;
    }

    alert("Aluno cadastrado com sucesso!");

});