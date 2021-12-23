const fs = require('fs');
const express = require('express');
const router = require('Router/index');
const bodyParser = require('body-parser');
const {requestType} = require('Constants/index');
const pic = fs.createReadStream( 'Pictures/404.jpg', 'base64',(err, base64Image) => {
	// 2. Create a data URL
	return `data:image/jpeg;base64, ${base64Image}`
}
);

const Server =  new (class Server {
	constructor(){
		this.app = express();
	}

	init(port) {
		this.app.use(bodyParser.urlencoded({
			extended: true
		}));
		this.app.use(bodyParser.json());
		router.forEach((rout) => {
			if (rout.type === requestType.GET) {
				this.app.get(rout.location,  rout.middleware,	rout.controller)
			} else if (rout.type === requestType.POST) {
				this.app.post(rout.location, rout.middleware,	rout.controller);
			}
		})

		this.app.use('*', (req,res)=> {
			res.status(404).send('not found')
		})
		this.app.listen(port, ()=> {})
	}
})();
module.exports = Server
