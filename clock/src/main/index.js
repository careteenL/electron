const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let win;

app.whenReady().then(() => {
  createCircleWindow();
});

function createCircleWindow() {
  win = new BrowserWindow({
    width: 600,
    height: 500,
    resizable: false,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
    },
  });
  win.setIgnoreMouseEvents(true);
  win.loadFile(path.join(__dirname, "../renderer/clock.html"));
  ipcMain.on("set-ignore-mouse-events", (event, ...args) => {
    BrowserWindow.fromWebContents(event.sender).setIgnoreMouseEvents(...args);
  });
}
