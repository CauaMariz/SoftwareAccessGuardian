require('dotenv').config();

const { SerialPort } = require('serialport');
const { getAlunoUID } = require('../database/repositoryCartao');

let porta;
let buffer = '';
let janelaSeguranca = null;


// =============================================
// INICIAR COMUNICAÇÃO COM O ARDUINO
// =============================================

function iniciarArduino(janela) {

    janelaSeguranca = janela;

    console.log(
        'Iniciando Arduino na porta:',
        process.env.arduino_port
    );

    porta = new SerialPort({
        path: process.env.arduino_port,
        baudRate: parseInt(process.env.arduino_baudrate)
    });


    // =============================================
    // ARDUINO CONECTADO
    // =============================================

    porta.on('open', () => {

        console.log(
            'Arduino conectado em:',
            process.env.arduino_port
        );

        enviarTela({
            tipo: 'conexao',
            status: 'Arduino conectado'
        });
    });


    // =============================================
    // ERRO NA COMUNICAÇÃO
    // =============================================

    porta.on('error', (erro) => {

        console.error(
            'Erro na comunicação com Arduino:',
            erro.message
        );

        enviarTela({
            tipo: 'erro',
            status: 'Erro na comunicação com Arduino'
        });
    });


    // =============================================
    // DADOS RECEBIDOS DO ARDUINO
    // =============================================

    porta.on('data', async (dados) => {

        buffer += dados.toString();

        const linhas = buffer.split('\n');

        buffer = linhas.pop();


        for (const linha of linhas) {

            const mensagem = linha.trim();

            if (!mensagem) {
                continue;
            }


            console.log('Arduino:', mensagem);


            // =============================================
            // UID DO CARTÃO
            // =============================================

            if (mensagem.startsWith('UID:')) {

                const uid = mensagem
                    .replace('UID:', '')
                    .trim()
                    .toUpperCase();


                console.log('================================');
                console.log('UID RECEBIDO:', uid);
                console.log('================================');


                // -----------------------------------------
                // MOSTRA NA TELA QUE ESTÁ CONSULTANDO
                // -----------------------------------------

                enviarTela({

                    tipo: 'consultando',

                    uid: uid,

                    nome: 'Consultando aluno...',

                    status: 'CONSULTANDO',

                    catraca: 'FECHADA'
                });


                try {

                    // -----------------------------------------
                    // CONSULTA O BANCO DE DADOS
                    // -----------------------------------------

                    const aluno = await getAlunoUID(uid);


                    // =========================================
                    // ALUNO ENCONTRADO
                    // =========================================

                    if (aluno) {

                        console.log(
                            'Acesso autorizado:',
                            aluno.nome_aluno
                        );


                        // -------------------------------------
                        // MOSTRA OS DADOS DO ALUNO
                        // -------------------------------------

                        enviarTela({

                            tipo: 'autorizado',

                            uid: uid,

                            nome: aluno.nome_aluno,

                            rm: aluno.rm,

                            status: 'ACESSO AUTORIZADO',

                            // Ainda não dizemos que abriu.
                            // O Arduino irá confirmar.
                            catraca: 'FECHADA'
                        });


                        // -------------------------------------
                        // MANDA O COMANDO PARA O ARDUINO
                        // -------------------------------------

                        enviarArduino('ABRIR');

                    }


                    // =========================================
                    // ALUNO NÃO ENCONTRADO
                    // =========================================

                    else {

                        console.log('Acesso negado.');


                        enviarArduino('NEGADO');


                        enviarTela({

                            tipo: 'negado',

                            uid: uid,

                            nome: 'Aluno não encontrado',

                            rm: '-',

                            status: 'ACESSO NEGADO',

                            catraca: 'FECHADA'
                        });
                    }

                }


                // =========================================
                // ERRO NO BANCO DE DADOS
                // =========================================

                catch (erro) {

                    console.error(
                        'Erro ao consultar o banco:',
                        erro
                    );


                    enviarArduino('NEGADO');


                    enviarTela({

                        tipo: 'erro',

                        uid: uid,

                        nome: '-',

                        rm: '-',

                        status: 'ERRO AO CONSULTAR BANCO',

                        catraca: 'FECHADA'
                    });
                }
            }


            // =============================================
            // CATRACA ABERTA
            // =============================================

            else if (mensagem === 'CATRACA_ABERTA') {

                console.log('================================');
                console.log('CATRACA ABERTA');
                console.log('================================');


                enviarTela({

                    tipo: 'catraca',

                    catraca: 'ABERTA'
                });
            }


            // =============================================
            // CATRACA FECHADA
            // =============================================

            else if (mensagem === 'CATRACA_FECHADA') {

                console.log('================================');
                console.log('CATRACA FECHADA');
                console.log('================================');


                enviarTela({

                    tipo: 'catraca',

                    catraca: 'FECHADA'
                });
            }


            // =============================================
            // ACESSO AUTORIZADO CONFIRMADO PELO ARDUINO
            // =============================================

            else if (mensagem === 'ACESSO_AUTORIZADO') {

                console.log(
                    'Arduino confirmou acesso autorizado.'
                );


                enviarTela({

                    tipo: 'status',

                    status: 'ACESSO AUTORIZADO'
                });
            }


            // =============================================
            // ACESSO NEGADO CONFIRMADO PELO ARDUINO
            // =============================================

            else if (mensagem === 'ACESSO_NEGADO') {

                console.log(
                    'Arduino confirmou acesso negado.'
                );


                enviarTela({

                    tipo: 'status',

                    status: 'ACESSO NEGADO',

                    catraca: 'FECHADA'
                });
            }
        }
    });
}


// =============================================
// ENVIAR DADOS PARA A TELA DO SEGURANÇA
// =============================================

function enviarTela(dados) {

    if (
        janelaSeguranca &&
        !janelaSeguranca.isDestroyed()
    ) {

        janelaSeguranca.webContents.send(
            'acesso-rfid',
            dados
        );
    }
}


// =============================================
// ENVIAR COMANDO PARA O ARDUINO
// =============================================

function enviarArduino(comando) {

    if (!porta || !porta.isOpen) {

        console.error(
            'Arduino não está conectado.'
        );

        return;
    }


    console.log(
        'Enviando para Arduino:',
        comando
    );


    porta.write(
        `${comando}\n`,
        (erro) => {

            if (erro) {

                console.error(
                    'Erro ao enviar comando:',
                    erro.message
                );
            }
        }
    );
}


// =============================================
// EXPORTAÇÕES
// =============================================

module.exports = {

    iniciarArduino,

    enviarArduino,

    porta: () => porta
};