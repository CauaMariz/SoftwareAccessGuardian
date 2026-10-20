
(() => {
    document.addEventListener("DOMContentLoaded", () => {
        const menu = document.getElementById("menuLateral");
        const btnAlternar = document.getElementById("btnAlternarMenu");
        const overlay = document.getElementById("menuOverlay");

        const btnConfig = document.getElementById("btnConfigMenu");
        const painelConfig = document.getElementById("campoConfig");
        const btnFecharConfig = document.getElementById("btnFecharMenu");

        

        const btnSobre = document.getElementById("btnSobreNos");
        const btnSuporte = document.getElementById("btnSuporte");

        const painelSobre = document.getElementById("painelSobreNos");
        const painelSuporte = document.getElementById("painelSuporte");

        const modoIluminacao = document.getElementById("modoIluminacao");

        function fecharPaineis() {
            [painelConfig, painelSobre, painelSuporte].forEach((painel) => {
                if (painel) {
                    painel.classList.remove("aberto");
                    painel.setAttribute("aria-hidden", "true");
                }
            });

            if (overlay) {
                overlay.classList.remove("visivel");
            }
        }

        function abrirPainel(painel) {
            if (!painel) return;

            fecharPaineis();

            // Reinicia a rolagem interna do painel.
            painel.scrollTop = 0;

            painel.classList.add("aberto");
            painel.setAttribute("aria-hidden", "false");

            if (overlay) {
                overlay.classList.add("visivel");
            }
        }

        // Recolher e expandir o menu lateral.
        if (btnAlternar && menu) {
            btnAlternar.addEventListener("click", () => {
                const recolhido = menu.classList.toggle("recolhido");

                document.body.classList.toggle("menu-recolhido", recolhido);

                btnAlternar.setAttribute("aria-expanded", String(!recolhido));
                btnAlternar.setAttribute(
                    "aria-label",
                    recolhido ? "Expandir menu" : "Recolher menu"
                );

                btnAlternar.title = recolhido
                    ? "Expandir menu"
                    : "Recolher menu";

                const seta = document.getElementById("setaMenu");

                if (seta) {
                    seta.textContent = recolhido ? "›" : "‹";
                }
            });
        }

        // Abrir Sobre nós.
        if (btnSobre) {
            btnSobre.addEventListener("click", () => {
                abrirPainel(painelSobre);
            });
        }

        // Abrir Suporte.
        if (btnSuporte) {
            btnSuporte.addEventListener("click", () => {
                abrirPainel(painelSuporte);
            });
        }

        // Fechar ao clicar no fundo escurecido.
        if (overlay) {
            overlay.addEventListener("click", fecharPaineis);
        }

        // Fechar pelos botões dos painéis.
        document.querySelectorAll("[data-fechar-painel]").forEach((botao) => {
            botao.addEventListener("click", fecharPaineis);
        });

        // Fechar com a tecla Esc.
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                fecharPaineis();
            }
        });

        // Alternar o tema de iluminação.
        if (modoIluminacao) {
            modoIluminacao.addEventListener("change", () => {
                document.body.classList.toggle(
                    "tema-escuro",
                    modoIluminacao.value === "escuro"
                );
            });
        }
    });
})();
