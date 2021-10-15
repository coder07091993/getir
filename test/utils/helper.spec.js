const sinon = require("sinon");
const { describe, it, afterEach } = require("mocha");
const { expect } = require("chai");
const mocks = require("node-mocks-http");
const {formatResponse} = require("../../utils/helper");
const logger = require("../../utils/logger");


describe("Utils:helpers", () => {
	const res = mocks.createResponse();

	afterEach(async (done) => {
		sinon.restore();
		done();
	});

	it("helper:formatResponse:Throws error with null arguments",()=>{
		try{
			const payload = null;
			const response = formatResponse(payload);
			expect(response).to.be.undefined;
		}
		catch(err){
			expect(err).instanceOf(Error);
			expect(err.name).eql("TypeError");
			expect(err.message).eql("Cannot destructure property `res` of 'undefined' or 'null'.");
            
		}
	});

	it("helper:formatResponse:Response when code, error, httpcode and records are null:Happy path",()=>{
		try{
			const payload = {res};
			const logInfoSpy = sinon.spy(logger,"info");
			const response = formatResponse(payload);
			const expectedLog = {"code":1,"msg":"Internal Server Error","error":null,"records":null};
			expect(response).to.be.undefined;
			expect(logInfoSpy.calledWith(`Response Sent:${JSON.stringify(expectedLog)}`)).eql(true);
		}
		catch(err){
			expect(err).to.be.undefined;
		}
	});

	it("helper:formatResponse:Happy path",()=>{
		try{
			const expectedLog = {"code":0,"msg":"Success","error":null,"records":[]};
			const logInfoSpy = sinon.spy(logger,"info");
			const payload = {res,code:0,httpCode:200,message:"Success",error:null,records:[]};
			const response = formatResponse(payload);
			expect(response).to.be.undefined;
			expect(logInfoSpy.calledWith(`Response Sent:${JSON.stringify(expectedLog)}`)).eql(true);
		}
		catch(err){
			expect(err).to.be.undefined;
		}
	});
});