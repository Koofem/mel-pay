const { YMPaymentFromBuilder, YMFormPaymentType, YMNotificationChecker, YMNotificationError } = require("yoomoney-sdk");
const yoomoneyCheckClass = new (class yoomoneyCheckClass {
	constructor() {
	this.notificationChecker = new YMNotificationChecker(process.env.MONEY_SECRET);
	}

	checkYoomoney(req, res, next) {
		this.notificationChecker.middleware({ memo: false }, (req, res) => {
			console.log(req.body.label);

			res.writeHead(200, "OK", { "Content-Type": "text/plain" });
			res.end("ok");
		})
	}
})()

module.exports = yoomoneyCheckClass
