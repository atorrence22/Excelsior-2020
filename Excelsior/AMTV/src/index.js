"use strict";
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const LocalStorage = require('node-localstorage').LocalStorage;
require('electron-reload')(__dirname)
const Store = require('electron-store')
//const globalShortcut = electron.globalShortcut;
//const { session } = require('electron')
//const ipc = electron.ipcRenderer
//const {app} = require('electron');


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
    //let mainSession = mainWindow.webContents.session


    mainWindow.on('close', function(e){
      mainWindow.webContents.executeJavaScript(`document.getElementById('dataArray').value`, function (result) {
        console.log(result);
        // if (result  != ""){
        //   localStorage.setItem('data_file', result);
        // }
      });
      // mainWindow.webContents.executeJavaScript(`document.getElementById('learningArray').value`, function (result) {
      //   console.log(result);
      //   if (result  != ""){
      //     localStorage.setItem('learning_file', result);
      //   }
      // });
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
    // mainWindow.webContents.openDevTools();


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




// get files
// const LocalStorage = require('node-localstorage').LocalStorage;
//let localStorage = new LocalStorage('./config');
// var fileTest = localStorage.getItem('data_file');
// var fileData;
// if(fileTest){
//   fileData = JSON.parse(fileTest);
  //offeringArray = fileData;
 // console.log(fileData);
// }
// set file = CreateObject("Scipting.FileSystemObject");
// set log = file.CreateTextFile("./config/log", True);
//
//
//
// function logFile(value) {
//   log.writeline(value.stringify());
//   log.Close();
// }

// var lg = "";


// if(fileData.length === 0 ){
//   lg += "file is empty\n";
//  // console.log('file is empty');
// }
// else{
//   lg += "file is not empty\n";
//  // console.log('file is not empty');
// }


// //function
// if(fileData == null){
//   lg += "file is not made\n";
//  // console.log('file is not made');
// }
// else {
//   lg += "file is loaded\n";
//  // console.log('file is loaded');
// }


// var d = new Date();
// let date = d.getMonth() + 1 + "/" + d.getDate();



// function process(obj) {
//   for (var i in obj) {
//     var child = obj[i];
//     if (child === null){
//     //console.log(obj[i]);
//     lg += obj + " is Null";
//     main().catch(console.error);
//   }
//     //  obj[i] = "";
//     else if (typeof(child)=="object") {
//       process(child);
//     }
//   }
// }
// const nodemailer = require("nodemailer");

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "Gmail",
//     service: "gmail",
//     auth: {
//       user: "orangebeanie24@gmail.com",
//       pass: "amtvtest"
//     }
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"ABET Monitoring Tool and Visulization <orangebeanie24@gmail.com>', // sender address
//     to: "bct24@nau.edu", // list of receivers
//     subject: "AMTV Missing Data Notification", // Subject line
//     text: "This is a email letting you know you are missing ABET data.", // plain text body
//     html: "<b>This is a email letting you know you are missing ABET data.</b>" // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// }



// let fuDate = localStorage.getItem('fuDate');

// if(fuDate){
//   var check = true;
// }
// else {
//   var check = false;
// }

// if (!(fuDate)){
//   fuDate = d.getMonth() + 4 + "/" + d.getDate();
//   localStorage.setItem("fuDate", fuDate);
// }
// else{
//   if(date == fuDate){
//     process(fileData);
//   }
//   else{
//     process(fileData);
//   }
// }


//main().catch(console.error);
// console.log(fileData);
// console.log(date);
// console.log(lg);
// localStorage.setItem("log", lg);
// process.type;
