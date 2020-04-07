"use strict";
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const LocalStorage = require('node-localstorage').LocalStorage;
require('electron-reload')(__dirname)
const Store = require('electron-store')
var Application = require('spectron').Application
var assert = require('assert')
//const { session } = require('electron')
//const globalShortcut = electron.globalShortcut;
//const ipc = electron.ipcRenderer
//const {app} = require('electron');


let mainWindow;
let localStorage = new LocalStorage('./config');

// var app = new Application({
//   path: '/Application/abet.app/Cont'
// })

function createWindow() {

    let W = parseInt(localStorage.getItem('width'));
    let H = parseInt(localStorage.getItem('height'));
    //let file = JSON.parse(localStorage.getItem('testfile'));
    //console.log(file);

    mainWindow = new BrowserWindow({
        title: 'AMTV',
        width: W,
        height: H,
        minWidth: 800,
        minHeight: 600,
        icon:__dirname + '/img/ExcelsiorLogo.ico'
    });

    mainWindow.maximize();
    // Create the browser window.
    //mainWindow = new BrowserWindow({width: 400, height: 400})
    //let mainSession = mainWindow.webContents.session


    mainWindow.on('close', function(e){
      mainWindow.webContents.executeJavaScript(`document.getElementById('dataArray').value`, function (result) {
        console.log(result);
        if (result  != ""){
          localStorage.setItem('data_file', result);
        }
      });
      var choice = require('electron').dialog.showMessageBox(this,
          {
            type: 'question',
            buttons: ['Yes', 'No'],
            title: 'Confirm',
            message: 'Are you sure you want to quit?'
         });
         if(choice == 1){
           e.preventDefault();
         }
         let size = mainWindow.getSize();
         localStorage.setItem('width', size[0]);
         localStorage.setItem('height', size[1]);
      });



    mainWindow.loadURL('file://' + __dirname + '/index.html');
    //mainWindow.setMenu(null);
    mainWindow.webContents.openDevTools();


    mainWindow.on('closed', function() {
        mainWindow = null;
    });

}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('will-quit', function() {
    globalShortcut.unregisterAll();
});

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow();
    }
});

if (require('electron-squirrel-startup')) {app.quit();}
