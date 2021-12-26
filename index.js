const dotenv = require('dotenv');
dotenv.config();
const MongoBD = require("Models/MongoBD");
const PaymentBD = require("Models/PaymentBD");
const checkPaymentsClass = require("Backs/checkPayments")
console.time('appstart');
const server = require('Server/index.js');
// const mongoose = require('$Modules/Mongoose')

// require('$Routes/index');

const App = new class {
	async init() {
		await MongoBD.init();
		await PaymentBD.init();
		checkPaymentsClass.init();
		const port = process.env.PORT;
		server.init(port);
		console.timeEnd('appstart');
				console.log(module.filename, `listening on *: ${port}`);
	}
};

App.init();

module.exports = App;
