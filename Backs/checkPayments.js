const PaymentBD = require('Models/PaymentBD')
const rabbit =  require('amqplib/callback_api')
const CronJob = require('cron').CronJob;
const checkPaymentsClass = new (class checkPayments {
	constructor() {
	}

	init() {
		// cron.schedule('* * 24 * * ', ()=> {
		// 	console.log('fuck')
		// })
		const job = new CronJob('* * 24 * * *', function() {
			return checkPaymentsClass.deletePayments()
		});
		job.start();
	}

	async deletePayments() {
		const payments = await PaymentBD.findPayments();
		const unsuccessPayments = payments.filter(payment => !payment.success)
		if (unsuccessPayments.length > 0) {
			rabbit.connect('amqp://localhost', (connError, connection) => {
				if (connError) {
					throw connError
				}

				connection.createChannel((channelError, channel) => {
					if (channelError) {
						throw channelError
					}

					const QUEUE = 'deletePayment';
					channel.assertQueue(QUEUE, {
						durable: false
					})
					const promises = unsuccessPayments.map((payment) => {
						return new Promise((resolve) => {
							const message = JSON.stringify({id: payment._id, type: payment.type})
							console.log(message)
							channel.sendToQueue(QUEUE, Buffer.from(message))
							return resolve();
						})
					})

					return Promise.all(promises).then(() => {
						return setTimeout(() => {
							connection.close();
						}, 1000)
					})


				})
			})
		} else  {
			return
		}

	}



})()

module.exports = checkPaymentsClass
