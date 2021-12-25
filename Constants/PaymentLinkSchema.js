const Joi = require("joi");
const paymentLinkSchema  = () => {
	return Joi.object({
		sum: Joi.number().required(),
		successURL: Joi.string().required(),
		label: Joi.string().required(), // -> md5(userID + productID)
		targets: Joi.string(),
		comment: Joi.string().required(),
		userID: Joi.string().required(),
		productID: Joi.string().required(),
	})
}

module.exports = {paymentLinkSchema}
