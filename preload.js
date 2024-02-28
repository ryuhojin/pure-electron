// Preload (Isolated World)
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
    'electron',
    {
        receiveLocal: (url, callbacks) => ipcRenderer.on(url, callbacks)
    }
)