"use strict";
const electron = require('electron');
const app = electron.app;
const { session } = require('electron')
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;
const LocalStorage = require('node-localstorage').LocalStorage;
require('electron-reload')(__dirname)
const Store = require('electron-store')
const ipc = electron.ipcRenderer

const store = new Store();

let mainWindow;
let localStorage = new LocalStorage('./config');


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
    let mainSession = mainWindow.webContents.session


    mainWindow.on('close', function(e){
      mainWindow.webContents.executeJavaScript(`document.getElementById('dataArray').value`, function (result) {
        console.log(result);
        if (result  != ""){
          localStorage.setItem('testfile', result);
        }
        // var value = $('#input_hidden_field').val();
        // value = JSON.parse(value);
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


    // mainSession.cookies.set({url:'https://myapp.com', name:'cookies1', value:'cookies_value',domain:'myapp.com', expirationDate: 999999999999999999.00}, (error) => {
    //   console.log('cookies set');
    //   mainSession.cookies.get({}, (error, cookies) => {
    //      console.log(cookies);
    //     })
    //
    // })
    // const window = mainWindow;
    // var ipc = require('electron').ipcMain;
    // const ws = window.webContents.executeJavaScript(`document.querySelector('input[name="fb_dtsg"]').value`, function (result) {
    //   console.log(result)
    // })
    //
    // ipc.on('invokeAction', function(event, data){
    //   console.log(data)
    //     var result = processData(data);
    //     event.sender.send('actionReply', result);
    // });

    // const store = new Store();
    // const ws = window.webContents.executeJavaScript(`document.querySelector('input[name="fb_dtsg"]').value`, function (result) {
    //   console.log(result)})
    // store.set('sheet', ws);
    // console.log(store.get('sheet'));


    mainWindow.on('closed', function() {
        mainWindow = null;
    });

 //    mainWindow.on('close', function () {
 //
 //        //console.log(size)
 // });
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
