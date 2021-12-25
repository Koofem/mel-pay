const {validateMiddleware} = require("Middleware/RequestSchemaValidate");
const {paymentLinkSchema} = require("Constants/PaymentLinkSchema");
const PaymentBD = require('Models/PaymentBD')

const buildPaymentPage = (req, res, next) => {
	validateMiddleware(req,res,next, paymentLinkSchema()).then(async ()=> {
		try {
			const data = await PaymentBD.createPayment(req.body)
			res.status(200).json(data)
		} catch (e) {
			res.status(400).json(e).send()
		} finally {
			res.end()
		}

	}).catch(err => {
		res.status(400).json(err);
	})


}

module.exports = {buildPaymentPage}
