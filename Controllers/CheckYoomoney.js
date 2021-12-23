const { YMNotificationChecker} = require("yoomoney-sdk");
const yoomoneyCheckClass = new (class yoomoneyCheckClass {
	constructor() {
	}

	checkYoomoney(req, res, next) {
		const notificationChecker = new YMNotificationChecker(process.env.MONEY_SECRET);
		notificationChecker.middleware({ memo: false }, (req, res) => {
			console.log(req.body.label);

			res.writeHead(200, "OK", { "Content-Type": "text/plain" });
			res.end("ok");
		})
	}
})()

module.exports = yoomoneyCheckClass
