import {
  app,
  BrowserWindow,
  ipcMain as ipc,
  dialog
} from 'electron'
import path from 'path'
import url from 'url'

let win

function createWindow() {
  win = new BrowserWindow({width: 800, height: 600})
  win.loadURL(url.format({
    pathname: path.join(__dirname, './dist/home.html'),
    protocol: 'file',
    slashes: true
  }))
  win.webContents.openDevTools()
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

ipc.on('save-dialog', (event) => {
  const options = {
    title: 'Save an Image',
    filters: [
      { name: 'Images', extensions: ['jpg', 'png', 'gif']}
    ]
  }
  dialog.showSaveDialog(options, (filename) => {
    event.sender.send('saved-file', filename)
  })
})

console.log("app start!")



