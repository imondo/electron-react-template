const { globalShortcut } = require('electron');

const setShortcut =  {
  openDevTools(win) {
    // 打开开发者模式
    globalShortcut.register('F11', () => {
      win.webContents.openDevTools();
    })
  }
}

module.exports = setShortcut;