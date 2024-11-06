const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  toogleDevTool: () => ipcRenderer.send('toogle-dev-tool'),
  goBack: () => ipcRenderer.send('go-back'),
  goForward: () => ipcRenderer.send('go-forward'),
  refresh: () => ipcRenderer.send('refresh'),

  onAddressBarUpdate: (callback) => ipcRenderer.on('update-address-bar', callback),
  canGoForward: () => ipcRenderer.invoke('can-go-forward'),
  canGoBack: () => ipcRenderer.invoke('can-go-back'),
  goToPage: (url) => ipcRenderer.invoke('go-to-page', url),
  currentUrl: () => ipcRenderer.invoke('current-url'),

  crawlingbutton: () => {
    const links = Array.from(document.querySelectorAll('a'))
                       .map((a) => a.href)
                       .filter((href) => href.startsWith('http'));
    return links;
  }

})
