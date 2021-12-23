// const Middleware = require("Middleware");
const {generateAccessToken} = require("Controllers/CreateSession");
const {buildPaymentPage} = require("Controllers/CreatePaymentLink");
const { authenticateToken } = require("Middleware/JwtCheck");
const {openPaymentLink} = require('Controllers/openPaymentLink')
const yoomoneyCheckClass  = require('Controllers/CheckYoomoney');
const Router = [
	{
		location: '/',
		controller: (req, res, next) => {
			res.send('Hello World')
		},
		type: 'GET'
	},
	{
		location: '/payment/pay?',
		controller: openPaymentLink,
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
	location: '/payment/create-payment-link',
	controller: buildPaymentPage,
	type: 'POST',
	middleware: authenticateToken
	},
	{
		location: '/payment/check',
		controller: yoomoneyCheckClass.checkYoomoney,
		middleware: (req,res, next)=> {
			next();
		},
		type: 'POST',
	}
]

module.exports = Router
