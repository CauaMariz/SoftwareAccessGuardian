const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('accessGuardian', {
    onAcesso: (callback) => {
        ipcRenderer.on(
            'acesso-rfid',
            (event, dados) => {
                callback(dados);
            }
        );
    },
    
    verificarEmailGestorSeguranca: (dados) =>
    ipcRenderer.invoke('verificarEmailGestorSeguranca', dados),

    solicitarCodigoRecuperacao: (dados) =>
    ipcRenderer.invoke('verificarEmailGestorSeguranca', dados),

    validarCodigoRecuperacao: (dados) =>
        ipcRenderer.invoke('validarCodigoRecuperacao', dados),

    atualizarSenhaRecuperacao: (dados) =>
        ipcRenderer.invoke('atualizarSenhaRecuperacao', dados),

     loginUser: (email, senha) => {

        return ipcRenderer.invoke('loginUser', {
            email,
            senha
        });

    }
});