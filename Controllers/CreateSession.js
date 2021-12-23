const jwt = require('jsonwebtoken');


// access config var
const secretToken = process.env.TOKEN_SECRET;

const generateAccessToken = (req, res) => {
	const userToken = req.headers.token;
	if (userToken !==  process.env.ALLOWED_TOKEN) {
		return res.sendStatus(403);
	}
	const accessToken = jwt.sign({token: userToken}, secretToken, { expiresIn: '1800s' });

	res.setHeader('auth_token' ,`${accessToken}`)
	return res.sendStatus(200)
}

module.exports = {generateAccessToken}
