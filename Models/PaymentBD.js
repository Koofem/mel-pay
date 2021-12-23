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

	async createPayment({sum,successURL,label,targets,comment}) {
		const payment = await this.findPayment(label)
		if (payment) {
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
		})

		return label
	}

	async findPayment(id) {
		return await this.paymentBD.findOne({
			_id: id
		})
	}
	//
	// async findUser(id) {
	// 	return await this.userBD.findOne({id: id});
	// }
	//
	// async saveOrUpdateUser(user) {
	// 	return await this.userBD.findOneAndUpdate({id: user.id}, {
	// 		$set: {
	// 			first_name_telegram: user.first_name,
	// 			telegram_username: user.username,
	// 			telegram_last_name: user.last_name? user.last_name : '',
	// 			telegram_id: user.id,
	//
	// 		},
	// 	}, {upsert: true});
	// }
	//
	// async setActionToUser(user, action) {
	// 	return await this.userBD.findOneAndUpdate({id: user.id}, {
	// 		$set: {
	// 			action: action
	// 		},
	// 	}, {upsert: true});
	// }
	//
	// async resetUserAction(user) {
	// 	return await this.userBD.findOneAndUpdate({id: user.id}, {
	// 		$unset: {
	// 			action: 1
	// 		}
	// 	}, {upsert: true})
	// }
	//
	// async getUserAction(user) {
	// 	const userBD = await this.findUser(user.id)
	// 	return userBD.action
	// }
	//
	// async updateUser(user, key, value) {
	// 	return await this.userBD.findOneAndUpdate({id: user.id}, {
	// 		$set: {
	// 			[key]: value
	// 		}
	//
	// 	}, {upsert: true})
	// }
}

const paymentBD = new PaymentBD();
module.exports = paymentBD;
