import { defineStore } from "pinia"

export default defineStore("useCardStore", {
	state: () => ({
		cardId: ""
	}),
	actions: {
		login(cardId) {
			localStorage.setItem("cardId", cardId)
			this.cardId = cardId
		},
		logout() {
			localStorage.removeItem("cardId")
			this.cardId = ""
		}
	}
})
