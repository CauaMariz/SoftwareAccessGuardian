
require('dotenv').config();

const {
    ipcMain,
    app,
    BrowserWindow,
    nativeTheme,
    screen
} = require('electron');

const { randomInt } = require('node:crypto');
const path = require('node:path');

// Repositório de login
const { loginUser } = require('./database/loginRepository.js');

// Repositório de recuperação de senha
const {
    verificarEmailGestorSeguranca,
    salvarCodigoRecuperacao,
    validarCodigoRecuperacao,
    atualizarSenhaRecuperacao
} = require('./database/recuperacaoSenha');

// Serviço de envio de e-mail
const { enviarCodigoEmail } = require('./services/emailService');

let janelaSeguranca;

// ==================================================
// CRIAÇÃO DA JANELA PRINCIPAL
// ==================================================

function janelaInicio() {
    const { width, height } =
        screen.getPrimaryDisplay().workAreaSize;

    janelaSeguranca = new BrowserWindow({
        width,
        height,
        autoHideMenuBar: true,

        webPreferences: {
            preload: path.join(__dirname, 'preload.cjs'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    janelaSeguranca.webContents.openDevTools({
        mode: 'detach'
    });

    janelaSeguranca.loadFile('pages/tela_do_seguranca.html');

    return janelaSeguranca;
}

// ==================================================
// INICIALIZAÇÃO DO ELECTRON E DO ARDUINO
// ==================================================

app.whenReady().then(() => {
    nativeTheme.themeSource = 'light';

    const janela = janelaInicio();

    require('./arduino/arduino.js')
        .iniciarArduino(janela);
});

// ==================================================
// LOGIN
// ==================================================

ipcMain.handle('loginUser', async (_event, dados) => {
    try {
        const user = await loginUser(
            dados.email,
            dados.senha
        );

        return {
            success: user !== null,
            user: user
        };

    } catch (erro) {
        console.error('Erro ao realizar login:', erro);

        return {
            success: false,
            error: 'Erro ao realizar login.'
        };
    }
});

// ==================================================
// SOLICITAR CÓDIGO DE RECUPERAÇÃO
// ==================================================

ipcMain.handle(
    'verificarEmailGestorSeguranca',
    async (_event, { email, tipoUser }) => {

        // Identifica em qual etapa ocorreu a falha
        let etapa = 'validar o e-mail';

        try {
            if (
                typeof email !== 'string' ||
                !email.trim() ||
                !['gestor', 'seguranca'].includes(tipoUser)
            ) {
                return {
                    sucesso: false,
                    mensagem: 'Informe um e-mail válido e selecione sua função.'
                };
            }

            email = email.trim();

            // 1. Verifica se o e-mail existe
            const situacao =
                await verificarEmailGestorSeguranca(email, tipoUser);

            if (!situacao) {
                return {
                    sucesso: false,
                    mensagem: 'E-mail não encontrado.'
                };
            }

            // 2. Gera o código de seis dígitos
            etapa = 'gerar o código';

            const codigo = randomInt(100000, 1000000).toString();

            // 3. Salva o código e sua validade no banco
            etapa = 'salvar o código no banco de dados';

            const salvo = await salvarCodigoRecuperacao(
                email,
                tipoUser,
                codigo
            );

            if (!salvo) {
                return {
                    sucesso: false,
                    mensagem: 'Não foi possível salvar o código de recuperação.'
                };
            }

            // 4. Envia o código por e-mail
            etapa = 'enviar o e-mail';

            await enviarCodigoEmail(email, codigo);

            console.log(
                'Código de recuperação enviado com sucesso.'
            );

            return {
                sucesso: true,
                mensagem: 'Código enviado com sucesso.'
            };

        } catch (erro) {
            console.error(
                `Erro ao ${etapa}:`,
                erro
            );

            return {
                sucesso: false,
                mensagem: `Falha ao ${etapa}. Consulte o terminal do Electron.`
            };
        }
    }
);

// ==================================================
// VALIDAR CÓDIGO DE RECUPERAÇÃO
// ==================================================

ipcMain.handle(
    'validarCodigoRecuperacao',
    async (_event, { email, tipoUser, codigo }) => {

        try {
            if (
                typeof email !== 'string' ||
                typeof codigo !== 'string' ||
                !['gestor', 'seguranca'].includes(tipoUser)
            ) {
                return {
                    sucesso: false,
                    mensagem: 'Dados de recuperação inválidos.'
                };
            }

            const valido = await validarCodigoRecuperacao(
                email.trim(),
                tipoUser,
                codigo.trim()
            );

            return {
                sucesso: valido,
                mensagem: valido
                    ? 'Código válido.'
                    : 'Código inválido ou expirado.'
            };

        } catch (erro) {
            console.error(
                'Erro na validação do código de recuperação:',
                erro
            );

            return {
                sucesso: false,
                mensagem: 'Erro ao validar o código. Consulte o terminal.'
            };
        }
    }
);

// ==================================================
// ATUALIZAR SENHA
// ==================================================

ipcMain.handle(
    'atualizarSenhaRecuperacao',
    async (_event, { email, tipoUser, codigo, novaSenha }) => {

        try {
            if (
                typeof email !== 'string' ||
                typeof codigo !== 'string' ||
                typeof novaSenha !== 'string' ||
                !['gestor', 'seguranca'].includes(tipoUser)
            ) {
                return {
                    sucesso: false,
                    mensagem: 'Dados de recuperação inválidos.'
                };
            }

            if (novaSenha.length < 8) {
                return {
                    sucesso: false,
                    mensagem: 'A senha deve ter pelo menos 8 caracteres.'
                };
            }

            const atualizado = await atualizarSenhaRecuperacao(
                email.trim(),
                tipoUser,
                codigo.trim(),
                novaSenha
            );

            return {
                sucesso: atualizado,
                mensagem: atualizado
                    ? 'Senha atualizada com sucesso.'
                    : 'Código inválido ou expirado. Solicite outro.'
            };

        } catch (erro) {
            console.error(
                'Erro na atualização da senha:',
                erro
            );

            return {
                sucesso: false,
                mensagem: 'Erro ao atualizar a senha. Consulte o terminal.'
            };
        }
    }
);
