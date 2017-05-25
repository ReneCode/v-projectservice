
let superagent = require('superagent');
let assert = require('chai').assert;

describe("pages", () => {

	const projectId = "1c543880-0a6a-4ef1-b1a1-8d4eb41465b0";

	before("open database", (done) => {
		done()
	});

	const url = "http://localhost:8080/api/v1/" + projectId + "/pages";
	it("get", (done) => {

		superagent.get(url, (err, res) => {
			assert.isNull(err);
			assert.isNotNull(res);
			assert.isArray(res.body);

			done();
		})
	});
})