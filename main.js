'use strict';

var electron = require('electron');
var app = electron.app;

//*************** GULP *********************************/
var client = require('electron-connect').client;
var BrowserWindow = electron.BrowserWindow;

//*****************************************************/

app.on('window-all-closed', function () {
  app.quit();
});


app.on('ready', function () {
  console.log(process.argv.join(', '));
  console.log('Hello, browser process');
  var mainWindow = new BrowserWindow({
    width: 400,
    height: 300
  });

  mainWindow.loadURL('file://' + __dirname + '/index.html');

})