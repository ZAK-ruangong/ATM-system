//app 控制应用程序的事件生命周期。
//BrowserWindow 创建并控制浏览器窗口。
import { app, BrowserWindow } from "electron"
import path from "path"

//定义全局变量获取 窗口实例
let win

const createWindow = () => {
	win = new BrowserWindow({
    width: 1200, // 设置窗口宽度
    height: 800, // 设置窗口高度
    resizable: false, // 不可调整窗口大小
		// 是否隐藏菜单，默认 false
		autoHideMenuBar: true,
		//允许html页面上的javascipt代码访问nodejs 环境api代码的能力（与node集成的意思）
		webPreferences: {
			devTools: false,
			contextIsolation: false,
			nodeIntegration: true
		}
	})
	win.loadFile(path.join(__dirname, "../dist/index.html"))
	win.loadURL(`${process.env["VITE_DEV_SERVER_URL"]}`)

	// 打开开发者工具
	win.webContents.openDevTools()
}

//在Electron完成初始化时被触发
app.whenReady().then(createWindow)
