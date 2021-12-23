const Joi = require("joi");

const Validator = new (class Validator {
	validate(params, schema) {
		let options = {
			allowUnknown: true, // Позволяет объекту содержать неизвестные ключи, которые игнорируются
		};

		// Непосредственно проверка
		const { error, value } = schema.validate(params, options);

		if (error) {
			// Возвращаем детали ошибки
			return {
				error: true,
				detail: error.details.map((x) => x.message).join(", "),
			};
		} else {
			// В случае если все "ок".
			return { error: false, params: params };
		}
	};
})()

const validateMiddleware = (req, res, next, schemas) => {
	return new Promise((resolve, reject) => {
		let validateresult = Validator.validate(req.body, schemas);
		if (validateresult.error) {
			return reject({ error: validateresult.detail })
		} else {
			resolve();
		}
	})
	// Вызов функции валидации



};

module.exports = {validateMiddleware}
