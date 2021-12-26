const mongodb = require('Models/MongoBD');
class PaymentBD {
	paymentBD

	constructor() {
	}

	async init() {
		this.paymentBD = mongodb.db.collection(process.env.MONGO_DB_CLIENT);
		console.log('Модуль оплат подключен')
	}

	async findPayments() {
		return this.paymentBD.find().toArray();
	}

	async createPayment({sum, successURL, label, targets, comment, userID, productID, type}) {
		// не будет работать
		// label = id пользователя + id мастер класса
		const payment = await this.findPayment(label)
		if (payment && payment.success) {
			throw new Error('duplicate data')
		} else if (payment && !payment.success) {
			return {token: payment._id, sum: payment.sum}
		}

		await this.paymentBD.insertOne({
			_id: label,
			sum: sum,
			successURL: successURL,
			receiver: process.env.MONEY_RECEIVER,
			targets: targets ? targets : '',
			comment: comment,
			success: false,
			userID: userID,
			productID: productID,
			label: label,
			type: type
		})

		return {token: label, sum: sum}
	}

	async paymentConfirmation(label) {
		return await this.updatePayment(label)
	}

	async findPayment(id) {
		return await this.paymentBD.findOne({
			_id: id
		})
	}

	async updatePayment(id) {
		return await this.paymentBD.findOneAndUpdate({_id: id}, {
			$set: {
				success: true,
			},
		}, {upsert: true});
	}
}

const paymentBD = new PaymentBD();
module.exports = paymentBD;
