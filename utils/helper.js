const { apiMessage } = require("../constants/applicationConstants");
const logger = require("../utils/logger");

/**
 * Formats the response of an API.
 * @param {object} res 
 * @param {number} code
 * @param {string} message
 * @param {object} error
 * @param {object} records
 *
 * @returns {undefined}
 */
const formatResponse = ({res,code=1, message,error=null,records=null,httpCode})=>{
	/**
     * Setting the response code of the API.
     */
	res.status(httpCode||500);

	/**
	 * Formatting response object
	 */
	const response = {
		code,
		msg:message|| apiMessage.internalError,
		error,
		records
	};
	/**
     * Sending response to client
     */
	res.jsonp(response);
	logger.info(`Response Sent:${JSON.stringify(response)}`);
}; 

module.exports ={formatResponse};