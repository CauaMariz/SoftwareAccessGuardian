        // =============================================
        // ELEMENTOS DA TELA
        // =============================================

        const nomeAluno = document.getElementById('nomeAluno');

        const uidCartao = document.getElementById('uidCartao');

        const statusAcesso = document.getElementById('statusAcesso');

        const statusCatraca = document.getElementById('statusCatraca');

        const mensagemLeitor = document.getElementById('mensagemLeitor');

        const ultimoAluno = document.getElementById('ultimoAluno');

        const ultimoUID = document.getElementById('ultimoUID');

        const ultimoResultado = document.getElementById('ultimoResultado');

        const catracaVisual = document.getElementById('catracaVisual');

        const statusArduino = document.getElementById('statusArduino');


        // =============================================
        // FUNÇÃO PARA ATUALIZAR A CATRACA
        // =============================================

        function atualizarCatraca(status) {

            console.log(
                'Atualizando catraca:',
                status
            );


            // -----------------------------------------
            // STATUS DA CATRACA
            // -----------------------------------------

            if (statusCatraca) {

                statusCatraca.textContent = status;
            }


            // -----------------------------------------
            // REPRESENTAÇÃO VISUAL DA CATRACA
            // -----------------------------------------

            if (catracaVisual) {

                catracaVisual.textContent = status;


                // Remove classes anteriores

                catracaVisual.classList.remove(
                    'catraca-aberta',
                    'catraca-fechada'
                );


                // -----------------------------
                // CATRACA ABERTA
                // -----------------------------

                if (status === 'ABERTA') {

                    catracaVisual.classList.add(
                        'catraca-aberta'
                    );
                }


                // -----------------------------
                // CATRACA FECHADA
                // -----------------------------

                if (status === 'FECHADA') {

                    catracaVisual.classList.add(
                        'catraca-fechada'
                    );
                }
            }


            // -----------------------------------------
            // CLASSE DO STATUS
            // -----------------------------------------

            if (statusCatraca) {

                statusCatraca.classList.remove(
                    'autorizado',
                    'aguardando',
                    'negado'
                );


                if (status === 'ABERTA') {

                    statusCatraca.classList.add(
                        'autorizado'
                    );
                }


                if (status === 'FECHADA') {

                    statusCatraca.classList.add(
                        'aguardando'
                    );
                }
            }
        }


        // =============================================
        // ATUALIZAR INFORMAÇÕES DO ALUNO
        // =============================================

        function atualizarAluno(dados) {


            // -----------------------------------------
            // NOME
            // -----------------------------------------

            if (nomeAluno && dados.nome) {

                nomeAluno.textContent = dados.nome;
            }


            // -----------------------------------------
            // UID
            // -----------------------------------------

            if (uidCartao && dados.uid) {

                uidCartao.textContent = dados.uid;
            }


            // -----------------------------------------
            // STATUS DO ACESSO
            // -----------------------------------------

            if (statusAcesso && dados.status) {

                statusAcesso.textContent = dados.status;
            }


            // -----------------------------------------
            // ÚLTIMO ALUNO
            // -----------------------------------------

            if (
                ultimoAluno &&
                dados.nome
            ) {

                ultimoAluno.textContent =
                    dados.nome;
            }


            // -----------------------------------------
            // ÚLTIMO UID
            // -----------------------------------------

            if (
                ultimoUID &&
                dados.uid
            ) {

                ultimoUID.textContent =
                    dados.uid;
            }


            // -----------------------------------------
            // ÚLTIMO RESULTADO
            // -----------------------------------------

            if (
                ultimoResultado &&
                dados.status
            ) {

                ultimoResultado.textContent =
                    dados.status;
            }
        }


        // =============================================
        // RECEBER DADOS DO ELECTRON
        // =============================================

        window.accessGuardian.onAcesso(
            (dados) => {

                console.log(
                    'Dados recebidos do Electron:',
                    dados
                );


                // =====================================
                // ARDUINO CONECTADO
                // =====================================

                if (dados.tipo === 'conexao') {

                    if (statusArduino) {

                        statusArduino.textContent =
                            dados.status;
                    }

                    return;
                }


                // =====================================
                // ERRO
                // =====================================

                if (dados.tipo === 'erro') {

                    if (statusAcesso) {

                        statusAcesso.textContent =
                            dados.status;
                    }


                    if (
                        dados.nome &&
                        nomeAluno
                    ) {

                        nomeAluno.textContent =
                            dados.nome;
                    }


                    if (dados.uid && uidCartao) {

                        uidCartao.textContent =
                            dados.uid;
                    }


                    if (dados.catraca) {

                        atualizarCatraca(
                            dados.catraca
                        );
                    }

                    return;
                }


                // =====================================
                // CONSULTANDO ALUNO
                // =====================================

                if (dados.tipo === 'consultando') {

                    atualizarAluno(dados);


                    if (mensagemLeitor) {

                        mensagemLeitor.textContent =
                            'Consultando cartão...';
                    }


                    if (statusAcesso) {

                        statusAcesso.textContent =
                            'CONSULTANDO';
                    }


                    if (dados.catraca) {

                        atualizarCatraca(
                            dados.catraca
                        );
                    }

                    return;
                }


                // =====================================
                // ACESSO AUTORIZADO
                // =====================================

                if (dados.tipo === 'autorizado') {

                    atualizarAluno(dados);


                    if (mensagemLeitor) {

                        mensagemLeitor.textContent =
                            'Acesso autorizado. Aguarde a abertura da catraca.';
                    }


                    if (statusAcesso) {

                        statusAcesso.textContent =
                            'ACESSO AUTORIZADO';
                    }


                    // Neste momento ainda está fechada.
                    // O Arduino vai confirmar quando abrir.

                    if (dados.catraca) {

                        atualizarCatraca(
                            dados.catraca
                        );
                    }

                    return;
                }


                // =====================================
                // ACESSO NEGADO
                // =====================================

                if (dados.tipo === 'negado') {

                    atualizarAluno(dados);


                    if (mensagemLeitor) {

                        mensagemLeitor.textContent =
                            'Acesso negado.';
                    }


                    if (statusAcesso) {

                        statusAcesso.textContent =
                            'ACESSO NEGADO';
                    }


                    if (dados.catraca) {

                        atualizarCatraca(
                            dados.catraca
                        );
                    }

                    return;
                }


                // =====================================
                // STATUS DO ACESSO
                // =====================================

                if (dados.tipo === 'status') {

                    if (statusAcesso) {

                        statusAcesso.textContent =
                            dados.status;
                    }


                    if (dados.catraca) {

                        atualizarCatraca(
                            dados.catraca
                        );
                    }

                    return;
                }


                // =====================================
                // CATRACA
                // =====================================

                if (dados.tipo === 'catraca') {

                    atualizarCatraca(
                        dados.catraca
                    );


                    // -----------------------------
                    // CATRACA ABERTA
                    // -----------------------------

                    if (
                        dados.catraca === 'ABERTA'
                    ) {

                        if (mensagemLeitor) {

                            mensagemLeitor.textContent =
                                'Catraca aberta. Aluno autorizado.';
                        }

                        console.log(
                            'Tela: CATRACA ABERTA'
                        );
                    }


                    // -----------------------------
                    // CATRACA FECHADA
                    // -----------------------------

                    if (
                        dados.catraca === 'FECHADA'
                    ) {

                        if (mensagemLeitor) {

                            mensagemLeitor.textContent =
                                'Catraca fechada. Pronta para o próximo aluno.';
                        }

                        console.log(
                            'Tela: CATRACA FECHADA'
                        );
                    }

                    return;
                }

            }
        );

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