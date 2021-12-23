const Joi = require("joi");
const paymentLinkSchema  = () => {
	return Joi.object({
		sum: Joi.number().required(),
		successURL: Joi.string().required(),
		receiver: Joi.string().required(),
		label: Joi.string().required(),
		targets:Joi.string(),
		comment: Joi.string().required(),
	})
}

module.exports = {paymentLinkSchema}
