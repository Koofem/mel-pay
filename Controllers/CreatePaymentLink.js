const { YMPaymentFromBuilder, YMFormPaymentType, YMNotificationChecker, YMNotificationError } = require("yoomoney-sdk");
const {validateMiddleware} = require("Middleware/RequestSchemaValidate");
const {paymentLinkSchema} = require("Constants/PaymentLinkSchema");
const yoomoneyPayClass = new (class yoomoneyPayClass {
	buildPaymentPage({sum, successURL, receiver, label, targets, comment}) {
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

const buildPaymentPage = (req, res, next) => {
	validateMiddleware(req,res,next, paymentLinkSchema()).then(()=> {
		try {
			const builder = yoomoneyPayClass.buildPaymentPage(req.query);
			res.send(builder)
		} catch (e) {
			res.status(400).json('Ошибка')
		}

	}).catch(err => {
		console.log(err)
		res.status(400).json(err);
	})


}

module.exports = {buildPaymentPage}
