const mongodb = require('Models/MongoBD');
const Joi = require("joi");
class PaymentBD {
	paymentBD
	constructor() {
	}

	async init() {
		this.paymentBD = mongodb.db.collection(process.env.MONGO_DB_CLIENT);
		console.log('Модуль оплат подключен')
	}

	async createPayment({sum,successURL,label,targets,comment, userID}) {
		const payment = await this.findPayment(label)
		if (payment && !payment.success) {
			 throw new Error('duplicate data')
		}
		 await this.paymentBD.insertOne({
			_id: label,
			sum: sum,
			successURL: successURL,
			receiver: process.env.MONEY_RECEIVER,
			targets: targets? targets: '',
			comment: comment,
			success: false,
		 	userID: userID
		})

		return label
	}

	async findPayment(id) {
		return await this.paymentBD.findOne({
			_id: id
		})
	}

	async updatePayment() {

	}
}

const paymentBD = new PaymentBD();
module.exports = paymentBD;
