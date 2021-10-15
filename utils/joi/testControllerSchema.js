const Joi = require("joi");

const testControllerPostSchema = Joi.object({
	startDate:Joi.date().required(),
	endDate:Joi.date().required().greater(Joi.ref("startDate")),
	minCount:Joi.number().required(),
	maxCount:Joi.number().required().greater(Joi.ref("minCount"))
});

module.exports = { testControllerPostSchema};
 