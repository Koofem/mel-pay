require('dotenv')
const { MongoClient } = require('mongodb');
const Mongodb = new (class Mongodb {
	mongodbConfig
	uri
	client
	db = '';
	constructor() {
	}

	async init() {
		try {
			this.uri = `mongodb://AdminRoot:${process.env.MONGO_DB_PASS}@45.132.17.98:27017`;
			this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });

			await this.client.connect();
			this.db = await this.client.db(process.env.MONGO_DB_BASE);
			console.log('Все заебись, база подключена')
		} catch (e) {
			console.log(e)
		}
	}
})();
module.exports =  Mongodb


