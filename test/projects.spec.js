
let superagent = require('superagent');
let assert = require('chai').assert;

describe("projects", () => {

	before("open database", (done) => {
		done()
	});

	const url = "http://localhost:8080/api/v1/projects";
	it("get", (done) => {

		superagent.get(url, (err, res) => {
			assert.isNull(err);
			assert.isNotNull(res);
			assert.isArray(res.body);

			done();
		})
	});
})