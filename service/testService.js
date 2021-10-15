const {MongoClient} = require("mongodb");
const COLLECTION_NAME = "records";
const database = require("../utils/db");
const logger = require("../utils/logger");

/**
 * Returns record from database
 * @param {object} payload
 * @returns {Promise<Array>} record
 */
async function getDataFromDB(payload) {
	const db = await database.init(MongoClient);
	/**
   * Creating aggregate Query
   * https://docs.mongodb.com/manual/aggregation/
   */
	const aggregateQuery = [
		{
			$match: {
				createdAt: {
					$gte: payload.startDate,
					$lte: payload.endDate,
				},
			},
		},
		{
			$set: {
				totalCount: {
					$sum: "$counts",
				},
			},
		},
		{
			$match: {
				totalCount: {
					$gte: payload.minCount,
					$lte: payload.maxCount,
				},
			},
		},
		{
			$project: {
				totalCount: 1,
				key: 1,
				createdAt: 1,
				_id: 0,
			},
		},
	];
	try {
		/**
     * Fetching data from DB in the Array form
     */
		return await db
			.collection(COLLECTION_NAME)
			.aggregate(aggregateQuery)
			.toArray();
	} catch (err) {
		logger.error(`Error while calling the Database:${err.message}`);
		throw err;
	}
}

module.exports = { getDataFromDB };
