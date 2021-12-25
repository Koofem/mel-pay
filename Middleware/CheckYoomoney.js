const { YMNotificationChecker, YMNotificationError} = require("yoomoney-sdk");
const PaymentBD = require('Models/PaymentBD')
const yoomoneyCheckClass = new (class yoomoneyCheckClass {
	constructor() {
	}

	async checkYoomoney(req, res, next) {
		const notificationChecker = new YMNotificationChecker(process.env.MONEY_SECRET);
		try {
			const notificationBody = yoomoneyCheckClass.check(req, res, next, notificationChecker);
				// найти транзакцию, проставить true на sucess и передать транзакцию конкретному пользователю по его id. Записываю транзакцию в пользователя по ссылке
			req.paymentObject = await PaymentBD.paymentConfirmation(notificationBody.label);

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
