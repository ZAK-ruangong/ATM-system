import { createI18n } from "vue-i18n"
export const i18n = createI18n({
	locale: "zh-CN", // 设置默认语言为中文
	fallbackLocale: "zh-CN", // 设置回退语言为中文
	messages: {
		"zh-CN": {
			confirm: "确认",
			exit: "退卡",
			search: "查询",
			transfer: "转账",
			withdrawal: "取款",
			deposit: "存款",
			pay: "代理业务",
			passbook: "存折取款",
			back: "返回",
			changePwd: "修改密码",
			changeLanguage: "切换语言",
			putCard: "插卡",
			putPassBook: "插存折",
			welcome: "欢迎您使用XXXXX银行ATM机",
			pleasePutCard: "请插入银行卡",
			pleasePutPassBook: "请插入存折",
			PleaseInputPwd: "请输入密码",
			id: "终端编号"
		},
		en: {
			confirm: "Confirm",
			exit: "Exit",
			search: "Search",
			transfer: "Transfer",
			withdrawal: "Withdrawal",
			deposit: "Deposit",
			pay: "Pay",
			passbook: "Passbook",
			back: "Back",
			changePwd: "ChangePwd",
			changeLanguage: "Switch Language",
			putCard: "Put card",
			putPassBook: "Put passbook",
			welcome: "Welcome to use XXX Bank ATM",
			pleasePutCard: "Please insert your bank card",
			pleasePutPassBook: "Please insert your passbook",
			PleaseInputPwd: "Please enter your password",
			id: "Terminal ID"
		}
		// 可以添加其他语言的消息
	}
})
