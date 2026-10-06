//Script sobre tela email
    const email = document.getElementById("emailSobreTelaEmail");
    const campo = document.querySelector(".campoSobreTelaEmail");
    const btnCliqueAqui = document.querySelector(".btnCliqueAqui");
    const btnFecharSobreTelaEmail = document.querySelector(".btnFecharSobreTelaEmail");

    btnCliqueAqui.addEventListener("click", () => {
        campo.classList.add("ativoCampoSobreTelaEmail");
         campo.style.display = "block";
    })

    btnFecharSobreTelaEmail.addEventListener("click", () => {
        campo.classList.remove("ativoCampoSobreTelaEmail");
        campo.style.display = "none";
    })
