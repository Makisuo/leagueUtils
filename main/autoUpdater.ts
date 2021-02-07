import os from 'os'
import { app, dialog } from 'electron'
import { autoUpdater } from 'electron-updater'
const version = app.getVersion()
const platform = os.platform() + '_' + os.arch() // usually returns darwin_64

const updaterFeedURL = `https://league-utils-release.herokuapp.com/update?version=${version}&platform=${platform}`

export function appUpdater() {
	const log = require('electron-log')
	log.transports.file.level = 'debug'
	autoUpdater.logger = log

	autoUpdater.on('error', (err) => {
		dialog.showMessageBox({
			type: 'error',
			title: 'There was an error updating...',
			message: err,
		})
	})

	autoUpdater.on('update-available', () => {
		dialog
			.showMessageBox({
				type: 'info',
				title: 'Found Updates',
				message: 'Found updates, do you want update now?',
				buttons: ['Sure', 'No'],
			})
			.then(({ response }) => {
				if (response === 0) {
					autoUpdater.downloadUpdate()
				}
			})
	})

	// Ask the user if update is available
	autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
		let message =
			app.getName() +
			' ' +
			releaseName +
			' is now available. It will be installed the next time you restart the application.'
		if (releaseNotes) {
			const splitNotes = releaseNotes.split(/[^\r]\n/)
			message += '\n\nRelease notes:\n'
			splitNotes.forEach((notes) => {
				message += notes + '\n\n'
			})
		}
		// Ask user to update the app
		dialog
			.showMessageBox({
				type: 'question',
				buttons: ['Install and Relaunch', 'Later'],
				defaultId: 0,
				message:
					'A new version of ' +
					app.getName() +
					' has been downloaded',
				detail: message,
			})
			.then(({ response }) => {
				if (response === 0) {
					setTimeout(() => autoUpdater.quitAndInstall(), 1)
				}
			})
	})
	// init for updates
	autoUpdater.checkForUpdates()
}
