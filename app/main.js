/* eslint-disable */

var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
var app = electron.app;
var ipc = electron.ipcMain;

app.on('ready', function() {
  var appWindow, infoWindow;
  appWindow = new BrowserWindow({
    show: false
  }); //appWindow

  appWindow.loadURL('file://' + __dirname + '/index.html');

  infoWindow = new BrowserWindow({
    width: 400,
    height: 300,
    transparent: true,
    show: false,
    frame: false
  }); //infoWindow

  infoWindow.loadURL('file://' + __dirname + '/info.html');

  appWindow.once('ready-to-show', function() {
    appWindow.show();
  }); //ready-to-show

  ipc.on('closeInfoWindow', function(event, arg){
    event.returnValue='';
    infoWindow.hide();
  }); //closeInfoWindow
}); //app is ready



// // Modules to control application life and create native browser window
// const {app, BrowserWindow} = require('electron')

// // Keep a global reference of the window object, if you don't, the window will
// // be closed automatically when the JavaScript object is garbage collected.
// let mainWindow



// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.on('ready', createWindow)

// // Quit when all windows are closed.
// app.on('window-all-closed', function () {
//   // On macOS it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

// app.on('activate', function () {
//   // On macOS it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (mainWindow === null) {
//     createWindow()
//   }
// })

// // In this file you can include the rest of your app's specific main process
// // code. You can also put them in separate files and require them here.


// function createWindow () {
//   // Create the browser window.
//   mainWindow = new BrowserWindow({width: 800, height: 600})

//   //clear cache
//   mainWindow.webContents.session.clearCache();

//   // and load the index.html of the app.
//   mainWindow.loadURL('file://' + __dirname + '/index.html')

//   // Open the DevTools.
//   mainWindow.webContents.openDevTools()

//   // Emitted when the window is closed.
//   mainWindow.on('closed', function () {
//     // Dereference the window object, usually you would store windows
//     // in an array if your app supports multi windows, this is the time
//     // when you should delete the corresponding element.
//     mainWindow = null
//   })
// }