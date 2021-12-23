// const Middleware = require("Middleware");
const {generateAccessToken} = require("Controllers/CreateSession");
const {buildPaymentPage} = require("Controllers/CreatePaymentLink");
const { authenticateToken } = require("Middleware/JwtCheck");
const Router = [
	{
		location: '/',
		controller: (req, res, next) => {
			res.send('Hello World')
		},
		type: 'GET'
	},
	{
		location: '/payment/create-session/',
		controller: generateAccessToken,
		type: 'POST',
		middleware: (req, res, next) => {
			next()
		}
	},
	{
	location: '/payment/create-payment-link?',
	controller: buildPaymentPage,
	type: 'GET',
	middleware: authenticateToken
	}
]

module.exports = Router
