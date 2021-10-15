const sinon = require("sinon");
const {MongoClient} = require("mongodb");
const { describe, it, afterEach } = require("mocha");
const { expect } = require("chai");
const database = require("../../utils/db");
const logger = require("../../utils/logger");




describe("Utils:DB", () => {
	afterEach(async (done) => {
		sinon.restore();
		done();
	});

	it("DB:Throws error when URI is undefined",async ()=>{
		const loggerSpy = sinon.spy(logger,"error");
		try{
			const response =  await database.init(MongoClient);
			expect(response).to.be.undefined;
			expect(loggerSpy.calledWith("Error While connecting to DB")).eql(true);
		}
		catch(err){
			expect(err).to.be.instanceOf(Error);
			expect(err.name).eql("TypeError");
			expect(err.message).eql("Cannot read property 'match' of undefined");
		}
	});

	it("DB:Connected to database Happy Path",async ()=>{
		const loggerSpy = sinon.spy(logger,"info");
		const fake = function (uri){this.uri=uri;};
		fake.prototype.connect = ()=>sinon.fake.resolves({});
		fake.prototype.db = ()=>sinon.fake.returns({});
		try{
			const response =  await database.init(fake);
			const db = await response();
			expect(db).eql({});
			expect(loggerSpy.calledWith("**********Connected to MongoDB**********")).eql(true);
			expect(loggerSpy.calledWith("**********Connected to Database**********")).eql(true);
		}
		catch(err){
			expect(err).to.be.undefined;
		}
	});

	
});