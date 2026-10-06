const { ipcMain, app, BrowserWindow, nativeTheme, screen } = require('electron');

const path = require('path');

const { loginUser } = require('./database/loginRepository.js');

let janelaSeguranca;

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

    janelaSeguranca.loadFile(
        'pages/inicio.html'
    );

    return janelaSeguranca;
}

app.whenReady().then(() => {

    nativeTheme.themeSource = 'light';

    // Primeiro cria a janela
    const janela = janelaInicio();

    // Depois inicia a comunicação com o Arduino
    require('./arduino/arduino.js')
        .iniciarArduino(janela);
});

// Cria um handler para o canal IPC 'loginUser'.
// Recebe email e senha, consulta o banco e retorna o resultado.
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

    } catch (error) {

        console.error('Erro ao realizar login:', error);

        return {
            success: false,
            error: 'Erro ao realizar login'
        };
    }
});