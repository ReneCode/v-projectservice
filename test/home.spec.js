
let superagent = require('superagent');
let assert = require('chai').assert;

describe("home", () => {
	const url = "http://localhost:8080";
	it("get", (done) => {

		superagent.get(url, (err, res) => {
			assert.isNull(err);
			assert.isNotNull(res);
			done();
		})
	});
})