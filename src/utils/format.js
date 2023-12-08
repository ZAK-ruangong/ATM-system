import dayjs from "dayjs"
export function formatTime(time) {
	const dayStr = dayjs(time).format("YYYY年MM月DD日")
	const timeStr = dayjs(time).format("HH:mm:ss")
	return {
		dayStr,
		timeStr
	}
}
