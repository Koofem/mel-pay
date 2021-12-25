const { YMNotificationChecker, YMNotificationError} = require("yoomoney-sdk");
const yoomoneyCheckClass = new (class yoomoneyCheckClass {
	constructor() {
	}

	checkYoomoney(req, res, next) {
		console.log(req.body);
		const notificationChecker = new YMNotificationChecker(process.env.MONEY_SECRET);
		try {
			const notificationBody = yoomoneyCheckClass.check(req, res, next, notificationChecker);
				// найти транзакцию, проставить true на sucess и передать транзакцию конкретному пользователю по его id. Записываю транзакцию в пользователя по ссылке

			next();
		} catch (error) {
			if (error instanceof YMNotificationError) {

				next()
			}
		}
	}

	static check(req, res, next, notificationChecker) {
		const notification = req.body;
		return notificationChecker.check(notification)
	}



})()

module.exports = yoomoneyCheckClass
