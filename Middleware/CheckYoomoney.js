const { YMNotificationChecker, YMNotificationError} = require("yoomoney-sdk");
const PaymentBD = require('Models/PaymentBD')
const yoomoneyCheckClass = new (class yoomoneyCheckClass {
	constructor() {
	}

	async checkYoomoney(req, res, next) {
		const notificationChecker = new YMNotificationChecker(process.env.MONEY_SECRET);
		try {
			const notificationBody = yoomoneyCheckClass.check(req, res, next, notificationChecker);
			await PaymentBD.paymentConfirmation(notificationBody.label)
			PaymentBD.findPayment(notificationBody.label).then((paymentObj)=> {
				req.paymentObject = paymentObj
				next();
			}).catch((error)=> {
				res.status(400).end(error)
			})
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
