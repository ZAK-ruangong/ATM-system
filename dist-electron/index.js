"use strict";
const electron = require("electron");
const path = require("path");
let win;
const createWindow = () => {
  win = new electron.BrowserWindow({
    width: 1200,
    // 设置窗口宽度
    height: 800,
    // 设置窗口高度
    resizable: false,
    // 不可调整窗口大小
    // 是否隐藏菜单，默认 false
    autoHideMenuBar: true,
    //允许html页面上的javascipt代码访问nodejs 环境api代码的能力（与node集成的意思）
    webPreferences: {
      devTools: false,
      contextIsolation: false,
      nodeIntegration: true
    }
  });
  win.loadFile(path.join(__dirname, "../dist/index.html"));
  win.loadURL(`${process.env["VITE_DEV_SERVER_URL"]}`);
  win.webContents.openDevTools();
};
electron.app.whenReady().then(createWindow);
