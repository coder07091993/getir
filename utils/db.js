
const logger = require("../utils/logger");


let db;
/**
 * Connect to the MongoDB database
 * @param {function} mongoClient
 */
async function main(mongoClient){
	/**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */ 
	const client = new mongoClient(global.process.env.MONGODB_URI);
	try {
		// Connect to the MongoDB cluster
		await client.connect();
		logger.info("**********Connected to MongoDB**********");
		/**
         * Connecting to DB
         */
		db = client.db(global.process.env.DB_NAME);
		logger.info("**********Connected to Database**********");
		return db;
	} catch (e) {
		logger.error("Error While connecting to DB");
		logger.error(e);
		throw e;
	} 
}
/**
 * 
 * @param {function} mongoClient 
 * @returns {object} db
 */
const init = async (mongoClient)=>{
	if(!db){
		return main(mongoClient);
	}
	return db;
};
module.exports = {init};