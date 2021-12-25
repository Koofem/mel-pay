const { YMPaymentFromBuilder, YMFormPaymentType} = require("yoomoney-sdk");
const PaymentBD = require('Models/PaymentBD')
const readFile = require('Helpers/ReadFile.js')


const yoomoneyPayClass = new (class yoomoneyPayClass {
	buildPaymentPage({sum, successURL, receiver, label, targets, comment}) {
		console.log(label)
		const builder = new YMPaymentFromBuilder({
			quickPayForm: "shop",
			// 300 баксов
			sum: Number(sum).toFixed(2),

			// Делаем перенаправление, чтобы пользователь вернулся в магазин
			// после покупки, обрабатываем на 48 строке
			successURL: successURL,

			// Просим деньги с карты, можно передать просто строку "AC"
			paymentType: YMFormPaymentType.FromCard,

			// Номер кошелька получателя (ваш)
			receiver: receiver,

			// Добавляем метку, чтобы потом вычленить в уведомлении
			label: label,

			targets: targets,

			comment: comment
		});

		return builder.buildHtml()
	}
})()

const openPaymentLink = async (req, res, next) => {
	const HTML = await readFile('HTML/404.html')
	const token = req.query.token
	try {
		const payment = await PaymentBD.findPayment(token)
		console.log(payment)
		if (payment) {
			const paymentLink = yoomoneyPayClass.buildPaymentPage(payment)
			res.send(paymentLink);
		} else {
			throw new Error();
		}
		res.end();
	} catch (e) {
		res.status(200);
		res.send(HTML.toString())
		res.end();
	}
}

module.exports = {openPaymentLink}
