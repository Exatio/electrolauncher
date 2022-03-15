const { app, BrowserWindow, autoUpdater, dialog } = require('electron')


// AutoUpdater things

const server = 'https://electroupdater.vercel.app'
const url = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL({ url })

setInterval(() => {
	autoUpdater.checkForUpdates()
}, 1000)

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
		const dialogOpts = {
		type: 'info',
		buttons: ['Restart', 'Later'],
		title: 'Application Update',
		message: process.platform === 'win32' ? releaseNotes : releaseName,
		detail: "A new version has been downloaded. Restart the application to apply the updates."
	}
	
	dialog.showMessageBox(dialogOpts).then((returnValue) => {
		if (returnValue.response === 0) autoUpdater.quitAndInstall()
	})
})


autoUpdater.on('error', message => {
	console.error('There was a problem updating the application')
	console.error(message)
})


// Window 

const createWindow = () => {
	
	const win = new BrowserWindow({
		width: 800,
		height: 600
	})
	
	win.loadFile('index.html')
}			

app.whenReady().then(() => {
	
	createWindow()
	
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
	
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})
