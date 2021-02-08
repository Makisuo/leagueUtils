import { app, ipcMain } from 'electron'
import serve from 'electron-serve'

import { createWindow } from './helpers'

import { appUpdater } from './autoUpdater'

const isProd: boolean = process.env.NODE_ENV === 'production'

declare global {
	interface Window {
		ipcRenderer: any
		electron: any
	}
}

if (isProd) {
	serve({ directory: 'app' })
} else {
	app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
	await app.whenReady()

	const mainWindow = createWindow('main', {
		width: 1000,
		height: 600,
		minWidth: 800,
		minHeight: 600,
	})

	mainWindow.setMenuBarVisibility(false)

	if (isProd) {
		await mainWindow.loadURL('app://./index.html')
		appUpdater()
	} else {
		const port = process.argv[2]
		await mainWindow.loadURL(`http://localhost:${port}/`)
		mainWindow.webContents.openDevTools()
	}
})()

app.on('window-all-closed', () => {
	app.quit()
})
