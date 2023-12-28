"use strict";
const electron = require("electron");
const path = require("path");
let win;
const createWindow = () => {
  win = new electron.BrowserWindow({
    // 是否隐藏菜单，默认 false
    autoHideMenuBar: false,
    //允许html页面上的javascipt代码访问nodejs 环境api代码的能力（与node集成的意思）
    webPreferences: {
      devTools: true,
      contextIsolation: false,
      nodeIntegration: true
    }
  });
  win.loadFile(path.join(__dirname, "../dist/index.html"));
  win.loadURL(`${process.env["VITE_DEV_SERVER_URL"]}`);
  win.webContents.openDevTools();
};
electron.app.whenReady().then(createWindow);
