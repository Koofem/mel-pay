const rabbit =  require('amqplib/callback_api')
const PaymentUpdateClass = new (class PaymentUpdateClass {
	constructor() {
	}

	async update(req, res, next) {
		console.log('2')
		const paymentObject = req.paymentObject
		rabbit.connect('amqp://localhost', (connError, connection) => {
			if (connError) {
				throw connError
			}

			connection.createChannel((channelError, channel) => {
				if (channelError) {
					throw channelError
				}

				const QUEUE = 'receivingPayments';
				const message = JSON.stringify({id: paymentObject._id, type: paymentObject.type})
				channel.assertQueue(QUEUE, {
					durable: false
				})
				channel.sendToQueue(QUEUE, Buffer.from(message))
				setTimeout(() => {
					connection.close();
				}, 1000)
			})
		})

		res.status(200).end();
	}
})()

module.exports = PaymentUpdateClass
