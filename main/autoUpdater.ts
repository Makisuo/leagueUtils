import os from 'os'
const { app, autoUpdater, dialog } = require('electron')
const version = app.getVersion()
const platform = os.platform() + '_' + os.arch() // usually returns darwin_64

const updaterFeedURL =
	'https://league-utils-release.herokuapp.com/update/' +
	platform +
	'/' +
	version

export function appUpdater() {
	autoUpdater.setFeedURL(updaterFeedURL)

	/* Log whats happening
	TODO send autoUpdater events to renderer so that we could console log it in developer tools
	You could alsoe use nslog or other logging to see what's happening */
	autoUpdater.on('error', (err) => console.log(err))
	autoUpdater.on('checking-for-update', () =>
		dialog.showMessageBox({
			type: 'info',
			title: 'Checking for updates',
		})
	)
	autoUpdater.on('update-available', () =>
		dialog.showMessageBox(
			{
				type: 'info',
				title: 'Found Updates',
				message: 'Found updates, do you want update now?',
				buttons: ['Sure', 'No'],
			},
			(buttonIndex) => {
				if (buttonIndex === 0) {
					autoUpdater.downloadUpdate()
				}
			}
		)
	)
	autoUpdater.on('update-not-available', () =>
		console.log('update-not-available')
	)

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
		dialog.showMessageBox(
			{
				type: 'question',
				buttons: ['Install and Relaunch', 'Later'],
				defaultId: 0,
				message:
					'A new version of ' +
					app.getName() +
					' has been downloaded',
				detail: message,
			},
			(response) => {
				if (response === 0) {
					setTimeout(() => autoUpdater.quitAndInstall(), 1)
				}
			}
		)
	})
	// init for updates
	autoUpdater.checkForUpdates()
}
