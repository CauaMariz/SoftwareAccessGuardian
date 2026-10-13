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
    
    solicitarCodigoRecuperacao: (dados) =>
    ipcRenderer.invoke('solicitarCodigoRecuperacao', dados),

     loginUser: (email, senha) => {

        return ipcRenderer.invoke('loginUser', {
            email,
            senha
        });

    }
});