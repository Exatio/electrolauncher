const { app, BrowserWindow, autoUpdater, dialog } = require('electron')


// AutoUpdater things

const server = 'https://electroupdater.vercel.app'
const url = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL({ url })

setInterval(() => {
	autoUpdater.checkForUpdates()
}, 60000)

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
	const dialogOpts = {
		type: 'info',
		buttons: ['Redémarrer', 'Plus tard'],
		title: 'Mise à jour',
		message: process.platform === 'win32' ? releaseName : releaseNotes,
		detail: "Une mise à jour a été détectée et téléchargée. Redémarrez le launcher pour prendre en compte la mise à jour."
	}
	
	dialog.showMessageBox(dialogOpts).then((returnValue) => {
		if (returnValue.response === 0) autoUpdater.quitAndInstall()
		else dialog.showMessageBox("t srx toi ? j'relance quand même mon reuf").then(() => autoUpdater.quitAndInstall())
	})
})


autoUpdater.on('error', message => {
	console.error('Il y a eu un problème lors du téléchargement de la mise à jour...')
	console.error(message)
})


// Window 

const createWindow = () => {
	
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		//frame: false

	})
	

	win.loadFile('src/index.html')
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
