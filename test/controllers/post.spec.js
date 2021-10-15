const sinon = require("sinon");
const { describe, it, afterEach } = require("mocha");
const { expect } = require("chai");
const mocks = require("node-mocks-http");
const logger = require("../../utils/logger");

const service = require("../../service/testService");

const {
	testControllerPost,
} = require("../../Controllers/Test-Controller/post");

describe("Controller:Test-Controller:post", () => {
	const res = mocks.createResponse();
	const reqMockPayload = {
		method: "POST",
		url: "/test",
	};
	afterEach((done) => {
		sinon.restore();

		done();
	});
	it("Post Action:Throws Bad Request response when request body is empty", async () => {
		reqMockPayload.body = {};
		const req = mocks.createRequest(reqMockPayload);
		try {
			const logSpyError = sinon.spy(logger,"error");
			const response = await testControllerPost(req, res);
			expect(logSpyError.calledWith(`Request body is invalid:${reqMockPayload.body}`)).eql(true);
			expect(response).to.be.undefined;
		} catch (err) {
			expect(err).to.be.undefined;
		}
	});
	it("Post Action:Throws Bad Request response when request body has endDate less than startDate", async () => {
		reqMockPayload.body = {
			startDate:"2020-10-10",
			endDate:"2019-10-10",
			maxCount:212,
			minCount:121
		};
		const req = mocks.createRequest(reqMockPayload);
		try {
			const logSpyError = sinon.spy(logger,"error");
			const response = await testControllerPost(req, res);
			expect(logSpyError.calledWith(`Request body is invalid:${reqMockPayload.body}`)).eql(true);
			expect(response).to.be.undefined;
		} catch (err) {
			expect(err).to.be.undefined;
		}
	});
	it("Post Action:Throws Bad Request response when maxCount is less than minCount", async () => {
		reqMockPayload.body = {
			startDate:"2020-10-10",
			endDate:"2021-10-10",
			maxCount:212,
			minCount:1210
		};
		const req = mocks.createRequest(reqMockPayload);
		try {
			const logSpyError = sinon.spy(logger,"error");
			const response = await testControllerPost(req, res);
			expect(logSpyError.calledWith(`Request body is invalid:${reqMockPayload.body}`)).eql(true);
			expect(response).to.be.undefined;
		} catch (err) {
			expect(err).to.be.undefined;
		}
	});

	it("Post Action:Throws Bad Request response when startDate is missing", async () => {
		reqMockPayload.body = {
			endDate:"2021-10-10",
			maxCount:2121,
			minCount:1210
		};
		const req = mocks.createRequest(reqMockPayload);
		try {
			const logSpyError = sinon.spy(logger,"error");
			const response = await testControllerPost(req, res);
			expect(logSpyError.calledWith(`Request body is invalid:${reqMockPayload.body}`)).eql(true);
			expect(response).to.be.undefined;
		} catch (err) {
			expect(err).to.be.undefined;
		}
	});

	it("Post Action:Throws Bad Request response when endDate is missing", async () => {
		reqMockPayload.body = {
			startDate:"2020-10-10",
			maxCount:2121,
			minCount:1210
		};
		const req = mocks.createRequest(reqMockPayload);
		try {
			const logSpyError = sinon.spy(logger,"error");
			const response = await testControllerPost(req, res);
			expect(logSpyError.calledWith(`Request body is invalid:${reqMockPayload.body}`)).eql(true);
			expect(response).to.be.undefined;
		} catch (err) {
			expect(err).to.be.undefined;
		}
	});

	it("Post Action:Throws Bad Request response when maxCount is missing", async () => {
		reqMockPayload.body = {
			startDate:"2020-10-10",
			endDate:"2021-10-10",
			minCount:1210
		};
		const req = mocks.createRequest(reqMockPayload);
		try {
			const logSpyError = sinon.spy(logger,"error");
			const response = await testControllerPost(req, res);
			expect(logSpyError.calledWith(`Request body is invalid:${reqMockPayload.body}`)).eql(true);
			expect(response).to.be.undefined;
		} catch (err) {
			expect(err).to.be.undefined;
		}
	});

	it("Post Action:Throws Bad Request response when minCount is missing", async () => {
		reqMockPayload.body = {
			startDate:"2020-10-10",
			endDate:"2021-10-10",
			maxCount:2121
		};
		const req = mocks.createRequest(reqMockPayload);
		try {
			const logSpyError = sinon.spy(logger,"error");
			const response = await testControllerPost(req, res);
			expect(logSpyError.calledWith(`Request body is invalid:${reqMockPayload.body}`)).eql(true);
			expect(response).to.be.undefined;
		} catch (err) {
			expect(err).to.be.undefined;
		}
	});

	it("Post Action:DB Connection issue", async () => {
		reqMockPayload.body = {
			startDate:"2020-10-10",
			endDate:"2021-10-10",
			maxCount:2121,
			minCount:1210
		};
		const req = mocks.createRequest(reqMockPayload);
		const error = new Error("DB Connection issue");
		sinon.stub(service,"getDataFromDB").rejects(error);
		const logSpyError = sinon.spy(logger,"error");
		try {
			const response = await testControllerPost(req, res);
			expect(logSpyError.calledWith(`Error occured:${error.message}`)).eql(true);
			expect(response).to.be.undefined;
		} catch (err) {
			expect(err).to.be.undefined;
		}
	});

	it("Post Action:Happy path", async () => {
		reqMockPayload.body = {
			startDate:"2020-10-10",
			endDate:"2021-10-10",
			maxCount:2121,
			minCount:1210
		};
		const req = mocks.createRequest(reqMockPayload);
		sinon.stub(service,"getDataFromDB").resolves([]);
		const logSpy = sinon.spy(logger,"info");
		try {
			const response = await testControllerPost(req, res);
			expect(logSpy.calledWith("Records Fetched Successfully")).eql(true);
			expect(response).to.be.undefined;
		} catch (err) {
			expect(err).to.be.undefined;
		}
	});

});
