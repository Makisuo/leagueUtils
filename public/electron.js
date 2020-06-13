const electron = require('electron')
const { autoUpdater } = require('electron-updater')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')

let mainWindow

function createWindow (){
	autoUpdater.checkForUpdatesAndNotify()
	app.commandLine.appendSwitch('disable-web-security')

	mainWindow = new BrowserWindow({
		'web-preferences': {
			'web-security': false,
		},
		width: 1800,
		height: 1600,
	})
	if (isDev) {
		mainWindow.webContents.openDevTools()
	}
	mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
	mainWindow.on('closed', () => (mainWindow = null))

	mainWindow.webContents.on('new-window', function (e, url){
		e.preventDefault()
		require('electron').shell.openExternal(url)
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
	}
	autoUpdater.quitAndInstall()
	app.exit()
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})
