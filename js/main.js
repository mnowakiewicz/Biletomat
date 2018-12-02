// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
      width: 1280,
      height: 860,
      resizable: false,
      webPreferences: {
        nodeIntegration: true
      }
  })
  mainWindow.setMenu(null);
  // and load the main.html of the app.
  mainWindow.loadFile('view/main.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


const ipcMain = require('electron').ipcMain;


ipcMain.on('choose:option:bilet', function (e, option) {
    const tickets = 'view/tickets.html';
    mainWindow.loadFile(tickets);
});

ipcMain.on('choose:option:karta', function (e, option) {
    const tickets = 'view/putCityCard.html';
    mainWindow.loadFile(tickets);
});

ipcMain.on('pick:ticket', function (e) {
    mainWindow.loadFile('view/picTicket.html');
});

var outcomeTickets;
var messageType = null;
ipcMain.on('tickets:pay', function (e, outcome, rodzaj = null) {
    const payment = 'view/chosePayment.html';
    outcomeTickets = outcome;
    mainWindow.loadFile('view/chosePayment.html')
    messageType = rodzaj;
});

var cityCardOption;
ipcMain.on('cards:next', function (e, option) {
    cityCardOption = option;
    mainWindow.loadFile('view/cityCardSummary.html')
});

ipcMain.on('get:cityCardOption', (event, arg) => {
    event.sender.send('get:cityCardOption:replay', cityCardOption)
});


ipcMain.on('get:outcome', (event, arg) => {
    event.sender.send('get:outcome:replay', outcomeTickets, messageType)
});

ipcMain.on('back:mainWindow', function (event, arg) {
    mainWindow.loadFile('view/main.html');
});

ipcMain.on('back:tickets', function (event, arg) {
    mainWindow.loadFile('view/tickets.html');
});

ipcMain.on('back:cityCard', function (event, arg) {
    mainWindow.loadFile('view/cityCard.html');
});

ipcMain.on('go:cityCard', function (event, arg) {
    mainWindow.loadFile('view/cityCard.html');
});


