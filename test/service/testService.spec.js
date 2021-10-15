const sinon = require("sinon");
const { describe, it, afterEach } = require("mocha");
const { expect } = require("chai");
const { getDataFromDB } = require("../../service/testService");
const database = require("../../utils/db");
const logger = require("../../utils/logger");

describe("Service:testService", () => {
	const payload = {
		startDate: "2016-08-12",
		endDate: "2020-05-05",
		minCount: 1200,
		maxCount: 3000,
	};

	afterEach(async (done) => {
		sinon.restore();
		done();
	});

	it("testService:getDataFromDB:throws error when db is undefined", async () => {
		sinon.stub(database, "init").resolves(undefined);
		const spyLog = sinon.spy(logger, "error");
		try {
			const response = await getDataFromDB(payload);
			expect(
				spyLog.calledWith(
					"Error while calling the Database:Cannot read property 'collection' of undefined"
				)
			).eql(true);
			expect(response).to.be.undefined;
		} catch (error) {
			expect(error).to.be.instanceOf(Error);
			expect(error.message).eql(
				"Cannot read property 'collection' of undefined"
			);
			expect(error.name).eql("TypeError");
		}
	});

	it("testService:getDataFromDB:throws error when payload is undefined", async () => {
		sinon.stub(database, "init").resolves(undefined);
		const spyLog = sinon.spy(logger, "error");
		try {
			const response = await getDataFromDB(undefined);
			expect(
				spyLog.calledWith(
					"Error while calling the Database:Cannot read property 'startDate' of undefined"
				)
			).eql(true);
			expect(response).to.be.undefined;
		} catch (error) {
			expect(error).to.be.instanceOf(Error);
			expect(error.message).eql(
				"Cannot read property 'startDate' of undefined"
			);
			expect(error.name).eql("TypeError");
		}
	});

	it("testService:getDataFromDB:happy path", async () => {
		const data = [
			{
				key: "ebOXYBpT",
				createdAt: "2016-08-13T08:35:39.252Z",
				totalCount: 2145,
			},
		];
		sinon.stub(database, "init").resolves({
			collection: sinon.stub().returns({
				aggregate: sinon.stub().returns({
					toArray: sinon.stub().returns(data),
				}),
			}),
		});
		try {
			const response = await getDataFromDB(payload);
			expect(response).to.be.an("array");
			expect(response).to.be.eql(data);
		} catch (error) {
			expect(error).to.be.undefined;
		}
	});

	it("testService:getDataFromDB:DB Error", async () => {
		const error = new Error("DB Connection Issue");
		const spyLog = sinon.spy(logger, "error");
		sinon.stub(database, "init").resolves({
			collection: sinon.stub().returns({
				aggregate: sinon.stub().returns({
					toArray: sinon.stub().rejects(error),
				}),
			}),
		});
		try {
			const response = await getDataFromDB(payload);
			expect(
				spyLog.calledWith(
					"Error while calling the Database:DB Connection Issue"
				)
			).eql(true);
			expect(response).to.be.undefined;
		} catch (error) {
			expect(error).to.be.instanceOf(Error);
			expect(error.message).eql("DB Connection Issue");
			expect(error.name).eql("Error");
		}
	});
});
