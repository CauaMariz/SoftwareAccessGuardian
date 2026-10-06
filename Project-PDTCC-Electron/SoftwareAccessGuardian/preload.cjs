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
    
     loginUser: (email, senha) => {

        return ipcRenderer.invoke('loginUser', {
            email,
            senha
        });

    }
});